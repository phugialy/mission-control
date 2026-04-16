import { NextRequest } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { message } = body;

    if (!message) {
      return Response.json(
        { error: 'Message is required' },
        { status: 400 }
      );
    }

    // Log the message for now - in the future we'll connect this to Kai
    console.log(`[Command API] Message received from UI: ${message}`);
    
    // Simulate processing delay
    await new Promise(resolve => setTimeout(resolve, 100));
    
    return Response.json({
      success: true,
      message: 'Command received and logged',
      timestamp: new Date().toISOString(),
      receivedMessage: message
    });
  } catch (error) {
    console.error('[Command API] Error processing command:', error);
    return Response.json(
      { error: 'Failed to process command', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}