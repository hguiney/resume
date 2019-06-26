import Typography from "typography"
import USWebDesignStandards from "typography-theme-us-web-design-standards"

USWebDesignStandards.baseFontSize = 14

USWebDesignStandards.overrideThemeStyles = ( { rhythm }, options, styles ) => {
  return {
    "a.gatsby-resp-image-link": {
      boxShadow: `none`,
    },
    "a:visited": {
      color: styles.a.color,
    },
    "h3": {
      fontSize: rhythm(1/1.374),
      fontWeight: `normal`,
      marginBottom: rhythm(1 / 4),
    },
    ".org": {
      // whiteSpace: `nowrap`,
    },
    "article p:last-child": {
      marginBottom: 0,
    },
    "dt": {
      display: `inline-block`,
      verticalAlign: `top`,
      width: `9%`,
      margin: 0,
    },
    // "li, dd": {
    //
    // },
    "ul": {
      marginLeft: 0,
    },
    "li, dd": {
      display: `inline-block`,
      verticalAlign: `top`,
      width: `90%`,
      marginBottom: rhythm(1/3),
    },
    "@media print": {
      "#toggle": {
        display: `none`,
      },
      "#save-as": {
        display: `none`,
      },
      "#page": {
        padding: `0 !important`,
        margin: `0 auto !important`,
      },
      ".experience-item": {
        pageBreakInside: `avoid`,
      },
    },
    // ".job-type": {
    //   display: `inline-block`,
    //   padding: `0 .5rem`,
    //   borderRadius: `3rem`,
    //   backgroundColor: `gray`,
    //   color: `white`,
    // },
    // ".job-type.job-type--contract": {
    //   backgroundColor: `orange`,
    // },
    // ".job-type.job-type--self": {
    //   backgroundColor: `skyblue`,
    // },
    ".bio__attribute": {
      whiteSpace: `nowrap`,
    },
    "p": {
      maxWidth: `39em`,
    },
    ".columns": {
      display: `flex`,
      flexDirection: `row-reverse`,
    },
    // "aside": {
    //
    // },
    "aside > h3": {
      fontWeight: `bold`,
    },
    // "main": {
    //   minWidth: rhythm(5),
    // }
    // "aside, main": {
    //   display
    // },
  }
}

delete USWebDesignStandards.googleFonts

const typography = new Typography( USWebDesignStandards )

// Hot reload typography in development.
if ( process.env.NODE_ENV !== `production` ) {
  typography.injectStyles()
}

export default typography
export const rhythm = typography.rhythm
export const scale = typography.scale
