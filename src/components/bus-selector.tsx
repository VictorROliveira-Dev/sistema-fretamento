"use client";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle2, CircleDot } from "lucide-react";
import volateImg from "@/app/assets/volante.png";
import Image from "next/image";

interface BusSeatSelectorProps {
  totalSeats?: number;
  onSeatsSelected?: (seats: number[]) => void;
}

const BusSelector: React.FC<BusSeatSelectorProps> = ({
  totalSeats = 40,
  onSeatsSelected,
}) => {
  const [selectedSeats, setSelectedSeats] = useState<number[]>([]);
  const [occupiedSeats, setOccupiedSeats] = useState<number[]>([5, 12, 25, 38]);

  /**
   * Gera as poltronas organizadas em fileiras de 4, 
   * onde o menor número de cada fileira fica próximo à janela.
   */
  const generateSeats = (): number[][] => {
    const seatsPerRow = 4; // Total de assentos por fileira (2 + corredor + 2)
    const rows = Math.ceil(totalSeats / seatsPerRow);
    const seats: number[][] = [];

    let seatNumber = 1;
    for (let i = 0; i < rows; i++) {
      const row = [
        seatNumber,         // Janela (esquerda)
        seatNumber + 1,     // Corredor (esquerda)
        seatNumber + 3,     // Corredor (direita)
        seatNumber + 2      // Janela (direita)
      ];
      seats.push(row);
      seatNumber += seatsPerRow;
    }

    return seats;
  };

  /**
   * Alterna a seleção de uma poltrona
   */
  const toggleSeat = (seatNumber: number) => {
    if (occupiedSeats.includes(seatNumber)) return; // Bloqueia poltronas ocupadas

    setSelectedSeats((prevSeats) => {
      const newSelectedSeats = prevSeats.includes(seatNumber)
        ? prevSeats.filter((seat) => seat !== seatNumber)
        : [...prevSeats, seatNumber];

      onSeatsSelected?.(newSelectedSeats);
      return newSelectedSeats;
    });
  };

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col md:flex-row gap-4 items-start">
        <Card className="w-full">
          <CardHeader>
            <CardTitle className="text-center">
              Selecione a(as) Poltrona(as)
            </CardTitle>
          </CardHeader>
          <CardContent>
            {/* Representação do volante */}
            <div className="w-full bg-blue-600 h-14 rounded-t-full mb-2">
              <div className="flex justify-center items-center h-full">
                <Image src={volateImg} alt="Volante" width={40} />
              </div>
            </div>

            <div className="flex flex-col gap-2">
              {generateSeats().map((row, rowIndex) => (
                <div key={rowIndex} className="flex items-center justify-center gap-2">
                  {/* Poltronas da esquerda (janela e corredor) */}
                  <div className="grid grid-cols-2 gap-2">
                    {row.slice(0, 2).map((seatNumber) => (
                      <Button
                        key={seatNumber}
                        disabled={occupiedSeats.includes(seatNumber)}
                        variant={
                          selectedSeats.includes(seatNumber) ? "default" : "outline"
                        }
                        className={`
                          w-[60px] h-12 relative
                          ${
                            occupiedSeats.includes(seatNumber)
                              ? "bg-red-500 text-white cursor-not-allowed opacity-50"
                              : selectedSeats.includes(seatNumber)
                              ? "bg-green-500 hover:bg-green-600"
                              : "bg-white hover:bg-gray-100"
                          }
                          border-2 
                          ${
                            occupiedSeats.includes(seatNumber)
                              ? "border-red-700"
                              : selectedSeats.includes(seatNumber)
                              ? "border-green-700"
                              : "border-gray-300"
                          }
                        `}
                        onClick={() => toggleSeat(seatNumber)}
                      >
                        {seatNumber}
                        {occupiedSeats.includes(seatNumber) ? (
                          <CircleDot className="absolute top-1 right-1 text-white" size={16} />
                        ) : (
                          selectedSeats.includes(seatNumber) && (
                            <CheckCircle2 className="absolute top-1 right-1 text-white" size={16} />
                          )
                        )}
                      </Button>
                    ))}
                  </div>

                  {/* Corredor */}
                  <div className="w-4"></div>

                  {/* Poltronas da direita (corredor e janela) */}
                  <div className="grid grid-cols-2 gap-2">
                    {row.slice(2, 4).map((seatNumber) => (
                      <Button
                        key={seatNumber}
                        disabled={occupiedSeats.includes(seatNumber)}
                        variant={
                          selectedSeats.includes(seatNumber) ? "default" : "outline"
                        }
                        className={`
                          w-[60px] h-12 relative
                          ${
                            occupiedSeats.includes(seatNumber)
                              ? "bg-red-500 text-white cursor-not-allowed opacity-50"
                              : selectedSeats.includes(seatNumber)
                              ? "bg-green-500 hover:bg-green-600"
                              : "bg-white hover:bg-gray-100"
                          }
                          border-2 
                          ${
                            occupiedSeats.includes(seatNumber)
                              ? "border-red-700"
                              : selectedSeats.includes(seatNumber)
                              ? "border-green-700"
                              : "border-gray-300"
                          }
                        `}
                        onClick={() => toggleSeat(seatNumber)}
                      >
                        {seatNumber}
                        {occupiedSeats.includes(seatNumber) ? (
                          <CircleDot className="absolute top-1 right-1 text-white" size={16} />
                        ) : (
                          selectedSeats.includes(seatNumber) && (
                            <CheckCircle2 className="absolute top-1 right-1 text-white" size={16} />
                          )
                        )}
                      </Button>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-4 flex justify-between items-center">
              <div>
                <strong>Poltrona(as) Selecionada(as):</strong> {selectedSeats.join(", ") || "Nenhuma"}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="flex justify-center items-center gap-4 mt-2">
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-green-500 rounded-full"></div>
          <span>Disponível</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-red-500 rounded-full"></div>
          <span>Ocupado</span>
        </div>
      </div>
    </div>
  );
};

export default BusSelector;
