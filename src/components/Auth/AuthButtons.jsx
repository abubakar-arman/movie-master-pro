"use client"
import { signIn, signOut, useSession } from "next-auth/react";
import Link from "next/link";

const AuthButtons = () => {
    const session = useSession()
    console.log('session', session);

    return (
        <div className="flex gap-4">
            {session.status === 'authenticated' ?
                <button className="btn btn-primary" onClick={signOut}>Logout</button>
                :
                <>
                    <button className="btn btn-primary" onClick={() => signIn()}>Login Now</button>
                    <Link href={"/signup"} className="btn btn-primary">Register</Link>
                </>
            }
        </div>
    );
};

export default AuthButtons;