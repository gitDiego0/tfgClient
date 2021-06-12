import React, { useEffect, useContext, useState } from "react";
import { navigate, graphql } from "gatsby";

import useUser from "../hooks/useUser";
import { logout, uploadImage } from "../firebase/firebase";

import Header from "../components/Header/Header";
import Footer from "../components/Footer/Footer";
import Layout from "../components/layout.js";
import SEO from "../components/Seo/SEO";

import ComponentList from "../utils/ComponentList";

import "../styles/style.scss";

export const STATES = {
  INICIO: "¿Qué deseas hacer?",
  AÑADIR: "Añadir producto",
  MODIFICAR: "Modificar producto",
  ELIMINAR: "Eliminar producto",
};

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
          <div className="mt-2">
            <span
              onClick={() => setOperacion(STATES.AÑADIR)}
              className="button green"
            >
              Añadir producto
            </span>
          </div>
          <div className="mt-2">
            <span
              onClick={() => setOperacion(STATES.MODIFICAR)}
              className="button green"
            >
              Actulizar productos
            </span>
          </div>
          <div className="mt-2">
            <span
              onClick={() => setOperacion(STATES.ELIMINAR)}
              className="button green"
            >
              Eliminar producto
            </span>
          </div>
          <div className="mt-2">
            <button onClick={handleClick} className="button green">
              Cerrar sesion
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const Categorias = ({ setCategoria }) => {
  const [isActive, setIsActive] = useState(false);

  return (
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
  );
};

const Anadir = (categoria) => {
  const [valores, setValores] = useState();
  const [disable, setDisable] = useState(true);
  // const [imagenFile, setImagenFile] = useState(undefined);
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
        // console.log(
        //   task.snapshot.ref.getDownloadURL().then((objeto) => {
        //     console.log("objeto: ", objeto);
        //   })
        // );
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
      ...categoria,
    });
  }, [categoria]);

  const handleChange = (ev) => {
    setValores({
      ...valores,
      [ev.target.name]: ev.target.value,
    });
  };

  const sendForm = async () => {
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ valores }),
    };
    fetch(`http://127.0.0.1:3000/anadirbebida`, requestOptions).then((req) => {
      console.log("req", req.status);
      req.status === 200 ? console.log(req) : console.log("error");
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
    // sendForm();
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

export default function AdminInicioTemplate({ data }) {
  const adminInicioQuery = data.contentfulPage;
  const { header, footer } = adminInicioQuery;

  const [operacion, setOperacion] = useState(STATES.INICIO);
  const [categoria, setCategoria] = useState();

  const user = useUser();

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
              <Categorias setCategoria={setCategoria} />
              <div className="card-content">
                <div className="content">
                  {operacion === STATES.AÑADIR ? (
                    <Anadir categoria={categoria} />
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
