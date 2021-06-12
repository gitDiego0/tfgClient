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

const Anadir = ({ items }) => {
  const [valores, setValores] = useState();
  const [imagenFile, setImagenFile] = useState(undefined);
  const [imagenUrl, setImagenUrl] = useState(null);
  const [task, setTask] = useState(null);

  useEffect(() => {
    if (task) {
      task.snapshot.ref.getDownloadURL().then(setImagenUrl);
    }
  }, [task]);
  const handleChange = (ev) => {
    ev.target.name === "imagen"
      ? setImagenFile(ev.target.files[0])
      : setValores({
          ...valores,
          [ev.target.name]: ev.target.value,
        });
  };

  const sendForm = async () => {
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({}),
    };
    fetch(`http://18.218.182.220:3000/anadirbebida`, requestOptions).then((req) => {
      req.status === 200 ? console.log("ok") : console.log("error");
    });
  };

  const handleSubmit = () => {
    const task = uploadImage(imagenFile);
    setTask(task);
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
            onChange={handleChange}
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
  const [formAnadir, setFormAnadir] = useState([]);

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
              <div className="card-content">
                <div className="content">
                  {operacion === STATES.AÑADIR ? <Anadir /> : null}
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
