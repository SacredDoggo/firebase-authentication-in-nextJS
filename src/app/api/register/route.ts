import auth from '@/config/firebase.config';
import { createUserWithEmailAndPassword, getAuth, updateProfile } from 'firebase/auth';
import { NextRequest, NextResponse } from 'next/server';

type UserRequestBody = {
    userName: string;
    email: string;
    password: string;
}

export async function POST(req: NextRequest) {
    const body: UserRequestBody = await req.json();
    const { userName, email, password } = body;

    if (!userName || !email || !password) {
        return NextResponse.json({ message: "Please enter all the fields", success: false }, { status: 400 });
    }


    try {
        const currentUser = await createUserWithEmailAndPassword(auth, body.email, body.password);
        updateProfile(auth.currentUser!, {
            
        })
        return NextResponse.json({ message: {currentUser}, success: true }, { status: 200 });
    } catch (err) {
        return NextResponse.json({ message: {err}, success: false }, { status: 400 });
    }

    // res.status(200).json(currentUser);
}