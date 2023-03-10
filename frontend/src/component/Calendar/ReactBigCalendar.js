import React, { useState } from "react";
import { Calendar, momentLocalizer, TimeGrid } from "react-big-calendar";
import moment from "moment";
import events from "./events";
import "react-big-calendar/lib/css/react-big-calendar.css";
// import ReactBigCalendar from "./ReactBigCalendar";
import { useEffect } from "react";
import $ from "jquery";
import {
  faCircle,
  faLocationDot,
  faClock,
  faCirclePlus,
  faCalendarAlt,
  faAlignLeft,
  faHandsAmericanSignLanguageInterpreting,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

moment.locale("en-GB");
const localizer = momentLocalizer(moment);

export default function ReactBigCalendar() {
  const [eventsData, setEventsData] = useState(events);
  const [count1, setCount1] = useState(0);
  const [count2, setCount2] = useState(0);
  const [dates, setDates] = useState(0);

  const [event, setEvent] = useState([]);

  const [title, setTitle] = useState();
  const [eventDate, setEventDate] = useState();
  const [time, setTime] = useState();
  const [venue, setVenue] = useState();
  const [desc, setDesc] = useState();

  // const [create,setCreate]=useEffect();
  // const [view,setView]=useEffect();

  // function callIt(){
  //   if(count1==0)
  //   {
  //     $(".Calendar-add").css("border-radius","20px 20px 0px 0px");
  //     $(".Calendar-add-drop").delay("slow").show();
  //     setCount1(1);
  //   }
  //   else
  //   {
  //     $(".Calendar-add").css({"border-radius":"20px 20px 20px 20px"});
  //     $(".Calendar-add-drop").hide();
  //     setCount1(0);
  //   }

  // }
  useEffect(() => {
    if (count1==0) {
      $(".Calendar-add-drop").hide();
    } else {
      $(".Calendar-add-drop").show();
    }

    const showEvent = async () => {
      let result = await fetch("http://localhost:8000/getAllEvent");
      result = await result.json();
      setEvent(result);
      // console.log(result);
      // console.log(result[0].eventDate);
    };
    showEvent();
  }, );

  const addEvent = async (e) => {
    e.preventDefault();
    // const userId = JSON.parse(localStorage.getItem("users"))._id;
    let result = await fetch("http://localhost:8000/createEvent", {
      method: "post",
      body: JSON.stringify({ title, eventDate, time, venue, desc }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    result = await result.json();
    console.log(result);
    // if(result){
    //   alert("event is added")
    // }else{
    //   console.log("error")
    // }
    // handleSelect1(); 
    setCount1(0)
       // setEventsData([
    //   ...eventsData,
    //   {
    //     start,
    //     end,
    //     title,
    //   },
    // ]);
  };

  const handleEvent = (event, data) => {
    // alert(event.title+"_______"+event.start+"________"+event.end);
    if (count2 == 0) {
      $(".Calendar-view-title").css("border-radius", "20px 20px 0px 0px");
      $(".Calendar-view-events").delay("slow").show();
      setCount2(1);
    } else {
      $(".Calendar-view-title").css({ "border-radius": "20px 20px 20px 20px" });
      $(".Calendar-view-events").hide();
      setCount2(0);
    }

    console.log("onSelectEvent", data);
  };

  const handleSelect3 = ({ start, end }) => {
    if (count1 === 0) {
      $(".Calendar-add-drop").show();
      setCount1(1);
    } else {
      $(".Calendar-add-drop").hide();
      setCount1(0);
    }
  };

  const handleSelect1 = ({ start, end }) => {
    setCount1(0);
  };

  const handleSelect = ({ start, end }) => {
    setCount1(1);
    // if (count1 == 0) {
    //   $(".Calendar-add-drop").hide();
    // } else {
    //   $(".Calendar-add-drop").show();
    // }
    // console.log(start )
    // console.log(end )
    var currDate = start;
    var currEventDate = currDate.getDate();
    var month = parseInt(currDate.getMonth()) + 1;
    var year = parseInt(currDate.getFullYear());
    const startDate = currDate.getDate() + "/" + 0 + month + "/" + year;

    if (month < 10) {
      console.log(startDate);
    } else {
      console.log(currDate.getDate() + "/" + month + "/" + year);
    }

    event.map(function (val, index) {
      if (val.eventDate === startDate) {
        alert("matched");
      }
    });

    // console.log(typeof(start))
    // const title = title;
    if (title)
      setEventsData([
        ...eventsData,
        {
          start,
          end,
          title,
        },
      ]);
  };
  return (
    <div className="Calendar-container">
      <div className="Calendar-left">
        <div
          className="Calendar-add"
          onClick={handleSelect3}
          // onClick={callIt}
        >
          <div>
            Create Event
            <FontAwesomeIcon
              style={{ margin: "0px 0px 0px 10px" }}
              icon={faCirclePlus}
            />
          </div>
        </div>

        <div className="Calendar-view">
          <div className="Calendar-view-title">Events Preview</div>
          <div className="Calendar-view-events">
            <div className="event-title">{"Web Development"}</div>
            <div className="event-profile">
              <FontAwesomeIcon
                style={{ margin: "0 10px 0 0" }}
                icon={faCircle}
              />
              {"Yash Kulshrestha"}
            </div>
            <div className="event-minor">
              <div>
                <FontAwesomeIcon
                  style={{ margin: "0 10px 0 0" }}
                  icon={faLocationDot}
                />
                {"Google meet"}
              </div>

              <div>
                <FontAwesomeIcon
                  style={{ margin: "0 10px 0 0" }}
                  icon={faCalendarAlt}
                />
                {"27/5/2023"}
              </div>

              <div>
                <FontAwesomeIcon
                  style={{ margin: "0 10px 0 0" }}
                  icon={faClock}
                />
                {"09:40 am to 12:00 pm"}
              </div>
            </div>
            <div>
              <b>Descrpition</b>
              <br />
              {
                "In this session you will learn about how to start the journey to become a UI/UX developer. In this session you will learn how to do research and test the market credibility of the project you are taking on and what are the regular pain of users from the competitor"
              }
            </div>
            <button>Interested</button>
            <button>Cancel Event</button>
          </div>
        </div>
      </div>
      {/* <ReactBigCalendar className="ReactBigCalendar" /> */}
      <div className="ok" style={{ width: "98vw", margin: "0 20px 0 0" }}>
        <Calendar
          views={["agenda", "month"]}
          selectable
          localizer={localizer}
          defaultDate={new Date()}
          defaultView="month"
          events={eventsData}
          style={{ height: "100vh" }}
          onSelectEvent={handleEvent}
          value={dates}
          onSelectSlot={handleSelect}
        />
      </div>

      <div className="Calendar-add-drop">
        <form>
          <div
            className="Calendar-title"
            style={{ display: "flex", flexDirection: "row-reverse" }}
          >
            <div className="cancel-button" onClick={handleSelect1}>
              X
            </div>
            <input
              type="text"
              id=""
              placeholder="Add Event Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          <div className="input-container">
            <FontAwesomeIcon
              style={{ margin: "0 10px 0 0" }}
              icon={faCalendarAlt}
            />
            <input
              type="date"
              value={eventDate}
              onChange={(e) => setEventDate(e.target.value)}
            ></input>
          </div>
          <div className="input-container">
            <FontAwesomeIcon style={{ margin: "0 10px 0 0" }} icon={faClock} />
            <input
              type="time"
              value={time}
              onChange={(e) => setTime(e.target.value)}
            ></input>
          </div>
          <div className="input-container">
            <FontAwesomeIcon
              style={{ margin: "0 10px 0 0" }}
              icon={faLocationDot}
            />
            <input
              type="text"
              placeholder="Add place name.."
              value={venue}
              onChange={(e) => setVenue(e.target.value)}
            />
          </div>
          <div className="input-container">
            <FontAwesomeIcon
              style={{ margin: "0 10px 0 0" }}
              icon={faAlignLeft}
            />
            Descrpition:
            <textarea
              name="message"
              rows="4"
              cols="30"
              style={{
                margin: "5px 0px 0px 25px",
                padding: "px 0px 0px 0px",
                fontSize: "13px",
              }}
              placeholder="About . . ."
              value={desc}
              onChange={(e) => setDesc(e.target.value)}
            ></textarea>
          </div>
          <button className="Calendar-submit" type="submit" onClick={addEvent}>
            Add
          </button>
        </form>
      </div>
    </div>
  );
}
