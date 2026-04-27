import { adminRouter } from "~/server/api/routers/admin";
import { billingRouter } from "~/server/api/routers/billing";
import { customerRouter } from "~/server/api/routers/customer";
import { legacyRouter } from "~/server/api/routers/legacy";
import { postRouter } from "~/server/api/routers/post";
import { createCallerFactory, createTRPCRouter } from "~/server/api/trpc";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  post: postRouter,
  billing: billingRouter,
  customer: customerRouter,
  legacy: legacyRouter,
  admin: adminRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;

/**
 * Create a server-side caller for the tRPC API.
 * @example
 * const trpc = createCaller(createContext);
 * const res = await trpc.post.all();
 *       ^? Post[]
 */
export const createCaller = createCallerFactory(appRouter);
