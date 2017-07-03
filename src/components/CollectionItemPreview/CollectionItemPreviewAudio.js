import React from 'react';
import JSONTree from 'react-json-tree'

export default class CollectionItemPreviewAudio extends React.PureComponent {
  render() {
    const { doc } = this.props
    console.log(doc)
    return (
    <div className="CollectionItem__doc_container">
      <div className="CollectionItem__doc_preview">
        <JSONTree data={doc} />
      </div>
      <div className="CollectionItem__doc_controls">
        <button className="CollectionItem__btn_download"><i className="fa fa-download" /></button>
      </div>
    </div>
  );
  }
}