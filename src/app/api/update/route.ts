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
    return NextResponse.json(
      { error: 'apiErrors.emailRequired' },
      { status: 400 }
    );
  }

  // Filter out empty strings from additionalData
  const filteredData = Object.fromEntries(
    Object.entries(additionalData).filter(([, value]) => value !== '')
  );

  // At least one field is required
  if (Object.values(additionalData).every((value) => !value)) {
    return NextResponse.json({ error: 'fillOneFieldError' }, { status: 400 });
  }

  const client = new MongoClient(process.env.DATABASE_URI || '');
  try {
    await client.connect();
    const db = client.db(); // DB name from URI used by default. Provide other DB name if needed.
    const collection = db.collection('waiting-list');

    // Update existing document
    const result = await collection.updateOne(
      { email },
      { $set: { ...filteredData, updatedAt: new Date() } }
    );

    if (result.matchedCount === 0) {
      return NextResponse.json(
        { error: 'apiErrors.emailNotFound' },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { message: 'thankYouAgainMessage' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error in /api/update:', error);
    return NextResponse.json(
      { error: 'apiErrors.internalServerError' },
      { status: 500 }
    );
  } finally {
    await client.close();
  }
}
