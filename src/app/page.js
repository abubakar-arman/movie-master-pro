import AuthCard from "@/components/Shared/AuthCard";
import { getServerSession } from "next-auth";
import Image from "next/image";
import { authOptions } from "./api/auth/[...nextauth]/route";
import AuthButtons from "@/components/Auth/AuthButtons";

export default async function Home() {
  const session = await getServerSession(authOptions)
  return (
    <div>
      hello
      <AuthButtons />
      <AuthCard />

      <div className="border">
        <p>Auth Info - Server : {JSON.stringify(session)}</p>
      </div>
    </div>
  );
}
