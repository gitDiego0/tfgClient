import React, { useState, useEffect, useContext } from "react";
import { graphql } from "gatsby";

import { roomContext } from "../hooks/contexto";

import Layout from "../components/layout.js";
import SEO from "../components/Seo/SEO";
import Header from "../components/Header/Header";
import Footer from "../components/Footer/Footer";

// import roomContext from "../hooks/contexto";
import ComponentList from "../utils/ComponentList";

import "../styles/style.scss";

export default function HostalTemplate({ data }) {
  const hostalQuery = data.contentfulPage;
  const { items, header, footer } = hostalQuery;
  const context = useContext(roomContext);

  const [fechas, setFechas] = useState({
    fecha_entrada: undefined,
    fecha_salida: undefined,
  });

  return (
    <>
      <SEO />
      <Header {...header} />
      <Layout>
        {items.map((item, index) => {
          const Component = ComponentList[item.__typename];
          if (item.__typename === "ContentfulComponentCard") {
            return Component ? (
              <Component key={index} fechas={fechas} {...item} />
            ) : null;
          } else if (item.__typename === "ContentfulItemCalendario") {
            return Component ? (
              <Component key={index} setFechas={setFechas} {...item} />
            ) : null;
          }
          return Component;
        })}
      </Layout>
      <Footer {...footer} />
    </>
  );
}

export const hostalQuery = graphql`
  query MyQuery($id: String!) {
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
      items {
        ... on ContentfulItemCalendario {
          __typename
          id
          name
          fechaMaxima
          fechaMinima
        }
        ... on ContentfulComponentCard {
          __typename
          id
          name
          title
          cards {
            ... on ContentfulItemCardRoom {
              __typename
              id
              name
              aireAcondicionado
              camas
              vistasAlMar
              wifi
              title
              television
              precio
              numeroHabitacion
              image {
                fluid {
                  srcWebp
                }
              }
              descripcion {
                descripcion
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
