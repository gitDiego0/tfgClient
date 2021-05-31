import React, { useState } from "react";
import { graphql, useStaticQuery } from "gatsby";

import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import Form from "../../components/Form/Form";

import "../styles/style.scss";
//Componente interno de la pagina que se encarga de cargar las propiedades
// del componenete Header y Footer
const HeaderFooterProps = () => {
  const data = useStaticQuery(graphql`
    query HeaderFooterQuery {
      contentfulComponentHeader {
        name
        items {
          title
          name
        }
        logo {
          fluid(maxHeight: 100, maxWidth: 500) {
            srcWebp
          }
        }
      }
      contentfulFooter {
        title
        email
        direccion
        telefono
        logo {
          logo {
            fluid {
              srcWebp
            }
          }
        }
      }
    }
  `);

  return data;
};

export default function formularioReservas({ location }) {
  const { state = {} } = location;
  const { numeroHabitacion, precio } = state;
  console.log("props: ", precio);
  const { contentfulComponentHeader, contentfulFooter } = HeaderFooterProps();
  return state != null ? (
    <>
      <Header {...contentfulComponentHeader} />
      <main className="container">
        <Form numeroHabitacion={numeroHabitacion} precio={precio} />
      </main>
      <Footer {...contentfulFooter} />
    </>
  ) : (
    <p>hola</p>
  );
}
