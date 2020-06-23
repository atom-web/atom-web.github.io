import React from 'react';
import ReactAudioPlayer from 'react-audio-player';


function Play(props){
    console.log(props)
    return (
      <ReactAudioPlayer src={props} controls/>
    )
}

export default Play;