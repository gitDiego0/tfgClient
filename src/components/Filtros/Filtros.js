import React, { useEffect, useState } from "react";

export default function Filtros({ onChange, seleccionado, categorias }) {
  const [filtroActual, setFiltroActual] = useState(seleccionado);

  useEffect(() => {
    onChange(seleccionado);
  }, [filtroActual]);

  useEffect(() => {
    setFiltroActual(seleccionado);
  }, [filtroActual]);

  return categorias.map((categoria) => {
    <div className="mt-2">
      <span>{categoria.nombre}</span>
    </div>;
  });
}
