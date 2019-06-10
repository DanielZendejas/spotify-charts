import React from 'react';
import Album from './album.js'

class Albums extends React.Component {
  render() {
    const length = this.props.width * this.props.height;
    var albumsList = [];
    for (var i = 0; i < length; i++) {
      albumsList.push(<Album cover={this.props.covers[i]} />);
    }
    var styleString = {
      display: "inline-grid",
      "grid-template-columns": "repeat(" + this.props.width + ",120px)",
      "grid-template-rows": "repeat(" + this.props.height + ",120px)",
      "grid-gap": "5px"
    }
    return (
      <div
        id="albums"
        style={styleString}
      >
        {albumsList}
      </div>
    )
  }
}

export default Albums
