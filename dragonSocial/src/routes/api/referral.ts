import type { RequestHandler } from '@sveltejs/kit';
import { MongoClient } from 'mongodb';

const client = new MongoClient(process.env.MONGODB_URI as string);

export const POST: RequestHandler = async ({ request }) => {
  try {
    const { referrerId, referredId } = await request.json();
    await client.connect();
    const db = client.db('telegramApp');
    const users = db.collection('users');

    // Add referred user to referrer's referrals list
    await users.updateOne({ telegramId: referrerId }, { $addToSet: { referrals: referredId } });

    return new Response(JSON.stringify({ success: true }), { status: 200 });
  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify({ error: 'Failed to add referral' }), { status: 500 });
  }
};
