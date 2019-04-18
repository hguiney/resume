import React from "react"
import { VerbosityContext } from "./layout"

class Toggle extends React.Component {
  constructor( props ) {
    super( props );

    this.state = {}
  }

  render() {
    return (
      <VerbosityContext.Consumer>{
        ( { verbosity, setVerbosity } ) => (
          <div id="toggle" style={ this.props.style } onClick={ ( event ) => setVerbosity( event ) }>
            <button disabled={ verbosity === 'short' }>Short form</button>
            <button disabled={ verbosity === 'long' }>Long form</button>
          </div>
        )
      }</VerbosityContext.Consumer>
    )
  }
}

export default Toggle