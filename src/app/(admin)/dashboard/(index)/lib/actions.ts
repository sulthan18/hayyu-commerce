"use server";

import { getUser, lucia } from "@/lib/auth";
import { ActionResult } from "@/types";
import { cookies } from "next/headers";

export async function Logout(): Promise<ActionResult> {
    console.log("logout");

    const { session } = await getUser();
    if (!session) {
        return { error: "Unauthorized" };
    }

    await lucia.invalidateSession(session.id);

    const sessionCookie = lucia.createBlankSessionCookie();

    cookies().set(sessionCookie.name, sessionCookie.value, sessionCookie.attributes);

    return { error: "" };
}
