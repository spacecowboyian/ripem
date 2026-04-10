import { Router, Response, NextFunction } from 'express';
import { z } from 'zod';
import { authenticate } from '../middleware/authenticate';
import * as aiService from '../services/aiService';
import * as db from '../db/client';
import { AuthenticatedRequest } from '../types';
import { ValidationError, NotFoundError, ForbiddenError } from '../utils/errors';
import { v4 as uuidv4 } from 'uuid';

const router = Router();
router.use(authenticate);

// ─── Schemas ──────────────────────────────────────────────────────────────────

const onboardingSchema = z.object({
  project_id: z.string().uuid(),
  questionnaire: z.record(z.unknown()).optional(),
});

// ─── POST /ai/onboarding ──────────────────────────────────────────────────────
// Accepts project questionnaire data, calls OpenRouter/Claude, returns first response.
// This is the "Dale moment" — the first AI response after onboarding.

router.post(
  '/onboarding',
  async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    try {
      const body = onboardingSchema.safeParse(req.body);
      if (!body.success) {
        throw new ValidationError('Invalid request', body.error.flatten().fieldErrors as Record<string, unknown>);
      }

      const userId = req.user!.id;
      const { project_id, questionnaire } = body.data;

      // Fetch project + verify ownership
      const projectResult = await db.query<{
        id: string;
        year: number;
        make: string;
        model: string;
        car_name: string;
        origin_story: string | null;
        vision: string[];
        skill_level: string;
        budget_amount: number;
        timeline_months: number;
        work_completed: string | null;
        primary_focus: string | null;
        user_id: string;
      }>(
        `SELECT p.id, p.year, p.make, p.model, p.car_name, p.origin_story,
                p.vision, p.skill_level, p.budget_amount, p.timeline_months,
                p.work_completed, p.primary_focus, g.user_id
         FROM projects p
         JOIN garages g ON p.garage_id = g.id
         WHERE p.id = $1 AND p.is_active = true`,
        [project_id]
      );

      if (projectResult.rows.length === 0) {
        throw new NotFoundError('Project');
      }

      const project = projectResult.rows[0];
      if (project.user_id !== userId) {
        throw new ForbiddenError('Access denied to this project');
      }

      // Fetch user display name
      const userResult = await db.query<{ display_name: string | null }>(
        'SELECT display_name FROM users WHERE id = $1',
        [userId]
      );
      const userName = userResult.rows[0]?.display_name;

      // If questionnaire provided, upsert it
      if (questionnaire) {
        await db.query(
          `INSERT INTO questionnaire_responses (id, project_id, response_json, car_name, skill_level)
           VALUES ($1, $2, $3, $4, $5)
           ON CONFLICT (project_id) DO UPDATE
             SET response_json = EXCLUDED.response_json,
                 car_name = EXCLUDED.car_name,
                 updated_at = NOW()`,
          [
            uuidv4(),
            project_id,
            JSON.stringify(questionnaire),
            project.car_name,
            project.skill_level,
          ]
        );
      }

      // Generate the onboarding AI response
      const { response, tokens } = await aiService.generateOnboardingResponse({
        userId,
        projectId: project_id,
        project: {
          year: project.year,
          make: project.make,
          model: project.model,
          car_name: project.car_name,
          origin_story: project.origin_story,
          vision: project.vision,
          skill_level: project.skill_level,
          budget_amount: Number(project.budget_amount),
          timeline_months: project.timeline_months,
          work_completed: project.work_completed,
          primary_focus: project.primary_focus,
        },
        questionnaire: questionnaire,
        userName,
      });

      res.json({
        project_id,
        response,
        tokens_used: tokens.total,
      });
    } catch (err) {
      next(err);
    }
  }
);

export default router;
