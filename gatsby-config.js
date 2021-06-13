var proxy = require("http-proxy-middleware");

 const URL = "http://18.191.197.120:3000"
//const URL = "http:hostalapp:3000";

module.exports = {
  developMiddleware: (app) => {
    app.use(
      "/api",
      proxy({
        target: `${URL}`,
      })
    );
  },
  siteMetadata: {
    title: "hostalapp",
  },
  plugins: [
    {
      resolve: `gatsby-plugin-paypal`,
      options: {
        clientId: `Ad8AdKBC2H0hXNW_nhLgSwqHKWta4yZsJLAKvZ7_ugMC5BsUAi5H1LxcMoRP6GTUt32PXm4hjtbWDpGU`,
        currency: `EUR`,
        vault: false,
      },
    },
    {
      resolve: "gatsby-source-contentful",
      options: {
        accessToken: "qijCKtuKmwIB6w35rBoZpQa45B3bro4UaJg85zvjSLo",
        spaceId: "bpwjo4qqdamv",
      },
    },

    "gatsby-plugin-sass",
    {
      resolve: "gatsby-plugin-google-analytics",
      options: {
        trackingId: "G-2XJQJ60ESM",
      },
    },
    "gatsby-plugin-react-helmet",
    {
      resolve: "gatsby-plugin-manifest",
      options: {
        icon: "src/images/icon.png",
      },
    },
  ],
};

exports.onCreateWebpackConfig = ({ stage, loaders, actions }) => {
  if (stage === "build-html") {
    actions.setWebpackConfig({
      module: {
        rules: [
          {
            test: /firebase/,
            use: loaders.null(),
          },
        ],
      },
    });
  }
};
