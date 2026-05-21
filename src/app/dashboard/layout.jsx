"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import Sidebar from "../../components/dashboard/Sidebar";
import DashboardClient from "../../components/dashboard/DashboardClient";
import InitialForm from "../../components/dashboard/InitialForm";
import DashboardContentWrapper from "../../components/dashboard/DashboardContentWrapper";
import api from "@/lib/axios";

export default function DashboardLayout({
  children,
}) {
  const router = useRouter();

  const [loading, setLoading] =
    useState(true);

  const [metadata, setMetadata] =
    useState(null);

  useEffect(() => {
    const getMetadata = async () => {
      try {
        const res = await api.get(
          "/api/auth/metadata"
        );

        setMetadata(res.data.metadata);
      } catch (error) {
        router.push("/");
      } finally {
        setLoading(false);
      }
    };

    getMetadata();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="bg-[#050509] min-h-screen flex">
      {metadata ? (
        <>
          <Sidebar />
          <DashboardClient />
          <DashboardContentWrapper>
            {children}
          </DashboardContentWrapper>
        </>
      ) : (
        <InitialForm />
      )}
    </div>
  );
}