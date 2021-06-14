import React, { useState, useEffect } from "react";
import { graphql } from "gatsby";
import axios from "axios";

import Layout from "../components/layout.js";
import SEO from "../components/Seo/SEO";
import Header from "../components/Header/Header";
import Spinner from "../components/Spinner/Spinner";
import CardItem from "../components/CardItem/CardItem";
import Resultados from "../components/Resultados/Resultados";
import Filtros from "../components/Filtros/Filtros";
import Footer from "../components/Footer/Footer";

// import roomContext from "../hooks/contexto";
import ComponentList from "../utils/ComponentList";

import "../styles/style.scss";

export default function RestaurantTemplate({ data }) {
  const restaurantQuery = data.contentfulPage;
  const { items, header, footer } = restaurantQuery;
  const [error, setError] = useState(null);
  //Estados donde se almacenan los diferentes props a usar en la pagina
  const [categorias, setCategorias] = useState();
  const [carta, setCarta] = useState();
  const [cartaRefrescos, setCartaRefrescos] = useState();
  const [cartaAguas, setCartaAguas] = useState();
  const [cartaAlcohol, setCartaAlcohol] = useState();
  const [cartaEntrantes, setCartaEntrantes] = useState();
  const [cartaTartas, setCartaTartas] = useState();
  const [cartaHelados, setCartaHelados] = useState();
  const [cartaCafes, setCartaCafes] = useState();

  //Estado que indica si la pagina esta cargando.Se usa para cambiar comportamientos de componentes dependiendo si la pagina esta cargada o no
  const [loading, setLoading] = useState(true);
  //Estado que controla si se abre o se cierra el menu desplegable
  const [collapse, setCollapse] = useState(false);
  const [collapse2, setCollapse2] = useState(false);

  //Efectos que se ejecutan al cargar la página por primera vez.
  //Se encargan de traer los productos almacenados en la base de datos y
  //almacenarlos en los estados indicados para mostrarlos cuando sea necesario

  useEffect(() => {
    axios
      .get("http://18.116.163.149:3000/api/categorias")
      .then(({ data }) => {
        // console.log("categorias", res);
        setCategorias(data);
      })
      .catch((err) => {
        setError(err.message);
      });
    setLoading(false);
  }, []);

  useEffect(() => {
    axios
      .get("http://18.116.163.149:3000/api/bebidas")
      .then(({ data: { bebidas } }) => {
        bebidas.map(({ refrescos, aguas, alcohol }) => {
          if (refrescos !== undefined) {
            setCartaRefrescos(refrescos);
          } else if (aguas !== undefined) {
            setCartaAguas(aguas);
          } else if (alcohol !== undefined) {
            setCartaAlcohol(alcohol);
          }
        });

        setCarta(cartaRefrescos);
      });
    setLoading(false);
  }, []);

  useEffect(() => {
    setLoading(true);
    axios.get("http://18.116.163.149:3000/api/entrantes").then(({ data }) => {
      setCartaEntrantes(data);
      setLoading(false);
    });
  }, []);

  useEffect(() => {
    axios
      .get("http://18.116.163.149:3000/api/postres")
      .then(({ data }) => {
        data.map(({ tartas, helados, cafes }) => {
          if (tartas !== undefined) {
            setCartaTartas(tartas);
          } else if (helados !== undefined) {
            setCartaHelados(helados);
          } else if (cafes !== undefined) {
            setCartaCafes(cafes);
          }
        });
      })
      .catch((err) => {
        return console.log(err.message);
      });
  }, []);

  if (error !== null) {
    return (
      <>
        <SEO />
        <Header {...header} />
        <Layout>
          <div>Error: {`${error}`}</div>;
        </Layout>
        <Footer {...footer} />
      </>
    );
  } else {
    return (
      <>
        <SEO />
        <Header {...header} />
        <Layout>
          {items.map((item, index) => {
            // console.log("item", item);
            const Component = ComponentList[item.__typename];
            return Component ? <Component key={index} {...item} /> : null;
          })}

          <section>
            <div className="columns">
              <div className="column is-one-third">
                <div className="card">
                  <header className="card-header">
                    <p className="card-header-title title">Categorias </p>
                  </header>
                  <div className="card-content is-flex-direction-column">
                    <div className="content">
                      {categorias === undefined ? (
                        <Spinner loading={loading} />
                      ) : (
                        categorias.map(({ nombre }) => {
                          return nombre === "Bebida" ? (
                            <div className="mt-2">
                              <a
                                data-action="collpase"
                                onClick={() => setCollapse(!collapse)}
                              >
                                <span className="button green">Bebidas ↓</span>
                              </a>
                              <div
                                id="collapsible-card"
                                className={
                                  collapse
                                    ? " is-collapsible  is-active pl-3"
                                    : "is-collapsible is-hidden pl-3"
                                }
                              >
                                <div>
                                  <span
                                    onClick={() => {
                                      setCarta(cartaRefrescos);
                                    }}
                                    className="mt-2 button green"
                                  >
                                    {" "}
                                    Refrescos
                                  </span>
                                </div>
                                <div>
                                  <span
                                    onClick={() => {
                                      setCarta(cartaAguas);
                                    }}
                                    className="mt-2 button green"
                                  >
                                    {" "}
                                    Aguas
                                  </span>
                                </div>
                                <div>
                                  <span
                                    onClick={() => setCarta(cartaAlcohol)}
                                    className="mt-2 button green"
                                  >
                                    Alcohol
                                  </span>
                                </div>
                              </div>
                            </div>
                          ) : nombre === "Entrante" ? (
                            <div className=" mt2">
                              <span
                                onClick={() => setCarta(cartaEntrantes)}
                                className=" mt-2 button green"
                              >
                                {nombre}
                              </span>
                            </div>
                          ) : nombre === "Platos frios" ? (
                            <div className=" mt2">
                              <span className=" mt-2 button green">
                                {nombre}
                              </span>
                            </div>
                          ) : nombre === "Platos calientes" ? (
                            <div className=" mt2">
                              <span className=" mt-2 button green">
                                {nombre}
                              </span>
                            </div>
                          ) : nombre === "Postre" ? (
                            <div className="mt-2">
                              <a
                                data-action="collpase"
                                onClick={() => setCollapse2(!collapse2)}
                              >
                                <span className="button green">Postres ↓</span>
                              </a>
                              <div
                                id="collapsible-card"
                                className={
                                  collapse2
                                    ? " is-collapsible  is-active pl-3"
                                    : "is-collapsible is-hidden pl-3"
                                }
                              >
                                <div>
                                  <span
                                    onClick={() => {
                                      setCarta(cartaCafes);
                                    }}
                                    className="mt-2 button green"
                                  >
                                    {" "}
                                    Cafés
                                  </span>
                                </div>
                                <div>
                                  <span
                                    onClick={() => {
                                      setCarta(cartaHelados);
                                    }}
                                    className="mt-2 button green"
                                  >
                                    {" "}
                                    Helados
                                  </span>
                                </div>
                                <div>
                                  <span
                                    onClick={() => setCarta(cartaTartas)}
                                    className="mt-2 button green"
                                  >
                                    Tartas
                                  </span>
                                </div>
                              </div>
                            </div>
                          ) : null;
                        })
                      )}
                    </div>
                  </div>
                </div>
              </div>
              <div className="column">
                <div className="card">
                  <header className="card-header">
                    <p className="card-header-title title">Carta</p>
                  </header>
                  <div className="card-content">
                    <div className="columns">
                      {carta === undefined ? (
                        <Spinner loading={loading} />
                      ) : (
                        carta.map((item) => {
                          return <CardItem {...item} />;
                        })
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </Layout>
        <Footer {...footer} />
      </>
    );
  }
}

export const restaurantQuery = graphql`
  query restaurantQuery($id: String!) {
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
          title
          name
        }
      }
      items {
        ... on ContentfulComponentCarousel {
          __typename
          name
          images {
            title
            image {
              fluid {
                srcWebp
              }
            }
          }
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
