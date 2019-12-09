import React from 'react';
import Name from './name.js'

class Names extends React.Component {
  render() {
    var namesList = [];
    for (var i = 0; i < this.props.length; i++) {
      if (i !== 0 && i % this.props.width === 0) {
        namesList.push(<br/>)
      }
      namesList.push(<Name name={this.props.names[i]} />);
    }
    return (
      <div
        id="names"
        style={{
          display:"inline-block",
          float:"right",
          padding:"0 25px",
          "font-size":"medium",
          "font-family":"Courier",
          "list-style":"none"
        }}
      >
          {namesList}
      </div>
    )
  }
}

export default Names
