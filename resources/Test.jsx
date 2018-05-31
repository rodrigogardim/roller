import React from "react"
import { connect } from 'react-redux';
import LayersContainer from './containers/LayersContainer'
import FontAwesomeIcon from '@fortawesome/react-fontawesome'
import { faCog }  from '@fortawesome/fontawesome-free-solid'

class Test extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <div className="container">
        <div className="flex f-end subheader">

        <a onClick={()=> this.props.history.push('settings')}>
          <FontAwesomeIcon icon={faCog } />
        </a>

      </div>
        <LayersContainer />
      </div>
    )
  }
}

export default Test
