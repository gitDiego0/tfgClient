import React, { useEffect, useState } from "react";
import ComponentList from "../../utils/ComponentList";

export default function ContactForm(props) {
  const { items } = props;

  console.log("items: ", props);

  const [valores, setValores] = useState();

  const sendForm = () => {
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        valores,
      }),
    };
    fetch(`http://127.0.0.1:3000/contact`, requestOptions).then((req) => {
      if (req.status === 200) {
        alert("hola");
      } else {
        alert("adios");
      }
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
