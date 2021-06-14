import React, { useEffect, useState } from "react";
import axios from 'axios'

import ComponentList from "../../utils/ComponentList";

export default function ContactForm(props) {
  const { items } = props;

  console.log("items: ", props);

  const [valores, setValores] = useState();

  const sendForm = () => {
    axios
      .post("http://18.116.163.149:3000/contact", {
        valores,
      })
      .then((res) => {
        res.status === 200
          ? alert("Mensaje enviado correctamente")
          : alert("Error al mandar el mensaje. Vuelva a intentarlo mas tarde");
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

  return (
    <div className="card">
      <header className="card-header">
        <p className="card-header-title title">Formulario de contacto</p>
      </header>
      <div className="card-content">
        <form onSubmit={handleSubmit}>
          {items.map((item, index) => {
            const Component = ComponentList[item.__typename];
            console.log("componente: ", item);
            return Component ? (
              <Component key={index} onChange={handleChange} {...item} />
            ) : null;
          })}

          <button type="submit" className="button green">
            Enviar mensaje
          </button>
        </form>
      </div>
    </div>
  );
}
