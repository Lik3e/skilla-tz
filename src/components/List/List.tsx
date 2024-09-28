import ListItem from "./ListItem";

const tableHeads = [
  {class: "type", title: "тип"},
  {class: "time", title: "время"},
  {class: "worker", title: "сотрудник"},
  {class: "call", title: "звонок"},
  {class: "source", title: "источник"},
  {class: "rating", title: "оценка"},
  {class: "duration", title: "длительность"},
]


function List(props: any) {
  const items = props.items

    return (
      <div className="list">
        <div className="list-header">
            {
                tableHeads.map(item => {
                return(
                    <div key={item.class} 
                    className={`cursor-pointer ${item.class} ${item.class === "duration" ? "icon" : ""} ${item.class === "time" ? "icon" : ""}`}
                    onClick={() => props.onSort(props.sortBy === item.class+"-up" ? item.class+"-down" : item.class+"-up")}>
                                            {item.title}
                      {
                        item.class === "duration" 
                        ?                       
                        <div className={props.sortBy} />
                        : item.class === "time"
                        ? 
                        <div className={props.sortBy} />
                        : ""
                      }
                    </div>
                )
                })
            }
        </div>

        <div className="list-body">
        {
          (items || [])?.map((item: any, index: number) => {
            return(
              <ListItem key={index} item={item} index={index} />
            )
          })
        }
        </div>
      </div>
    );
  }
  
  export default List;