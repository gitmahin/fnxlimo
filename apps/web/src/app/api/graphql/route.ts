// Next.js Custom Route Handler: https://nextjs.org/docs/app/building-your-application/routing/router-handlers
import { createYoga } from "graphql-yoga";
import { schema } from "../../../../graphql/schema";
import { useDisableIntrospection } from "@graphql-yoga/plugin-disable-introspection";
import { maxDepthPlugin } from "@escape.tech/graphql-armor-max-depth";
import { costLimitPlugin } from "@escape.tech/graphql-armor-cost-limit";
import { maxAliasesPlugin } from "@escape.tech/graphql-armor-max-aliases";
import { maxDirectivesPlugin } from "@escape.tech/graphql-armor-max-directives";
import { characterLimitPlugin } from "@escape.tech/graphql-armor-character-limit";
import { maxTokensPlugin } from "@escape.tech/graphql-armor-max-tokens";

interface NextContext {
  params: Promise<Record<string, string>>;
}

// Create the yoga instance without explicit typing for handleRequest
const yoga = createYoga<NextContext>({
  schema,
  plugins: [
    // eslint-disable-next-line react-hooks/rules-of-hooks
    useDisableIntrospection({
      isDisabled: () => process.env.NODE_ENV === "production",
    }),
    maxDepthPlugin({
      n: 5,
    }),
    costLimitPlugin({
      maxCost: 200, // Default: 5000
      objectCost: 2, // Default: 2
      scalarCost: 1, // Default: 1
      depthCostFactor: 1.5, // Default: 1.5
      ignoreIntrospection: true, // Default: true
    }),
    maxAliasesPlugin({
      n: 2, // Number of aliases allowed | Default: 15
    }),
    maxDirectivesPlugin({
      n: 2, // Number of directives allowed | Default: 50
    }),
    characterLimitPlugin({
      maxLength: 15000, // Number of characters allowed | Default: 15000
    }),
    maxTokensPlugin({
      n: 1000,
    }),
  ],

  context: async ({ request }) => {
    // get custom header value
    const userAgent = request.headers.get("User-Agent") ?? null;
    if (!userAgent) {
      throw new Error("User-Agent is not available");
    }
    return { userAgent };
  },

  // While using Next.js file convention for routing, we need to configure Yoga to use the correct endpoint
  graphqlEndpoint: "/api/graphql",
  graphiql: process.env.NODE_ENV === "development",

  // Yoga needs to know how to create a valid Next response
  fetchAPI: {
    Request,
    Response,
  },
});

// Create adapter functions with the correct return type for Next.js route handlers
async function handler(request: Request, ctx: NextContext): Promise<Response> {
  return yoga.handleRequest(request, ctx) as Promise<Response>;
}

export const GET = handler;
export const POST = handler;
export const OPTIONS = handler;
