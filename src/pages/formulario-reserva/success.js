import React from "react";
import { graphql, useStaticQuery, Link } from "gatsby";

import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";

const QueryHeaderFooter = () => {
  const data = useStaticQuery(graphql`
    query QueryHeaderFooter {
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

export default function Success({ location }) {
  const { email } =
    location.state === "undefined" ? "prueba@gmail.com" : location.state;
  const { contentfulComponentHeader, contentfulFooter } = QueryHeaderFooter();
  console.log("props success: ", contentfulComponentHeader);
  return (
    <>
      <Header {...contentfulComponentHeader} />
      <main className="container is-center">
        <div className="container">
          <h1 className="title is-2">!MUCHAS GRACIAS POR SU RESERVA¡</h1>
          <p>
            A continuacion recibira un email en <strong>{email}</strong> con los
            detalles de su reserva. Si desea cancelar la reserva o ponerse en
            contacto con nosotros, puede llamar a <strong>123456789</strong>
          </p>

          <Link to="/home">Volver a Inicio</Link>
        </div>
      </main>
      <Footer {...contentfulFooter} />
    </>
  );
}
