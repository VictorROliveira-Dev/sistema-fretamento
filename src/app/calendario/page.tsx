"use client";

import React, { useState, useEffect } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import axios from "axios";
import { api } from "@/lib/axios";
import { Veiculo, Viagem } from "@/lib/types";

interface Event {
  id: string;
  title: string;
  start: string;
}

const CalendarApp = () => {
  const [events, setEvents] = useState<Event[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // 1. Recuperar as viagens da API
        const responseViagens = await api.get("/viagem"); // Ajuste a URL conforme a sua API
        console.log("Resposta da API de Viagens:", responseViagens.data.data);
        const viagens: Viagem[] = Array.isArray(responseViagens.data.data)
          ? responseViagens.data.data
          : responseViagens.data?.data.viagens || [];

        // Verificação se viagens é um array
        if (!Array.isArray(viagens)) {
          console.error(
            "O formato da resposta não é uma lista de viagens:",
            viagens
          );
          return;
        }

        // 2. Filtrar as viagens do mês atual
        const currentDate = new Date();
        const currentMonth = currentDate.getMonth(); // Mês atual (0-11)
        const currentYear = currentDate.getFullYear();

        const viagensDoMesAtual = viagens.filter((viagem) => {
          const dataPartida = new Date(viagem.dataHorarioSaida.data);
          return (
            dataPartida.getMonth() === currentMonth &&
            dataPartida.getFullYear() === currentYear
          );
        });

        // 3. Obter os IDs únicos dos veículos das viagens do mês atual
        const veiculoIds = [
          ...new Set(viagensDoMesAtual.map((viagem) => viagem.veiculoId)),
        ];

        // 4. Recuperar os dados dos veículos da API
        const responseVeiculos = await api.get("/veiculo", {
          params: { ids: veiculoIds.join(",") }, // Envia os IDs dos veículos na requisição
        });

        console.log("Resposta da API de Veículos:", responseVeiculos.data.data);
        const veiculos = Array.isArray(responseVeiculos.data.data)
          ? responseVeiculos.data.data
          : responseVeiculos.data?.data.veiculos || [];

        // Cria um dicionário de veículos para facilitar a busca por ID
        const veiculosMap = veiculos.reduce(
          (acc: Record<string, Veiculo>, veiculo: Veiculo) => {
            acc[veiculo.id] = veiculo;
            return acc;
          },
          {}
        );

        // 5. Mapear as viagens para criar eventos no calendário
        const eventos = viagensDoMesAtual.map((viagem) => {
          const veiculo = veiculosMap[viagem.veiculoId];
          const placa = veiculo ? veiculo.placa : "Desconhecido";
          return {
            id: viagem.id.toString(),
            title: `${placa}`,
            start: viagem.dataHorarioSaida.data,
          };
        });

        // 6. Atualizar os eventos no estado
        setEvents(eventos);
      } catch (error) {
        console.error("Erro ao buscar as viagens ou veículos:", error);
      }
    };

    fetchData();
  }, []);

  // Função para adicionar um evento manualmente no calendário
  const handleDateClick = (info: { dateStr: string }) => {
    const title = prompt("Digite o título do evento:");
    if (title) {
      const newEvent: Event = {
        id: Date.now().toString(),
        title,
        start: info.dateStr,
      };
      setEvents((prevEvents) => [...prevEvents, newEvent]);
    }
  };

  // Função para remover um evento clicado
  const handleEventClick = (info: { event: { id: string; title: string } }) => {
    if (window.confirm(`Deseja remover o evento: '${info.event.title}'?`)) {
      setEvents((prevEvents) =>
        prevEvents.filter((event) => event.id !== info.event.id)
      );
    }
  };

  return (
    <div className="App text-white bg-[#070180] pt-10">
      <h1 className="text-center font-bold mb-4 md:text-2xl text-xl">
        Calendário de Veículos
      </h1>
      <div className="calendar-container">
        <FullCalendar
          plugins={[dayGridPlugin, interactionPlugin]}
          initialView="dayGridMonth"
          events={events}
          dateClick={handleDateClick}
          eventClick={handleEventClick}
          locale="pt-br"
          height="auto"
          contentHeight="auto"
          buttonText={{
            today: "Mês Atual",
          }}
        />
      </div>
    </div>
  );
};

export default CalendarApp;
