/**
 * Bio component that queries for data
 * with Gatsby's StaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/static-query/
 */

import React from "react"
import { StaticQuery, graphql } from "gatsby"
// import Image from "gatsby-image"

import TextSpacer from "./text-spacer"
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
              switch ( prop ) {
                case 'showLocation':
                  return !!this.props.showLocation && <span id="location" className="bio__attribute bio__attribute--location">{ location.city }, { location.region }, { location.country }</span>
                case 'showPhoneNumber':
                  return !!this.props.phoneNumber && <span id="phone-number" className="bio__attribute bio__attribute--phone-number">phoneNumber</span>
                case 'showEmail':
                  return !!this.props.showEmail && <a id="email" className="bio__attribute bio__attribute--email" href={ `mailto:${email}` }>{ email }</a>
                case 'showPortfolio':
                  return !!this.props.showPortfolio && <a id="portfolio" className="bio__attribute bio__attribute--portfolio" href={ portfolioUrl }>Portfolio</a>
                case 'showGithub':
                  return !!this.props.showGithub && <a id="github" className="bio__attribute bio__attribute--github" href={ `https://github.com/${social.github}` }>GitHub</a>
                case 'showStackoverflow':
                  return !!this.props.showStackoverflow && <a id="stackoverflow" className="bio__attribute bio__attribute--stackoverflow" href={ `https://stackoverflow.com/users/${social.stackoverflow}` }>Stack Overflow</a>
                case 'showLinkedin':
                  return !!this.props.showLinkedin && <a id="linkedin" className="bio__attribute bio__attribute--linkedin" href={ `https://www.linkedin.com/in/${social.linkedin}` }>LinkedIn</a>
                case 'showTwitter':
                  return !!this.props.showTwitter && <a id="twitter" className="bio__attribute bio__attribute--twitter" href={ `https://twitter.com/${social.twitter}` }>Twitter</a>
                default:
                  // eslint-disable-next-line
                  return;
              }
            } )
            .filter( ( value ) => {
              return !!value
            } )

          return (
            <div>
              <p
                hidden={ !this.props.showDescription }
                style={ {
                  marginBottom: rhythm( 1 / 4 ),
                  marginLeft: `auto`,
                  marginRight: `auto`,
                } }
              >{
                description
              }</p>
              <p style={ {
                marginLeft: `auto`,
                marginRight: `auto`,
              } }>{
                contactMethods.map( ( contactMethod, index ) => {
                  return (
                    <span key={ contactMethod.props.id }>
                      { contactMethod }
                      { ( index !== contactMethods.length - 1 ) && <TextSpacer dot /> }
                    </span>
                  )
                } )
              }</p>
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
