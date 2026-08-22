"use client";

import { useState, useEffect } from "react";
import { useUpdateOrganizationSettings } from "../../hooks/useOrganization";
import { toast } from "sonner";
import { Globe, Plus, Trash2, ShieldCheck } from "lucide-react";

export default function AllowedOriginsSettings({ allowedOrigins = [] }) {
  const [origins, setOrigins] = useState(allowedOrigins);
  const [newOrigin, setNewOrigin] = useState("");
  const { mutate: updateSettings, isPending } = useUpdateOrganizationSettings();

  useEffect(() => {
    setOrigins(allowedOrigins || []);
  }, [allowedOrigins]);

  const handleAddOrigin = (e) => {
    e.preventDefault();
    const trimmed = newOrigin.trim();
    if (!trimmed) return;

    if (origins.includes(trimmed)) {
      toast.error("Origin already exists in the list.");
      return;
    }

    const updatedOrigins = [...origins, trimmed];
    setOrigins(updatedOrigins);
    setNewOrigin("");

    updateSettings(
      { allowedOrigins: updatedOrigins },
      {
        onSuccess: () => {
          toast.success("Allowed origin added successfully.");
        },
        onError: (error) => {
          setOrigins(origins);
          toast.error(
            error.response?.data?.message || "Failed to update allowed origins."
          );
        },
      }
    );
  };

  const handleDeleteOrigin = (originToDelete) => {
    const updatedOrigins = origins.filter((o) => o !== originToDelete);
    setOrigins(updatedOrigins);

    updateSettings(
      { allowedOrigins: updatedOrigins },
      {
        onSuccess: () => {
          toast.success("Allowed origin removed successfully.");
        },
        onError: (error) => {
          setOrigins(origins);
          toast.error(
            error.response?.data?.message || "Failed to update allowed origins."
          );
        },
      }
    );
  };

  return (
    <section className="flex flex-col gap-5">
      <div className="flex items-start gap-3">
        <div className="p-2.5 rounded-xl bg-white/[0.05] border border-white/[0.08] text-white/80 shrink-0 mt-0.5">
          <Globe size={20} />
        </div>
        <div>
          <h2 className="text-white text-base font-semibold flex items-center gap-2">
            Allowed Origins (Security)
          </h2>
          <p className="text-white/40 text-sm mt-0.5 max-w-xl">
            Restrict chatbot widget usage to specific domains/origins. If empty, all origins are allowed. Add specific origins (e.g. <code className="text-white/70 bg-white/10 px-1 py-0.5 rounded text-xs">https://example.com</code> or <code className="text-white/70 bg-white/10 px-1 py-0.5 rounded text-xs">http://localhost:3000</code>) to enforce origin security checks.
          </p>
        </div>
      </div>

      {/* Add New Origin Form */}
      <form onSubmit={handleAddOrigin} className="flex gap-3 max-w-xl">
        <input
          type="text"
          placeholder="https://example.com"
          value={newOrigin}
          onChange={(e) => setNewOrigin(e.target.value)}
          disabled={isPending}
          className="flex-1 bg-[#1a1a1a] border border-white/[0.08] rounded-lg px-3.5 py-2 text-white text-sm outline-none focus:border-white/20 transition-colors placeholder:text-white/20"
        />
        <button
          type="submit"
          disabled={isPending || !newOrigin.trim()}
          className="flex items-center justify-center gap-1.5 bg-[#1a1a1a] hover:bg-[#222] disabled:opacity-50 border border-white/[0.1] text-white text-sm px-4 py-2 rounded-lg transition-colors shrink-0 font-medium"
        >
          <Plus size={16} />
          Add Origin
        </button>
      </form>

      {/* Origins List */}
      <div className="flex flex-col gap-2 max-w-xl">
        {origins.length === 0 ? (
          <div className="p-4 border border-white/[0.06] rounded-xl bg-[#141414] text-white/30 text-sm flex items-center gap-2">
            <ShieldCheck size={16} className="text-emerald-500/70" />
            No origin restrictions set (Widget session requests allowed from any origin).
          </div>
        ) : (
          origins.map((origin) => (
            <div
              key={origin}
              className="flex items-center justify-between px-3.5 py-2.5 bg-[#161616] border border-white/[0.07] rounded-lg group"
            >
              <span className="text-white/90 text-sm font-mono">{origin}</span>
              <button
                type="button"
                onClick={() => handleDeleteOrigin(origin)}
                disabled={isPending}
                className="text-white/30 hover:text-red-400 p-1 rounded transition-colors disabled:opacity-50"
                title="Remove origin"
              >
                <Trash2 size={16} />
              </button>
            </div>
          ))
        )}
      </div>
    </section>
  );
}
