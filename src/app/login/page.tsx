/*"use client";
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
  const [userName, setUserName] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await api.post("/auth", {
        userName,
        password,
      });

      if (response.status === 200) {
        console.log("Login bem sucedido");
        const data = response.data.data;
        console.log("Token recebido:", data);
        localStorage.setItem("token", data);
        console.log("Token armazenado no localStorage");
        document.cookie = `token=${data}; path=/`;
        setLoading(false);
        console.log("Tentando redirecionar...");
        router.push("/");
        console.log("Comando de redirecionamento executado");
      
      } else {
        toast.error("Credenciais inválidas.", {
          className:
            "bg-red-500 text-white font-semibold border-none shadow-lg",
          style: { borderRadius: "10px", padding: "16px" },
        });
        setLoading(false);
      }
    } catch (error) {
      toast.error("Ocorreu um erro ao tentar fazer login.", {
        className: "bg-red-500 text-white font-semibold border-none shadow-lg",
        style: { borderRadius: "10px", padding: "16px" },
      });
      setLoading(false);
    }
  };

  return (
    <section className="h-screen bg-[#070180] flex items-center justify-center">
      <Card className="w-[500px] bg-slate-50 border-none rounded-md">
        <CardHeader>
          <CardTitle>Login</CardTitle>
          <CardDescription>Entre com sua conta.</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleLogin}>
            <div className="grid w-full items-center gap-4">
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="text"
                  value={userName}
                  onChange={(e) => setUserName(e.target.value)}
                  placeholder="Digite seu email..."
                />
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="password">Senha</Label>
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
              className="bg-black text-foreground hover:bg-slate-950/80 text-white mt-4 w-full"
            >
              {loading ? <LoaderCircle className="animate-spin" /> : "Entrar"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </section>
  );
}
*/