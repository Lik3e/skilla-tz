import { useState, useEffect } from "react";
import List from "../components/List/List";
import Filter from "../components/Filter";

const url = "https://api.skilla.ru/mango/getList?"


const calcDate = new Date()
const date = calcDate.toLocaleDateString('en-CA')

const dateStart = new Date(calcDate.setDate(calcDate.getDate() - 3))

let params: {[k: string]: string} = {
    "date_start": dateStart.toLocaleDateString('en-CA'),
    "date_end": date,
  };

const PageList = () => {
    const [list, setList] = useState<any>(null);
    const [sort, setSort] = useState("")
    const [filters, setFilters] = useState<{[k: string]: string}>(params)

    useEffect(() => {
        let query = Object.keys(filters)
        .map(k => encodeURIComponent(k) + '=' + encodeURIComponent(filters[k]))
        .join('&');
      fetch(url+query, {
        method: "POST",
        headers: { Authorization: "Bearer testtoken" }
      })
        .then((res) => {
          return res.json();
        })
        .then((data) => {
            if (!!data) {
                data.results.sort((a: any, b: any) => {
                    let first = new Date(a.date)
                    let second = new Date(b.date)
                    if (sort === "time-up") {
                      return first.getTime() - second.getTime()
                    }
                    if (sort === "time-down") {
                        return second.getTime() - first.getTime()
                      }
                    if (sort === "duration-up") {
                      return b.time - a.time
                    }
                    if (sort === "duration-down") {
                        return a.time - b.time
                      }
                  })
            }
        setList(data.results);
        });
    }, [filters, sort]);

    const handleChangeIncoming = (i: string) => {
        setFilters(state => {
            let newState = state
            if (i === "all") {
                return {
                    ...state,
                    date_start: `${state.date_start}`,
                    date_end: `${state.date_end}`,
            } 
            } else {
                newState = {
                    date_start: `${state.date_start}`,
                    date_end: `${state.date_end}`,
                    in_out: i === "incoming" ? "1" : "0"
                }
            }
            return newState
        })
    }

    const handleChangeDate = (i: string) => {
        setFilters(state => {
            let newState = state
            newState = {
                ...state,
                date_start: `${addDaysToDate(date, Number(i)).toLocaleDateString('en-CA')}`,
                date_end: `${state.date_end}`,
            }
            return newState
        })
    }

    function addDaysToDate(date: any, days: number) {
        let new_date = new Date(date);
        new_date.setDate(new_date.getDate() - days);
        return new_date;
     }

     const handlePickDate = (from: string, to: string) => {
        setFilters(state => {
            let newState = {
                ...state,
                    date_start: `${from}`,
                    date_end: `${to}`,
                }
            return newState
        })
     }


    return(
        <div className="container">
            <Filter 
            onChangeIncoming={handleChangeIncoming}
             onChangeDate={handleChangeDate} 
             onPickDate={handlePickDate} 
             date_end={filters.date_end}
             date_start={filters.date_start}
              />
            <div className="list-container">
                <List items={list} onSort={(e: string) => setSort(e)} sortBy={sort} />
            </div>
        </div>
    )

}

export default PageList;