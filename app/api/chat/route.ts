import { NextRequest, NextResponse } from 'next/server';
import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.XAI_API_KEY || '',
  baseURL: 'https://api.x.ai/v1',
});

const SYSTEM_PROMPT = `You are Grok, a helpful, witty, and maximally truthful AI assistant built by xAI, embedded on Move Trust Hub (movetrusthub.com).

Move Trust Hub helps people find trusted interstate/long-distance movers and auto transport (car shipping) companies. Key features:
- Mover Directory: Search and filter 25+ major interstate moving companies with ratings, reviews, FMCSA data, BBB, pricing.
- Auto Transport Directory: Similar for car shipping companies (open/enclosed transport, luxury vehicles, etc.).
- Smart Move Estimator: Calculator to estimate cubic feet volume and now weight (7 lbs per cu ft), with recommendations for truck size.
- Get Free Quotes: Form that matches users with 3-5 verified movers.
- Resources: Guides on choosing movers, scams, FMCSA, checklists.

Your personality: Helpful like the Hitchhiker's Guide, a bit sarcastic but friendly, direct, no fluff. Answer questions about moving, auto transport, pricing, how to choose companies, using the tools on the site, etc.

If the user seems ready to move, gently guide them to the quote form or calculator. Provide practical advice. If you don't know something, say so.

Keep responses concise but complete. Use bullet points or short paragraphs for readability.

Current date context: 2026.`;

export async function POST(req: NextRequest) {
  try {
    if (!process.env.XAI_API_KEY) {
      return NextResponse.json(
        { error: 'Grok API key not configured. Please add XAI_API_KEY to environment variables.' },
        { status: 500 }
      );
    }

    const { messages } = await req.json();

    if (!messages || !Array.isArray(messages)) {
      return NextResponse.json({ error: 'Messages are required' }, { status: 400 });
    }

    const completion = await openai.chat.completions.create({
      model: 'grok-4.3', // or 'grok-beta' / latest available
      messages: [
        { role: 'system', content: SYSTEM_PROMPT },
        ...messages,
      ],
      temperature: 0.7,
      max_tokens: 800,
    });

    const reply = completion.choices[0]?.message?.content || "I'm sorry, I couldn't generate a response. Please try again.";

    return NextResponse.json({ reply });
  } catch (error: any) {
    console.error('Chat API error:', error);
    return NextResponse.json(
      { error: 'Failed to get response from Grok. Please try again later.' },
      { status: 500 }
    );
  }
}
