import { NextResponse } from 'next/server';
import { MongoClient } from 'mongodb';

interface UpdateRequestBody {
  email: string;
  name?: string;
  position?: string;
  company?: string;
  country?: string;
  industry?: string;
}
export async function POST(request: Request) {
  const data = (await request.json()) as UpdateRequestBody;
  const { email, ...additionalData } = data;

  if (!email) {
    return NextResponse.json({ error: 'Email is required' }, { status: 400 });
  }

  // At least one field is required
  if (Object.values(additionalData).every((value) => !value)) {
    return NextResponse.json(
      { error: 'At least one field is required' },
      { status: 400 }
    );
  }

  const client = new MongoClient(process.env.DATABASE_URI || '');
  try {
    await client.connect();
    const db = client.db(); // DB name from URI used by default. Provide other DB name if needed.
    const collection = db.collection('waiting-list');

    // Update existing document
    const result = await collection.updateOne(
      { email },
      { $set: additionalData }
    );

    if (result.matchedCount === 0) {
      return NextResponse.json({ error: 'Email not found' }, { status: 404 });
    }

    return NextResponse.json(
      { message: 'Information updated' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error in /api/update:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  } finally {
    await client.close();
  }
}
