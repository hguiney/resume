/**
 * SEO component that queries for data with
 *  Gatsby's useStaticQuery React hook
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */

import React from "react"
import PropTypes from "prop-types"
import Helmet from "react-helmet"
import { useStaticQuery, graphql } from "gatsby"

function SEO( { description, lang, meta, keywords, title } ) {
  const { site } = useStaticQuery(
    graphql`
      query {
        site {
          siteMetadata {
            description
            author
          }
        }
      }
    `
  )

  title = title || site.siteMetadata.title
  const metaDescription = description || site.siteMetadata.description
  // const isHomepage = ( title === site.siteMetadata.title )
  const displayTitle = `${site.siteMetadata.author}’s ${title}`;

  return (
    <Helmet
      htmlAttributes={ {
        lang,
      } }
      title={ displayTitle }
      // titleTemplate={ `${site.siteMetadata.author}’s %s` }
      meta={ [
        {
          name: `description`,
          content: metaDescription,
        },
        {
          property: `og:title`,
          content: displayTitle,
        },
        {
          property: `og:description`,
          content: metaDescription,
        },
        {
          property: `og:type`,
          content: `website`,
        },
        {
          name: `twitter:card`,
          content: `summary`,
        },
        {
          name: `twitter:creator`,
          content: site.siteMetadata.author,
        },
        {
          name: `twitter:title`,
          content: displayTitle,
        },
        {
          name: `twitter:description`,
          content: metaDescription,
        },
      ]
        .concat(
          keywords.length > 0
            ? {
                name: `keywords`,
                content: keywords.join(`, `),
              }
            : []
        )
        .concat( meta ) }
    >
      <style>{`
        .summary-section li::after {
          content: ', ';
          display: 'inline';
        }

        .summary-section li:last-child::after {
          content: none;
        }

        .summary-section:last-child * {
          margin-bottom: 0;
        }
      `}</style>
    </Helmet>
  )
}

SEO.defaultProps = {
  lang: `en`,
  meta: [],
  keywords: [],
  description: ``,
}

SEO.propTypes = {
  description: PropTypes.string,
  lang: PropTypes.string,
  meta: PropTypes.arrayOf(PropTypes.object),
  keywords: PropTypes.arrayOf(PropTypes.string),
  title: PropTypes.string,
}

export default SEO
