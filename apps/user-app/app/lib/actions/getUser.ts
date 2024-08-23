"use server"
import { getServerSession } from "next-auth";
import { authOptions } from "../auth";
import prisma from "@repo/db/client";

export default async function GetUser() {
    const session = await getServerSession(authOptions);
    const userId = session?.user?.id; 
    if (!userId) {
        return {
            message: "Not authenticated"
        }
    }

    try {
        const user = await prisma.user.findFirst({
            where: {
                id: Number(userId)
            }
        })

        return {
            name: user?.name,
            email: user?.email,
            number: user?.number
        }
    }
    catch (e) {
        return {
            message: "Error fetching data", // @ts-ignore
            ErrMsg: e.message
        }
    }
}