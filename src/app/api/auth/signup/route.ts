import connectDB from '@/app/utils/db';
import User from '@/app/models/User';
import { NextResponse } from 'next/server';

export async function POST(req: Request): Promise<Response> {
  const { firstname, lastname, username, phone, email, password } = await req.json();

  try {
    await connectDB();

    const existingUser = await User.findOne({ $or: [{ email }, { username }] });
    if (existingUser) {
      return NextResponse.json({ message: 'User already exists' }, { status: 400 });
    }

    const newUser = new User({ firstname, lastname, phone, username, email, password });
    await newUser.save();

    return NextResponse.json({ message: 'User registered successfully' }, { status: 201 });
  } catch (error: unknown) {
    if (error instanceof Error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
    return NextResponse.json({ error: 'An unknown error occurred' }, { status: 500 });
  }
}
