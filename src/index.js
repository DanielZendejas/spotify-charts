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
    return albumsList;
  }
}

class Names extends React.Component {
  render() {
    const names = this.props.names
    var namesList = [];
    for (var i = 0; i < this.props.length; i++) {
      namesList.push(<Name name={names[i]} />);
    }
    return namesList;
  } }

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
      <div class="buttons">
        <input type="text" name="width" placeholder="width" onChange={this.props.handleWidthChange} />
        <input type="text" name="height" placeholder="height" onChange={this.props.handleHeightChange} />
      </div>
    )
  }
}

class Page extends React.Component {
  constructor() {
    super(constructor)
    this.state = {
      coversGridWidth: 4,
      coversGridHeight: 4,
      namesLength: 16
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
    console.log("PARSED DATA:")
    console.log(data)
    return (
      <div className="page">
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

