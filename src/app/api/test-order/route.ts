import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    console.log('Test order endpoint called with:', body);
    
    // Get authorization header
    const authorization = request.headers.get('authorization');
    
    // Forward the request to the actual backend
    const response = await fetch('https://nexus-backend-z66y.onrender.com/api/v1/orders/create/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': authorization || '',
      },
      body: JSON.stringify(body)
    });
    
    const data = await response.json();
    console.log('Backend response:', data);
    
    return NextResponse.json(data, { status: response.status });
  } catch (error) {
    console.error('Error forwarding to backend:', error);
    return NextResponse.json(
      { error: 'Failed to forward request to backend' }, 
      { status: 500 }
    );
  }
}
