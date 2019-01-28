import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Slider, Progress } from 'antd'

import 'antd/dist/antd.css';
import './ProgressBar.css';

class ProgressBar extends Component{
    constructor(props){
        super(props);
        this.updatePercentage=this.updatePercentage.bind(this);
        this.changePercentage=this.changePercentage.bind(this);
        this.timeFormatter=this.timeFormatter.bind(this);
        this.timeOutEvent=null;
        this.state={
            active: false,
            movedPercentage: 0
        }
    }

    updatePercentage(percent){
        this.setState({
            movedPercentage: percent
        });
    }

    async changePercentage(percent){
        await (this.props.audio.currentTime = percent/100 * this.props.audio.duration);
        this.updatePercentage(percent);
    }

    timeFormatter(timeInSeconds){
        let minutes = Math.floor(timeInSeconds/60);
        let seconds = (timeInSeconds%60).toFixed(0);
        let secondsFixer = seconds > 10 ? seconds : "0" + seconds;
        return `${minutes}:${secondsFixer}`;
    }

    setActive(active){
        
        if(this.state.active === true && active === false){
            this.setState({
                active: active
            });
        }else if(this.state.active === false && active === true){
            this.setState({
                active: active
            });
        }
    }

    render(){
        let { audio } = this.props;
        audio && (audio.ontimeupdate = () => {this.updatePercentage((audio.currentTime/audio.duration) * 100)});
        return(
            <div className="progressBarContainer">
                <span>{audio && audio.src ? this.timeFormatter(audio.currentTime) : '0:00'}</span>
                <div className="progressBar" onMouseEnter={()=>{this.setActive(true)}} onMouseLeave={()=>{this.setActive(false)}}>
                    {
                        (this.state.active && audio.src ? 
                        <Slider className="progress slider" onAfterChange={(percentage)=>this.changePercentage(percentage)} defaultValue={this.state.movedPercentage} tooltipVisible={false}/> 
                        : 
                        <Progress className="progress" percent={this.state.movedPercentage} showInfo={false} size="small"/>)
                    }
                </div>
                <span>{audio && audio.src ? this.timeFormatter(audio.duration) : '0:00'}</span>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    audio: state.music.audio,
    songList: state.music.songList,
    songNumber: state.music.songNumber
});

export default connect(mapStateToProps)(ProgressBar);