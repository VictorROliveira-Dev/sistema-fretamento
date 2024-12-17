"use client";
import React, { useState } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction'; 

interface Event {
  id: string;
  title: string;
  start: string;
}

const CalendarApp = () => {
  const [events, setEvents] = useState<Event[]>([]);

  // Função para adicionar um evento no calendário
  const handleDateClick = (info: { dateStr: string }) => {
    const title = prompt('Digite o título do evento:');
    if (title) {
      const newEvent: Event = {
        id: Date.now().toString(),
        title,
        start: info.dateStr
      };
      setEvents((prevEvents) => [...prevEvents, newEvent]);
    }
  };

  // Função para remover um evento clicado
  const handleEventClick = (info: { event: { id: string; title: string } }) => {
    if (window.confirm(`Deseja remover o evento: '${info.event.title}'?`)) {
      setEvents((prevEvents) => prevEvents.filter(event => event.id !== info.event.id));
    }
  };

  return (
    <div className="App text-white bg-[#070180] pt-10">
      <h1 className="text-center text-2xl font-bold mb-4">Calendário de Veículos</h1>
      <div style={{ width: '600px', height: '600px', margin: '0 auto' }}>
        <FullCalendar
          plugins={[dayGridPlugin, interactionPlugin]}
          initialView="dayGridMonth"
          events={events}
          dateClick={handleDateClick}
          eventClick={handleEventClick}
          locale="pt-br"
          height="100%"
          buttonText={{
            today: 'Mês Atual',
          }}
        />
      </div>
    </div>
  );
};

export default CalendarApp;
