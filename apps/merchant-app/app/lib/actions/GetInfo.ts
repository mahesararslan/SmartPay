"use server"

import { getServerSession } from "next-auth"
import { authOptions } from "../auth";
import prisma from "@repo/db/client";

export default async function GetInfo() {
    const session = await getServerSession(authOptions); 
    console.log(session); // @ts-ignore
    const userEmail = session?.user?.email; 
    if (!userEmail) {
        console.log("Not authenticated");
        return {
            message: "Not authenticated"
        }
    }
    console.log("reached in the GETINFO");
    try {
        const merchant = await prisma.merchant.findFirst({
            where: {
                email: userEmail
            }
        })

        console.log(merchant);
        console.log("reached in the GETINFO");

        return {
            name: merchant?.name,
            email: merchant?.email,
            businessName: merchant?.businessName,
            location: merchant?.location
        }
    }
    catch (e) {
        console.log("Error in fetching data")
        return {
            message: "Error fetching data", // @ts-ignore
            ErrMsg: e.message
        }
    }
}