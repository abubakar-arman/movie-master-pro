import AuthCard from "@/components/Shared/AuthCard";
import { getServerSession } from "next-auth";
import Image from "next/image";
import AuthButtons from "@/components/Auth/AuthButtons";
import { authOptions } from "@/lib/authOptions";
import Navbar from "@/components/Layout/Navbar";
import Footer from "@/components/Layout/Footer";

export default async function Home() {
  const session = await getServerSession(authOptions)
  return (
    <div>
      Home
    </div>
  );
}
