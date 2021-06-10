import React, { useContext, useEffect, useState } from "react";
import { navigate } from "gatsby";

import Paypal from "gatsby-plugin-paypal";

import ComponentList from "../../utils/ComponentList";
import { roomContext } from "../../hooks/contexto";
import getPrice from "../../hooks/getPrice";

export default function Form2(props) {
  const { items, numeroHabitacion, precio } = props;
  const context = useContext(roomContext);
  console.log("form2: ", context);
  const [valores, setValores] = useState();

  const sendForm = () => {
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        valores,
      }),
    };
    fetch(
      `http://127.0.0.1:3000/form-submited/${context.numeroHabitacion}`,
      requestOptions
    ).then((req) => {
      req.status === 200
        ? navigate("/formulario-reserva-success", {
            state: { email: valores.email },
          })
        : navigate("/formulario-reserva/error");
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    sendForm();
  };

  const handleChange = (nuevoValor) => {
    setValores({
      ...valores,
      ...nuevoValor,
    });
  };

  useEffect(() => {
    const fEntrada = context.fechaEntrada;
    const fSalida = context.fechaSalida;
    const precio = context.precio;
    const numeroHabitacion = context.numeroHabitacion;
    const precioFinal = getPrice(precio, fEntrada, fSalida);
    setValores({
      ...valores,
      ["fechaEntrada"]: fEntrada,
      ["fechaSalida"]: fSalida,
      ["precioTotal"]: precioFinal,
      ["numeroHabitacion"]: numeroHabitacion,
    });
  }, []);

  return (
    <div className="card">
      <div className="card-header">
        <header className="card-header-title title">
          <p>Formulario de reserva</p>
        </header>
      </div>
      <div className="card-content">
        <form onSubmit={handleSubmit}>
          {items.map((item, index) => {
            const Component = ComponentList[item.__typename];
            return Component ? (
              // <Component key={index} onChange={handleChange} {...item} />
              <Component key={index} onChange={handleChange} {...item} />
            ) : null;
          })}

          <button
            type="submit"
            className="button green"
            onClick={() => {
              console.log(valores);
            }}
          >
            Continuar
          </button>
        </form>
      </div>
    </div>
  );
}
