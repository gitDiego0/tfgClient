import React, { useState, useEffect } from "react";
import { graphql } from "gatsby";

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

const Carta = ({ item }) => {};

export default function RestaurantTemplate({ data }) {
  const restaurantQuery = data.contentfulPage;
  const { items, header, footer } = restaurantQuery;
  const [error, setError] = useState(null);
  //Estados donde se almacenan los diferentes props a usar en la pagina
  const [categorias, setCategorias] = useState();
  const [carta, setCarta] = useState();
  const [cartaBebidas, setCartaBebidas] = useState();
  const [cartaRefrescos, setCartaRefrescos] = useState();
  const [cartaAguas, setCartaAguas] = useState();

  const [q, setQ] = useState("");
  const [filterParam, setFilterParam] = useState(["Todos"]);
  //Estado que indica si la pagina esta cargando.Se usa para cambiar comportamientos de componentes dependiendo si la pagina esta cargada o no
  const [loading, setLoading] = useState(true);
  const [collapse, setCollapse] = useState(false);

  useEffect(() => {
    fetch("http://18.218.182.220:3000/api/categorias")
      .then((request) => {
        const object = request.json();
        return object;
      })
      .then((object) => {
        console.log(object);
        setCategorias(object);
        setLoading(false);
      })
      .catch((err) => {
        return console.log(err.message);
      });
    console.log(categorias);
  }, []);

  useEffect(() => {
    setLoading(true);
    fetch("http://18.218.182.220:3000/api/bebidas")
      .then((request) => {
        // return res.json();
        const object = request.json();
        return object;
      })
      .then(
        (objeto) => {
          // console.log("result: ", result);
          setLoading(false);

          // setCarta([result]);
          const { bebidas } = objeto;
          bebidas.map(({ refrescos, aguas }) => {
            if (refrescos !== undefined) {
              setCartaRefrescos(refrescos);
            } else if (aguas !== undefined) {
              setCartaAguas(aguas);
            }
          });

          setCartaBebidas(bebidas);
          setCarta(cartaRefrescos);
        },
        (error) => {
          console.log("error: ", error);
          setLoading(false);
          setError(error);
        }
      )
      .catch((err) => {
        return console.log(err);
      });
  }, []);

  // function filter(items) {
  //   items.filter((item) => {
  //     console.log(item);
  //   });
  //   console.log("items para filtrar", items);
  // }

  if (error) {
    return <div>Error: {error.message}</div>;
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
                      {/* <Filtros
                        onChange={setCarta}
                        seleccionado={carta}
                        categorias={categorias}
                      />  */}
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
                                  <button
                                    onClick={() => {
                                      setCarta(cartaRefrescos);
                                    }}
                                    className="mt-2 button green"
                                  >
                                    {" "}
                                    Refrescos
                                  </button>
                                </div>
                                <div>
                                  <button
                                    onClick={() => {
                                      setCarta(cartaAguas);
                                    }}
                                    className="mt-2 button green"
                                  >
                                    {" "}
                                    Aguas
                                  </button>
                                </div>
                              </div>
                            </div>
                          ) : (
                            <div className=" mt2">
                              <input
                                id={nombre}
                                value={nombre}
                                type="checkbox"
                                onClick={(e) =>
                                  setFilterParam(
                                    { ...filterParam },
                                    e.target.value
                                  )
                                }
                              />
                              <label className="checkbox" htmlFor={nombre}>
                                {nombre}
                              </label>
                            </div>
                          );
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

// {cartaBebidas === undefined ? (
//   <Spinner loading={loading} />
// ) : (
//   cartaBebidas.map(({ refrescos, aguas }) => {
//     {
//       if (refrescos) {
//         return refrescos.map((refresco, index) => {
//           return (
//             <div className="column is-one-quarter">
//               <CardItem
//                 key={refresco.nombre}
//                 {...refresco}
//               />{" "}
//             </div>
//           );
//         });
//       } else if (aguas) {
//         return aguas.map((agua, index) => {
//           return (
//             <div className="column is-one-quarter">
//               <CardItem key={agua.nombre} {...agua} />{" "}
//             </div>
//           );
//         });
//       } else {
//         return null;
//       }
//     }
//   })
// )}
