import React from "react"
import { Link } from "gatsby"

import Bio from "./bio"
import Toggle from "./toggle"
import SaveAs from "./save-as"
import { rhythm/*, scale*/ } from "../utils/typography"

const VerbosityContext = React.createContext( {
  verbosity: 'Résumé',
  setVerbosity: () => {},
} );

class Layout extends React.Component {
  constructor( props ) {
    super( props );

    this.state = {
      verbosity: 'Résumé',
      setVerbosity: this.setVerbosity.bind( this ),
      display: {},
      headingDisplay: {
        'selected-experience': {
          current: true,
          // user: false,
        }
      },
      toggleCustomExperienceVisibility: ( slug ) => {
        const newState = {
          ...this.state
        }
        const newVisibility = !newState.display[slug].current

        newState.display[slug].current = newVisibility
        newState.display[slug].user = newVisibility

        this.setState( newState )
      },
      toggleHeadingVisibility: ( headingSlug ) => {
        const newState = {
          ...this.state,
        };
        const newHeadingVisibility = !newState.headingDisplay[headingSlug].current;

        newState.headingDisplay[headingSlug].current = newHeadingVisibility;
        // newState.headingDisplay[headingSlug].user = newHeadingVisibility;

        this.setState( newState );
      }
    }

    // console.log( props )

    this._setInitialExperienceVisibility( props.posts )
  }

  modifyAllExperienceVisibility( newState, fields, mode ) {
    if ( typeof fields === 'string' ) {
      fields = [fields]
    }

    switch ( mode ) {
      case 'on':
        mode = true
      break

      case 'off':
        mode = false
      break

      case 'restore':
        break

      case 'toggle':
        break

      default:
        mode = !!mode
    }

    Object.keys( this.state.display ).forEach( ( slug ) => {
      // eslint-disable-next-line
      fields.forEach( ( field ) => {
        if ( mode === 'restore' ) {
          newState.display[slug][field] = this.state.display[slug].user
        } else if ( mode === 'toggle' ) {
          if ( field === 'user' ) {
            const toggled = !this.state.display[slug].current
            newState.display[slug].user = toggled
            newState.display[slug].current = toggled
          } else {
            newState.display[slug][field] = !this.state.display[slug][field]
          }
        } else {
          newState.display[slug][field] = mode
        }
      } )
    } )

    return newState
  }

  _setInitialExperienceVisibility( edges ) {
    edges.forEach( ( { node } ) => {
      const defaultDisplay = node.frontmatter.defaultDisplay;

      // eslint-disable-next-line
      this.state.display[node.fields.slug] = {
        default: defaultDisplay,
        user: defaultDisplay,
        current: defaultDisplay,
      }
    } )
  }

  setVerbosity( event ) {
    const verbosity = event.target.textContent
    let newState = {
      ...this.state
    }

    switch ( verbosity ) {
      case 'Curriculum Vitæ':
        newState = this.modifyAllExperienceVisibility( newState, 'current', 'on' )
      break

      case 'Résumé':
      default:
        newState = this.modifyAllExperienceVisibility( newState, 'current', 'restore' )
      break
    }

    this.setState( previousState => ( {
      ...previousState,
      ...newState,
      verbosity,
    } ) )
  }

  render() {
    const { location, siteMetadata, children } = this.props
    const title = siteMetadata ? siteMetadata.title : ''
    const rootPath = `${__PATH_PREFIX__}/`
    let header

    if ( location.pathname === rootPath ) {
      header = (
        <>
          <div className="img-container" style={ { textAlign: "left", width: "32rem", marginRight: "auto" } }>
            <img src="/eliassen-group.png" alt="Recruitment firm logo" style={ { width: "50%" } } />
          </div>
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
            {/* <h2 style={{ marginBottom: rhythm(1/4) }}>{siteMetadata.jobTitle}</h2> */}
          </hgroup>
          <VerbosityContext.Consumer>{
            ( { verbosity } ) =>
              <Bio
                showLocation={ verbosity === 'Curriculum Vitæ' }
                // showPhoneNumber
                // showEmail
                // showPortfolio
                // showGithub
                // showStackoverflow
                // showLinkedin
                // showTwitter
                showDescription={ verbosity === 'Curriculum Vitæ' }
                portfolioLinkTracking={ verbosity }
                portfolioName="Website"
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
          <menu style={ {
            paddingLeft: 0,
            textAlign: "center",
            display: "flex",
            justifyContent: "space-between",
            width: "29rem",
            margin: "0 auto",
          } }>
            <Toggle
              style={ { marginBottom: rhythm(1) } }
            />
            <SaveAs />
          </menu>
          <header style={ {
            textAlign: `center`,
          } }>{ header }</header>
          <div className="columns">
            <aside style={ {
              width: rhythm(53),
              marginLeft: rhythm(1.5),
              fontSize: rhythm(1/1.6)
            } }>
              <h2 className="h3">Top Tech</h2>
              <ul>
                <li>React</li>
                <li>Node.js</li>
                <li>JavaScript (ES6+)</li>
                <li>HTML5</li>
                <li>CSS3</li>
              </ul>

              {/* <h2 className="h3">Languages</h2>
              <ul>
                <li>English (Native)</li>
                <li>Japanese (Elementary)</li>
              </ul> */}

              <h2 className="h3">Certifications</h2>
              <ul>
                <li>Arc.dev Certified Developer</li>
              </ul>

              <h2 className="h3">Honors &amp; Awards</h2>
              <ul>
                <li>Runner-Up, TechCrunch Disrupt NY Hackathon 2017</li>
              </ul>

              <h2 className="h3">Other Training</h2>
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
