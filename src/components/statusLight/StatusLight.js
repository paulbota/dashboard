import React, {Component} from 'react';
import './StatusLight.css';
import DoneIcon from '@material-ui/icons/Done';
import ClearIcon from '@material-ui/icons/Clear';
import Tooltip from "@material-ui/core/Tooltip";




class StatusLight extends Component {

  render() {
    const {status} = this.props;
    return (
      <Tooltip title={ status ? status : 'UNKNOWN' } className='container'>
        {status ?
          status === 'RUNNING' ?
            <div className='container running'></div>
            :
            status === 'DONE_SUCCESS' ?
              <DoneIcon className='container success' />
              :
              status === 'DONE_ERROR' ?
              <ClearIcon className='container failed'/>
              :
              <div className='container default'></div>
          :
          <div className='container default'></div>
        }
      </Tooltip>
    );
  }
}

export default StatusLight;
