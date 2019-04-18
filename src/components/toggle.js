import React from "react"

class Toggle extends React.Component {
  render() {
    return ( <div id="toggle" style={ this.props.style } onClick={ this.props.onToggle }>
      <button disabled={ this.props.form === 'short' }>Short form</button>
      <button disabled={ this.props.form === 'long' }>Long form</button>
    </div> )
  }
}

export default Toggle