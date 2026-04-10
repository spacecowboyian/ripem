-- Migration: 001_initial_schema
-- Phase 1 tables: users, refresh_tokens, garages, projects, questionnaire_responses, ai_token_usage

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ─── ENUM Types ──────────────────────────────────────────────────────────────

CREATE TYPE auth_type AS ENUM ('email', 'google', 'apple');
CREATE TYPE skill_level AS ENUM ('novice', 'intermediate', 'advanced', 'professional');
CREATE TYPE vision_type AS ENUM ('track_car', 'street_driver', 'restoration', 'custom', 'restomod', 'offroad');
CREATE TYPE subscription_type AS ENUM ('free', 'chat_pro', 'shop');
CREATE TYPE subscription_status AS ENUM ('active', 'paused', 'cancelled', 'past_due');
CREATE TYPE platform_type AS ENUM ('ios', 'android', 'web');
CREATE TYPE ai_request_type AS ENUM (
  'onboarding_response',
  'log_ai_response',
  'instagram_caption',
  'chat_response',
  'real_time_chat'
);

-- ─── users ───────────────────────────────────────────────────────────────────

CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  email VARCHAR(255) UNIQUE NOT NULL,
  auth_type auth_type NOT NULL,
  password_hash VARCHAR(255),
  display_name VARCHAR(100),
  avatar_url VARCHAR(500),
  bio TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  deleted_at TIMESTAMPTZ
);

CREATE INDEX idx_users_email ON users (email);
CREATE INDEX idx_users_created_at ON users (created_at);

-- ─── refresh_tokens ──────────────────────────────────────────────────────────

CREATE TABLE refresh_tokens (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  token_hash VARCHAR(255) NOT NULL,
  expires_at TIMESTAMPTZ NOT NULL,
  revoked_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_refresh_tokens_user_id ON refresh_tokens (user_id);
CREATE INDEX idx_refresh_tokens_token_hash ON refresh_tokens (token_hash);
CREATE INDEX idx_refresh_tokens_expires_at ON refresh_tokens (expires_at);

-- ─── garages ─────────────────────────────────────────────────────────────────

CREATE TABLE garages (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  garage_name VARCHAR(100),
  garage_description TEXT,
  is_public BOOLEAN DEFAULT TRUE NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE (user_id)
);

CREATE INDEX idx_garages_user_id ON garages (user_id);
CREATE INDEX idx_garages_is_public ON garages (is_public);

-- ─── projects ────────────────────────────────────────────────────────────────

CREATE TABLE projects (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  garage_id UUID NOT NULL REFERENCES garages(id) ON DELETE CASCADE,

  -- Car Basics
  year INT NOT NULL,
  make VARCHAR(50) NOT NULL,
  model VARCHAR(100) NOT NULL,
  vin VARCHAR(17),
  car_name VARCHAR(100) NOT NULL,

  -- Story & Vision
  origin_story TEXT,
  vision JSONB NOT NULL DEFAULT '[]',
  vision_detail TEXT,

  -- Calibration
  skill_level skill_level NOT NULL,

  -- Budget & Timeline
  budget_amount DECIMAL(10, 2) NOT NULL,
  timeline_months INT NOT NULL,
  timeline_start_date DATE NOT NULL DEFAULT CURRENT_DATE,

  -- Current State
  work_completed TEXT,
  primary_focus TEXT,

  -- Status
  is_public BOOLEAN DEFAULT TRUE NOT NULL,
  is_active BOOLEAN DEFAULT TRUE NOT NULL,

  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_projects_garage_id ON projects (garage_id);
CREATE INDEX idx_projects_is_public ON projects (is_public);
CREATE INDEX idx_projects_created_at ON projects (created_at DESC);
CREATE INDEX idx_projects_year_make_model ON projects (year, make, model);

-- ─── questionnaire_responses ─────────────────────────────────────────────────

CREATE TABLE questionnaire_responses (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  project_id UUID NOT NULL REFERENCES projects(id) ON DELETE CASCADE,
  response_json JSONB NOT NULL DEFAULT '{}',
  skill_level skill_level,
  vision_primary vision_type,
  budget_amount DECIMAL(10, 2),
  timeline_months INT,
  car_name VARCHAR(100),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE (project_id)
);

CREATE INDEX idx_questionnaire_responses_project_id ON questionnaire_responses (project_id);

-- ─── ai_token_usage ──────────────────────────────────────────────────────────

CREATE TABLE ai_token_usage (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  project_id UUID REFERENCES projects(id) ON DELETE SET NULL,
  request_type ai_request_type NOT NULL,
  input_tokens INT NOT NULL,
  output_tokens INT NOT NULL,
  total_tokens INT NOT NULL,
  estimated_cost_usd DECIMAL(10, 4),
  model VARCHAR(100),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_ai_token_usage_user_id ON ai_token_usage (user_id);
CREATE INDEX idx_ai_token_usage_project_id ON ai_token_usage (project_id);
CREATE INDEX idx_ai_token_usage_created_at ON ai_token_usage (created_at DESC);

-- ─── subscriptions ───────────────────────────────────────────────────────────

CREATE TABLE subscriptions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  subscription_type subscription_type NOT NULL DEFAULT 'free',
  extra_projects_count INT DEFAULT 0,
  billing_cycle_start TIMESTAMPTZ,
  billing_cycle_end TIMESTAMPTZ,
  renewal_date TIMESTAMPTZ,
  auto_renew BOOLEAN DEFAULT TRUE,
  status subscription_status NOT NULL DEFAULT 'active',
  platform platform_type NOT NULL DEFAULT 'ios',
  app_receipt_data JSONB,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  cancelled_at TIMESTAMPTZ,
  UNIQUE (user_id)
);

CREATE INDEX idx_subscriptions_user_id ON subscriptions (user_id);
CREATE INDEX idx_subscriptions_status ON subscriptions (status);
CREATE INDEX idx_subscriptions_renewal_date ON subscriptions (renewal_date);

-- ─── Trigger: auto-update updated_at ─────────────────────────────────────────

CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_users_updated_at BEFORE UPDATE ON users
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_garages_updated_at BEFORE UPDATE ON garages
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_projects_updated_at BEFORE UPDATE ON projects
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_questionnaire_responses_updated_at BEFORE UPDATE ON questionnaire_responses
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_subscriptions_updated_at BEFORE UPDATE ON subscriptions
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
