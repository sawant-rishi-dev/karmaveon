/**
 * veonAi.js — xAI (Grok) Engine Integration for VEON
 * Features:
 * - Direct xAI Grok API Integration
 * - 5-Second Timeout Protection with AbortController
 * - CORS-Free Proxy Route (/api-xai)
 * - Zero-Hang Intelligent Fallback
 */

const SYSTEM_PROMPT = `You are VEON, the lead AI Software Engineer & Chief Tech Architect at Karmaveon Technologies.
You speak with witty, confident, developer energy (use subtle emojis like ⚡, 🚀, 💻, ☕, 🧙‍♂️).
You are extremely smart, concise, and helpful.

ABOUT KARMAVEON TECHNOLOGIES:
- Tagline: High-Performance Apps & AI Automations for Modern Startups.
- Core Promise: We build and launch custom software & hardware solutions in under 4 weeks.
- Core Services:
  1. Website & SaaS Development (React, Next.js, Tailwind, SEO, sub-second performance).
  2. Mobile App Development (React Native / Expo 51, iOS & Android, Offline SQLite, GST billing, WhatsApp collections).
  3. n8n Workflow Automation (killing repetitive tasks, CRM pipelines, webhooks, multi-step sync).
  4. Custom LLMs & AI Agents (Enterprise RAG pipelines, fine-tuned Llama/Mistral, multi-agent reasoning, zero-hallucination guardrails).
  5. Custom Hardware & IoT Engineering (Arduino, ESP32 microcontrollers, smart sensors, MQTT telemetry, bespoke high-performance PC & GPU AI workstations).
- Products & Case Studies:
  - Third Eye (High-impact live web application: https://thirdeye.fun/)
  - QR Bites (Ultra-fast QR Menu & POS system for restaurants)
  - Smart Udhaar (Offline-first Kirana ledger & 1-tap WhatsApp payment collection app)
  - Kwiee (Micro-SaaS tools)
- Pricing & Engagement: Milestone-based payments (50% upfront, 50% on delivery), full IP transfer (clients own 100% of code), signed NDAs available.
- Call to Action: Invite users to book a Free Strategy Call anytime.

GUIDELINES:
- Keep answers concise, snappy, and insightful (2-4 punchy sentences or quick bullet points).
- If the user asks for code, provide clean, modern snippet solutions.
- If the user discusses a project idea, recommend an optimal architecture and invite them to book a strategy call!`

// Built-in intelligent fallback in case of rate limits, network timeouts, or offline mode
const FALLBACK_KNOWLEDGE = [
  {
    triggers: ['stack', 'tech', 'technology', 'framework', 'languages'],
    response: "We engineer with modern, battle-tested stacks! 💻\n\n• **Web & SaaS**: React, Next.js, TypeScript, TailwindCSS\n• **Mobile**: React Native (Expo 51) with offline SQLite\n• **Automations**: n8n workflows, Node.js, Webhooks, Python\n• **AI/LLMs**: Custom RAG pipelines, pgvector, LangChain, Grok & Llama\n• **Hardware**: ESP32, Arduino, MQTT telemetry\n\nWhat kind of architecture are you planning to build? 🚀"
  },
  {
    triggers: ['timeline', 'time', 'how long', 'fast', 'weeks', 'days'],
    response: "⚡ We take projects from **idea to production launch in under 4 weeks**! We work in rapid milestone sprints with continuous staging previews so you see progress daily. Want to scope your timeline on a quick strategy call? 📅"
  },
  {
    triggers: ['pricing', 'cost', 'price', 'rate', 'quote', 'how much', 'budget'],
    response: "💰 We work on transparent milestone pricing (typically 50% upfront, 50% on final delivery with 100% full IP code ownership to you). Pricing depends on your feature scope, whether it's a lightweight MVP or an enterprise system. Let's hop on a Free Strategy Call to give you an exact estimate!"
  },
  {
    triggers: ['service', 'offer', 'build', 'what do you do', 'solutions'],
    response: "At Karmaveon, we engineer:\n\n1. 🌐 **Websites & SaaS Platforms** (Lightning-fast, conversion-focused)\n2. 📱 **Mobile Apps** (Offline SQLite & WhatsApp payment sync)\n3. ⚡ **n8n AI Workflow Automations** (Kill manual work)\n4. 🧠 **Custom LLMs & AI Agents** (Domain-specific RAG pipelines)\n5. 🔌 **Custom Hardware & PC Builds** (IoT sensors & GPU AI rigs)\n\nWhich of these matches your goal? 🧙‍♂️"
  },
  {
    triggers: ['call', 'contact', 'book', 'meeting', 'hire', 'talk'],
    response: "Let's make it happen! 🚀 Click the **'📅 Book Strategy Call'** button right here in the chat (or in the top navbar) and pick a time on our calendar. I'll have the tea brewing! ☕"
  }
]

export async function askVeonAI(userMessage, conversationHistory = []) {
  const apiKey = import.meta.env.VITE_XAI_API_KEY || ''
  const model = import.meta.env.VITE_XAI_MODEL || 'grok-beta'

  // Use proxy in browser to bypass CORS, or direct URL fallback
  const endpoints = ['/api-xai/chat/completions', 'https://api.x.ai/v1/chat/completions']

  const messages = [
    { role: 'system', content: SYSTEM_PROMPT },
    ...conversationHistory.slice(-6),
    { role: 'user', content: userMessage }
  ]

  for (const endpoint of endpoints) {
    try {
      const controller = new AbortController()
      const timeoutId = setTimeout(() => controller.abort(), 4500) // 4.5s max timeout

      const res = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${apiKey}`
        },
        body: JSON.stringify({
          model: model,
          messages: messages,
          temperature: 0.7,
          max_tokens: 450,
        }),
        signal: controller.signal
      })

      clearTimeout(timeoutId)

      if (res.ok) {
        const data = await res.json()
        const reply = data?.choices?.[0]?.message?.content
        if (reply) return reply.trim()
      }
    } catch (err) {
      // Continue to next endpoint or instant smart fallback
    }
  }

  // Instant Smart Fallback Matcher (Always returns in <10ms)
  const lower = userMessage.toLowerCase()
  for (const item of FALLBACK_KNOWLEDGE) {
    if (item.triggers.some(t => lower.includes(t))) {
      return item.response
    }
  }

  return `I'm on it! ⚡ At Karmaveon, we engineer high-performance web apps, React Native mobile apps, and n8n AI workflows—launched in under 4 weeks. Tell me a bit more about what you'd like to build, or click **Book a Free Strategy Call** so we can map it out! 🚀`
}
