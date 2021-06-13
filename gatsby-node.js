const path = require("path");
const slugify = require("slugify");

exports.createPages = ({ actions, graphql }) => {
  const { createPage } = actions;
  const pageTemplate = path.resolve("src/templates/page-template.js");
  const hostalTemplate = path.resolve("src/templates/hostal-template.js");
  const restaurantTemplate = path.resolve(
    "src/templates/restaurant-template.js"
  );
  const adminTemplate = path.resolve("src/templates/admin-template.js");
  const adminInicioTemplate = path.resolve(
    "src/templates/admin_inicio-template.js"
  );

  const page = graphql(`
    query pages {
      allContentfulPage {
        nodes {
          id
          title
        }
      }
    }
  `).then((result) => {
    if (result.errors) {
      throw result.errors;
    }
    const {
      allContentfulPage: { nodes },
    } = result.data;

    // console.log(nodes);

    nodes.forEach((node) => {
      console.log("node.title: ", node.title);
      const slug = slugify(node.title, {
        replacement: "-",
        remove: null,
        lower: true,
      });
      const path = `/${slug}`;
      createPage({
        path,
        component:
          node.title === "Hostal"
            ? hostalTemplate
            : node.title === "Restaurante"
            ? restaurantTemplate
            : node.title === "Admin"
            ? adminTemplate
            : node.title === "Admin-Inicio"
            ? adminInicioTemplate
            : pageTemplate,
        context: { id: node.id },
      });
    });
  });
  exports.onCreateWebpackConfig = ({ stage, loaders, actions }) => {
  if (stage === "build-html" || stage === "develop-html") {
    actions.setWebpackConfig({
      module: {
        rules: [
          {
            test: /firebase/,
            use: loaders.null(),
          },
        ],
      },
    })
  }
}
  return Promise.all([page]);
};
