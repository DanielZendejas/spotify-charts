import React from 'react';
import ReactDOM from 'react-dom';

function Name(props) {
  return (
    <li> {props.name} </li>
  )
}

function Album(props) {
  return (
    <img width={120} height={120} src={props.cover} />
  )
}

class Albums extends React.Component {
  render() {
    console.log(this.props)
    const length = this.props.width * this.props.height;
    var albumsList = [];
    for (var i = 0; i < length; i++) {
      albumsList.push(<Album cover={this.props.covers[i]} />);
    }
    var styleString = {
      display: "grid",
      "grid-template-columns": "repeat(" + this.props.width + ",120px)",
      "grid-template-rows": "repeat(" + this.props.height + ",120px)",
      "grid-gap": "5px"
    }
    return (
      <div
        className="albums"
        style={styleString}
      >
        {albumsList}
      </div>
    )
  }
}

class Names extends React.Component {
  render() {
    const names = this.props.names
    var namesList = [];
    for (var i = 0; i < this.props.length; i++) {
      namesList.push(<Name name={names[i]} />);
    }
    return (
      <div className="names">
          {namesList}
      </div>
    )
  }
}

class Chart extends React.Component {
  render() {
    return (
      <div className="chart">
        <Albums
          covers={this.props.covers}
          width={this.props.coversGridWidth}
          height={this.props.coversGridHeight}
        />
        <Names
          names={this.props.names}
          length={this.props.namesLength}
        />
      </div>
    )
  }
}

class Buttons extends React.Component {
  render() {
    return (
      <div className="buttons">
        <input type="text" name="width" placeholder="width" onChange={this.props.handleWidthChange} />
        <input type="text" name="height" placeholder="height" onChange={this.props.handleHeightChange} />
      </div>
    )
  }
}

class Login extends React.Component {
  sendLoginRequest = () => {
    window.location = "https://accounts.spotify.com/authorize?client_id=54a0e6f7846742d8a378f7788b470679&redirect_uri=http:%2F%2Flocalhost:3000&scope=user-library-read&response_type=token&state=logged_in"
  }

  render() {
    console.log("Display in login: " + this.props.display)
    return (
      <div
        className="loginOverlay"
        style={{
          top: 0,
          bottom: 0,
          left: 0,
          right: 0,
          width: "100%",
          height: "100%",
          position: "fixed",
          "background-color": "black",
          display: this.props.display
        }}
      >
        <label style={{color: "white"}}>
          Welcome! Login and create your chart
        </label>
        <button onClick={this.sendLoginRequest}>
          Login
        </button>
      </div>
    )
  }
}

class Page extends React.Component {
  constructor() {
    super(constructor)
    var loggedIn = false
    console.log(window.location)
    if (window.location.href.indexOf("logged_in") != -1) {
      loggedIn = true
    }
    console.log("Logged in in page: " + loggedIn)
    this.state = {
      coversGridWidth: 4,
      coversGridHeight: 4,
      namesLength: 16,
      display: loggedIn ? "none" : "block"
    }
  }

  handleWidthChange = (event) => {
    var width = Number(event.target.value)
    this.setState({
      coversGridWidth: width,
      namesLength: width * this.state.coversGridHeight
    })
  }

  handleHeightChange = (event) => {
    var height = Number(event.target.value)
    this.setState({
      coversGridHeight: height,
      namesLength: height * this.state.coversGridWidth
    })
  }

  render() {
    const token = process.env.REACT_APP_SPOTIFY_AUTH_TOKEN
    const data = fetchDataFromAPI(token)
    if (data === null) {
      return "NO DATA FROM SPOTIFY"
    }
    console.log("PARSED DATA:")
    console.log(data)
    return (
      <div className="page">
        <Login display={this.state.display} />
        <Buttons 
          handleWidthChange={this.handleWidthChange}
          handleHeightChange={this.handleHeightChange}
        />
        <Chart
          covers={data.covers}
          coversGridWidth={this.state.coversGridWidth}
          coversGridHeight={this.state.coversGridHeight}
          names={data.names}
          namesLength={this.state.namesLength}
        />
      </div>
    )
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
    console.log("RESPONSE")
    console.log(response)
    return null;
  }
  response.items.forEach(function(item) {
    data.covers.push(item.album.images[0].url);
    data.names.push(item.album.name);
  })
  return data;
}

ReactDOM.render(
  <Page />,
  document.getElementById('root')
)

