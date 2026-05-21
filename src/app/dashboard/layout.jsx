import { cookies, headers } from "next/headers";
import { redirect } from "next/navigation";
import { Inter } from "next/font/google";
import Sidebar from '../../components/dashboard/Sidebar';
import DashboardClient from '../../components/dashboard/DashboardClient';
import InitialForm from "../../components/dashboard/InitialForm";
import DashboardContentWrapper from "../../components/dashboard/DashboardContentWrapper";

const inter = Inter({ subsets: ["latin"] });

export const metadata = { title: "Dashboard | Syntra AI" };

export default async function DashboardLayout({ children }) {
  const cookieStore = await cookies();
  const token = cookieStore.get("user_session_pub").value;

  if (!token) {
    redirect("/");
  }

  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/auth/metadata`, {
    headers: {
      Cookie: `user_session=${token}`,
    },
    cache: "no-store",
  });

  let metadata = { metadata: null };

  if (res.ok) {
    metadata = await res.json();
  }

  return (
    <div className={`${inter.className} bg-[#050509] min-h-screen font-sans text-zinc-100 flex selection:bg-zinc-800 antialiased w-full`}>
      {metadata.metadata ? (
        <>
          <Sidebar />
          <DashboardClient />
          <DashboardContentWrapper>{children}</DashboardContentWrapper>
        </>
      ) : (
        <InitialForm />
      )}
    </div>
  );
}