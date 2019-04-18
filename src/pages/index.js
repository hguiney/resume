import React from "react"
import { /*Link,*/ graphql } from "gatsby"
import moment from "moment"

import { Layout, VerbosityContext } from "../components/layout"
import SEO from "../components/seo"
import { rhythm } from "../utils/typography"
import TextSpacer from "../components/text-spacer"

class Experience extends React.Component {
  static contextType = VerbosityContext;

  constructor( props ) {
    super( props )

    this.state = {
      fusions: {},
    }

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

    return moment.duration( endTime.diff( startTime ) );
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
        state.fusions[node.frontmatter.parent] = state.fusions[node.frontmatter.parent] || {}
        state.fusions[node.frontmatter.parent].candidates = state.fusions[node.frontmatter.parent].candidates || []
        state.fusions[node.frontmatter.parent].candidates.push( node )
      }
    } )

    Object.keys( state.fusions ).forEach( ( fusion ) => {
      state.fusions[fusion].candidates.forEach( ( candidate ) => {
        [ 'roles', 'tech', 'tools', ].forEach( ( field ) => {
          const existing = state.fusions[fusion].node.frontmatter[field]
          const toCombine = candidate.frontmatter[field]
          const combined = existing.concat( toCombine )
          state.fusions[fusion].result.frontmatter[field] = Array.from( new Set( combined ) )
        } )
      } )
    } )

    // this.setState( state )
    this.state = state
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

  render() {
    const { data } = this.props
    const siteMetadata = data.site.siteMetadata


    return (
      <Layout location={ this.props.location } siteMetadata={ siteMetadata }>
        <SEO />
        <VerbosityContext.Consumer>{
          ( { verbosity } ) => {
            let posts

            switch ( verbosity ) {
              case 'short':
                posts = this.getFusedPosts( data.allMarkdownRemark.edges )
              break

              case 'long':
              default:
                posts = data.allMarkdownRemark.edges
              break
            }

            return (
              posts.map( ( { node } ) => {
                const { org, type, startDate, startDateFormatted, endDate, endDateFormatted, remote, location } = node.frontmatter
                const title = node.frontmatter.title || node.fields.slug
                const timeOnJob = this.getDuration( node.frontmatter.startDate, node.frontmatter.endDate )

                return (
                  <article
                    key={ this.getBareSlug( node.fields.slug ) }
                    className="experience-item"
                  >
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
                        <b>{title}</b>, {org}
                      </h3>
                      <div className="job-attributes">
                        <span className={ `job-type job-type--${type}` }>{ this.getTypeText( type ) }</span>
                        <TextSpacer dot />
                        <time dateTime={ timeOnJob.toISOString() }>
                          <time dateTime={ startDate }>
                            { startDateFormatted }
                          </time> – {
                            endDate ?
                            <time dateTime={ endDate }>
                              { endDateFormatted }
                            </time>
                            : 'Current'
                          } <span className="duration-human">
                            <span className="duration-human__paren">(</span>{
                              timeOnJob.humanize()
                            }<span className="duration-human__paren">)</span>
                          </span>
                        </time>
                        <TextSpacer dot />
                        <span>{ remote ? 'Remote' : location }</span>
                      </div>
                    </header>
                    <div
                      hidden={ verbosity === 'short' }
                      style={{
                        marginBottom: rhythm(1 / 2),
                      }}
                      dangerouslySetInnerHTML={{
                        __html: node.frontmatter.description || node.html,
                      }}
                    />
                    <footer>
                      <dl>
                        {node.frontmatter.roles && <><dt>Roles</dt> <dd>{node.frontmatter.roles.join( ', ' )}</dd></>}
                        {node.frontmatter.tech && <><dt>Tech</dt> <dd>{node.frontmatter.tech.join( ', ' )}</dd></>}
                        {node.frontmatter.tools && <><dt>Tools</dt> <dd>{node.frontmatter.tools.join( ', ' )}</dd></>}
                      </dl>
                    </footer>
                  </article>
                )
              } )
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
        title
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
            location
            remote
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
