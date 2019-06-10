import React from 'react';
import Name from './name.js'

class Names extends React.Component {
  render() {
    const names = this.props.names
    var namesList = [];
    for (var i = 0; i < this.props.length; i++) {
      namesList.push(<Name name={names[i]} />);
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
