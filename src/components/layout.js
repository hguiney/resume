import React from "react"
import { Link } from "gatsby"

import Bio from "./bio"
import Toggle from "./toggle"
import SaveAs from "./save-as"
import { rhythm/*, scale*/ } from "../utils/typography"

const VerbosityContext = React.createContext( {
  verbosity: 'short',
  setVerbosity: () => {},
} );

class Layout extends React.Component {
  constructor( props ) {
    super( props );

    this.state = {
      verbosity: 'short',
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
    const title = siteMetadata ? siteMetadata.title : ''
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
            maxWidth: rhythm( 36 ),
            minWidth: rhythm( 19 ),
            padding: `${ rhythm( 1.5 ) } ${ rhythm( 3 / 4 ) }`,
          } }
        >
          <Toggle
            style={ { marginBottom: rhythm(1) } }
          />
          <SaveAs />
          <header style={ {
            textAlign: `center`,
          } }>{ header }</header>
          <div className="columns">
            <aside style={ {
              width: rhythm(53),
              marginLeft: rhythm(1.5),
              fontSize: rhythm(1/1.6)
            } }>
              <h3>Top Tech</h3>
              <ul>
                <li>HTML5</li>
                <li>CSS3</li>
                <li>JavaScript (ES6+)</li>
              </ul>

              <h3>Languages</h3>
              <ul>
                <li>English (Native)</li>
                <li>Japanese (Elementary)</li>
              </ul>

              <h3>Certifications</h3>
              <ul>
                <li>CodementorX Certified Developer</li>
              </ul>

              <h3>Honors &amp; Awards</h3>
              <ul>
                <li>Runner-Up, TechCrunch Disrupt NY Hackathon 2017</li>
              </ul>

              <h3>Other Training</h3>
              <ul>
                <li>Improvisational Theater, ImprovBoston Comedy School</li>
              </ul>
            </aside>
            <main>{ children }</main>
          </div>
        </div>
      </VerbosityContext.Provider>
    )
  }
}

export { Layout, VerbosityContext }
