import { Request } from 'express';

// ─── User / Auth ─────────────────────────────────────────────────────────────

export type AuthType = 'email' | 'google' | 'apple';
export type SubscriptionType = 'free' | 'chat_pro' | 'shop';
export type SubscriptionStatus = 'active' | 'paused' | 'cancelled' | 'past_due';
export type Platform = 'ios' | 'android' | 'web';

export interface User {
  id: string;
  email: string;
  auth_type: AuthType;
  password_hash: string | null;
  display_name: string | null;
  avatar_url: string | null;
  bio: string | null;
  created_at: Date;
  updated_at: Date;
  deleted_at: Date | null;
}

export interface RefreshToken {
  id: string;
  user_id: string;
  token_hash: string;
  expires_at: Date;
  revoked_at: Date | null;
  created_at: Date;
}

// ─── Garage / Project ─────────────────────────────────────────────────────────

export type SkillLevel = 'novice' | 'intermediate' | 'advanced' | 'professional';
export type VisionType = 'track_car' | 'street_driver' | 'restoration' | 'custom' | 'restomod' | 'offroad';

export interface Garage {
  id: string;
  user_id: string;
  garage_name: string | null;
  garage_description: string | null;
  is_public: boolean;
  created_at: Date;
  updated_at: Date;
}

export interface Project {
  id: string;
  garage_id: string;
  year: number;
  make: string;
  model: string;
  vin: string | null;
  car_name: string;
  origin_story: string | null;
  vision: VisionType[];
  vision_detail: string | null;
  skill_level: SkillLevel;
  budget_amount: number;
  timeline_months: number;
  timeline_start_date: Date;
  work_completed: string | null;
  primary_focus: string | null;
  is_public: boolean;
  is_active: boolean;
  created_at: Date;
  updated_at: Date;
}

export interface QuestionnaireResponse {
  id: string;
  project_id: string;
  response_json: Record<string, unknown>;
  skill_level: SkillLevel | null;
  vision_primary: VisionType | null;
  budget_amount: number | null;
  timeline_months: number | null;
  car_name: string | null;
  created_at: Date;
  updated_at: Date;
}

// ─── AI ───────────────────────────────────────────────────────────────────────

export type AIRequestType =
  | 'onboarding_response'
  | 'log_ai_response'
  | 'instagram_caption'
  | 'chat_response'
  | 'real_time_chat';

export interface AiTokenUsage {
  id: string;
  user_id: string;
  project_id: string | null;
  request_type: AIRequestType;
  input_tokens: number;
  output_tokens: number;
  total_tokens: number;
  estimated_cost_usd: number | null;
  created_at: Date;
}

// ─── Request Extensions ───────────────────────────────────────────────────────

export interface AuthenticatedRequest extends Request {
  user?: {
    id: string;
    email: string;
    auth_type: AuthType;
  };
}

// ─── API Response Helpers ─────────────────────────────────────────────────────

export interface PaginationMeta {
  page: number;
  limit: number;
  has_next: boolean;
  total?: number;
}

export interface ApiResponse<T = unknown> {
  data?: T;
  error?: string;
  message?: string;
  details?: Record<string, unknown>;
  pagination?: PaginationMeta;
}
