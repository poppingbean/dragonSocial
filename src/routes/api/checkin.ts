import type { RequestHandler } from '@sveltejs/kit';
import { MongoClient } from 'mongodb';

const client = new MongoClient(process.env.MONGODB_URI as string);

export const POST: RequestHandler = async ({ request }) => {
  try {
    const { telegramId } = await request.json();
    await client.connect();
    const db = client.db('telegramApp');
    const users = db.collection('users');

    // Update user's check-in count
    await users.updateOne({ telegramId }, { $inc: { checkins: 1 } });

    return new Response(JSON.stringify({ success: true }), { status: 200 });
  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify({ error: 'Failed to check-in user' }), { status: 500 });
  }
};
