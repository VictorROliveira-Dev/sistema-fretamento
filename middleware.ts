import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// Função para decodificar o token JWT sem usar bibliotecas externas
function decodeJWT(token: string): { role: string } | null {
  try {
    const payload = token.split(".")[1]; // Parte do payload do JWT
    const decoded = JSON.parse(atob(payload)); // Decodifica de Base64 para JSON
    return decoded;
  } catch (error) {
    console.error("Erro ao decodificar o token JWT:", error);
    return null;
  }
}

export function middleware(req: NextRequest) {
  const tokenCookie = req.cookies.get("authToken"); // Captura o cookie
  const token = tokenCookie?.value; // Obtém o valor do cookie como string
  const decodedToken = token ? decodeJWT(token) : null;
  const role = decodedToken ? decodedToken.role : null;

  // Rotas permitidas para cada role
  const adminRoutes = [
    "/",
    "/motoristas",
    "/clientes",
    "/fornecedores",
    "/colaborador",
    "/ferias",
    "/veiculos",
    "/viagens-servicos",
    "/viagem-programada",
    "/manutencoes",
    "/servicos",
    "/documentos",
    "/financeiro",
    "/estoque",
  ];
  const userRoutes = ["/viagens-programadas", "/passagens", "/estoque"];

  // Permite acesso total ao admin
  if (role === "admin") return NextResponse.next();

  // Permite acesso às rotas específicas para o user
  if (role === "user" && userRoutes.includes(req.nextUrl.pathname)) {
    return NextResponse.next();
  }

  // Redireciona para a página de "não autorizado" se o acesso não for permitido
  return NextResponse.redirect(new URL("/unauthorized", req.url), 403);
}

export const config = {
  matcher: [
    "/", // Rota principal
    "/motoristas/:path*",
    "/clientes/:path*",
    "/fornecedores/:path*",
    "/colaborador/:path*",
    "/ferias/:path*",
    "/veiculos/:path*",
    "/viagens-servicos/:path*",
    "/viagem-programada/:path*",
    "/manutencoes/:path*",
    "/servicos/:path*",
    "/documentos/:path*",
    "/financeiro/:path*",
    "/passagens/:path*",
    "/estoque/:path*",
  ],
};
