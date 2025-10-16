import { createTRPCProxyClient, httpBatchLink } from "@trpc/client";
import type { AppRouter } from "../server";

// Pass AppRouter as generic here. This lets the `trpc` object know
// what procedures are available on the server and their input/output types.

const trpc = createTRPCProxyClient<AppRouter>({
  links: [
    httpBatchLink({
      url: 'http://localhost:3000',
    }),
  ],
});

async function main() {
  const response = await trpc.createTodo.mutate({
    title: "Go to gym",
    description: "Hit the gym",
  })
  console.log(response)

  const signUpResponse = await trpc.signUp.mutate({
    email: "work@gmail.com",
    password: "shaka-g-123"
  })
  console.log(signUpResponse)
}

try {
  await main();
  console.log("Main function executed!");
} catch (error) {
  throw new Error("new error occurred while running the main function" + error);
}