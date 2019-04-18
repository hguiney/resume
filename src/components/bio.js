/**
 * Bio component that queries for data
 * with Gatsby's StaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/static-query/
 */

import React from "react"
import { StaticQuery, graphql } from "gatsby"
// import Image from "gatsby-image"

import { rhythm } from "../utils/typography"

class Bio extends React.Component {
  render() {
    return (
      <StaticQuery
        query={bioQuery}
        render={ data => {
          const {
            description,
            email,
            portfolioUrl,
            phoneNumber,
            location,
            social,
          } = data.site.siteMetadata
          const contactMethods = Object.keys( this.props )
            .map( ( prop ) => {
              switch (prop) {
                case 'showLocation':
                  return `${location.city}, ${location.region}, ${location.country}`
                case 'showPhoneNumber':
                  return phoneNumber
                case 'showEmail':
                  return `<a href="mailto:${email}">${email}</a>`
                case 'showPortfolio':
                  return `<a href="${portfolioUrl}">Portfolio</a>`
                case 'showGithub':
                  return `<a href="https://github.com/${social.github}">GitHub</a>`
                case 'showStackoverflow':
                  return `<a href="https://stackoverflow.com/users/${social.stackoverflow}">Stack Overflow</a>`
                case 'showLinkedin':
                  return `<a href="https://www.linkedin.com/in/${social.linkedin}">LinkedIn</a>`
                case 'showTwitter':
                  return `<a href="https://twitter.com/${social.twitter}">Twitter</a>`
                default:
                  // eslint-disable-next-line
                  return;
              }
            } )
            .filter( ( value ) => {
              return ( typeof value !== 'undefined' )
            } )

          return (
            <div>
              <p style={{ marginBottom: rhythm(1 / 4) }}>{description}</p>
              <p dangerouslySetInnerHTML={{
                __html: contactMethods.join( ' • ' )
              }} />
            </div>
          )
        } }
      />
    );
  }
}

const bioQuery = graphql`
  query BioQuery {
    avatar: file(absolutePath: { regex: "/profile-pic.jpg/" }) {
      childImageSharp {
        fixed(width: 50, height: 50) {
          ...GatsbyImageSharpFixed
        }
      }
    }
    site {
      siteMetadata {
        author
        description
        email
        portfolioUrl
        phoneNumber
        location {
          city
          region
          country
        }
        social {
          twitter
          linkedin
          github
          stackoverflow
        }
      }
    }
  }
`

export default Bio
