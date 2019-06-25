import React from "react"
import * as htmlDocx from "html-docx-js/dist/html-docx"
import FileSaver from "file-saver"

class SaveAs extends React.Component {
  constructor( props ) {
    super( props );

    this.state = {}
  }

  saveAsWordDocument( event ) {
    event.preventDefault();
    // console.log( document.body.outerHTML );
    const html = `<!DOCTYPE html>${document.body.parentNode.outerHTML}`;
    const blob = htmlDocx.asBlob( html );
    console.log( html );
    console.log( blob );
    FileSaver.saveAs( blob, 'Hugh Guiney’s Résumé.docx' );
  }

  render() {
    return (
      <div
        id="save-as"
        style={ {
          textAlign: `center`,
          ...this.props.style
        } }
      >
        <button onClick={ this.saveAsWordDocument }>Save as Word Document</button>
      </div>
    )
  }
}

export default SaveAs