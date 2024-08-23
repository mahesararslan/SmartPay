"use server";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth";
import prisma from "@repo/db/client";
import bcrypt from "bcrypt";

export default async function UpdateProfile(name?: string, currentPassword?: string, newPassword?: string) {
    const session = await getServerSession(authOptions);
    const userId = session?.user?.id;

    if (!userId) {
        return {
            message: "Not authenticated",
        };
    }

    try {
        console.log(name, currentPassword, newPassword);
        const updateData: { name?: string; password?: string } = {};

        if (name) {
            updateData.name = name;
        }

        if (currentPassword && newPassword) {
            const user = await prisma.user.findUnique({
                where: { id: Number(userId) },
            });

            if (!user) {
                return {
                    message: "User not found",
                };
            }

            const isPasswordValid = await bcrypt.compare(currentPassword, user.password);
            if (!isPasswordValid) {
                return {
                    message: "Old password is incorrect",
                };
            }

            const hashedPassword = await bcrypt.hash(newPassword, 10);
            updateData.password = hashedPassword;
        }

        if (Object.keys(updateData).length === 0) {
            return {
                message: "Nothing to update",
            };
        }

        // Log the update data for debugging
        console.log("Update Data:", updateData);

        await prisma.user.update({
            where: { id: Number(userId) },
            data: updateData,
        });

        return {
            message: "Profile updated successfully",
        };
    } catch (e) {
        // Log the error for debugging
        console.error("Error updating profile:", e);

        return {
            message: "Error updating profile", 
            // @ts-ignore
            ErrMsg: e.message,
        };
    }
}
