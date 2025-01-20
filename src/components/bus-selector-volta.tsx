"use client";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import volateImg from "@/app/assets/volante.png";
import Image from "next/image";
import { Passagem } from "@/lib/types";

interface BusSeatSelectorProps {
  totalSeats?: number;
  onSeatsSelected?: (seats: number[]) => void;
  ocupados: Passagem[];
  setPassagem: React.Dispatch<React.SetStateAction<Passagem>>;
  passagem: Passagem;
}

const BusSelectorVolta: React.FC<BusSeatSelectorProps> = ({
  totalSeats,
  onSeatsSelected,
  ocupados,
  setPassagem,
  passagem,
}) => {
  const [selectedSeat, setSelectedSeat] = useState<number | null>(null);

  const generateSeats = (): number[][] => {
    const seatsPerRow = 4;
    const rows = Math.ceil(totalSeats! / seatsPerRow);
    const seats: number[][] = [];

    let seatNumber = 1;
    for (let i = 0; i < rows; i++) {
      const row = [
        seatNumber, // Janela (esquerda)
        seatNumber + 1, // Corredor (esquerda)
        seatNumber + 3, // Corredor (direita)
        seatNumber + 2, // Janela (direita)
      ];
      seats.push(row);
      seatNumber += seatsPerRow;
    }

    return seats;
  };

  const isSeatReserved = (seatNumber: number) => {
    const seat = ocupados.find(
      (passagem) => passagem.poltronaVolta === seatNumber
    );
    return seat?.situacao === "RESERVADO";
  };

  const isSeatPaid = (seatNumber: number) => {
    const seat = ocupados.find(
      (passagem) => passagem.poltronaVolta === seatNumber
    );
    return seat?.situacao === "PAGO";
  };

  const toggleSeat = (seatNumber: number) => {
    if (isSeatReserved(seatNumber) || isSeatPaid(seatNumber)) return;

    const newSelectedSeat = selectedSeat === seatNumber ? null : seatNumber;
    setSelectedSeat(newSelectedSeat);
    onSeatsSelected?.(newSelectedSeat ? [newSelectedSeat] : []);
    setPassagem({ ...passagem, poltronaVolta: Number(newSelectedSeat) });
  };

  const getSeatStyle = (seatNumber: number) => {
    if (isSeatPaid(seatNumber))
      return "bg-red-500 border-red-700 cursor-not-allowed text-black opacity-50";
    if (isSeatReserved(seatNumber))
      return "bg-yellow-500 border-yellow-700 cursor-not-allowed text-black opacity-50";
    if (selectedSeat === seatNumber)
      return "bg-green-500 hover:bg-green-600 border-green-700 text-black";
    return "bg-white hover:bg-gray-100 border-gray-300 text-black";
  };

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col md:flex-row gap-4 items-start">
        <Card className="w-full">
          <CardHeader>
            <CardTitle className="text-center">Selecione a Poltrona</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="w-full bg-blue-600 h-14 rounded-t-full mb-2">
              <div className="flex justify-center items-center h-full">
                <Image src={volateImg} alt="Volante" width={40} />
              </div>
            </div>

            <div className="flex flex-col gap-2">
              {generateSeats().map((row, rowIndex) => (
                <div
                  key={rowIndex}
                  className="flex items-center justify-center gap-2"
                >
                  <div className="grid grid-cols-2 gap-2">
                    {row.slice(0, 2).map((seatNumber) => (
                      <Button
                        key={seatNumber}
                        disabled={
                          isSeatPaid(seatNumber) || isSeatReserved(seatNumber)
                        }
                        className={`w-[60px] h-12 relative ${getSeatStyle(
                          seatNumber
                        )}`}
                        onClick={() => toggleSeat(seatNumber)}
                      >
                        {seatNumber}
                      </Button>
                    ))}
                  </div>
                  <div className="w-4"></div>
                  <div className="grid grid-cols-2 gap-2">
                    {row.slice(2, 4).map((seatNumber) => (
                      <Button
                        key={seatNumber}
                        disabled={
                          isSeatPaid(seatNumber) || isSeatReserved(seatNumber)
                        }
                        className={`w-[60px] h-12 relative ${getSeatStyle(
                          seatNumber
                        )}`}
                        onClick={() => toggleSeat(seatNumber)}
                      >
                        {seatNumber}
                      </Button>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-4 flex justify-between items-center">
              <div>
                <strong>Poltrona Selecionada:</strong>{" "}
                {selectedSeat || "Nenhuma"}
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
          <div className="w-4 h-4 bg-yellow-500 rounded-full"></div>
          <span>Reservado</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-red-500 rounded-full"></div>
          <span>Pago</span>
        </div>
      </div>
    </div>
  );
};

export default BusSelectorVolta;
