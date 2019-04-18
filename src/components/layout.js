import React from "react"
import { Link } from "gatsby"

import Bio from "./bio"
import { rhythm, scale } from "../utils/typography"

class Layout extends React.Component {
  render() {
    const { location, siteMetadata, children } = this.props
    const title = siteMetadata.title
    const rootPath = `${__PATH_PREFIX__}/`
    let header

    if (location.pathname === rootPath) {
      header = (
        <>
          <hgroup style={{
            marginBottom: rhythm(1 / 4),
          }}>
            <h1 style={{ ...scale(1.5), marginBottom: 0, }}>
              <Link
                style={{
                  boxShadow: `none`,
                  textDecoration: `none`,
                  color: `inherit`,
                }}
                to={`/`}
              >
                {siteMetadata.author}
              </Link>
            </h1>
            <h2 style={{ marginBottom: rhythm(1/4) }}>{siteMetadata.jobTitle}</h2>
          </hgroup>
          <Bio
            showLocation
            showPhoneNumber
            showEmail
            showPortfolio
            showGithub
            showStackoverflow
            showLinkedin
            showTwitter
          />
        </>
      )
    } else {
      header = (
        <h3
          style={{
            fontFamily: `Montserrat, sans-serif`,
            marginTop: 0,
          }}
        >
          <Link
            style={{
              boxShadow: `none`,
              textDecoration: `none`,
              color: `inherit`,
            }}
            to={`/`}
          >
            {title}
          </Link>
        </h3>
      )
    }
    return (
      <div
        style={{
          marginLeft: `auto`,
          marginRight: `auto`,
          maxWidth: rhythm(24),
          padding: `${rhythm(1.5)} ${rhythm(3 / 4)}`,
        }}
      >
        <header>{header}</header>
        <main>{children}</main>
      </div>
    )
  }
}

export default Layout
