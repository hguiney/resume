import React from "react"
import { /*Link,*/ graphql } from "gatsby"
import moment from "moment"

import Layout from "../components/layout"
import Toggle from "../components/toggle"
import SEO from "../components/seo"
import { rhythm } from "../utils/typography"

class Experience extends React.Component {
  constructor(props) {
    super(props);

    this.onToggle = this.onToggle.bind(this)

    this.state = {
      shortForm: false,
    }
  }

  onToggle( event ) {
    const form = event.target.textContent.toLowerCase()

    if ( form === 'short form' ) {
      this.setState(previousState => ({
        shortForm: true,
      }))
    } else {
      this.setState(previousState => ({
        shortForm: false,
      }))
    }
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

  render() {
    const { data } = this.props
    const siteMetadata = data.site.siteMetadata
    const posts = data.allMarkdownRemark.edges

    return (
      <Layout location={this.props.location} siteMetadata={siteMetadata}>
        <SEO />
        <Toggle
          form={this.state.shortForm ? `short` : `long`}
          onToggle={this.onToggle}
          style={{ marginBottom: rhythm(1) }}
        />
        {posts.map(({ node }) => {
          const { org, type, startDate, startDateFormatted, endDate, endDateFormatted, remote, location } = node.frontmatter
          const title = node.frontmatter.title || node.fields.slug
          const timeOnJob = this.getDuration( node.frontmatter.startDate, node.frontmatter.endDate )

          return (
            <article key={node.fields.slug}>
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
                  <span className={`job-type job-type--${type}`}>{this.getTypeText(type)}</span>
                  <span style={{ margin: `0 .25rem` }}> </span>
                  <time dateTime={timeOnJob.toISOString()}>
                    <time dateTime={startDate}>
                      {startDateFormatted}
                    </time> – {
                      endDate ?
                      <time dateTime={endDate}>
                        {endDateFormatted}
                      </time>
                      : 'Current'
                    } <span className="duration-human">
                      <span className="duration-human__paren">(</span>{
                        timeOnJob.humanize()
                      }<span className="duration-human__paren">)</span>
                    </span>
                  </time>
                  <span style={{ margin: `0 .25rem` }}> • </span>
                  <span>{remote ? 'Remote' : location}</span>
                </div>
              </header>
              <div
                hidden={ this.state.shortForm }
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
        })}
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
    allMarkdownRemark(sort: { fields: [frontmatter___endDate], order: DESC }) {
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
          }
        }
      }
    }
  }
`
