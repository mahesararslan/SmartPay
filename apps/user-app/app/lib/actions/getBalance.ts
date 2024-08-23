"use server"
import prisma from "@repo/db/client";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth";

export default async function GetBalance() {
    const session = await getServerSession(authOptions);
    const userId = session?.user?.id; 
    if (!userId) {
        return {
            message: "Not authenticated"
        }
    }

    try {
        const balance = await prisma.balance.findFirst({
            where: {
                userId: Number(userId)
            }
        })
    
        const latestTransaction = await prisma.p2pTransfer.findFirst({
            where: {
                fromUserId: Number(userId)
            },
            orderBy: {
                timestamp: 'desc'
            }
        })
    
        console.log(balance, latestTransaction);
        return {
            balance: balance?.amount,
            lastTransaction: latestTransaction?.timestamp
        }
    }
    catch (e) {
        return {
            message: "Error fetching data", // @ts-ignore
            ErrMsg: e.message
        }
    }
}

