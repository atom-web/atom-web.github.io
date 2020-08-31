import React from 'react';
import ReactAudioPlayer from 'react-audio-player';


function Play(props){
    return (
      <ReactAudioPlayer src={props} controls/>
    )
}

export default Play;