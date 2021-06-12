import React, { useEffect } from "react";
// import { graphql } from "gatsby";

import Layout from "../components/layout.js";
// import Header from "../components/Header/Header";
// import ComponentList from "../utils/ComponentList";

import "../styles/style.scss";

// const axios = require("axios");

// const config = {
//   method: "GET",
//   url: "http://localhost:3000/api",
// };

const Users = () => {
  // useEffect(() => {
  //   axios(config)
  //     .then((response) => {
  //       response.json();
  //       console.log("Response", response);
  //     })
  //     .catch((error) => console.log(error));
  // });

  useEffect(() => {
    fetch("/api")
      .then((response) => {
        const object = response.json();
        return object;
      })
      .then(({ name }) => {
        console.log(name);
      });
  }, []);

  // const answer = await request.json()

  // console.log(answer)
  //   const { items, header } = data.contentfulPage;

  return (
    <>
      <Layout>
        {/* {items.map((item, index) => {
          console.log("item", item);
          const Component = ComponentList[item.__typename];
          return Component ? <Component key={index} {...item} /> : null;
        })} */}
      </Layout>
      <footer className="footer"></footer>
    </>
  );
};

export default Users;
