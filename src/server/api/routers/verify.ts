import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";
import { generateToken } from "@/utils/auth";

export const verifyRouter = createTRPCRouter({
  verifyOtp: publicProcedure
    .input(z.object({
      email: z.string().email(),
      otp: z.string().min(8, "OTP must be 8 characters long")
    }))
    .mutation(async ({ ctx, input }) => {
      const { email, otp } = input;

      const user = await ctx.db.user.findUnique({
        where: { email }
      });

      if (!user) {
        throw new Error("User not found.");
      }

      if (user.otp !== otp) {
        throw new Error("Invalid OTP.");
      }

      const token = generateToken(user.id);

      // Optionally, mark the user's email as verified in the database here
      // For example: await ctx.db.user.update({ where: { email }, data: { isVerified: true } });

      return { success: true, message: "OTP verified successfully.", token };
    }),
});