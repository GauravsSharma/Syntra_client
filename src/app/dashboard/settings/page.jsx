"use client";

import { useMemo } from "react";

import WorkspaceSettings from "../../../components/settings/WorkspaceSettings";
import TeamMembers from "../../../components/settings/TeamMembers";
import DangerZone from "../../../components/settings/Dangerzone";
import MainSettings from "../../../components/settings/MainSettings";

import { useGetOrganization } from "../../../hooks/useOrganization";

const teamMembers = [];

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
      />

      <WorkspaceSettings
        workspaceData={workspaceData}
      />

      <TeamMembers
        teamMembers={teamMembers}
      />

      <DangerZone />
    </>
  );
}