import { initTRPC } from "@trpc/server";

// Initialize the TRPC backend and it should done only once in a backend
// const t = initTRPC.create(); ==> create the context

const t = initTRPC.context<
  {
    username?: string
  }
>().create();

// Like ==> export const app = express();

export const router = t.router;
export const publicProcedure = t.procedure;