import React from 'react';
import Album from './album.js'

class Albums extends React.Component {
  render() {
    const length = this.props.width * this.props.height;
    var albumsList = [];
    for (var i = 0; i < length; i++) {
      var cover = this.props.covers[i]
      albumsList.push(<Album key={i + "-" + cover} cover={cover} />);
    }
    var styleString = {
      display: "inline-grid",
      "gridTemplateColumns": "repeat(" + this.props.width + ",120px)",
      "gridTemplateRows": "repeat(" + this.props.height + ",120px)",
      "gridGap": "5px"
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
