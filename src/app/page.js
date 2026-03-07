import LoginBtn from "@/components/Auth/LoginBtn";
import AuthCard from "@/components/Shared/AuthCard";
import { getServerSession } from "next-auth";
import Image from "next/image";
import { authOptions } from "./api/auth/[...nextauth]/route";

export default async function Home() {
  const session = await getServerSession(authOptions)
  return (
    <div>
      hello
      <LoginBtn />
      <AuthCard />

      <div className="border">
        <p>Auth Info - Server : {JSON.stringify(session)}</p>
      </div>
    </div>
  );
}
