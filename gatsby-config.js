/**
 * Configure your Gatsby site with this file.
 *
 * See: https://www.gatsbyjs.org/docs/gatsby-config/
 */

module.exports = {
  siteMetadata: {
    title: 'Danv',
    description: "Danv's personal website",
  },
  plugins: [
    'gatsby-plugin-emotion',
    'gatsby-plugin-react-helmet',
    {
      resolve: 'gatsby-plugin-manifest',
      options: {
        name: 'Danv',
        short_name: 'Danv',
        start_url: '/',
        background_color: '#fff',
        theme_color: '#fff',
        display: 'standalone',
        icon: 'static/icon.png',
      },
    },
    {
      resolve: 'gatsby-plugin-react-svg',
      options: {
        rule: {
          include: /assets/,
        },
      },
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'pages',
        path: `${__dirname}/src/pages/`,
      },
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'content',
        path: `${__dirname}/src/content/`,
      },
    },
    {
      resolve: 'gatsby-transformer-remark',
      options: {
        plugins: [
          {
            resolve: 'gatsby-remark-images',
            options: {
              maxWidth: 1024,
              linkImagesToOriginal: false,
            },
          },
          'gatsby-remark-copy-linked-files',
        ],
      },
    },
    {
      resolve: 'gatsby-plugin-nprogress',
      options: {
        showSpinner: false,
        color: '#A9E5BB',
      },
    },
    {
      resolve: 'gatsby-plugin-gdpr-cookies',
      options: {
        googleAnalytics: {
          trackingId: process.env.GA_ID,
        },
      },
    },
    'gatsby-transformer-sharp',
    'gatsby-plugin-sharp',
    'gatsby-plugin-catch-links',
    'gatsby-plugin-offline',
    'gatsby-plugin-gatsby-cloud',
  ],
};
