import { PrismaAdapter } from "@lucia-auth/adapter-prisma";
import prisma from "./prisma";
import { Lucia } from "lucia";
import { cache } from "react";
import { cookies } from "next/headers";
import { RoleUser } from "@prisma/client";

const adapter = new PrismaAdapter(prisma.session, prisma.user)
export const lucia = new Lucia(adapter, {
    sessionCookie: {
        expires: false,
        attributes: {
            secure: process.env.NODE_ENV === "production"
        }
    },
    getUserAttributes: (attributes) => {
        return {
            id: attributes.id,
            name: attributes.name,
            email: attributes.email,
            role: attributes.role,
        }
    }
})

export const getUser = cache(async () => {
    const sessionId = cookies().get(lucia.sessionCookieName)?.value ?? null
    if (!sessionId) return null
    const { user, session } = await lucia.validateSession(sessionId)
    try {
        if (session && session.fresh) {
            const sessionCookie = lucia.createSessionCookie(session.id)
            cookies().set(sessionCookie.name, sessionCookie.value, sessionCookie.attributes)
        }
        if (!session) {
            const sessionCookie = lucia.createBlankSessionCookie()
            cookies().set(sessionCookie.name, sessionCookie.value, sessionCookie.attributes)
        }
    } catch {

    }
    return user
})

declare module "lucia" {
    interface Register {
        Lucia: typeof lucia
        UserId: number
        DatabaseUserAttributes: {
            id: number,
            name: string,
            email: string,
            role: RoleUser
        }
    }
}