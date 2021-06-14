import React, { useState, useEffect, useContext } from "react";
import { DateRange } from "react-date-range";
import { roomContext } from "../../hooks/contexto";
import useWindowSize from "../../hooks/useWindowSize";

const checkDates = (fecha) => {
  const hoy = new Date();
  const date = new Date(fecha);

  if (date > hoy) {
    return date;
  } else {
    return hoy;
  }
};

export default function Calendario({ fechaMaxima, fechaMinima, setFechas }) {
  const { width } = useWindowSize;
  const context = useContext(roomContext);
  const fechaMin = checkDates(fechaMinima);

  const [dateRange, setDateRange] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: "selection",
      color: "#0ebd1d",
    },
  ]);

  useEffect(() => {
    setFechas({
      fecha_entrada: context.fechaEntrada,
      fecha_salida: context.fechaSalida,
    });
  }, [dateRange]);

  const handleDateSelect = (date) => {
    setDateRange([date.selection]);

    context.fechaEntrada = date.selection.startDate;
    context.fechaSalida = date.selection.endDate;
  };

  return (
    <div
      className={` columns is-centered ${
        width >= 1024 ? "is-desktop" : "is-mobile"
      }`}
      style={{ marginTop: 2 + "vh" }}
    >
      <DateRange
        minDate={new Date(fechaMin)}
        maxDate={new Date(fechaMaxima)}
        editableDateInputs={true}
        onChange={handleDateSelect}
        moveRangeOnFirstSelection={false}
        ranges={dateRange}
      />
    </div>
  );
}
