import React from 'react';

class Buttons extends React.Component {
  getDownloadLink() {
    if (this.props.downloadIsClickable) {
      return (
        <a id="download"> Download </a>
      )
    }
    return (
      <label id="download"> Please wait... </label>
    )
  }

  render() {
    return (
      <div id="buttons" style={{"paddingLeft":"10px"}}>
        <label> Width: </label>
        <input
          type="number"
          name="width"
          min="1"
          max="5"
          value={this.props.widthValue}
          onChange={this.props.handleWidthChange}
        />
        <label> Height: </label>
        <input
          type="number"
          name="height"
          min="1"
          max="5"
          value={this.props.heightValue}
          onChange={this.props.handleHeightChange}
        />
        {this.getDownloadLink()}
      </div>
    )
  }
}

export default Buttons
