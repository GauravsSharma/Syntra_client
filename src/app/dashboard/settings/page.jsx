"use client";
import { useMemo } from "react";
import MainSettings from "../../../components/settings/MainSettings";
import { useGetOrganization } from "../../../hooks/useOrganization";

export default function SettingsPage() {
  const { data, isLoading, isError } = useGetOrganization();
  const organization = data?.organization;
  const workspaceData = useMemo(
    () => ({
      name:
        organization?.business_name || "",

      website:
        organization?.website_url || "",

      language: "English",

      timezone: "UTC (GMT+0)",
    }),
    [organization]
  );

  if (isLoading) {
    return (
      <div className="text-white p-6">
        Loading...
      </div>
    );
  }

  if (isError) {
    return (
      <div className="text-red-500 p-6">
        Failed to load organization
      </div>
    );
  }

  return (
    <>
      <MainSettings
        workspaceData={workspaceData}
        allowEscalation={organization?.allowEscalation ?? true}
        allowedOrigins={organization?.allowedOrigins ?? []}
      />
    </>
  );
}