import { useState } from "react";
import { durationToTime } from "./List/ListItem";

const url = "https://api.skilla.ru/mango/getRecord?"

const Player = (props: any) => {
    const [play, setPlay] = useState(true)
    const [playRecord, setPlayRecord] = useState<any>()
    const item = props.props
    const ctx = new AudioContext();
    let audio: any;

    async function BufferRecord() {
        let query = "record=" + item.record
        fetch(url+query, {
          method: "POST",
          headers: {
              Authorization: "Bearer testtoken",
              "Content-type": "audio/mpeg, audio/x-mpeg, audio/x-mpeg-3, audio/mpeg3",
              "Content-Transfer-Encoding": "binary",
              "Content-Disposition": "filename='record.mp3'"
           }
        })
          .then((res) => {
            return res.arrayBuffer();
          })
          .then(arrayBuffer =>
            ctx.decodeAudioData(arrayBuffer))
          .then(decodedAudio => {
              audio = decodedAudio;
          })
    }

    const  playback = () =>  {
        const createBuffer = ctx.createBufferSource();
        setPlayRecord(createBuffer)
        BufferRecord()
        setTimeout(()=> {
            createBuffer.buffer = audio;
            createBuffer.connect(ctx.destination);
            if (play) {
                createBuffer.start(ctx.currentTime);
                setPlay(false)
            }
        }, 1000 );
      }

      const stopback = () => {
        playRecord.stop(0)
        setPlay(true)
      }

      const downloadRecord = () => {
      }

  return (
    <div className="player">
        <div className="player-duration">
            {durationToTime(item.time) || "00:00"}
        </div>
        {
            play ?
            <div className="play" onClick={() => playback()}><span></span></div>
            : <div className="pause" onClick={() => stopback()}><span></span></div>
        }
        <div className="play-road"></div>
        <div className="download-record" onClick={() => downloadRecord()}></div>
        <div className="close-play"></div>
    </div>
  );
};

export default Player;
