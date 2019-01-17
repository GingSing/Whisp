import React, { Component } from 'react';
import { Menu  } from 'antd';

import 'antd/dist/antd.css';
import './MusicPlayer.css';

class MusicPlayer extends Component{
    constructor(props){
        super(props);
        this.play=this.play.bind(this);
        this.state ={
            volume: 1
        }
    }

    play(){
        let audio = document.getElementById("musicPlayerAudio");
        if(audio.paused){
            this.unpause(audio);
        }else{
            this.pause(audio);
        }
    }

    async pause(audio){
        await this.setState({ volume: Math.round(audio.volume * 10)/10 });
        
        let interval = setInterval(()=>{
            if(audio.volume > 0.1){
                audio.volume -= 0.1;
            }else{
                clearInterval(interval);
                document.getElementById("musicPlayerAudio").pause();
            }
        }, 8);
    }

    async unpause(audio){
        audio.play();
        let interval = setInterval(()=>{
            if(audio.volume < this.state.volume){
                audio.volume += 0.1;
            }else{
                clearInterval(interval);
            }
        }, 8);
    }

    render(){
        return(
            <div className="musicPlayer">

                <Menu>
                    <Menu.Item className="playBtn">
                        <button onClick={this.play}>Play</button>
                    </Menu.Item>
                </Menu>

                <audio id="musicPlayerAudio">
                    <source src="/static/James Arthur - You Deserve Better.mp3" type="audio/mp3" />
                </audio>
            </div>
        );
    }
}

export default MusicPlayer;