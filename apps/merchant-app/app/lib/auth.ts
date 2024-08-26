import GoogleProvider from "next-auth/providers/google";
import db from "@repo/db/client";
import { NextAuthOptions } from "next-auth";

export const authOptions: NextAuthOptions = {
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID || "",
            clientSecret: process.env.GOOGLE_CLIENT_SECRET || ""
        })
    ],
    callbacks: { //@ts-ignore
        async signIn({ user, account, profile, state }) {
          console.log('SignIn Callback State:', state);
            console.log("hi signin");
            if (!profile || !user.email) {
                console.log("hi signin false");
                return false;
            }

            console.log("hi signin true");
            

            console.log("reached before db call");
            try {
              // @ts-ignore
              const { name, location } = state || {};
              console.log("name: ", name)
              // find the merhant by email
              const merchant = await db.merchant.findUnique({
                where: {
                  email: user.email
                }
              });
              console.log("reached after db call");
              console.log("Merchant:", merchant);

              // if merchant is not found, create a new merchant
              if (!merchant) {
                await db.merchant.create({
                  data: {
                    email: user.email,
                    name: user.name || profile.name, // Fallback to profile name if user.name is not available
                    auth_type: account?.provider === "google" ? "Google" : "Github",
                    businessName: name || "Default Business Name",
                    location: location || "Default Location"
                  }
                });
              }

              console.log("reached the true statement");
              console.log();
              return true;

            }
            catch (error:any) {
                console.error("Error during sign-in:", error.msg);
                return false;
            }
        },
        async redirect({ url, baseUrl }: { url: string, baseUrl: string }) {
            console.log("hi redirect");
            console.log("url:", url);
            return url.startsWith(baseUrl) ? url : baseUrl;  
        }
    },
    pages: {
        signIn: "/signin",
    },
    debug: true,
    logger: {
      error(code, metadata) { // @ts-ignore
        console.log(code, metadata)
      },
      warn(code) { // @ts-ignore
        console.log(code)
      },
      debug(code, metadata) { // @ts-ignore
        console.log(code, metadata)
      }
    },
    secret: process.env.NEXTAUTH_SECRET || "secret"
};
