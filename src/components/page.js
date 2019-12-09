import React from 'react';
import LoginOverlay from './loginOverlay.js'
import Buttons from './buttons.js'
import Chart from './chart.js'

class Page extends React.Component {
  constructor() {
    super(constructor)
    var loggedIn = false
    if (window.location.href.indexOf("logged_in") !== -1) {
      loggedIn = true
    }
    this.state = {
      coversGridWidth: 4,
      coversGridHeight: 4,
      namesLength: 16,
      display: loggedIn ? "none" : "block",
      downloadIsClickable: false
    }
  }

  handleWidthChange = (event) => {
    var width = Number(event.target.value)
    this.setState({
      coversGridWidth: width,
      namesLength: width * this.state.coversGridHeight,
      downloadIsClickable: false
    })
  }

  handleHeightChange = (event) => {
    var height = Number(event.target.value)
    this.setState({
      coversGridHeight: height,
      namesLength: height * this.state.coversGridWidth,
      downloadIsClickable: false
    })
  }

  setDownloadIsClickable = () => {
    if (! this.state.downloadIsClickable) {
      this.setState({downloadIsClickable: true})
    }
  }

  getToken(anchor) {
    var array = anchor.split("&")
    var token = ""
    for (var i = 0; i < array.length; i++) {
      if (array[i].indexOf("access_token") !== -1) {
        token = array[i].split("=")[1]
      }
    }
    return token
  }

  getLoginOverlay(error) {
    return (
      <div id="page">
        <LoginOverlay
          display={this.state.display}
          error={error}
        />
      </div>
    )
  }

  render() {
    const token = this.getToken(window.location.hash)
    if (token === "") {
      return this.getLoginOverlay()
    }
    const data = fetchDataFromAPI(token)
    if (!data.error) {
      return (
        <div id="page">
          <Buttons
            widthValue={this.state.coversGridWidth}
            heightValue={this.state.coversGridHeight}
            handleWidthChange={this.handleWidthChange}
            handleHeightChange={this.handleHeightChange}
            downloadIsClickable={this.state.downloadIsClickable}
          />
          <Chart
            covers={data.covers}
            coversGridWidth={this.state.coversGridWidth}
            coversGridHeight={this.state.coversGridHeight}
            names={data.names}
            setDownloadIsClickable={this.setDownloadIsClickable}
            namesLength={this.state.namesLength}
          />
        </div>
      )
    }
    return this.getLoginOverlay(data.error)
  }
}

function fetchDataFromAPI(token) {
  let xmlHttp = new XMLHttpRequest();
  xmlHttp.open("GET", "https://api.spotify.com/v1/me/albums", false);
  xmlHttp.setRequestHeader("Authorization", "Bearer " + token);
  xmlHttp.send();
  var response = JSON.parse(xmlHttp.response);
  var data = {
    covers: [],
    names: []
  }
  if (undefined === response.items) {
    return {error: response.error.message};
  }
  response.items.forEach(function(item) {
    data.covers.push(item.album.images[0].url);
    data.names.push(item.album.name);
  })
  return data;
}

export default Page
