"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import Sidebar from "../../components/dashboard/Sidebar";
import DashboardClient from "../../components/dashboard/DashboardClient";
import InitialForm from "../../components/dashboard/InitialForm";
import DashboardContentWrapper from "../../components/dashboard/DashboardContentWrapper";
import api from "../../lib/axios";
import { useGetMetaData } from "../../hooks/useUser";
import { useUserStore } from "../../stores/useUserStore";

export default function DashboardLayout({
  children,
}) {

  const {isLoading:loading} = useGetMetaData()
  const {metadata} = useUserStore()
  console.log(metadata);
  
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