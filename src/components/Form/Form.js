import React, { useState, useEffect } from "react";
import { navigate } from "gatsby";
import { DateRange } from "react-date-range";
import { format } from "date-fns";
import useWindowSize from "../../hooks/useWindowSize";
import getPrice from "../../hooks/getPrice";

//Componente Modal que mostrara los datos que el cliente ha introducido en el formulario de reserva
const Modal = (props) => {
  const items = props.items;

  if (items === undefined) {
    return null;
  }

  console.log("props modal: ", props);

  if (!props.show) {
    return null;
  }

  return (
    <div className={props.show === true ? "modal is-active" : "modal"}>
      <div className="modal-background"></div>
      <div className="modal-card">
        <header className="modal-card-head">
          <p className="modal-card-title">Datos de reserva</p>
          <span
            onClick={props.onClose}
            className="delete"
            aria-label="close"
          ></span>
        </header>

        <section className="modal-card-body">
          <div>
            <p>
              Fecha de entrada: <strong>{items.fechaEntrada}</strong>
            </p>
            <p>
              Fecha de salida: <strong>{items.fechaSalida}</strong>
            </p>
            <p>
              Nombre: <strong>{items.nombre}</strong>
            </p>
            <p>
              Apellidos: <strong>{items.apellido}</strong>
            </p>
            <p>
              Email: <strong>{items.email}</strong>
            </p>
            <p>
              Telefono: <strong>{items.telefono}</strong>
            </p>
            <p>
              Identificacion: <strong>{items.identificacion}</strong>
            </p>
            <p>
              Código Postal: <strong>{items.codigoPostal}</strong>
            </p>
            <p>
              Huéspedes: <strong>{items.huespedes}</strong>
            </p>
            <p>
              Precio total: <strong>{items.precioTotal}</strong>
            </p>
          </div>
        </section>

        <footer className="modal-card-foot">
          <button className="button green">Realizar reserva</button>
          <span onClick={props.onClose} className="button is-danger">
            Cancelar
          </span>
        </footer>
      </div>
    </div>
  );
};

export default function BookForm(props) {
  const { width } = useWindowSize();
  const { numeroHabitacion, precio } = props;
  console.log("form props", props);
  //Estados de los diferentes componentes del formulario
  const [valores, guardarvalores] = useState(); //Guarda los valores que el usuario introduce en el formulario
  const [submitForm, guardarSumbitForm] = useState(false);
  //Estado que maneja la visibilidad del componente Modal. Por defecto esta en false para que al cargar la pagina este invisible
  const [mostrar, setMostrar] = useState(false);
  //Estado que maneja el calendario donde se indica la fecha de entrada
  // y la fecha de salida. Se inicia con la fecha de hoy
  const [guest, setGuest] = useState(1);
  const [price, setPrice] = useState();
  const [dateRange, setDateRange] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: "selection",
      color: "#0ebd1d",
    },
  ]);

  //Funcion que se llama a la hora de realizar el submit del formulario
  const funcion = () => {
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        valores,
      }),
    };
    fetch(
      `http://127.0.0.1:3000/form-submited/${numeroHabitacion}`,
      requestOptions
    )
      .then(
        (response) =>
          response.status === 200
            ? navigate("/formulario-reserva/success", {
                state: { email: valores.email },
              })
            : // (window.location.href = "/formulario-reserva/success")
              navigate("/formulario-reserva/error")
        // (window.location.href = "formulario-reserva/error")
      )
      .catch((e) => console.log(e));
  };

  //Funciones que manejan los cambios que se realizan en los inputs del formulario
  const handleChange = (e) => {
    guardarvalores({
      ...valores,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    funcion();
    guardarSumbitForm(true);
  };

  //Funcion que maneja la fecha seleccionada y la guarda en el estado.
  const handleDateSelect = (date) => {
    setDateRange([date.selection]);
    guardarvalores({
      ...valores,
      ["fechaEntrada"]: format(date.selection.startDate, "P"),
      ["fechaSalida"]: format(date.selection.endDate, "P"),
    });
  };

  const incrementNumber = () => {
    if (guest >= 4) {
      return;
    }
    setGuest(guest + 1);
  };

  const decrementNumber = () => {
    if (guest <= 1) {
      return;
    }
    setGuest(guest - 1);
  };

  useEffect(() => {
    console.log("aqui entra", numeroHabitacion);
    guardarvalores({
      ...valores,
      ["numeroHabitacion"]: numeroHabitacion,
    });
  }, [mostrar]);

  //Este efecto se ejecuta cuando el estado "guest" cambia
  useEffect(() => {
    guardarvalores({
      ...valores,
      ["huespedes"]: guest,
    });
  }, [guest]);

  useEffect(() => {
    dateRange.map((value) => {
      const fEntrada = value.startDate;
      const fSalida = value.endDate;
      console.log("values");
      const precioFinal = getPrice(precio, fEntrada, fSalida);
      console.log("precio final: ", precioFinal);
      guardarvalores({
        ...valores,
        ["precioTotal"]: precioFinal,
      });
    });
  }, [dateRange]);

  return (
    <form onSubmit={handleSubmit}>
      <div
        className={`field columns is-centered ${
          width >= 1024 ? "is-desktop" : "is-mobile"
        }`}
      >
        <DateRange
          minDate={new Date()}
          maxDate={new Date(2021, 10, 1)}
          editableDateInputs={true}
          onChange={handleDateSelect}
          moveRangeOnFirstSelection={false}
          ranges={dateRange}
        />
      </div>
      <div className="field">
        <label className="label" htmlFor="inputNombre">
          Nombre
        </label>
        <input
          id="inputNombre"
          name="nombre"
          className="input"
          type="text"
          onChange={handleChange}
          placeholder="Introduce tu nombre"
          required
        />
      </div>
      <div className="field">
        <label className="label" htmlFor="inputApellido">
          Apellidos
        </label>
        <input
          id="inputApellido"
          name="apellido"
          className="input"
          type="text"
          onChange={handleChange}
          placeholder="Introduce tu apellido"
          required
        />
      </div>
      <div className="field">
        <label className="label" htmlFor="inputEmail">
          Email
        </label>
        <input
          id="inputEmail"
          name="email"
          className="input"
          type="email"
          onChange={handleChange}
          placeholder="Introduce tu correo electronico"
          required
        />
      </div>
      <div className="field">
        <label className="label" htmlFor="inputTelefono">
          Telefono
        </label>
        <input
          id="inputTelefono"
          name="telefono"
          className="input"
          type="phone"
          onChange={handleChange}
          placeholder="Introduce tu numero de telefono"
          required
        />
      </div>
      <div className="field">
        <label className="label" htmlFor="inputIdentificacion">
          Nº. Identificacion(DNI/NIE/NIF/PASAPORTE){" "}
        </label>
        <input
          id="inputIdentificacion"
          name="identificacion"
          className="input"
          type="text"
          onChange={handleChange}
          placeholder="Introduce tu numero de identificacion"
          required
        />
      </div>
      <div className="field">
        <label className="label" htmlFor="inputPais">
          Pais
        </label>
        <input
          id="inputPais"
          name="pais"
          className="input"
          type="text"
          onChange={handleChange}
          placeholder="Introduce tu pais"
          required
        />
      </div>
      <div className="field">
        <label className="label" htmlFor="inputCodigoPostal">
          Codigo Postal
        </label>
        <input
          id="inputCodigoPostal"
          name="codigoPostal"
          className="input"
          type="number"
          onChange={handleChange}
          placeholder="Introduce tu codigo postal"
          required
        />
      </div>
      <div className="field">
        <label className="label">Huéspedes</label>
        <div className="tags has-addons">
          <span className="tag green" onClick={decrementNumber}>
            -
          </span>
          <span className="tag">{guest}</span>
          <span className="tag green" onClick={incrementNumber}>
            +
          </span>
        </div>
      </div>
      <span className="button green" onClick={() => setMostrar(true)}>
        Continuar
      </span>
      <Modal
        onClose={() => setMostrar(false)}
        show={mostrar}
        items={valores}
        // numeroHabitacion={numeroHabitacion}
      />
    </form>
  );
}
