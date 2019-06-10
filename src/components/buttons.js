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
      <div id="buttons">
        <input type="text" name="width" placeholder="width" onChange={this.props.handleWidthChange} />
        <input type="text" name="height" placeholder="height" onChange={this.props.handleHeightChange} />
        {this.getDownloadLink()}
      </div>
    )
  }
}

export default Buttons
