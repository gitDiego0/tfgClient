import React, { useContext, useEffect, useState } from "react";
import { navigate } from "gatsby";
import axios from "axios";

import ComponentList from "../../utils/ComponentList";
import { roomContext } from "../../hooks/contexto";
import getPrice from "../../hooks/getPrice";

import GooglePay from "../GooglePayButton/GooglePay";

export default function Form2(props) {
  const { items } = props;
  const context = useContext(roomContext);
  const [valores, setValores] = useState();
  const [disable, setDisable] = useState("none");

  const onError = () => {
    return alert("cancelado");
  };

  const onAprove = () => {
    console.log("aprobado");
  };

  const onCancel = () => {
    console.log("cancelado");
  };
  const sendForm = () => {
    axios
      .post(`http://18.116.163.149:3000/form-submited/${numeroHabitacion} `, {
        valores,
      })
      .then((res) => {
        res.status === 200
          ? navigate("/formulario-reserva-success", {
              state: { email: valores.email },
              replace: true,
            })
          : navigate("/formulario-reserva/error", {
              state: { error: "Error al realizar la reserva" },
              replace: true,
            });
      })
      .catch((err) => {
        if (err) {
          navigate("/formulario-reserva/error", {
            state: { error: `${err.message}` },
            replace: true,
          });
        }
      });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // sendForm();
    setDisable("unset");
    console.log(disable);
  };

  const handleChange = (nuevoValor) => {
    setValores({
      ...valores,
      ...nuevoValor,
    });
  };

  const fEntrada = context.fechaEntrada;
  const fSalida = context.fechaSalida;
  const precio = context.precio;
  const numeroHabitacion = context.numeroHabitacion;
  const precioFinal = getPrice(precio, fEntrada, fSalida);
  useEffect(() => {
    console.log("precioFinal", precioFinal);
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

          <GooglePay
            precio={precioFinal}
            onError={onError}
            onCancel={onCancel}
            onLoadPaymentData={sendForm}
            disable={disable}
          />
        </form>
      </div>
    </div>
  );
}
