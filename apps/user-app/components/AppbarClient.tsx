"use client"
import { signIn, signOut, useSession } from "next-auth/react";
import { Appbar } from "./Appbar";

export function AppbarClient() {
  const session = useSession();

  return (
   <div>
      <Appbar onSignin={signIn} onSignout={async () => {
          await signOut({ callbackUrl: "/signin" });
        }} user={session.data?.user} />
   </div>
  );
}
