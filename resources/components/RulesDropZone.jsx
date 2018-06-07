import React from "react"
import Modal from 'react-modal';
import tinycolor from "tinycolor2"
import _ from "lodash"
import Subheader from "./Subheader";
import FontAwesomeIcon from '@fortawesome/react-fontawesome'
import Button from "./Button";
import pluginCall from 'sketch-module-web-view/client'
import { connect } from 'react-redux'
import { faArrowDown }  from '@fortawesome/fontawesome-free-solid'
import Text from "./Text";

import RulesForm from "./RulesForm"
import Dropzone from 'react-dropzone'
import Papa from 'papaparse';
import JSONPretty from 'react-json-pretty';

class RulesDropZone extends React.Component {
  constructor(props) {
    super(props)
    this.onDrop = this.onDrop.bind(this)
    this.onComplete = this.onComplete.bind(this)
    this.onReadJson = this.onReadJson.bind(this)

    this.state = {csvError: null, jsonError: null}
  }

  onComplete(data) {
    validHeaders = _.isEqual(data.meta.fields.sort(),['name','hex'].sort())
    if (validHeaders) {
      this.setState({csvError: null})
      if(!window.mock) {
        pluginCall('saveRules', data.data)
        this.props.onComplete()
      }
    } else {
      this.setState({csvError: 'Please format CSV with headers: name, hex'})
    }
  }

  onReadJson(data) {
    const fileAsBinaryString = data.currentTarget.result
    try {

    const colors = JSON.parse(fileAsBinaryString).colors
    const keys = _.uniq(_.flatten(_.map(colors, _.keys)))
    if (_.isEqual(keys.sort(),["name","hex"].sort())) {
      if(!window.mock) {
        pluginCall('saveRules', colors)
        this.props.onComplete()
      }
    } else {
      this.setState({jsonError: 'Please format JSON as { colors: [{name: "White", hex: "#FFFFFF"}]}'})
    }
    } catch (e) {
      this.setState({jsonError: 'Please format JSON as { colors: [{name: "White", hex: "#FFFFFF"}]}'})
    }
  }



  onDrop(acceptedFiles, rejectedFiles) {
    if (acceptedFiles[0].type == "application/json") {
      const reader = new FileReader();
      reader.onload = this.onReadJson
      // reader.onload = () => {
      //   const fileAsBinaryString = reader.result;
      //   const keys = _.uniq(_.flatten(_.map(JSON.parse(fileAsBinaryString).colors, _.keys)))
      //     debugger
      //   if (_.isEqual(keys.sort(),["name","hex"].sort())) {


      //   }
      // };
      reader.readAsBinaryString(acceptedFiles[0]);
      // if (_.isEqual(_.keys(acceptedFiles[0][0]).sort(), ['name', 'hex'].sort())) {
      //   if(!window.mock) {
      //     pluginCall('saveRules', data.data)
      //     this.props.onComplete()
      //   }
      // }
    } else {
      Papa.parse(acceptedFiles[0], {header: true, complete: this.onComplete});
    }
  }


  render() {
    return (
      <div >
        <div >
          <Dropzone
            accept={[".csv", ".json"]}
            style={{padding: '24px', border: '1px dashed gray'}}
            onDrop={this.onDrop}
          >
            <div className='text-center'>
              Drag and drop a CSV or JSON file <FontAwesomeIcon icon={faArrowDown} />
            </div>
          </Dropzone>
          <div className="pt24 text-center ">
            <div className="pb12">
              <Text size="body" subdued>
                Please format the json or csv like this
              </Text>
            </div>
            <div className="text-center flex flexjcc">
              <div className="text-left pr12">
                <JSONPretty json={{colors: [{name: 'White', hex: '#FFFFFF'}]}} />
              </div>
              <table className="rules-csv-example">
                <th> name </th>
                <th> hex </th>
                <tr>
                  <td> Black </td>
                  <td> #000000 </td>
                </tr>
              </table>
            </div>
          </div>
        </div>
        {this.state.csvError}
        {this.state.jsonError}
      </div>
    )
  }
}

export default RulesDropZone
