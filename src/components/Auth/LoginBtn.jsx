"use client"
import { signIn } from "next-auth/react"

const LoginBtn = () => {
    return (
        <div>
            <button className="btn" onClick={() => signIn()}>Login Now</button>
        </div>
    );
};

export default LoginBtn;