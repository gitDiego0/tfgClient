const path = require("path");
const slugify = require("slugify");

exports.createPages = ({ actions, graphql }) => {
  const { createPage } = actions;
  const pageTemplate = path.resolve("src/templates/page-template.js");

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

    console.log(nodes);

    nodes.forEach((node) => {
      const slug = slugify(node.title, {
        replacement: "-",
        remove: null,
        lower: true,
      });
      const path = `/${slug}`;
      createPage({
        path,
        component: pageTemplate,
        context: { id: node.id },
      });
    });
  });
  return Promise.all([page]);
};
