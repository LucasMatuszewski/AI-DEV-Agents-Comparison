import { NextResponse } from 'next/server';
import { MongoClient } from 'mongodb';

interface SubscribeRequestBody {
  email?: string;
}

export async function POST(request: Request) {
  const { email } = (await request.json()) as SubscribeRequestBody;

  if (!email) {
    return NextResponse.json(
      { error: 'apiErrors.emailRequired' },
      { status: 400 }
    );
  }

  const client = new MongoClient(process.env.DATABASE_URI || '');
  try {
    await client.connect();
    const db = client.db(); // Use DB from URI by default, or provide with other DB name here
    const collection = db.collection('waiting-list');

    // Check if email already exists
    const existing = await collection.findOne({ email });
    if (existing) {
      return NextResponse.json(
        { message: 'apiErrors.emailAlreadyRegistered' },
        { status: 200 }
      );
    }

    await collection.insertOne({ email, createdAt: new Date() });

    return NextResponse.json({ message: 'thankYouMessage' }, { status: 201 });
  } catch (error) {
    console.error('Error in /api/subscribe:', error);
    return NextResponse.json(
      { error: 'apiErrors.internalServerError' },
      { status: 500 }
    );
  } finally {
    await client.close();
  }
}
