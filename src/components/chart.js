import React from 'react';
import Html2Canvas from 'html2canvas';
import Albums from './albums.js'
import Names from './names.js'

class Chart extends React.Component {
  generateAndStoreCanvas = (props) => {
    var chart = document.getElementById("chart")
    var downloadButton = document.getElementById("download")
    Html2Canvas(chart, {useCORS: true, allowTaint: true}).then(function(chartAsCanvas) {
      console.log("CANVAS RENDERING IN CHART")
      var chartImageData = chartAsCanvas.toDataURL("image/png").replace(/^data:image\/png/, "data:application/octet-stream")
      downloadButton.setAttribute("href", chartImageData)
      downloadButton.setAttribute("download", "my_file.png")
      props.setDownloadIsClickable()
      console.log(chartImageData)
    })
  }

  componentDidMount() {
    this.generateAndStoreCanvas(this.props)
  }

  componentDidUpdate() {
    this.generateAndStoreCanvas(this.props)
  }

  render() {
    return (
      <div id="chart" style={{display:"inline-block", float:"left", padding:"10px"}}>
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

export default Chart
