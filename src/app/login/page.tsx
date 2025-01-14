"use client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { api } from "@/lib/axios";
import { LoaderCircle } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { toast } from "sonner";

export default function Login() {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await api.post("/auth", {
        userName: email,
        password: password,
      });

      if (response.status === 200) {
        const token = response.data.data;

        localStorage.setItem("token", token);
        document.cookie = `authToken=${token}; path=/`;

        // Decodifica o token usando atob e JSON.parse
        const base64Url = token.split(".")[1]; // Pega a parte do payload
        const decodedPayload = atob(base64Url); // Decodifica a parte em Base64
        const parsedPayload = JSON.parse(decodedPayload); // Converte para objeto JSON

        const role = parsedPayload.role; // Extraí a role do token decodificado

        // Se o usuário for admin, redireciona para a página principal, caso contrário para viagens
        if (role === "admin") {
          router.replace("/"); // Redireciona para a página principal do admin
        } else if (role === "passagem") {
          router.replace("/viagem-programada"); // Redireciona para a página de viagens para usuários
        } else {
          toast.error("Role não reconhecida.");
        }

        toast.success("Login bem-sucedido!");
      }
     // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const errorMessage =
        error.response?.data?.message || "Credenciais Inválidas.";
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="h-screen bg-[#070180] flex items-center justify-center">
      <Card className="md:w-[500px] w-[80%] bg-slate-50 border-none rounded-md">
        <CardHeader>
          <CardTitle className="text-2xl font-bold">Login</CardTitle>
          <CardDescription className="font-medium">
            Entre com sua conta.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleLogin}>
            <div className="grid w-full items-center gap-4">
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="email" className="font-semibold">
                  Nome de Usuário
                </Label>
                <Input
                  id="email"
                  type="text"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Digite seu email..."
                />
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="password" className="font-semibold">
                  Senha
                </Label>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Digite sua senha..."
                />
              </div>
            </div>
            <Button
              type="submit"
              disabled={loading}
              className="bg-blue-900 text-foreground hover:bg-blue-900/80 text-white mt-4 w-full"
            >
              {loading ? <LoaderCircle className="animate-spin" /> : "Entrar"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </section>
  );
}
