import { NextRequest, NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

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

    // Build input array matching the /responses API (system + history)
    const input = [
      {
        role: "system",
        content: SYSTEM_PROMPT
      },
      ...messages
    ];

    const response = await fetch('https://api.x.ai/v1/responses', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.XAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: "grok-4.3",
        input: input
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('xAI API error:', response.status, errorText);
      throw new Error(`API request failed: ${response.status}`);
    }

    const data = await response.json();

    // Extract the reply from the responses API format
    // The API typically returns output with the assistant message
    let reply = "I'm sorry, I couldn't generate a response right now. Please try again.";

    if (data.output && Array.isArray(data.output) && data.output.length > 0) {
      const assistantOutput = data.output.find((o: any) => o.role === 'assistant' || o.type === 'message');
      if (assistantOutput && assistantOutput.content) {
        if (typeof assistantOutput.content === 'string') {
          reply = assistantOutput.content;
        } else if (Array.isArray(assistantOutput.content)) {
          reply = assistantOutput.content.map((c: any) => c.text || c.content || '').join(' ');
        }
      }
    } else if (data.choices && data.choices[0]?.message?.content) {
      // Fallback for chat/completions style responses
      reply = data.choices[0].message.content;
    } else if (data.content) {
      reply = data.content;
    }

    return NextResponse.json({ reply });
  } catch (error: any) {
    console.error('Chat API error:', error);
    return NextResponse.json(
      { error: 'Failed to get response from Grok. Please try again later.' },
      { status: 500 }
    );
  }
}
