require('dotenv').config()

module.exports = {
  siteMetadata: {
    title: `Hugh Guiney’s Work Experience`,
    author: `Hugh Guiney`,
    // jobTitle: `Web Developer, UX Designer`,
    // jobTitle: `UX Developer`,
    jobTitle: `Senior React Developer & UI/UX Designer`,
    mediaJobTitle: `Past: Senior Software Developer & Designer, Media Producer`,
    // jobTitle: `Senior JavaScript Developer & UI/UX Designer`,
    description: `I handcraft online experiences that are user-focused,  content-driven, and work across devices.`,
    siteUrl: `https://hughx.dev/resume/`,
    email: ( process.env.EMAIL || `email@example.com`),
    portfolioUrl: `https://hughx.dev`,
    phoneNumber: ( process.env.PHONE_NUMBER || `+1 (555) 123-4567`),
    location: {
      city: `Boston`,
      region: `MA`,
      country: `USA`,
    },
    social: {
      twitter: `HughxDev`,
      github: `hguiney`,
      stackoverflow: `214325/hugh-guiney`,
      linkedin: `hughguiney`,
      imdb: `nm4273358`,
      youtube: 'HughGuiney',
    },
  },
  plugins: [
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/content/experience`,
        name: `experience`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/content/assets`,
        name: `assets`,
      },
    },
    {
      resolve: `gatsby-transformer-remark`,
      options: {
        plugins: [
          {
            resolve: `gatsby-remark-images`,
            options: {
              maxWidth: 590,
            },
          },
          {
            resolve: `gatsby-remark-responsive-iframe`,
            options: {
              wrapperStyle: `margin-bottom: 1.0725rem`,
            },
          },
          `gatsby-remark-prismjs`,
          `gatsby-remark-copy-linked-files`,
          `gatsby-remark-smartypants`,
        ],
      },
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-plugin-google-analytics`,
      options: {
        //trackingId: `ADD YOUR TRACKING ID HERE`,
      },
    },
    // `gatsby-plugin-feed`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `Gatsby Starter Blog`,
        short_name: `GatsbyJS`,
        start_url: `/`,
        background_color: `#ffffff`,
        theme_color: `#663399`,
        display: `minimal-ui`,
        icon: `content/assets/gatsby-icon.png`,
      },
    },
    `gatsby-plugin-offline`,
    `gatsby-plugin-react-helmet`,
    {
      resolve: `gatsby-plugin-typography`,
      options: {
        pathToConfigModule: `src/utils/typography`,
      },
    },
  ],
}
