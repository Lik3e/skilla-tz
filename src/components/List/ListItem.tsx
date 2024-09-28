import Player from "../Player";

export const durationToTime = (str: string) => {
  let sec_num = parseInt(str, 10); // don't forget the second param
  let hours: string | number   = Math.floor(sec_num / 3600);
  let minutes: string | number  = Math.floor((sec_num - (hours * 3600)) / 60);
  let seconds: string | number  = sec_num - (hours * 3600) - (minutes * 60);

  if (hours   < 10) {hours   = "0"+hours;}
  if (minutes < 10) {minutes = "0"+minutes;}
  if (seconds < 10) {seconds = "0"+seconds;}
  return !!hours ? minutes+':'+seconds : hours+":"+minutes+':'+seconds
}

function ListItem(props: any) {



    return (
      <div key={props.index} className="list-item">
        <div className="type">
          {
            props.item.status === "Дозвонился"
            ? <div className={props.item.in_out === 1 ? "incoming" : "outgoing"} />
            : <div className={props.item.in_out === 1 ? "incoming-err" : "outgoing-err"} />
          }
        </div>
        <div className="time">
          {props.item.date.slice(11, -3)}
        </div>
        <div className="worker">
          <div className="avatar">
            <img src={props.item.person_avatar} alt="" className="avatar" />
          </div>
        </div>
        <div className="call">
          {props.item.to_number}
        </div>
        <div className="source">
          {props.item.source}
        </div>
        <div className="rating">
          <div className="raiting-box">
          <div className={`gray-rate ${props.item.in_out === 1 ? "red-rate" : "green-rate"}`}>
            {props.item.in_out}
          </div>
          </div>
        </div>
        <div className="duration">
          {
            !!props.item.record ?
            <Player props={props?.item} />
            : <div>{durationToTime(props.item.time)}</div>
          }
          
        </div>
    </div>
    );
  }
  
  export default ListItem;