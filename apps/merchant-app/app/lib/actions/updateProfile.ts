"use server";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth";
import prisma from "@repo/db/client";

export default async function UpdateProfile(name: string, businessName: string, location: string) {
    const session = await getServerSession(authOptions);
    const userEmail = session?.user?.email;

    if (!userEmail) {
        return {
            message: "Not authenticated",
        };
    }

    try {

        await prisma.merchant.update({
            where: {
                email: userEmail,
            },
            data: {
                name: name,
                businessName: businessName,
                location: location,
            }
        });

        return {
            message: "Profile updated successfully"
        }

    }
    catch (e) {
        // Log the error for debugging
        console.error("Error updating profile:", e);

        return {
            message: "Error updating profile", 
            // @ts-ignore
            ErrMsg: e.message,
        };
    }
}
