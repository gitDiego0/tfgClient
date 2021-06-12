import React, { useState, useEffect, useContext } from "react";
import { Link, graphql, useStaticQuery } from "gatsby";
import { navigate } from "gatsby";

import Header from "../components/Header/Header";
import Footer from "../components/Footer/Footer";
import Layout from "../components/layout.js";
import SEO from "../components/Seo/SEO";

import useUser, { USER_STATES } from "../hooks/useUser";
import { loginWithEmail } from "../firebase/firebase";

import ComponentList from "../utils/ComponentList";

import "../styles/style.scss";

export default function AdminTemplate({ data }) {
  const adminQuery = data.contentfulPage;
  const { items, header, footer } = adminQuery;

  const user = useUser();
  const [valores, setValores] = useState(null);

  const handleChange = (nuevoValor) => {
    console.log("valores: ", valores);
    setValores({
      ...valores,
      ...nuevoValor,
    });
  };
  useEffect(() => {
    user && navigate("/admin-inicio", { replace: true });
    console.log("usuario: ", user);
  }, [user]);

  const handleSubmit = (ev) => {
    ev.preventDefault();
    loginWithEmail(valores.emailInput, valores.passwordInput);
  };

  return (
    <>
      <SEO />
      <Header {...header} />
      <Layout>
        <div className="card">
          <div className="card-content">
            <form onSubmit={handleSubmit}>
              {items.map((item, index) => {
                const Component = ComponentList[item.__typename];
                return Component ? (
                  <Component key={index} onChange={handleChange} {...item} />
                ) : null;
              })}
              <div className="field is-grouped">
                <p className="control">
                  <button type="submit" className="button green">
                    {" "}
                    Acceder
                  </button>
                </p>
                <p className="control">
                  <a className="button is-light">Cambiar contraseña</a>
                </p>
              </div>
            </form>
          </div>
        </div>
      </Layout>
      <Footer {...footer} />
    </>
  );
}
export const adminQuery = graphql`
  query adminQuery($id: String!) {
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
        ... on ContentfulComponentFormInput {
          __typename
          id
          name
          inputs {
            ... on ContentfulItemLabelTag {
              __typename
              id
              name
              title
              text
            }
            ... on ContentfulItemInput {
              __typename
              id
              name
              title
              type
              required
              placeholder
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
