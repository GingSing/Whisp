import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Slider, Progress } from 'antd'

class ProgressBar extends Component{
    constructor(props){
        super(props);
        this.updatePercentage=this.updatePercentage.bind(this);
        this.changePercentage=this.changePercentage.bind(this);
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

    render(){
        let { audio } = this.props;
        audio && (audio.ontimeupdate = () => {this.updatePercentage((audio.currentTime/audio.duration) * 100)});
        return(
            <div className="progressBar" onMouseEnter={()=>{this.setState({active: true})}} onMouseLeave={()=>{this.setState({active: false})}}>
                <span></span>
                {
                    (this.state.active ? 
                    <Slider onAfterChange={(percentage)=>this.changePercentage(percentage)} defaultValue={this.state.movedPercentage} tooltipVisible={false}/> 
                    : 
                    <Progress percent={this.state.movedPercentage} showInfo={false}/>)
                }
                <span></span>
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