import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";
import { PrismaClientKnownRequestError } from '@prisma/client';

export const registerRouter = createTRPCRouter({
    register : publicProcedure
    .input(z.object({
        name : z.string().min(3, 'Name is required'),
        email : z.string().email('Invalid email address'),
        password : z.string().min(8, 'Password must be at least 8 characters long.')
    }))
    .mutation(async ({ ctx, input }) => {
        const { name, email, password } = input;
        try {
          // Hash the password before saving to the database
          const hashedPassword = await ctx.hashPassword(password);
          
          const user = await ctx.db.user.create({
            data: {
              name,
              email,
              password : hashedPassword,
            },
          });
          
          return { success: true, user };
        } catch (error : any) {
            if (error instanceof PrismaClientKnownRequestError && error.code === 'P2002') {
                throw new Error('A user with this email already exists.');
              }
              throw new Error('An error occurred while creating the user.');
        }
      }),
})