import React, { useState } from "react";
import { Link, graphql, useStaticQuery } from "gatsby";

import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";

const HeaderFooterProps = () => {
  const data = useStaticQuery(graphql`
    query HeaderFooterQueryAdmin {
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

export default function Admin() {
  const { contentfulComponentHeader, contentfulFooter } = HeaderFooterProps();

  const [valores, setValores] = useState();
  const [user, setUser] = useState(null);

  const handleChange = (event) => {
    setValores({
      ...valores,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        valores,
      }),
    };
    fetch(`http://127.0.0.1:3000/login}`, requestOptions).then((req) => {
      console.log(req);
    });
  };

  return (
    <>
      <Header {...contentfulComponentHeader} />
      <main className="container">
        <form onSubmit={handleSubmit}>
          <div className="field">
            <p className="control has-icons-left has-icons-right">
              <input
                className="input"
                type="text"
                placeholder="Nombre de usuario"
                name="username"
                onChange={handleChange}
              />
              <span className="icon is-small is-left">
                <i className="fas fa-envelope"></i>
              </span>
            </p>
          </div>
          <div className="field">
            <p className="control has-icons-left ">
              <input
                className="input"
                type="password"
                placeholder="Contraseña"
                name="password"
                onChange={handleChange}
              />
              <span className="icon is-small is-left">
                <i className="fas fa-lock"></i>
              </span>
            </p>
          </div>
          <div className="field">
            <p className="control">
              <button className="button green"> Acceder</button>
            </p>
          </div>
        </form>
      </main>
      <Footer {...contentfulFooter} />
    </>
  );
}
