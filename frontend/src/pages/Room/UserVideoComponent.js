import React, { Component } from 'react';
import OpenViduVideoComponent from './OvVideo';
import './UserVideo.css';
import Mic from '@mui/icons-material/Mic';
import MicOff from '@mui/icons-material/MicOff';

export default class UserVideoComponent extends Component {
    constructor(props) {
        super(props);
        this.muteMic = this.muteMic.bind(this)
        this.onMic = this.onMic.bind(this)
        this.state = {
            isMute: false,
            streamManagerName: this.props.streamManager.constructor.name
        }
    }
    getNicknameTag() {
        // console.log('ㅇㅇ',this.props.streamManager)
        // console.log('ㄴㄴ',this.props.streamManager.publishAudio)
        // Gets the nickName of the user
        return JSON.parse(this.props.streamManager.stream.connection.data).clientData;
    }
    muteMic(){
        // console.log('클릭')
        console.log('스트림메니저',this.props.streamManager)
        // console.log('스',this.props.streamManager.constructor.name)
        console.log('스2',this.props.streamManager.Publisher)
        console.log('스2',this.props.streamManager.stream.audioActive)
        if (this.props.streamManager.constructor.name === 'Publisher'){
            // console.log('마이크 OFF',this.props.streamManager)
            this.props.streamManager.publishAudio(false)
            this.setState({ isMute: true });
            console.log(this.isMute)
        }
    }
    onMic(){
        if (this.props.streamManager.constructor.name === 'Publisher'){
            // console.log('마이크 ON',this.props.streamManager)
            this.props.streamManager.publishAudio(true)
            this.setState({ isMute: false });
            console.log(this.isMute)
        }
    }
    render() {
        let type = this.state.streamManagerName
        return (
            <div>
                {this.props.streamManager !== undefined ? (
                    <div className="streamcomponent">
                        <OpenViduVideoComponent streamManager={this.props.streamManager} />
                        <div className='userName'>
                            <p>{this.getNicknameTag()}</p>
                            {this.state.isMute === true 
                            ? (<button onClick={this.onMic}><MicOff/></button>) 
                            : (<button onClick={this.muteMic}><Mic/></button>)
                            }
                            <p>{this.state.streamManagerName}</p>
                            {this.props.streamManager.stream.audioActive === false
                            ? (<button onClick={this.onMic}><MicOff/></button>) 
                            : (<button onClick={this.muteMic}><Mic/></button>)
                            }
                        </div>
                    </div>
                ) : null}
            </div>
        );
    }
}
