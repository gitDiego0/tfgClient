import React, { useEffect, useState, useContext } from "react";
import { roomContext } from "../hooks/contexto";

export default function useDates() {
  const context = useContext(roomContext);

  const [fechas, setFechas] = useState({
    fecha_entrada: new Date(),
    fecha_salida: new Date(28, 12, 2022),
  });
  useEffect(() => {
    setFechas({
      fecha_entrada: context.fechaEntrada,
      fecha_salida: context.fechaSalida,
    });
  }, []);

  useEffect(() => {
    // console.log("cambia la fecha", fechas);
  }, [fechas]);

  return fechas;
}
