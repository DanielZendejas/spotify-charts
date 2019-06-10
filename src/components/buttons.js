import React from 'react';

class Buttons extends React.Component {
  getDownloadLink() {
    if (this.props.downloadIsClickable) {
      return (
        <a id="download"> Download </a>
      )
    }
    return (
      <label id="download"> Download </label>
    )
  }

  render() {
    return (
      <div id="buttons" style={{"padding-left":"10px"}}>
        <label> Width: </label>
        <input
          type="number"
          name="width"
          value={this.props.widthValue}
          onChange={this.props.handleWidthChange}
        />
        <label> Height: </label>
        <input
          type="number"
          name="height"
          value={this.props.heightValue}
          onChange={this.props.handleHeightChange}
        />
        {this.getDownloadLink()}
      </div>
    )
  }
}

export default Buttons
