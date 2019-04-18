import React from "react"
import { /*Link,*/ graphql } from "gatsby"

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
          const title = node.frontmatter.title || node.fields.slug
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
                  <b>{title}</b>, {node.frontmatter.org}
                </h3>
                <div>
                  <time>
                    <time dateTime={node.frontmatter.startDate}>
                      {node.frontmatter.startDateFormatted}
                    </time> – { node.frontmatter.endDate ?
                      <time dateTime={node.frontmatter.endDate}>
                        {node.frontmatter.endDateFormatted}
                      </time> : 'Current'
                    }
                  </time>
                  <span style={{ margin: `0 .25rem` }}> • </span>
                  <span>{node.frontmatter.remote ? 'Remote' : node.frontmatter.location}</span>
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
