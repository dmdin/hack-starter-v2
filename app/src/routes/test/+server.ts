import { json } from '@sveltejs/kit';
import { Composer, rpc } from '@chord-ts/rpc'; // Main components of Chord we will use
import { sveltekitMiddleware } from '@chord-ts/rpc/middlewares'; // Middleware to process RequestEvent object

// 1. Implement the class containing RPC methods
export class Say {
  @rpc() // Use decorator to register callable method
  hello(name: string): string {
    return `Hello, ${name}!`;
  }
}

// 2. Init Composer instance that will handle requests
const composer = Composer.init({ Say: new Say() });

// 3. Create a type that will be used on frontend
export type Client = typeof composer.clientType;

composer.use(sveltekitMiddleware()); // Use middleware to process SvelteKit RequestEvent

// 4. SvelteKit syntax to define POST endpoint
export async function POST(event) {
  // Execute request in place and return result of execution
  return json(await composer.exec(event));
}
