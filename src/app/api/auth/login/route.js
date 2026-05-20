import scalekit from "../../../../lib/scalekit";
import crypto from "crypto";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";


export async function GET(req) {
    try {
        const state = crypto.randomBytes(16).toString("hex");

        const cookieStore = await cookies();

        cookieStore.set("sk_state", state, {
            httpOnly: true,
            sameSite: "lax",
            secure: false,
            maxAge: 7 * 24 * 60 * 60,
            path: "/",
        });

        const redirectUrl = process.env.NEXT_SCALEKIT_REDIRECT_URI;

        const options = {
            scopes: ["email", "profile", "openid", "offline_access"],
            state,
        };

        const url = await scalekit.getAuthorizationUrl(
            redirectUrl,
            options
        );

        return NextResponse.redirect(url);
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