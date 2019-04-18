import React from "react"
import { Link } from "gatsby"

import Bio from "./bio"
import Toggle from "./toggle"
import { rhythm/*, scale*/ } from "../utils/typography"

const VerbosityContext = React.createContext( {
  verbosity: 'short',
  setVerbosity: () => {},
} );

class Layout extends React.Component {
  constructor( props ) {
    super( props );

    this.state = {
      verbosity: 'long',
      setVerbosity: this.setVerbosity.bind( this )
    }
  }

  setVerbosity( event ) {
    const form = event.target.textContent.toLowerCase()

    if ( form === 'short form' ) {
      this.setState( previousState => ( {
        ...previousState,
        verbosity: 'short',
      } ) )
    } else {
      this.setState( previousState => ( {
        ...previousState,
        verbosity: 'long',
      } ) )
    }
  }

  render() {
    const { location, siteMetadata, children } = this.props
    const title = siteMetadata.title
    const rootPath = `${__PATH_PREFIX__}/`
    let header

    if ( location.pathname === rootPath ) {
      header = (
        <>
          <hgroup style={{
            marginBottom: rhythm(1 / 4),
          }}>
            <h1 style={{ marginBottom: 0, }}>
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
          <VerbosityContext.Consumer>{
            ( { verbosity } ) =>
              <Bio
                showLocation={ verbosity === 'long' }
                showPhoneNumber
                showEmail
                showPortfolio
                showGithub
                showStackoverflow
                showLinkedin
                showTwitter
                showDescription={ verbosity === 'long' }
              />
          }</VerbosityContext.Consumer>
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
      <VerbosityContext.Provider value={ this.state }>
        <div
          id="page"
          style={ {
            marginLeft: `auto`,
            marginRight: `auto`,
            maxWidth: rhythm( 24 ),
            minWidth: rhythm( 19 ),
            padding: `${ rhythm( 1.5 ) } ${ rhythm( 3 / 4 ) }`,
          } }
        >
          <Toggle
            style={ { marginBottom: rhythm(1) } }
          />
          <header style={ {
            textAlign: `center`,
          } }>{ header }</header>
          <main>{ children }</main>
        </div>
      </VerbosityContext.Provider>
    )
  }
}

export { Layout, VerbosityContext }
