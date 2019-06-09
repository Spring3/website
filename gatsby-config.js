/**
 * Configure your Gatsby site with this file.
 *
 * See: https://www.gatsbyjs.org/docs/gatsby-config/
 */

module.exports = {
  siteMetadata: {
    title: 'Daniyil Vasylenko'
  },
  plugins: [
    'gatsby-plugin-react-helmet',
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'pages',
        path: `${__dirname}/src/pages/`
      }
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'content',
        path: `${__dirname}/src/content/`
      }
    },
    {
      resolve: 'gatsby-transformer-remark'
    },
    {
      resolve: 'gatsby-plugin-nprogress',
      options: {
        showSpinner: false
      }
    },
    {
      resolve: 'gatsby-plugin-google-analytics',
      options: {
        trackingId: 'UA-141684888-1',
      }
    },
    'gatsby-plugin-catch-links',
    'gatsby-plugin-styled-components'
  ]
}
