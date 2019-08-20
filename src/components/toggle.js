import React from "react"
import { VerbosityContext } from "./layout"

class Toggle extends React.Component {
  constructor( props ) {
    super( props );

    this.state = {}
  }

  render() {
    const resumeText = 'Résumé'
    const cvText = 'Curriculum Vitæ'

    return (
      <VerbosityContext.Consumer>{
        ( { verbosity, setVerbosity } ) => (
          <div
            id="toggle"
            style={ {
              textAlign: `center`,
              ...this.props.style
            } }
            onClick={ ( event ) => setVerbosity( event ) }
          >
            <button
              disabled={ verbosity === resumeText }
              style={ {
                borderTopRightRadius: 0,
                borderBottomRightRadius: 0
              } }>{ resumeText }</button>
            <button
              disabled={ verbosity === cvText }
              style={ {
                borderTopLeftRadius: 0,
                borderBottomLeftRadius: 0,
                borderLeftWidth: 0,
              } }>{ cvText }</button>
          </div>
        )
      }</VerbosityContext.Consumer>
    )
  }
}

export default Toggle