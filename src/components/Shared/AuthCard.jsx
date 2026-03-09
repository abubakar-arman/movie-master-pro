"use client"

import { useSession } from "next-auth/react";

const AuthCard = () => {
    const session = useSession();
    return (
        <div>
            <p>Auth Info - Client : {JSON.stringify(session)}</p>
        </div>
    );
};

export default AuthCard;