import React from 'react';
import Name from './name.js'

class Names extends React.Component {
  render() {
    var namesList = [];
    for (var i = 0; i < this.props.length; i++) {
      if (i !== 0 && i % this.props.width === 0) {
        namesList.push(<br key={i + "-space"}/>)
      }
      var name = this.props.names[i]
      namesList.push(<Name key={i + "-name"} name={name} />);
    }
    return (
      <div
        id="names"
        style={{
          float:"right",
          "fontSize":"medium",
          "fontFamily":"Courier",
          "listStyle":"none",
          "color":"white",
          flex: 1
        }}
        class="p-2"
      >
          {namesList}
      </div>
    )
  }
}

export default Names
