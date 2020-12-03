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
  static roundUpSmallDurations = true;
  static roundUpHighNumberOfMonthsToOneYear = false;
  static mediaTools = [
    'Airbnb',
    'Asana',
    'Animate',
    'App Store Connect',
    'Apple Podcasts',
    'Audition',
    'Contentful',
    'Design Systems',
    'Dreamweaver',
    'Duolingo',
    'Facebook',
    'Facebook Ads',
    'Facebook API',
    'Facebook Open Graph API',
    'Final Cut Pro',
    'Flash',
    'Flash/Animate',
    'Google Analytics',
    'Google Docs',
    'Google Hangouts Meet',
    'Google Maps API',
    'Google Jamboard',
    'Google PageSpeed Insights/Lighthouse',
    'Illustrator',
    'InDesign',
    'Instagram',
    'Photoshop',
    'Premiere Pro',
    'Salesforce',
    'Schema.org',
    'Shopify',
    // 'Sketch',
    'Slack',
    'Spanish Netflix',
    'Trello',
    'Twitter',
    'Twitter API',
    'Vimeo',
    'Vimeo API',
    'WordPress',
    'YouTube',
    'YouTube API',
  ];

  constructor( props ) {
    super( props )

    this.state = {
      fusions: {},
    }

    moment.relativeTimeRounding( Math.round )

    this.fusePosts = this.fusePosts.bind( this )
    this.fusePosts( props.data.allMarkdownRemark.edges )
  }

  getDuration( startTime, endTime ) {
    if ( !startTime ) {
      throw new Error( 'startTime is required' )
    }

    startTime = moment( startTime )

    if ( endTime ) {
      const originalEndTime = endTime;
      const endTimeParts = originalEndTime.split('-');
      let maximumDaysInMonth = 31;

      if (
        Experience.roundUpSmallDurations
        && ( endTimeParts.length === 2 )
      ) {
        endTime = `${originalEndTime}-${maximumDaysInMonth}`;
      }

      endTime = moment( endTime );

      while ( !endTime.isValid() ) {
        maximumDaysInMonth--;
        let string = `${originalEndTime}-${maximumDaysInMonth}`;
        endTime = moment( string );
      }
    } else {
      endTime = moment()
    }

    const duration = endTime.diff( startTime )
    const returnValue = {
      duration,
      "imprecise": moment.duration( duration ),
      // "precise": moment.preciseDiff( startTime, endTime ),
    };

    // console.warn( returnValue );

    return returnValue;
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

  prioritize( a, b ) {
    const important = ['HTML5', 'CSS3', 'JavaScript (ES6+)', 'React', 'Redux'];

    if ( important.indexOf( a ) !== -1 ) {
      return -1;
    }

    if ( important.indexOf( b ) !== -1 ) {
      return 1;
    }

    return 0;
  }

  getRelativeTime( durationObject ) {
    return (
      durationObject.imprecise.humanize()
        .replace( /a (second|minute|hour|day|week|month|year)/i, '1 $1' )
        .split( ' ' )
    )
  }

  printTime( timeOnJob ) {
    const relativeTime = this.getRelativeTime( timeOnJob );
    let humanized = relativeTime.join( ' ' );

    if ( Experience.clipLargeDurations && relativeTime[1] === 'years' ) {
      let number = parseInt( relativeTime[0], 10 );
      
      if ( number > 10 ) {
        humanized = `10+ years`;
      }
    }

    if (
      Experience.roundUpSmallDurations
      && (
        ( relativeTime[1] === 'days' )
        || ( relativeTime[1] === 'weeks' )
      )
    ) {
      humanized = '1 month';
    }

    if (
      !Experience.roundUpHighNumberOfMonthsToOneYear
      && ( relativeTime[1] === 'year' )
      && ( timeOnJob.imprecise.years() === 0 )
    ) {
      humanized = `${timeOnJob.imprecise.months()} months`;
    }

    return humanized;
  }

  laymanize( jobTitle ) {
    return (
      jobTitle
        .replace( 'Open-Source Maintainer', 'Open-Source Software Maintainer' )
        .replace( /(Senior )?(React|JavaScript|Front-end|Back-end|Full-stack|Software) (Developer|Engineer)/, '$1Software Developer' )
        .replace( 'UI/UX Designer', 'Designer' )
        .replace( 'Consultant', 'Software Consultant' )
    )
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
            const {
              verbosity,
              display,
              headingDisplay,
              descriptionDisplay,
              toggleCustomExperienceVisibility,
              toggleHeadingVisibility,
              mode,
            } = layoutState
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
              <header className={ `experience-item${!headingDisplay['selected-experience'].current ? ' experience-item--collapsed' : ''}` }>
                <button
                  className="toggle-experience"
                  onClick={ () => toggleHeadingVisibility( 'selected-experience' ) }
                >
                  <span>{ headingDisplay['selected-experience'].current ? '-' : '+' }</span>
                </button>
                <h2>Selected Experience</h2>
              </header>
              <SEO title={ verbosity } />
              { posts.map( ( { node }, index ) => {
                const { org, orgFka, contractingOrg, type, startDate, startDateFormatted, endDate, endDateFormatted, remote, location } = node.frontmatter
                const title = ( mode === 'media' ) ? this.laymanize( node.frontmatter.title ) : node.frontmatter.title
                const timeOnJob = this.getDuration( startDate, endDate )
                const now = moment().toISOString().split( 'T' )[0]
                const endsInTheFuture = ( endDate > now )
                let descriptionHtml = ( node.frontmatter.description || node.html )

                if ( node.frontmatter.fusible && ( verbosity === 'Résumé' ) ) {
                  descriptionHtml = descriptionHtml.replace( ' (see below)', '' )
                }

                Experience.sections.forEach( ( section ) => {
                  node.frontmatter[section] = node.frontmatter[section]
                    // Remove duplicates
                    .filter( ( item, index ) => node.frontmatter[section].indexOf( item ) === index )
                    .sort( this.alphabetize )
                    // .sort( this.prioritize )
                } )

                const bareSlug = this.getBareSlug( node.fields.slug );

                let roles;

                if ( mode === 'tech' ) {
                  roles = node.frontmatter.roles;
                } else if ( mode === 'media' ) {
                  const laymanizedRoles = (
                    Array.from(
                      new Set(
                        node.frontmatter.roles
                          .map( role => role
                            .replace( 'API Design', 'Software Development' )
                            .replace( /(Front-end|Back-end) Development/, 'Software Development' )
                            .replace( 'UI Design', 'User Interface Design' )
                            .replace( 'UX Design', 'User Interface Design' )
                            .replace( 'Maintenance', 'Software Maintenance' )
                            .replace( 'Language Design', 'Schema Design' )
                            .replace( 'Specification Writing', 'Technical Writing' )
                          )
                      )
                    )
                    .sort()
                  );

                  roles = laymanizedRoles;
                }

                let tools;
 
                if ( mode === 'tech' ) {
                  tools = node.frontmatter.tools;
                } else if ( mode === 'media' ) {
                  tools = node.frontmatter.tools.filter( tool => Experience.mediaTools.indexOf( tool ) !== -1 )
                }

                let experienceItemModifierClasses = '';

                if ( !display[node.fields.slug].current ) {
                  experienceItemModifierClasses = ' experience-item--collapsed';
                }

                return (
                  <article
                    id={ bareSlug }
                    key={ bareSlug }
                    className={ `experience-item${experienceItemModifierClasses}` }
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
                        <b
                          className="title"
                          contentEditable
                          suppressContentEditableWarning="true"
                        >
                          {title}
                        </b>, <span className="org">{org}</span>&#23;
                        {
                          orgFka && <span className="org-parenthetical">(<abbr title="formerly known as">fka</abbr> {orgFka})</span>
                        }
                        {
                          contractingOrg && <span className="org-parenthetical">(via {contractingOrg})</span>
                        }
                      </h3>
                      <div className="job-attributes">
                        <span className={ `job-type job-type--${type}` }>{ this.getTypeText( type ) }</span>
                        <TextSpacer dot />
                        <time dateTime={ timeOnJob.imprecise.toISOString() }>
                          <time dateTime={ startDate }>
                            { startDateFormatted }
                          </time> – {
                            endDate ?
                            (
                              endsInTheFuture ?
                                'Current'
                                : <time dateTime={ endDate }>{ endDateFormatted }</time>
                            )
                            : 'Current'
                          }{
                            <>
                              {` `}
                              <span className="duration-human">
                                <span className="duration-human__paren">(</span>{
                                  this.printTime( timeOnJob )
                                  + ( endsInTheFuture ? ' estimated' : '' )
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
                      hidden={ verbosity === 'Résumé' && !descriptionDisplay.current }
                      style={ {
                        marginBottom: rhythm(1 / 2),
                      } }
                      dangerouslySetInnerHTML={ {
                        __html: descriptionHtml,
                      } }
                    />
                    <footer>
                      <dl>
                        { roles.length
                          ? <>
                              <dt>Roles</dt>
                              <dd>{ roles.join( ', ' )}</dd>
                            </> 
                          : ''
                        }
                        { ( ( mode === 'tech' ) && node.frontmatter.tech.length )
                          ? <>
                              <dt>Tech</dt>
                              <dd>{ node.frontmatter.tech.join( ', ' )}</dd>
                            </>
                          : ''
                        }
                        { tools.length
                          ? <>
                              <dt>Tools</dt>
                              <dd>{
                                // Strip version numbers which are no longer relevant
                                // without deleting version information on the backend
                                tools.map(
                                  tool => tool
                                    .replace( /(Sublime Text|Twitter Bootstrap|ZURB Foundation) [0-9]+/i, '$1' )
                                    .replace( 'Twitter Bootstrap', 'Bootstrap' )
                                    .replace( /(Flash|Animate)/, 'Animate (Flash)' )
                                    .replace( /\bAPI\b/, 'Integration' )
                                )
                                .sort()
                                .join( ', ' )
                              }</dd>
                            </>
                          : ''
                        }
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
        mediaJobTitle
      }
    }
    allMarkdownRemark(
      sort: {
        fields: [frontmatter___priority, frontmatter___endDate, frontmatter___startDate],
        order: [ASC, DESC, DESC]
      },
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
            orgFka
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
