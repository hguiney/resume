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
    "h3, .h3": {
      fontSize: rhythm(1/1.374),
      fontWeight: `normal`,
      marginBottom: rhythm(1 / 4),
      lineHeight: "1.53rem",
    },
    ".org": {
      // whiteSpace: `nowrap`,
    },
    "article p:last-child": {
      marginBottom: 0,
    },
    ".experience-item": {
      position: "relative",
    },
    ".experience-item.experience-item--collapsed": {
      opacity: 0.5,
      marginBottom: "1.53rem",
      cursor: "default",
    },
    ".experience-item.experience-item--collapsed > footer": {
      display: "none"
    },
    "button": {
      borderRadius: "1.5rem",
      padding: ".5rem 1rem",
    },
    ".toggle-experience": {
      position: "absolute",
      left: "-3rem",
      // borderRadius: "1rem",
      height: "2rem",
      width: "2rem",
      top: 0,
      padding: 0,
      textAlign: "center",
      justifyContent: "center",
      display: "flex",
      alignItems: "center",
      fontFamily: "monospace",
    },
    // ".toggle-experience:active": {
    //   outline: "none",
    // },
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
    ".org-parenthetical": {
      fontSize: ".9rem",
      display: "inline-block",
      verticalAlign: "bottom",
    },
    "abbr[title]": {
      borderBottom: "0",
    },
    "@media print": {
      "menu": {
        display: "none !important",
      },
      "#page": {
        padding: `0 !important`,
        margin: `0 auto !important`,
      },
      ".experience-item": {
        pageBreakInside: `avoid`,
      },
      ".experience-item.experience-item--collapsed": {
        display: `none`,
      },
      ".toggle-experience": {
        display: `none`,
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
    "aside > h3, aside > .h3": {
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
