"use client"
import { signIn, signOut, useSession } from "next-auth/react";
import { Appbar } from "./Appbar";

export function AppbarClient() {
  const session = useSession();

  return (
   <div>
      <Appbar onSignin={signIn} onSignout={async () => { // @ts-ignore
          await signOut({ callbackUrl: "/api/auth/signin", baseUrl: process.env.NEXTAUTH_URL });
        }} user={session.data?.user} />
   </div>
  );
}
