exports.createPages = async ({ actions, graphql, reporter }) => {
  const { createPages } = actions

  const sectionTemplate = require.resolve(`./src/templates/sectionTemplate.js`)

  const result = await graphql(`
    allMarkdownRemark(
      limit: 1000
    ) {
      edges {
        node {
          frontmatter {
            slug
          }
        }
      }
    }
  `)

  // Handle errors
  if (result.errors) {
    reporter.panicOnBuild(`Error while running GraphQL query.`)
    return
  }

  result.data.allMarkdownRemark.edges.forEach(({ node }) => {
    createPages({
      path: node.frontmatter.slug,
      component: sectionTemplate,
      context: {
        // additional data can be passed via context
        slug: node.frontmatter.slug,
      },
    })
  })
}