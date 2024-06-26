import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";
import { sendVerificationEmail } from "@/utils/mailer";
import { compare } from "bcryptjs";
import { generateToken } from "@/utils/auth";

export const authRouter = createTRPCRouter({
  register: publicProcedure
    .input(
      z.object({
        name: z.string().min(3, "Name is required"),
        email: z.string().email("Invalid email address"),
        password: z
          .string()
          .min(8, "Password must be at least 8 characters long."),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const { name, email, password } = input;
      try {
        // Hash the password before saving to the database
        const hashedPassword = await ctx.hashPassword(password);

        const otp = Math.floor(10000000 + Math.random() * 90000000).toString();

        const user = await ctx.db.user.create({
          data: {
            name,
            email,
            password: hashedPassword,
            otp,
          },
        });

        await sendVerificationEmail(email, otp);

        return { success: true, user };
      } catch (error  : unknown)  {
        if (typeof error === 'object' && error !== null && 'code' in error) {
          const errorCode = (error as { code?: string }).code;
          if (errorCode === "P2002") {
            throw new Error("A user with this email already exists.");
          }
        }
        throw new Error("An error occurred while creating the user.");
      }
    }),

  login: publicProcedure
    .input(
      z.object({
        email: z.string().email(),
        password: z.string(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const user = await ctx.db.user.findUnique({
        where: { email: input.email },
      });
      if (!user) {
        throw new Error("User not found");
      }
      const isPasswordValid = await compare(input.password, user.password);
      if (!isPasswordValid) {
        throw new Error("Invalid password");
      }

      const token = generateToken(user);

      return { success: true, message: "Login successful", token };
    }),
});
