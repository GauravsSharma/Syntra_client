"use client";

import { useState, useEffect } from "react";
import { Switch } from "../ui/switch";
import { useUpdateOrganizationSettings } from "../../hooks/useOrganization";
import { toast } from "sonner";
import { Headphones } from "lucide-react";

export default function EscalationSettings({ allowEscalation = true }) {
  const [enabled, setEnabled] = useState(allowEscalation);
  const { mutate: updateSettings, isPending } = useUpdateOrganizationSettings();

  useEffect(() => {
    setEnabled(allowEscalation);
  }, [allowEscalation]);

  const handleToggle = (checked) => {
    setEnabled(checked);
    updateSettings(
      { allowEscalation: checked },
      {
        onSuccess: () => {
          toast.success(
            checked
              ? "Support ticket escalation enabled."
              : "Support ticket escalation disabled."
          );
        },
        onError: (error) => {
          setEnabled(!checked);
          toast.error(
            error.response?.data?.message || "Failed to update escalation settings."
          );
        },
      }
    );
  };

  return (
    <section className="flex flex-col gap-4">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-start gap-3">
          <div className="p-2.5 rounded-xl bg-white/[0.05] border border-white/[0.08] text-white/80 shrink-0 mt-0.5">
            <Headphones size={20} />
          </div>
          <div>
            <h2 className="text-white text-base font-semibold">
              Support Ticket Escalation
            </h2>
            <p className="text-white/40 text-sm mt-0.5 max-w-xl">
              When enabled, the AI chatbot suggests and creates support tickets when answers aren't found in your knowledge base. When disabled, the AI will state that information is unavailable without escalating.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3 shrink-0 self-start sm:self-center">
          <Switch
            checked={enabled}
            onCheckedChange={handleToggle}
            disabled={isPending}
          />
        </div>
      </div>
    </section>
  );
}
