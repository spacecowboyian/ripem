import { v4 as uuidv4 } from 'uuid';
import * as db from '../db/client';
import { Garage, Project } from '../types';
import { NotFoundError, ForbiddenError, ConflictError } from '../utils/errors';

// ─── Garage ───────────────────────────────────────────────────────────────────

export interface GarageWithProjects extends Garage {
  projects: Array<{
    project_id: string;
    car_name: string;
    year: number;
    make: string;
    model: string;
    vision: string[];
    total_entries: number;
  }>;
}

export async function getMyGarage(userId: string): Promise<GarageWithProjects> {
  const garageResult = await db.query<Garage>(
    `SELECT * FROM garages WHERE user_id = $1`,
    [userId]
  );

  let garage = garageResult.rows[0];

  // Auto-create garage if it doesn't exist
  if (!garage) {
    const newId = uuidv4();
    const created = await db.query<Garage>(
      `INSERT INTO garages (id, user_id, is_public)
       VALUES ($1, $2, true)
       RETURNING *`,
      [newId, userId]
    );
    garage = created.rows[0];
  }

  const projectsResult = await db.query<{
    id: string;
    car_name: string;
    year: number;
    make: string;
    model: string;
    vision: string[];
    total_entries: string;
  }>(
    `SELECT p.id, p.car_name, p.year, p.make, p.model, p.vision,
            COUNT(le.id)::int AS total_entries
     FROM projects p
     LEFT JOIN log_entries le ON le.project_id = p.id
     WHERE p.garage_id = $1 AND p.is_active = true
     GROUP BY p.id
     ORDER BY p.created_at DESC`,
    [garage.id]
  );

  return {
    ...garage,
    projects: projectsResult.rows.map((p) => ({
      project_id: p.id,
      car_name: p.car_name,
      year: p.year,
      make: p.make,
      model: p.model,
      vision: p.vision,
      total_entries: Number(p.total_entries),
    })),
  };
}

export async function createGarage(
  userId: string,
  garageName?: string,
  garageDescription?: string
): Promise<Garage> {
  const existing = await db.query<Garage>(
    'SELECT id FROM garages WHERE user_id = $1',
    [userId]
  );
  if (existing.rows.length > 0) {
    throw new ConflictError('User already has a garage');
  }

  const id = uuidv4();
  const result = await db.query<Garage>(
    `INSERT INTO garages (id, user_id, garage_name, garage_description, is_public)
     VALUES ($1, $2, $3, $4, true)
     RETURNING *`,
    [id, userId, garageName || null, garageDescription || null]
  );

  return result.rows[0];
}

// ─── Projects ─────────────────────────────────────────────────────────────────

export async function createProject(
  userId: string,
  data: {
    year: number;
    make: string;
    model: string;
    car_name: string;
    vin?: string;
    origin_story?: string;
    vision: string[];
    vision_detail?: string;
    skill_level: string;
    budget_amount: number;
    timeline_months: number;
    work_completed?: string;
    primary_focus?: string;
    is_public?: boolean;
  }
): Promise<Project> {
  // Get or create garage for this user
  const garageResult = await db.query<Garage>(
    'SELECT id FROM garages WHERE user_id = $1',
    [userId]
  );

  let garageId: string;
  if (garageResult.rows.length === 0) {
    const newGarage = await createGarage(userId);
    garageId = newGarage.id;
  } else {
    garageId = garageResult.rows[0].id;
  }

  const id = uuidv4();
  const result = await db.query<Project>(
    `INSERT INTO projects (
       id, garage_id, year, make, model, vin, car_name,
       origin_story, vision, vision_detail, skill_level,
       budget_amount, timeline_months, work_completed,
       primary_focus, is_public
     ) VALUES (
       $1, $2, $3, $4, $5, $6, $7,
       $8, $9, $10, $11,
       $12, $13, $14,
       $15, $16
     ) RETURNING *`,
    [
      id,
      garageId,
      data.year,
      data.make,
      data.model,
      data.vin || null,
      data.car_name,
      data.origin_story || null,
      JSON.stringify(data.vision || []),
      data.vision_detail || null,
      data.skill_level,
      data.budget_amount,
      data.timeline_months,
      data.work_completed || null,
      data.primary_focus || null,
      data.is_public !== undefined ? data.is_public : true,
    ]
  );

  return result.rows[0];
}

export async function getProject(projectId: string, userId: string): Promise<Project> {
  const result = await db.query<Project & { user_id: string }>(
    `SELECT p.*, g.user_id
     FROM projects p
     JOIN garages g ON p.garage_id = g.id
     WHERE p.id = $1 AND p.is_active = true`,
    [projectId]
  );

  if (result.rows.length === 0) {
    throw new NotFoundError('Project');
  }

  const project = result.rows[0];
  if (project.user_id !== userId && !project.is_public) {
    throw new ForbiddenError('Access denied to this project');
  }

  return project;
}

export async function updateProject(
  projectId: string,
  userId: string,
  updates: Partial<{
    car_name: string;
    year: number;
    make: string;
    model: string;
    origin_story: string;
    vision: string[];
    vision_detail: string;
    skill_level: string;
    budget_amount: number;
    timeline_months: number;
    work_completed: string;
    primary_focus: string;
    is_public: boolean;
  }>
): Promise<Project> {
  // Verify ownership
  const existing = await db.query<{ id: string; user_id: string }>(
    `SELECT p.id, g.user_id FROM projects p
     JOIN garages g ON p.garage_id = g.id
     WHERE p.id = $1 AND p.is_active = true`,
    [projectId]
  );

  if (existing.rows.length === 0) {
    throw new NotFoundError('Project');
  }
  if (existing.rows[0].user_id !== userId) {
    throw new ForbiddenError('Cannot update another user\'s project');
  }

  // Build dynamic SET clause
  const allowedFields = [
    'car_name', 'year', 'make', 'model', 'origin_story', 'vision',
    'vision_detail', 'skill_level', 'budget_amount', 'timeline_months',
    'work_completed', 'primary_focus', 'is_public',
  ];

  const setClauses: string[] = [];
  const values: unknown[] = [];
  let paramIndex = 1;

  for (const field of allowedFields) {
    if (field in updates) {
      const val = (updates as Record<string, unknown>)[field];
      setClauses.push(`${field} = $${paramIndex}`);
      values.push(field === 'vision' ? JSON.stringify(val) : val);
      paramIndex++;
    }
  }

  if (setClauses.length === 0) {
    return getProject(projectId, userId);
  }

  values.push(projectId);
  const result = await db.query<Project>(
    `UPDATE projects SET ${setClauses.join(', ')} WHERE id = $${paramIndex} RETURNING *`,
    values
  );

  return result.rows[0];
}

export async function deleteProject(projectId: string, userId: string): Promise<void> {
  const existing = await db.query<{ id: string; user_id: string }>(
    `SELECT p.id, g.user_id FROM projects p
     JOIN garages g ON p.garage_id = g.id
     WHERE p.id = $1 AND p.is_active = true`,
    [projectId]
  );

  if (existing.rows.length === 0) {
    throw new NotFoundError('Project');
  }
  if (existing.rows[0].user_id !== userId) {
    throw new ForbiddenError('Cannot delete another user\'s project');
  }

  await db.query(
    'UPDATE projects SET is_active = false, updated_at = NOW() WHERE id = $1',
    [projectId]
  );
}
