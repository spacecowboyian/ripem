import { Router, Response, NextFunction } from 'express';
import { z } from 'zod';
import { authenticate } from '../middleware/authenticate';
import * as garageService from '../services/garageService';
import { AuthenticatedRequest } from '../types';
import { ValidationError } from '../utils/errors';

const router = Router();

// All garage routes require authentication
router.use(authenticate);

// ─── Validation schemas ───────────────────────────────────────────────────────

const createGarageSchema = z.object({
  garage_name: z.string().max(100).optional(),
  garage_description: z.string().optional(),
});

const createProjectSchema = z.object({
  year: z.number().int().min(1885).max(new Date().getFullYear() + 2),
  make: z.string().min(1).max(50),
  model: z.string().min(1).max(100),
  car_name: z.string().min(1).max(100),
  vin: z.string().length(17).optional(),
  origin_story: z.string().optional(),
  vision: z.array(z.enum([
    'track_car', 'street_driver', 'restoration', 'custom', 'restomod', 'offroad'
  ])).min(1),
  vision_detail: z.string().optional(),
  skill_level: z.enum(['novice', 'intermediate', 'advanced', 'professional']),
  budget_amount: z.number().positive(),
  timeline_months: z.number().int().positive(),
  work_completed: z.string().optional(),
  primary_focus: z.string().optional(),
  is_public: z.boolean().optional().default(true),
});

const updateProjectSchema = createProjectSchema.partial();

// ─── GET /garages/me ─────────────────────────────────────────────────────────

router.get(
  '/me',
  async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    try {
      const garage = await garageService.getMyGarage(req.user!.id);
      res.json(garage);
    } catch (err) {
      next(err);
    }
  }
);

// ─── POST /garages/me/projects ───────────────────────────────────────────────

router.post(
  '/me/projects',
  async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    try {
      const body = createProjectSchema.safeParse(req.body);
      if (!body.success) {
        throw new ValidationError('Invalid project data', body.error.flatten().fieldErrors as Record<string, unknown>);
      }

      const project = await garageService.createProject(req.user!.id, body.data);
      res.status(201).json({
        project_id: project.id,
        garage_id: project.garage_id,
        car_name: project.car_name,
        created_at: project.created_at,
      });
    } catch (err) {
      next(err);
    }
  }
);

// ─── GET /garages/me/projects/:id ────────────────────────────────────────────

router.get(
  '/me/projects/:id',
  async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    try {
      const project = await garageService.getProject(req.params.id, req.user!.id);
      res.json(project);
    } catch (err) {
      next(err);
    }
  }
);

// ─── PATCH /garages/me/projects/:id ──────────────────────────────────────────

router.patch(
  '/me/projects/:id',
  async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    try {
      const body = updateProjectSchema.safeParse(req.body);
      if (!body.success) {
        throw new ValidationError('Invalid project update data', body.error.flatten().fieldErrors as Record<string, unknown>);
      }

      const project = await garageService.updateProject(req.params.id, req.user!.id, body.data);
      res.json(project);
    } catch (err) {
      next(err);
    }
  }
);

// ─── DELETE /garages/me/projects/:id ─────────────────────────────────────────

router.delete(
  '/me/projects/:id',
  async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    try {
      await garageService.deleteProject(req.params.id, req.user!.id);
      res.status(204).send();
    } catch (err) {
      next(err);
    }
  }
);

export default router;
