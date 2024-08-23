"use server"

import { getServerSession } from "next-auth";
import { authOptions } from "../auth";
import prisma from "@repo/db/client";

export default async function GetTransactions() {
    const session = await getServerSession(authOptions);
    const userId = session?.user?.id; 
    if (!userId) {
        return {
            message: "Not authenticated"
        }
    }

    try {
        const transactions = await prisma.p2pTransfer.findMany({
            where: {
              OR: [
                { fromUserId: Number(userId) }, // Sent transactions
                { toUserId: Number(userId) }, // Received transactions
              ],
            },
            include: {
              fromUser: true,
              toUser: true,
            },
            orderBy: {
              timestamp: 'desc',
            },
          });

          const mappedTransactions = transactions.map((transaction:any) => {
            const isSent = transaction.fromUserId === Number(userId);
            return {
              id: transaction.id,
              amount: transaction.amount,
              timestamp: transaction.timestamp,
              otherPersonName: isSent ? transaction.toUser.name : transaction.fromUser.name,
              otherPersonNumber: isSent ? transaction.toUser.number : transaction.fromUser.number,
              type: isSent ? "sent" : "received",
            };
          });
        

        return {
            transactions: mappedTransactions
        }
    }
    catch (e) {
        return {
            message: "Error fetching data", // @ts-ignore
            ErrMsg: e.message
        }
    }
}