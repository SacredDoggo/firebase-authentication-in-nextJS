import auth from '@/config/firebase.config';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { NextRequest, NextResponse } from 'next/server';

type UserRequestBody = {
    email: string;
    password: string;
}

export async function POST(req: NextRequest) {
    const body: UserRequestBody = await req.json();
    const { email, password } = body;

    if (!email || !password) {
        return NextResponse.json({ message: "Please enter all the fields", success: false }, { status: 400 });
    }

    try {
        const currentUser = await signInWithEmailAndPassword(auth, body.email, body.password);
        return NextResponse.json({ message: {currentUser}, success: true }, { status: 200 });
    } catch (err) {
        return NextResponse.json({ message: {err}, success: false }, { status: 400 });
    }
}