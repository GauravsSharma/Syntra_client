"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

export default function InvitePage() {
  const { token } = useParams();

  const [loading, setLoading] = useState(true);
  const [invitation, setInvitation] =
    useState(null);

  const [isLoggedIn, setIsLoggedIn] =
    useState(false);

  useEffect(() => {
    const verifyInvitation = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/api/organization/invitations/${token}/verify`,
          {
            credentials: "include",
          }
        );

        const data = await response.json();

        if (!data.success) {
          setLoading(false);
          return;
        }

        setInvitation(data.invitation);

        const sessionResponse = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/api/auth`,
          {
            credentials: "include",
          }
        );

        setIsLoggedIn(
          sessionResponse.ok
        );
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    verifyInvitation();
  }, [token]);

  const acceptInvitation = async () => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/organization/invitations/${token}/accept`,
        {
          method: "POST",
          credentials: "include",
          headers: {
            "Content-Type":
              "application/json",
          },
          body: JSON.stringify({
            token,
          }),
        }
      );

      const data =
        await response.json();

      if (data.success) {
        window.location.href =
          "/dashboard";
      }
    } catch (error) {
      console.error(error);
    }
  };

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        Loading...
      </div>
    );
  }

  if (!invitation) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        Invalid Invitation
      </div>
    );
  }

  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="w-full max-w-md rounded-xl border p-6">
        <h1 className="text-2xl font-bold">
          Join Organization
        </h1>

        <p className="mt-4">
          Email: {invitation.email}
        </p>

        <p>
          Role: {invitation.role}
        </p>

        {isLoggedIn ? (
          <button
            onClick={acceptInvitation}
            className="mt-6 w-full rounded-lg bg-black px-4 py-3 text-white"
          >
            Accept Invitation
          </button>
        ) : (
          <button
            onClick={() => {
              window.location.href =
                `${process.env.NEXT_PUBLIC_API_URL}/api/auth/login?invite=${token}`;
            }}
            className="mt-6 w-full rounded-lg bg-black px-4 py-3 text-white"
          >
            Login & Accept Invitation
          </button>
        )}
      </div>
    </div>
  );
}