import Typography from "typography"
import USWebDesignStandards from "typography-theme-us-web-design-standards"

USWebDesignStandards.overrideThemeStyles = ({ rhythm }, options, styles) => {
  return {
    "a.gatsby-resp-image-link": {
      boxShadow: `none`,
    },
    "a:visited": {
      color: styles.a.color,
    },
    "h3": {
      fontWeight: `normal`,
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
    "dd": {
      display: `inline-block`,
      verticalAlign: `top`,
      width: `90%`,
      marginBottom: rhythm(1/3),
    },
    "@media print": {
      "#toggle": {
        display: `none`,
      },
    },
    ".job-type": {
      display: `inline-block`,
      padding: `0 .5rem`,
      borderRadius: `3rem`,
      backgroundColor: `gray`,
      color: `white`,
    },
    ".job-type.job-type--contract": {
      backgroundColor: `orange`,
    },
    ".job-type.job-type--self": {
      backgroundColor: `skyblue`,
    }
  }
}

delete USWebDesignStandards.googleFonts

const typography = new Typography(USWebDesignStandards)

// Hot reload typography in development.
if (process.env.NODE_ENV !== `production`) {
  typography.injectStyles()
}

export default typography
export const rhythm = typography.rhythm
export const scale = typography.scale
