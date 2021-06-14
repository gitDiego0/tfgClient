import React, { useEffect, useContext, useState } from "react";
import { navigate, graphql } from "gatsby";
import axios from "axios";

import useUser from "../hooks/useUser";
import { logout, uploadImage } from "../firebase/firebase";

import Header from "../components/Header/Header";
import Footer from "../components/Footer/Footer";
import Layout from "../components/layout.js";
import SEO from "../components/Seo/SEO";

import ComponentList from "../utils/ComponentList";

import "../styles/style.scss";

//Estados para indicar que funcion se va a realizar

export const STATES = {
  INICIO: "¿Qué deseas hacer?",
  AÑADIR_PRODUCTO: "Añadir producto",
  MODIFICAR_PRODUCTO: "Modificar producto",
  ELIMINAR_PRODUCTO: "Eliminar producto",
  VER_RESERVAS: "Ver reservas",
};

export const ETIQUETAS_PRODUCTOS = {
  BEBIDAS: "Bebidas",
  ENTRANTES: "Entrantes",
  PLATO_CALIENTE: "Plato caliente",
  PLATO_FRIO: "Plato frio",
  POSTRE: "Postre",
};

export const ETIQUETAS_RESERVAS = {
  H101: "H-101",
  H102: "H-102",
  H103: "H-103",
};

//Funcion para eliminar entradas de la base de datos

const deleteItem = (nombre, categoria) => {
  axios
    .post("http://127.0.0.1:3000/delete", {
      nombre: nombre,
      categoria:
        categoria === "Refresco" ||
        categoria === "Agua" ||
        categoria === "Alcohol"
          ? "Bebida"
          : null,
      subcategoria: categoria,
    })
    .then((response) => {
      console.log(response);
    })
    .catch((err) => {
      console.log(err.message);
    });
};

//Componente para mostrar las operaciones de CRUD que se pueden realizar
const Operaciones = ({ setOperacion }) => {
  const handleClick = () => {
    logout();
  };

  return (
    <div className="card">
      <header className="card-header">
        <p className="card-header-title title">Operaciones</p>
      </header>
      <div className="card-content is-flex-direction-column">
        <div className="content">
          <p className="title is-5">Gestionar productos</p>
          <div className="mt-2">
            <span
              onClick={() => setOperacion(STATES.AÑADIR_PRODUCTO)}
              className="button green"
            >
              Añadir producto
            </span>
          </div>
          <div className="mt-2">
            <span
              onClick={() => setOperacion(STATES.MODIFICAR_PRODUCTO)}
              className="button green"
            >
              Actulizar productos
            </span>
          </div>
          <div className="mt-2">
            <span
              onClick={() => setOperacion(STATES.ELIMINAR_PRODUCTO)}
              className="button green"
            >
              Eliminar producto
            </span>
            <div className="is-divider"></div>
          </div>
          <p className="mt-3 title is-5">Gestionar reservas</p>
          <div className="mt-2">
            <span
              onClick={() => setOperacion(STATES.VER_RESERVAS)}
              className="button green"
            >
              Ver reservas
            </span>
          </div>
          <div className="is-divider"></div>
          <div className="mt-2">
            <button onClick={handleClick} className="button is-danger">
              Cerrar sesion
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

//Componente que muestra las categorias que existen en la base de datos sobre las que trabajar
const Etiquetas = ({ setCategoria, operacion, setEtiqueta }) => {
  const [isActive, setIsActive] = useState(false);
  console.log(operacion);

  return operacion === STATES.AÑADIR_PRODUCTO ||
    operacion === STATES.MODIFICAR_PRODUCTO ||
    operacion === STATES.ELIMINAR_PRODUCTO ? (
    <div className="columns mt-3 pl-3 pr-3 has-text-centered">
      <div className="column">
        <div className={isActive ? "dropdown is-active" : "dropdown"}>
          <span
            onClick={() => setIsActive(!isActive)}
            className="button is-light"
          >
            Bebidas
          </span>
          <div className="dropdown-menu">
            <div className="dropdown-content">
              <span
                onClick={() => setCategoria("Agua")}
                className="button is-light dropdown-item mt-1"
              >
                {" "}
                Aguas
              </span>
              <span
                onClick={() => setCategoria("Refresco")}
                className="button is-light dropdown-item mt-1"
              >
                {" "}
                Refrescos
              </span>
              <span
                onClick={() => setCategoria("Alcohol")}
                className="button is-light dropdown-item mt-1"
              >
                {" "}
                Alcohol
              </span>
            </div>
          </div>
        </div>
      </div>
      <div className="column">
        <span
          onClick={() => {
            setCategoria("Entrante");
          }}
          className="button is-light"
        >
          Entrantes
        </span>
      </div>
      <div className="column">
        <span className="button is-light">Plato caliente</span>
      </div>
      <div className="column">
        <span className="button is-light">Plato frio</span>
      </div>
      <div className="column ">
        <span className="button is-light">Postre</span>
      </div>
    </div>
  ) : operacion === STATES.VER_RESERVAS ? (
    <div className="columns mt-3 pl-3 pr-3 has-text-centered">
      <div className="column">
        <span
          onClick={() => setEtiqueta(ETIQUETAS_RESERVAS.H101)}
          className="button is-light"
        >
          H-101
        </span>
      </div>
      <div className="column">
        <span
          onClick={() => setEtiqueta(ETIQUETAS_RESERVAS.H102)}
          className="button is-light"
        >
          H-102
        </span>
      </div>
      <div className="column">
        <span
          onClick={() => setEtiqueta(ETIQUETAS_RESERVAS.H103)}
          className="button is-light"
        >
          H-103
        </span>
      </div>
    </div>
  ) : null;
};

const Anadir = ({ categoria }) => {
  const [valores, setValores] = useState();
  const [disable, setDisable] = useState(true);
  const [imagenUrl, setImagenUrl] = useState(null);
  const [task, setTask] = useState(null);
  console.log("categoria: ", categoria);
  useEffect(() => {
    if (categoria === "Entrante") {
      setDisable(false);
    } else {
      setDisable(true);
    }
  }, [categoria]);

  useEffect(() => {
    if (task) {
      const onProgress = () => {};
      const onError = () => {};
      const onComplete = () => {
        task.snapshot.ref.getDownloadURL().then((url) => {
          setValores({
            ...valores,
            ["imagen"]: url,
          });
          setImagenUrl(url);
        });
      };
      task.on("state_changed", onProgress, onError, onComplete);
    }
  }, [task]);

  useEffect(() => {
    setValores({
      ...valores,
      ["categoria"]: categoria,
    });
  }, [categoria]);

  const handleChange = (ev) => {
    setValores({
      ...valores,
      [ev.target.name]: ev.target.value,
    });
  };

  const sendForm = async () => {
    // const requestOptions = {
    //   method: "POST",
    //   headers: { "Content-Type": "application/json" },
    //   body: JSON.stringify({ valores }),
    // };
    // fetch(`http://127.0.0.1:3000/anadirbebida`, requestOptions).then((req) => {
    //   console.log("req", req.status);
    //   req.status === 200 ? console.log(req) : console.log("error");
    // });

    axios.post("http://18.116.163.149:3000/anadirbebida", {
      valores: valores,
    });
  };
  const handleImage = (ev) => {
    const image = ev.target.files[0];
    const task = uploadImage(image);
    setTask(task);
  };

  const handleSubmit = () => {
    console.log("imagenURl: ", valores);
    sendForm();
  };

  return (
    <>
      <div>
        <div className="field">
          <label className="label">Nombre</label>
          <input
            className="input"
            name="nombre"
            placeholder="Introduce el nombre"
            type="text"
            onChange={handleChange}
          />
        </div>
        <div className="field">
          <label className="label">Imagen</label>
          <input
            className="input"
            onChange={handleImage}
            name="imagen"
            type="file"
          />
        </div>
        <div className="field">
          <label className="label">Precio</label>
          <input
            className="input"
            name="precio"
            placeholder="Introduce el precio"
            onChange={handleChange}
            type="number"
          />
        </div>
        <div className="field">
          <label className="label">Cantidad</label>
          <input
            className="input"
            name="cantidad"
            placeholder="Introduce la cantidad en .cl"
            onChange={handleChange}
            type="number"
          />
        </div>
        <div className="field">
          <label className="label">Ingredientes</label>
          <input
            className="input"
            name="ingredientes"
            placeholder="Introduce los ingredientes separados por ,"
            onChange={handleChange}
            type="text"
            disabled={disable ? "" : "disabled"}
          />
        </div>
        <div className="field">
          <span onClick={handleSubmit} className="button green">
            <p>Añadir</p>
          </span>
        </div>
      </div>
    </>
  );
};

const Eliminar = ({ categoria, alcohol, aguas, refrescos }) => {
  console.log(categoria);

  useEffect(() => {
    console.log("categoria eliminar: ", refrescos);
  }, [categoria]);

  return (
    <>
      <div className="">
        {categoria === "Refresco"
          ? refrescos.map((item) => {
              return (
                <ul>
                  <li>
                    <p>
                      {item.nombre}{" "}
                      <span
                        onClick={() => deleteItem(item.nombre, categoria)}
                        className="ml-3 button is-danger"
                      >
                        Eliminar
                      </span>
                    </p>{" "}
                  </li>
                </ul>
              );
            })
          : null}
      </div>
    </>
  );
};

const VerReservas = ({ etiqueta }) => {
  const [reservas, setReservas] = useState();

  useEffect(() => {
    axios
      .get(`http://18.116.163.149:3000/getreserva/${etiqueta}`)
      .then(({ data }) => {
        console.log(data);
        setReservas(data);
      });
  }, [etiqueta]);
  return (
    <div>
      {reservas === undefined
        ? null
        : reservas.map((entrada, index) => {
            const fechaReserva = new Date(entrada.fechaReserva);
            return (
              <div key={index}>
                <ul>
                  <li>
                    Fecha entrada: {entrada.fechaEntrada} || Fecha salida:
                    {entrada.fechaSalida} || Fecha reserva: {`${fechaReserva}`}{" "}
                    Huespedes: {entrada.huespedes} || Precio: {entrada.precio}
                  </li>
                </ul>
              </div>
            );
          })}
    </div>
  );
};

export default function AdminInicioTemplate({ data }) {
  const adminInicioQuery = data.contentfulPage;
  const { header, footer } = adminInicioQuery;

  const [operacion, setOperacion] = useState(STATES.INICIO);
  const [categoria, setCategoria] = useState();
  const [etiqueta, setEtiqueta] = useState();
  const [refrescos, setRefrescos] = useState();
  const [aguas, setAguas] = useState();
  const [alcohol, setAlcohol] = useState();

  useEffect(() => {
    axios
      .get("http://18.116.163.149:3000/api/bebidas")
      .then(({ data: { bebidas } }) => {
        bebidas.map(({ refrescos, aguas, alcohol }) => {
          if (refrescos !== undefined) {
            setRefrescos(refrescos);
          } else if (aguas !== undefined) {
            setAguas(aguas);
          } else if (alcohol !== undefined) {
            setAlcohol(alcohol);
          }
        });
      });
  }, []);

  return (
    <>
      <SEO />
      <Header {...header} />
      <Layout>
        <div className="columns">
          <div className="column is-one-third">
            <Operaciones setOperacion={setOperacion} />
          </div>
          <div className="column">
            <div className="card">
              <header className="card-header">
                <p className="card-header-title title">{operacion}</p>
              </header>
              <Etiquetas
                operacion={operacion}
                setEtiqueta={setEtiqueta}
                setCategoria={setCategoria}
              />
              <div className="card-content">
                <div className="content">
                  {operacion === STATES.AÑADIR_PRODUCTO ? (
                    <Anadir categoria={categoria} />
                  ) : operacion === STATES.ELIMINAR_PRODUCTO ? (
                    <Eliminar
                      refrescos={refrescos}
                      aguas={aguas}
                      alcohol={alcohol}
                      categoria={categoria}
                    />
                  ) : operacion === STATES.VER_RESERVAS ? (
                    <VerReservas
                      etiqueta={etiqueta}
                      setEtiqueta={setEtiqueta}
                    />
                  ) : null}
                </div>
              </div>
            </div>
          </div>
        </div>
      </Layout>
      <Footer {...footer} />
    </>
  );
}

export const adminInicioQuery = graphql`
  query adminInicioQuery($id: String!) {
    contentfulPage(id: { eq: $id }) {
      id
      title
      header {
        name
        logo {
          fluid {
            srcWebp
          }
        }
        items {
          name
          title
        }
      }

      footer {
        direccion
        email
        id
        logo {
          logo {
            fluid {
              srcWebp
            }
            title
          }
          name
          title
        }
        telefono
        title
        name
      }
    }
  }
`;
