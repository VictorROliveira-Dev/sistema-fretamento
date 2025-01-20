import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// Função para decodificar JWT sem bibliotecas externas
function decodeJWT(token: string): { role: string } | null {
  try {
    const payload = token.split(".")[1]; // Obtém a parte do payload do JWT
    const decoded = JSON.parse(atob(payload)); // Decodifica de Base64 para JSON
    return decoded;
  } catch (error) {
    console.error("Erro ao decodificar o token JWT:", error);
    return null;
  }
}

export function middleware(req: NextRequest) {
  const tokenCookie = req.cookies.get("authToken"); // Obtém o cookie de autenticação
  const token = tokenCookie?.value; // Obtém o valor do cookie como string
  const decodedToken = token ? decodeJWT(token) : null;
  const role = decodedToken ? decodedToken.role : null;
  const path = req.nextUrl.pathname;

  // Definição de permissões
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
  const userRoutes = ["/viagens-programadas", "/passagens", "/estoque", "/unauthorized"];

  // Se não houver um token válido, bloqueia o acesso imediatamente
  if (!role) {
    return NextResponse.redirect(new URL("/unauthorized", req.url));
  }

  // Se for admin, permite acesso total
  if (role === "admin") return NextResponse.next();

  // Se for user, permite apenas as rotas definidas
  if (role === "passagem" && userRoutes.some(route => path.startsWith(route))) {
    return NextResponse.next();
  }

  // Se não estiver autorizado, redireciona para /unauthorized
  return NextResponse.redirect(new URL("/unauthorized", req.url));
}

// Aplica o middleware a todas as rotas (exceto arquivos estáticos do Next.js)
export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico).*)", // Garante que todas as rotas sejam protegidas
  ],
};
