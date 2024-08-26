"use server";

import prisma from "@repo/db/client";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth";
import crypto from "crypto";

export async function createOnRampTransaction(provider: string, amount: number) {
    const session = await getServerSession(authOptions);
    if (!session?.user || !session.user?.id) {
        return {
            message: "Unauthenticated request"
        }
    }

    const token = crypto.randomUUID();

    try {
        await prisma.onRampTransaction.create({
            data: {
                provider,
                status: "Processing",
                startTime: new Date(),
                token: token,
                userId: Number(session?.user?.id),
                amount: amount * 100
            }
        });

        return {
            message: "Transaction created",
            token
        }
    }
    catch (e) {
        console.log(e);
        return {
            message: "Error"
        }
    }
}
