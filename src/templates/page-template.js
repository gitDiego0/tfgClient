import React from "react";
import { graphql } from "gatsby";

import Layout from "../components/layout.js";
import Header from "../components/Header/Header";
import Footer from "../components/Footer/Footer";

import ComponentList from "../utils/ComponentList";

import "../styles/style.scss";

const pageTemplate = ({ data }) => {
  const pageQuery = data.contentfulPage;
  const { items, header, footer } = pageQuery;

  console.log(data);

  return (
    <>
      <Header {...header} />
      <Layout>
        {items.map((item, index) => {
          // console.log("item", item);
          const Component = ComponentList[item.__typename];
          return Component ? <Component key={index} {...item} /> : null;
        })}
      </Layout>
      <Footer {...footer} />
    </>
  );
};

export const pageQuery = graphql`
  query pageQuery($id: String!) {
    contentfulPage(id: { eq: $id }) {
      id
      title
      header {
        name
        logo {
          fluid(maxHeight: 75, maxWidth: 300) {
            srcWebp
          }
        }
        items {
          title
          name
        }
      }
      items {
        ... on ContentfulComponentFormulario {
          __typename
          name
          items {
            ... on ContentfulComponentFormInput {
              __typename
              name
              title
              inputs {
                ... on ContentfulItemInput {
                  __typename
                  name
                  title
                  type
                  placeholder
                  required
                }
                ... on ContentfulItemLabelTag {
                  __typename
                  name
                  title
                  text
                }
              }
            }
          }
        }
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
        ... on ContentfulComponentCard {
          __typename
          name
          title
          cards {
            ... on ContentfulItemCard {
              __typename
              id
              name
              header
              textRight
              textLeft
              title
              imageAbove
              image {
                fluid(maxHeight: 500, maxWidth: 500) {
                  srcWebp
                }
              }
              content {
                content
              }
            }
            ... on ContentfulItemCardRoom {
              __typename
              id
              name
              aireAcondicionado
              camas
              title
              vistasAlMar
              television
              numeroHabitacion
              precio
              image {
                fluid(maxHeight: 500, maxWidth: 500) {
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
        title
        logo {
          logo {
            fluid {
              srcWebp
            }
          }
        }
        email
        direccion
        telefono
      }
    }
  }
`;

export default pageTemplate;
