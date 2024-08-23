"use server";

import prisma from "@repo/db/client";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth";

export async function createOnRampTransaction(provider: string, amount: number) {
    // Ideally the token should come from the banking provider (HBL/NBP)
    const session = await getServerSession(authOptions);
    if (!session?.user || !session.user?.id) {
        return {
            message: "Unauthenticated request"
        }
    }
    const token = (Math.random() * 1000).toString();

    try {
        await prisma.$transaction(async (tx) => {

            await tx.onRampTransaction.create({
                data: {
                    provider,
                    status: "Processing",
                    startTime: new Date(),
                    token: token,
                    userId: Number(session?.user?.id),
                    amount: amount * 100
                }
            });
        
            const balance = await tx.balance.create({
                data: {
                    amount: amount * 100,
                    userId: Number(session?.user?.id),
                    locked: 0 
                }
            })
        });
        
    
        return {
            message: "Done"
        }
    }
    catch (e) {
        console.log(e);
        return {
            message: "Error"
        }
    }
}
