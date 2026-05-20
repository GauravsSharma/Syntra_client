import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import scalekit from "../../../../lib/scalekit";

export async function GET(req) {
    try {
        const cookieStore = await cookies();

        const incomingState =
            req.nextUrl.searchParams.get("state");

        const cookieState =
            cookieStore.get("sk_state")?.value;

        if (incomingState !== cookieState) {
            return NextResponse.json(
                {
                    message: "Invalid state",
                },
                {
                    status: 401,
                }
            );
        }

        const code =
            req.nextUrl.searchParams.get("code");

        const error =
            req.nextUrl.searchParams.get("error");

        const errorDescription =
            req.nextUrl.searchParams.get(
                "error_description"
            );

        if (error) {
            return NextResponse.json(
                {
                    error,
                    errorDescription,
                },
                {
                    status: 401,
                }
            );
        }

        if (!code) {
            return NextResponse.json(
                {
                    error: "No code provided",
                },
                {
                    status: 400,
                }
            );
        }

        const redirectUri =
            process.env.NEXT_SCALEKIT_REDIRECT_URI;

        const authResult =
            await scalekit.authenticateWithCode(
                code,
                redirectUri
            );

        const { user, idToken } = authResult;

        const claims =
            await scalekit.validateToken(idToken);

        let organizationId =
            (claims).organization_id ||
            (claims).org_id ||
            (claims).oid ||
            null;

        const roles = (claims).roles || [];

        const isAdmin = roles.includes("admin");

        const userSession = {
            email: user.email,
            organization_id: organizationId,
            role: isAdmin ? "admin" : "member",
            name: user.name || user.givenName
        };

        const res = await fetch(
            `${process.env.NEXT_PUBLIC_API_URL}/api/auth/login`,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(userSession)
            }
        );

        if (!res.ok) {
    
            return NextResponse.json(
                {
                    message: "Authentication failed",
                },
                {
                    status: 500,
                }
            );
        }
        cookieStore.set(
            "user_session",
            JSON.stringify(userSession),
            {
                httpOnly: true,
                sameSite: "none",
                secure: true,
                maxAge: 7 * 24 * 60 * 60,
                path: "/",
            }
        );

        return NextResponse.redirect(
            process.env.NEXT_PUBLIC_CLIENT_URL
        );
    } catch (error) {
        console.log(error);

        return NextResponse.json(
            {
                message: "Authentication failed",
            },
            {
                status: 500,
            }
        );
    }
}