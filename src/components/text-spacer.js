import React from "react"

class TextSpacer extends React.Component {
  render() {
    return <span style={{ margin: `0 .25rem` }}>{ this.props.dot ? ' • ' : ' ' }</span>
  }
}

export default TextSpacer