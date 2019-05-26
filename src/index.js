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
    var namesList = [];
    for (var i = 0; i < this.props.length; i++) {
      namesList.push(<Name name={this.props.names[i]} />);
    }
    return namesList;
  }
}

class Chart extends React.Component {
  render() {
    return (
      <div className="chart">
        <div className="albums">
          <Albums covers={this.props.covers} width={4} height={4} />
        </div>
        <div className="names">
          <Names names={this.props.names} length={16} />
        </div>
      </div>
    )
  }
}

class Page extends React.Component {
  render() {
    const token = "BQAHgSstgC61ikSojiZWcxq9bnp_vJLiuGYsqTl3o-SnjnbVuVP3nSrSRguCYtprlqaD-r4vS9gXY7qQfFe18yS5KEPthAyVPKMjIA_uDrMoYrU8GTNRBXnOwC6LueVc5Zps3AmyoGhs4tBGUj4hb5jjdHZ2O9P6nQbT9w2VwOP4-kicnEIPmrxs"
    const data = fetchDataFromAPI(token)
    console.log("PARSED DATA:")
    console.log(data)
    return (
      <div className="page">
        <Chart covers={data.covers} names={data.names} />
      </div>
      /*
      <div className="buttons">
        <Buttons />
      </div>
      */
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

