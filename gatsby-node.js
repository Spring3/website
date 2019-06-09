const { createFilePath } = require('gatsby-source-filesystem');

exports.onCreateNode = ({ node, getNode, actions }) => {
  if (node.internal.type === 'MarkdownRemark') {
    const { createNodeField } = actions;
    const slug = createFilePath({ node, getNode, basePath: 'content' });
    console.log('slug', slug);
    createNodeField({
      node,
      name: 'slug',
      value: slug
    });
  }
}
