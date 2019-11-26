import React from "react"
import { /*Link,*/ graphql } from "gatsby"
import moment from "moment"
// import 'moment-precise-range-plugin';

import { Layout, VerbosityContext } from "../components/layout"
import SEO from "../components/seo"
import { rhythm } from "../utils/typography"
import TextSpacer from "../components/text-spacer"

class Experience extends React.PureComponent {
  static contextType = VerbosityContext;

  static sections = ['roles', 'tech', 'tools'];
  static clipLargeDurations = true;
  static clipSmallDurations = true;

  constructor( props ) {
    super( props )

    this.state = {
      fusions: {},
    }

    moment.relativeTimeRounding( Math.ceil )

    this.fusePosts = this.fusePosts.bind( this )
    this.fusePosts( props.data.allMarkdownRemark.edges )
  }

  getDuration( startTime, endTime ) {
    if ( !startTime ) {
      throw new Error( 'startTime is required' )
    }

    startTime = moment( startTime )

    if ( endTime ) {
      endTime = moment( endTime )
    } else {
      endTime = moment()
    }

    const duration = endTime.diff( startTime )

    return {
      duration,
      "imprecise": moment.duration( duration ),
      // "precise": moment.preciseDiff( startTime, endTime ),
    };
  }

  getTypeText( type ) {
    return `${type.slice(0,1).toUpperCase()}${type.slice(1)}`
  }

  getBareSlug( slug ) {
    return slug.split( '/' )[1]
  }

  fusePosts( posts ) {
    const state = {
      fusions: {}
    }

    posts.forEach( ( { node } ) => {
      const postId = this.getBareSlug( node.fields.slug )

      if ( node.frontmatter.fusible ) {
        state.fusions[postId] = state.fusions[postId] || {
          node: {},
          candidates: null,
        }

        state.fusions[postId].node = node
        state.fusions[postId].result = node
      } else if ( node.frontmatter.parent ) {
        const parent = node.frontmatter.parent
        state.fusions[parent] = state.fusions[parent] || {}
        state.fusions[parent].candidates = state.fusions[parent].candidates || []
        state.fusions[parent].candidates.push( node )
      }
    } )

    Object.keys( state.fusions ).forEach( ( fusion ) => {
      state.fusions[fusion].candidates.forEach( ( candidate ) => {
        Experience.sections.forEach( ( field ) => {
          const existing = state.fusions[fusion].node.frontmatter[field]
          const toCombine = candidate.frontmatter[field]
          const combined = existing.concat( toCombine )
          state.fusions[fusion].result.frontmatter[field] = Array.from( new Set( combined ) )
        } )
      } )
    } )

    // eslint-disable-next-line
    this.state = {
      ...this.state,
      ...state,
    }
  }
  //
  // unfusePosts() {
  //
  // }
  getFusedPosts( posts ) {
    return posts.map( ( { node } ) => {
      const postId = this.getBareSlug( node.fields.slug )

      if ( Object.prototype.hasOwnProperty.call(
        this.state.fusions,
        postId,
      ) ) {
        return { node: this.state.fusions[postId].result }
      }

      return { node }
    } ).filter( ( { node } ) => {
      return node && !node.frontmatter.parent
    } )
  }

  alphabetize( a, b ) {
    return a.localeCompare( b );
  }

  getRelativeTime( durationObject ) {
    return (
      durationObject.imprecise.humanize()
        .replace( /a (second|minute|hour|day|week|month|year)/i, '1 $1' )
        .split( ' ' )
    )
  }

  printTime( relativeTime ) {
    let humanized = relativeTime.join( ' ' );

    if ( Experience.clipLargeDurations && relativeTime[1] === 'years' ) {
      let number = parseInt( relativeTime[0], 10 );
      
      if ( number > 10 ) {
        humanized = `10+ years`;
      }
    }

    return humanized;
  }

  render() {
    const { data } = this.props
    const siteMetadata = data.site.siteMetadata
    // const toggleDisplay = ( slug, display ) => {


    //   console.log( display[slug] )
    // }

    return (
      <Layout location={ this.props.location } siteMetadata={ siteMetadata } posts={ data.allMarkdownRemark.edges }>
        <VerbosityContext.Consumer>{
          ( layoutState ) => {
            const { verbosity, display, toggleCustomExperienceVisibility } = layoutState
            let posts

            switch ( verbosity ) {
              case 'Curriculum Vitæ':
                posts = data.allMarkdownRemark.edges
              break

              case 'Résumé':
              default:
                posts = this.getFusedPosts( data.allMarkdownRemark.edges )
              break
            }

            return (
              <>
              <SEO title={ verbosity } />
              { posts.map( ( { node }, index ) => {
                const { org, contractingOrg, type, startDate, startDateFormatted, endDate, endDateFormatted, remote, location } = node.frontmatter
                const title = node.frontmatter.title || node.fields.slug
                const timeOnJob = this.getDuration( startDate, endDate )

                Experience.sections.forEach( ( section ) => {
                  node.frontmatter[section] = node.frontmatter[section]
                    // Remove duplicates
                    .filter( ( item, index ) => node.frontmatter[section].indexOf( item ) === index )
                    .sort( this.alphabetize )
                } )

                const relativeTime = this.getRelativeTime( timeOnJob )
                const bareSlug = this.getBareSlug( node.fields.slug )

                return (
                  <article
                    id={ bareSlug }
                    key={ bareSlug }
                    className={ `experience-item${!display[node.fields.slug].current ? ' experience-item--collapsed' : ''}` }
                  >
                    <button
                      className="toggle-experience"
                      onClick={ () => toggleCustomExperienceVisibility( node.fields.slug ) }
                    >
                      <span>{ display[node.fields.slug].current ? '-' : '+' }</span>
                    </button>
                    <header
                      style={{
                        marginBottom: rhythm(1 / 4),
                      }}
                    >
                      <h3
                        style={{
                          marginBottom: rhythm(1 / 4),
                        }}
                      >
                        <b className="title">{title}</b>, <span className="org">{org}</span> { contractingOrg && <span className="contractingOrg">(via {contractingOrg})</span>}
                      </h3>
                      <div className="job-attributes">
                        <span className={ `job-type job-type--${type}` }>{ this.getTypeText( type ) }</span>
                        <TextSpacer dot />
                        <time dateTime={ timeOnJob.imprecise.toISOString() }>
                          <time dateTime={ startDate }>
                            { startDateFormatted }
                          </time> – {
                            endDate ?
                            <time dateTime={ endDate }>
                              { endDateFormatted }
                            </time>
                            : 'Current'
                          }{
                            ( relativeTime[1] !== 'days' )
                            && ( relativeTime[1] !== 'weeks' )
                            && <>
                              {` `}
                              <span className="duration-human">
                                <span className="duration-human__paren">(</span>{
                                  this.printTime( relativeTime )
                                }<span className="duration-human__paren">)</span>
                              </span>
                            </>
                          }
                        </time>
                        <TextSpacer dot />
                        <span>{
                          ( remote === null ) ?
                          `Remote / ${location}` : (
                            remote ? 'Remote' : location
                          )
                        }</span>
                      </div>
                    </header>
                    <div
                      hidden={ verbosity === 'Résumé' }
                      style={{
                        marginBottom: rhythm(1 / 2),
                      }}
                      dangerouslySetInnerHTML={{
                        __html: node.frontmatter.description || node.html,
                      }}
                    />
                    <footer>
                      <dl>
                        {node.frontmatter.roles && <><dt>Roles</dt> <dd>{ node.frontmatter.roles.join( ', ' )}</dd></>}
                        {node.frontmatter.tech && <><dt>Tech</dt> <dd>{ node.frontmatter.tech.join( ', ' )}</dd></>}
                        {node.frontmatter.tools && <><dt>Tools</dt> <dd>{
                          // Strip version numbers which are no longer relevant
                          // without deleting version information on the backend
                          node.frontmatter.tools.map(
                            tool => tool
                              .replace( /(Sublime Text|Twitter Bootstrap|ZURB Foundation) [0-9]+/i, '$1' )
                              .replace( 'Twitter Bootstrap', 'Bootstrap' )
                          ).join( ', ' )
                        }</dd></> }
                      </dl>
                    </footer>
                  </article>
                )
              } ) }
              </>
            )
          }
        }</VerbosityContext.Consumer>
      </Layout>
    )
  }
}

export default Experience

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        author
        jobTitle
      }
    }
    allMarkdownRemark(
      sort: {
        fields: [frontmatter___endDate, frontmatter___startDate],
        order: DESC
      }
    ) {
      edges {
        node {
          excerpt
          html
          fields {
            slug
          }
          frontmatter {
            startDate
            startDateFormatted: startDate(formatString: "MMMM YYYY")
            endDate
            endDateFormatted: endDate(formatString: "MMMM YYYY")
            org
            contractingOrg
            location
            remote
            defaultDisplay
            type
            title
            description
            roles
            tech
            tools
            fusible
            parent
          }
        }
      }
    }
  }
`
