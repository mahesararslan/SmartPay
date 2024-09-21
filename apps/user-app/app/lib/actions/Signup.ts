"use server"

import prisma from "@repo/db/client";
import bcrypt from "bcrypt";

export default async function Signup(
    name: string,
    email: string,
    phone: string,
    password: string
) {
    const userExist = await prisma.user.findFirst({
        where: {
            number: phone,
        },
    });
    
    if (userExist) {
        return {
            message: "User already exists",
            success: false,
        };
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    try {
        await prisma.$transaction(async (tx) => {
            const user = await tx.user.create({
                data: {
                    name,
                    email,
                    number: phone,
                    password: hashedPassword,
                },
            });
    
            await tx.balance.create({
                data: {
                    amount: 0,
                    userId: user.id,
                    locked: 0,
                },
            });
        });

        return {
            message: "Signup complete, you are now logged in",
            success: true,
        };
    } catch (e) {
        console.error(e);
        return {
            message: "Something went wrong",
            success: false,
        };
    }
}
