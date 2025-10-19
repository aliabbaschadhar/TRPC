import { publicProcedure, router } from "./trpc";
import { z } from "zod";
import { createHTTPServer } from "@trpc/server/adapters/standalone";
import { randomUUIDv5 } from "bun"

const todoInputType = z.object({
  title: z.string(),
  description: z.string(),
  done: z.boolean().optional(),
})


// Like ==> const appRouter = Router(); // In express
const appRouter = router({
  createTodo: publicProcedure
    .input(todoInputType)
    .mutation(async (opts) => {
      const username = opts.ctx.username;
      const title = opts.input.title;
      const description = opts.input.description;
      console.log(title, description)
      // do DB stuff

      console.log(username)
      return {
        todoId: randomUUIDv5(title, "dns")
      }
    }),

  signUp: publicProcedure
    .input(z.object({
      email: z.email(),
      password: z.string()
    }))
    .mutation(async (opts) => {
      const email = opts.input.email;
      const password = opts.input.password;

      // Do DB stuff here
      // Assume we have signed the token using jwt.sign etc
      console.log(email, ":::", password)
      const token = "13143";
      return {
        token
      }
    })
});

const server = createHTTPServer({
  router: appRouter,
  createContext(opts) {
    let authHeader = opts.req.headers["authorization"];
    //@ts-ignore
    console.log(authHeader?.split(" ")[1])

    //jwt.verify() // check whether the header is correct and valid 
    return {
      username: "shaka-g"
    }
  }
})

server.listen(3000, () => {
  console.log("Server is listening at 3000")
});

// Export type router type signature,
// NOT the router itself, ONLY TYPE
export type AppRouter = typeof appRouter;