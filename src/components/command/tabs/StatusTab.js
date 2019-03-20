import React, { Component } from 'react';
import StatusLight from "../../statusLight/StatusLight";
import {connect} from "react-redux";

const mapStateToProps = ({command: {status}}) => ({
  status
});

class StatusTab extends Component {
  render() {
    const { commandId, status } = this.props;
    return (
      <div>
        <StatusLight status={ status[commandId] }/> {status[commandId] }
      </div>
    );
  }
}

export default connect(mapStateToProps)(StatusTab);
