"use client";
import React, { useEffect, useState } from "react";
import {
  Bar,
  BarChart,
  ResponsiveContainer,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
} from "recharts";
import { api } from "@/lib/axios";

export function Overview() {
  const [data, setData] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await api.get("/liquido"); 
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const formattedData = response.data.data.map((item: any) => ({
          name: item.month,
          revenue: item.receitas,
          expenses: item.despesas,
          total: item.valorLiquido,
        }));
        setData(formattedData);
      } catch (error) {
        console.error("Erro ao buscar dados da API:", error);
      }
    }

    fetchData();
  }, []);

  return (
    <ResponsiveContainer width="100%" height={350}>
      <BarChart data={data}>
        <XAxis
          dataKey="name"
          stroke="#888888"
          fontSize={12}
          tickLine={false}
          axisLine={false}
        />
        <YAxis
          stroke="#888888"
          fontSize={12}
          tickLine={false}
          axisLine={false}
          tickFormatter={(value) => `$${value}`}
        />
        <Tooltip
          formatter={(value: number, name: string) => {
            const formattedName = {
              revenue: "Receitas",
              expenses: "Despesas",
              total: "Lucro",
            }[name];
            return [`$${value}`, formattedName];
          }}
          cursor={{ fill: "transparent" }}
        />
        <Legend />
        <Bar
          dataKey="revenue"
          fill="hsl(var(--chart-1))"
          radius={[4, 4, 0, 0]}
          name="Receitas"
        />
        <Bar
          dataKey="expenses"
          fill="hsl(var(--chart-2))"
          radius={[4, 4, 0, 0]}
          name="Despesas"
        />
        <Bar
          dataKey="total"
          fill="hsl(var(--chart-3))"
          radius={[4, 4, 0, 0]}
          name="Lucro"
        />
      </BarChart>
    </ResponsiveContainer>
  );
}
