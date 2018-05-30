import React from "react"
import tinycolor from "tinycolor2"
import _ from "lodash"
import LayerDetail from './LayerDetail'
import pluginCall from 'sketch-module-web-view/client'

class GroupDetail extends React.Component {
  constructor(props) {
    super(props)
    this.prev = this.prev.bind(this)
    this.next = this.next.bind(this)
    this.state = {
      page: 0
    }
  }



  prev() {
    if (this.state.page > 0) {
      this.setState({page: this.state.page - 1})
    }
  }

  next() {
    if (this.state.page + 1 < this.props.layers.length) {
      this.setState({page: this.state.page + 1})
    }
  }

  render() {
    return (
      <div>
        <LayerDetail prev={this.prev} next={this.next}
          page={this.state.page + 1} pages={this.props.layers.length}
          layerCompliance={this.props.layers[this.state.page]} />
      </div>
    )
  }
}

export default GroupDetail