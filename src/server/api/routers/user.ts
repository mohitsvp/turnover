import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";
import { z } from "zod";

export const userRouter = createTRPCRouter({
  modifyInterest: publicProcedure
    .input(z.object({
      userId: z.number(),
      categoryId: z.number(),
      add: z.boolean(), // true to add, false to remove
    }))
    .mutation(async ({ ctx, input }) => {
      const { userId, categoryId, add } = input;

        console.log(userId, categoryId, add)

      if (add) {
        // Add the interest
        const newUserInterest = await ctx.db.userCategories.create({
          data: {
            userId: userId,
            categoryId: categoryId,
          },
        });
        return newUserInterest;
      } else {
        const deletedInterest = await ctx.db.userCategories.deleteMany({
          where: {
            userId: userId,
            categoryId: categoryId,
          },
        });
        return deletedInterest;
      }
    }),

    getAllUserInterests : publicProcedure
    .input(z.object({
        userId : z.number()
    }))
    .query(async ({ctx, input}) => {
        const {userId} = input;
        return await ctx.db.userCategories.findMany({
            where : {userId}
        })
    })
});

export default userRouter;