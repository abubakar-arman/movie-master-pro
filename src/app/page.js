import AuthCard from "@/components/Shared/AuthCard";
import { getServerSession } from "next-auth";
import Image from "next/image";
import AuthButtons from "@/components/Auth/AuthButtons";
import { authOptions } from "@/lib/authOptions";

export default async function Home() {
  const session = await getServerSession(authOptions)
  return (
    <div className="p-20 space-y-3">
      <AuthButtons />
      <AuthCard />

      <div>
        <p>Auth Info - Server : {JSON.stringify(session)}</p>
      </div>
    </div>
  );
}
