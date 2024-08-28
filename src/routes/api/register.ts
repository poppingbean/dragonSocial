import type { RequestHandler } from '@sveltejs/kit';
import { MongoClient } from 'mongodb';
const MONGODB_URI = 'mongodb+srv://vercel-admin-user:܆RGFuY2hpbXZpZXQyMDE0YUBB@cluster0.rclxf.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';
const client = new MongoClient(MONGODB_URI as string);

export const POST: RequestHandler = async ({ request }) => {
  try {
    const { telegramId } = await request.json();
    await client.connect();
    const db = client.db('telegramApp');
    const users = db.collection('users');

    // Register user if not already registered
    const user = await users.findOne({ telegramId });
    if (!user) {
      await users.insertOne({ telegramId, checkins: 0, referrals: [] });
    }

    return new Response(JSON.stringify({ success: true }), { status: 200 });
  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify({ error: 'Failed to register user' }), { status: 500 });
  }
};
