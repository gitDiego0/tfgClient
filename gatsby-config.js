var proxy = require("http-proxy-middleware");

module.exports = {
  developMiddleware: (app) => {
    app.use(
      "/api",
      proxy({
        target: "http://localhost:3000",
      })
    );
  },
  siteMetadata: {
    title: "hostalapp",
  },
  plugins: [
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
