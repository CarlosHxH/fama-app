import { type NextRequest, NextResponse } from "next/server";

import { handlers } from "~/server/auth";

type RouteHandler = (
  req: NextRequest,
  context: { params: Promise<{ nextauth: string[] }> },
) => Promise<Response>;

function withAuthErrorHandling(handler: RouteHandler): RouteHandler {
  return async (req, context) => {
    try {
      return await handler(req, context);
    } catch (error) {
      console.error("[nextauth]", error);
      return NextResponse.json(
        {
          error: "Erro no serviço de autenticação. Tente novamente.",
          code: "AUTH_HANDLER_ERROR",
        },
        { status: 500 },
      );
    }
  };
}

export const GET = withAuthErrorHandling(handlers.GET);
export const POST = withAuthErrorHandling(handlers.POST);
