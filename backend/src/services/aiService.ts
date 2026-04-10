/**
 * AI Service — wraps OpenRouter/Claude calls.
 * All LLM calls go through OpenRouter as specified in tech_stack.md.
 * Tracks all token usage in ai_token_usage table.
 */

import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';
import * as db from '../db/client';
import { AIRequestType } from '../types';

const OPENROUTER_BASE_URL = process.env.OPENROUTER_BASE_URL || 'https://openrouter.ai/api/v1';
const OPENROUTER_MODEL = process.env.OPENROUTER_MODEL || 'anthropic/claude-3-5-sonnet';

interface OpenRouterMessage {
  role: 'system' | 'user' | 'assistant';
  content: string;
}

interface OpenRouterResponse {
  id: string;
  choices: Array<{
    message: {
      role: string;
      content: string;
    };
    finish_reason: string;
  }>;
  usage: {
    prompt_tokens: number;
    completion_tokens: number;
    total_tokens: number;
  };
  model: string;
}

interface LLMCallResult {
  content: string;
  input_tokens: number;
  output_tokens: number;
  total_tokens: number;
  model: string;
}

// ─── Core LLM Call ────────────────────────────────────────────────────────────

export async function callLLM(messages: OpenRouterMessage[]): Promise<LLMCallResult> {
  const response = await axios.post<OpenRouterResponse>(
    `${OPENROUTER_BASE_URL}/chat/completions`,
    {
      model: OPENROUTER_MODEL,
      messages,
      max_tokens: 1024,
      temperature: 0.8,
    },
    {
      headers: {
        Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
        'Content-Type': 'application/json',
        'HTTP-Referer': 'https://api.ripem.app',
        'X-Title': 'RipEm',
      },
      timeout: 30000,
    }
  );

  const choice = response.data.choices[0];
  const usage = response.data.usage;

  return {
    content: choice.message.content,
    input_tokens: usage.prompt_tokens,
    output_tokens: usage.completion_tokens,
    total_tokens: usage.total_tokens,
    model: response.data.model,
  };
}

// ─── Token Usage Tracking ─────────────────────────────────────────────────────

export async function trackTokenUsage(
  userId: string,
  projectId: string | null,
  requestType: AIRequestType,
  inputTokens: number,
  outputTokens: number,
  totalTokens: number,
  model: string
): Promise<void> {
  // Estimate cost (Claude 3.5 Sonnet via OpenRouter ~$3/$15 per M tokens input/output)
  const estimatedCost =
    (inputTokens / 1_000_000) * 3.0 + (outputTokens / 1_000_000) * 15.0;

  await db.query(
    `INSERT INTO ai_token_usage
       (id, user_id, project_id, request_type, input_tokens, output_tokens, total_tokens, estimated_cost_usd, model)
     VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)`,
    [
      uuidv4(),
      userId,
      projectId,
      requestType,
      inputTokens,
      outputTokens,
      totalTokens,
      estimatedCost.toFixed(4),
      model,
    ]
  );
}

// ─── System Prompts ───────────────────────────────────────────────────────────

const CAR_BUDDY_SYSTEM_PROMPT = `You are the best car buddy this person has ever had.

You genuinely care about their project. You listen. You remember. You celebrate wins.
You challenge them when they're underestimating.

Your core behaviors:
1. Always reference the user's specific vehicle and project details (car name, story, vision, skill level).
2. Show genuine excitement. "That's sick." "Kickass name." "Let's make this thing a monster."
3. Calibrate to their skill level — don't baby advanced builders, don't assume knowledge from novices.
4. Address their primary focus first. If they said motor swap, start there.
5. Offer options, don't prescribe. "Here are some options... what's your thinking?"
6. Ask clarifying questions. "Have you ever looked into swaps? What's your jam so far?"
7. Set the tone for relationship. "I'm here to help you figure this out."

You're not a database of car mods. You're their friend who knows cars.
Be excited. Be curious. Be the person they want to check in with every day.`;

const ONBOARDING_SYSTEM_PROMPT = `You are the best car buddy this person has ever had.
The person just completed onboarding. Your job:

1. Demonstrate you listened: Reference car name, story, vision, skill level
2. Show genuine excitement: "That's sick." "Let's make this thing a monster."
3. Calibrate to skill level: Don't baby advanced, don't assume knowledge from novice
4. Address their primary focus: They said X? Start there
5. Offer options, don't prescribe: "Here are some options... what's your thinking?"
6. Ask clarifying questions: "Have you ever looked into swaps?"
7. Set the tone: "I'm here to help you build something amazing."

Response: 200-300 words. Warm, conversational, specific to their project. End with open question.`;

// ─── Onboarding AI Pipeline ───────────────────────────────────────────────────

interface OnboardingContext {
  userId: string;
  projectId: string;
  project: {
    year: number;
    make: string;
    model: string;
    car_name: string;
    origin_story?: string | null;
    vision: string[];
    skill_level: string;
    budget_amount: number;
    timeline_months: number;
    work_completed?: string | null;
    primary_focus?: string | null;
  };
  questionnaire?: Record<string, unknown>;
  userName?: string | null;
}

export async function generateOnboardingResponse(ctx: OnboardingContext): Promise<{
  response: string;
  tokens: { input: number; output: number; total: number };
}> {
  const { project, questionnaire, userName } = ctx;

  const projectContext = `
User: ${userName || 'Car enthusiast'}
Vehicle: ${project.year} ${project.make} ${project.model} (named "${project.car_name}")
Vision: ${project.vision.join(', ')}
Skill Level: ${project.skill_level}
Budget: $${project.budget_amount} over ${project.timeline_months} months
${project.origin_story ? `Story: ${project.origin_story}` : ''}
${project.work_completed ? `Work already done: ${project.work_completed}` : ''}
${project.primary_focus ? `Primary focus: ${project.primary_focus}` : ''}
${questionnaire ? `Full questionnaire: ${JSON.stringify(questionnaire)}` : ''}
  `.trim();

  const messages: OpenRouterMessage[] = [
    { role: 'system', content: ONBOARDING_SYSTEM_PROMPT },
    {
      role: 'user',
      content: `Here's my project context:\n\n${projectContext}\n\nGive me your first response as my car buddy.`,
    },
  ];

  const result = await callLLM(messages);

  // Track token usage
  await trackTokenUsage(
    ctx.userId,
    ctx.projectId,
    'onboarding_response',
    result.input_tokens,
    result.output_tokens,
    result.total_tokens,
    result.model
  );

  return {
    response: result.content,
    tokens: {
      input: result.input_tokens,
      output: result.output_tokens,
      total: result.total_tokens,
    },
  };
}

// ─── Voice Log AI Response ────────────────────────────────────────────────────

interface LogAiContext {
  userId: string;
  projectId: string;
  userName?: string | null;
  project: {
    year: number;
    make: string;
    model: string;
    car_name: string;
    skill_level: string;
    budget_amount: number;
    timeline_months: number;
    vision: string[];
    origin_story?: string | null;
  };
  transcript: string;
  recentEntries?: Array<{ created_at: Date; transcript: string; ai_response: string }>;
}

export async function generateLogResponse(ctx: LogAiContext): Promise<{
  response: string;
  tokens: { input: number; output: number; total: number };
}> {
  const { project, transcript, recentEntries, userName } = ctx;

  const contextBlock = `
User: ${userName || 'Car enthusiast'}
Vehicle: ${project.year} ${project.make} ${project.model} (named "${project.car_name}")
Skill Level: ${project.skill_level}
Budget: $${project.budget_amount} over ${project.timeline_months} months
Vision: ${project.vision.join(', ')}
${project.origin_story ? `Story: ${project.origin_story}` : ''}
${
  recentEntries && recentEntries.length > 0
    ? `\nRecent log entries:\n${recentEntries
        .map(
          (e, i) =>
            `${i + 1}. [${e.created_at.toISOString()}] ${e.transcript.substring(0, 200)}...`
        )
        .join('\n')}`
    : ''
}
  `.trim();

  const messages: OpenRouterMessage[] = [
    { role: 'system', content: CAR_BUDDY_SYSTEM_PROMPT },
    {
      role: 'user',
      content: `Here's my project context:\n\n${contextBlock}\n\nNew log entry:\n"${transcript}"\n\nRespond as my car buddy.`,
    },
  ];

  const result = await callLLM(messages);

  await trackTokenUsage(
    ctx.userId,
    ctx.projectId,
    'log_ai_response',
    result.input_tokens,
    result.output_tokens,
    result.total_tokens,
    result.model
  );

  return {
    response: result.content,
    tokens: {
      input: result.input_tokens,
      output: result.output_tokens,
      total: result.total_tokens,
    },
  };
}
