import { useState, useEffect, memo } from "react";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowAltCircleLeft,
  faArrowAltCircleRight,
  faPlus,
  faTrashAlt,
  faEdit,
} from "@fortawesome/free-solid-svg-icons";
import Popup from "../../../Components/Popup";
import { boardApi, imageApi } from "../../../Api";

import ReactSummernote from "react-summernote";
import "react-summernote/dist/react-summernote.css";
import "react-summernote/lang/summernote-ko-KR";

import "bootstrap";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/js/dist/dropdown";
import "bootstrap/js/dist/tooltip";
import "bootstrap/js/dist/modal";
import "bootstrap/js/dist/tab";

import { connect } from "react-redux";

const Flex = styled.div`
  display: flex;
  width: 100%;
  justify-content: ${(props) => props.setting.justify};
  align-items: ${(props) => props.setting.align};
  flex-direction: ${(props) => props.setting.dir};
`;

const Text = styled.span`
  font-size: ${(props) => props.size};
  font-weight: ${(props) => props.weight};
  color: rgb(74, 86, 94);
  display: inline-flex;
`;

const Title = styled.div`
  display: grid;
  width: 100%;
  grid-template-columns: 50% 50%;
  padding: 10px 0;
  border-bottom: 1px solid var(--color-border);
`;

const Button = styled.button`
  width: 50px;
  height: 30px;
  background-color: ${(props) => props.setting.backColor};
  color: ${(props) => props.setting.color};
  border-radius: 10px;
  font-size: 15px;
`;

const MyEdit = styled.div`
  width: 100%;
  margin-top: 20px;
  b {
    font-weight: 600;
  }
  ul {
    list-style-type: circle;
    padding: 0 20px;
  }
  ol {
    list-style-type: decimal;
    padding: 0 20px;
  }
  h1 {
    font-size: 30px;
    font-weight: 600;
    padding: 0 15px;
  }

  .dropdown-menu {
    list-style: none;
  }
  .wrapper-class {
    width: 100%;
    margin: 0 auto;
    margin-top: 20px;
    border: 1px solid var(--color-border);
  }
  .editor {
    /* border: 2px solid lightgray !important; */
    padding: 15px 20px !important;
    /* border-radius: 2px !important; */
    &::-webkit-scrollbar {
      width: 10px;
      background-color: transparent;
    }
    &::-webkit-scrollbar-thumb {
      background-color: rgb(239, 239, 239);
    }
  }
  .note-editable {
    padding: 30px 20px;
    width: 100%;
    min-height: 300px;
    overflow-y: auto;
    background-color: white;
  }
  .toolbar {
    width: 100%;
    border: none;
    border-bottom: 1px solid var(--color-border);
    border-radius: 0;
    box-shadow: none;
    padding: 10px;
    margin: 0;
  }
  .note-toolbar {
    border-bottom: 1px solid var(--color-border);
    background-color: white;
  }
  .table-bordered {
    border: 1px solid #ddd;
  }
  th,
  td {
    border: 1px solid #ddd;
  }
  .note-editor {
    border: 1px solid var(--color-border);
  }
`;

const Calender = memo(({ match, data, getData }) => {
  const {
    params: { studyIdx },
  } = match;
  //day
  const dayjs = require("dayjs");
  const weekday = require("dayjs/plugin/weekday");
  const isoWeek = require("dayjs/plugin/isoWeek");
  const weekOfYear = require("dayjs/plugin/weekOfYear");

  // day extend
  dayjs.extend(weekday);
  dayjs.extend(isoWeek);
  dayjs.extend(weekOfYear);
  const today = dayjs();
  const [viewDate, setViewDate] = useState(dayjs());
  const [selectDate, setSelectDate] = useState(dayjs());
  const [createPopup, setCreatePopup] = useState(false);
  const [date, setDate] = useState({ year: "", month: "", day: "" });
  const [send, setSend] = useState({ title: "" });
  const [content, setContent] = useState("");
  const [calendar, setCalendar] = useState([]);
  const calendarList = document.querySelectorAll(".calendar");
  useEffect(() => {
    data && data.calendars && changeCalendar();
  }, [viewDate]);

  useEffect(() => {
    data && data.calendars && changeCalendar();
  }, [data]);

  useEffect(() => {
    calendarList && setCalendarList();
    console.log("update calendar");
  }, [calendar]);

  useEffect(() => {
    if (!createPopup) {
      setSend({});
      setContent("");
    }
    console.log("update Popup");
  }, [createPopup]);

  const changeCalendar = () => {
    setCalendar(
      data.calendars.filter(
        (e) =>
          e.fromDate.substring(0, 7) ==
          `${viewDate.$y}-${
            viewDate.$M < 9 ? "0" + (viewDate.$M + 1) : viewDate.$M + 1
          }`
      )
    );
  };

  const setCalendarList = () => {
    Array.from(calendarList).map((e) => {
      e.innerHTML = "";
      const found = calendar.filter(
        (element) => element.fromDate.substring(0, 10) === e.id
      );

      if (found.length) {
        found.map((element) => {
          const div = document.createElement("button");
          div.innerHTML =
            element.title.length < 7
              ? element.title
              : element.title.substring(0, 6) + "...";
          div.classList.add("calendarOne");
          div.classList.add("korean");
          e.append(div);
          div.addEventListener("click", () => {
            setCreatePopup(true);
            setSend({ title: element.title, idx: element.idx });
            setContent(element.content);
            setDate({
              year: element.fromDate.substring(0, 4),
              month: element.fromDate.substring(5, 7),
              day: element.fromDate.substring(8, 10),
            });
          });
          div.removeEventListener("click", () => {
            console.log(element.content);

            setCreatePopup(true);
            setSend({ title: element.title, idx: element.idx });
            setContent(element.content);
          });
        });
      }
    });
  };

  const createCalendar = () => {
    const startWeek = viewDate.startOf("month").week();
    const endWeek =
      viewDate.endOf("month").week() === 1
        ? 53
        : viewDate.endOf("month").week();
    let calender = [];

    for (let week = startWeek; week <= endWeek; week++) {
      calender.push(
        <div className="weeks" key={week}>
          {Array(7)
            .fill(0)
            .map((n, i) => {
              let current = viewDate
                .startOf("week")
                .week(week)
                .add(n + i, "day");
              if (viewDate.format("MM") === "12") {
                current = viewDate
                  .startOf("week")
                  .week(week - 52)
                  .add(n + i, "day");
              }
              // 현재 날짜 (기준)
              let isSelected =
                selectDate.format("YYYYMMDD") === current.format("YYYYMMDD")
                  ? "selected"
                  : "";
              let isToday =
                today.format("YYYYMMDD") === current.format("YYYYMMDD")
                  ? "today"
                  : "";
              let isNone =
                current.format("MM") === viewDate.format("MM") ? "" : "none";
              return (
                <>
                  <Flex
                    setting={{
                      justify: "flex-start",
                      align: "flex-start",
                      dir: "column",
                    }}
                    key={`${week}_${i}`}
                    className={`relative`}
                    style={{
                      opacity: isNone === "none" ? "0" : "1",
                      padding: 7.5,
                    }}
                  >
                    <Flex
                      setting={{
                        justify: "space-between",
                        align: "center",
                        dir: "row",
                      }}
                    >
                      <div className={`text day--number ${isToday}`}>
                        <span
                          className={`day `}
                          style={{ opacity: current.format("D") ? "1" : "0" }}
                        >
                          {current.format("D")}
                        </span>
                        {/* {isToday ? (
                        <span className="isToday">TODAY</span>
                      ) : isSelected ? (
                        <span className="isSelected"></span>
                      ) : null} */}
                      </div>
                      <button
                        className={"plus"}
                        onClick={() => {
                          setCreatePopup(true);
                          setDate({
                            year: `${current.format("YYYY")}`,
                            month: `${current.format("MM")}`,
                            day: `${current.format("DD")}`,
                          });
                        }}
                      >
                        <FontAwesomeIcon icon={faPlus} />
                      </button>
                    </Flex>

                    <Flex
                      setting={{
                        justify: "center",
                        align: "center",
                        dir: "column",
                      }}
                      className="calendar"
                      id={`${current.format("YYYY")}-${current.format(
                        "MM"
                      )}-${current.format("DD")}`}
                    ></Flex>
                  </Flex>
                </>
              );
            })}
        </div>
      );
    }
    return calender;
  };

  const changegeMonth = (date, changeString) => {
    switch (changeString) {
      case "add":
        return setViewDate(viewDate.add(1, "month"));
      case "subtract":
        return setViewDate(viewDate.subtract(1, "month"));
      default:
        return date;
    }
  };

  const popupContents = () => {
    // console.log(inputFocus.current);
    // inputFocus.current && inputFocus.current.focus();

    return (
      <>
        <Flex
          setting={{ justify: "flex-start", align: "center", dir: "column" }}
        >
          <Flex
            setting={{ justify: "center", align: "flex-start", dir: "column" }}
            style={{ width: "80%", marginTop: "40px" }}
          >
            <Title>
              <Flex
                setting={{
                  justify: "center",
                  align: "flex-start",
                  dir: "column",
                }}
              >
                <Text
                  size={"35px"}
                  weight={"500"}
                  as={"input"}
                  type={"text"}
                  placeholder="Non-title"
                  style={{
                    border: "none",
                    outline: "none",
                    marginBottom: "10px",
                    padding: 0,
                  }}
                  value={send.title}
                  autoFocus
                  onChange={(e) => setSend({ ...send, title: e.target.value })}
                />
                <Text
                  size={"15px"}
                  weight={"500"}
                  style={{
                    color: "var(--color-text-ver2)",
                    letterSpacing: "0.7px",
                  }}
                >
                  DATE:{date.year}/{date.month}/{date.day}
                </Text>
              </Flex>
              <Flex
                setting={{
                  justify: "flex-end",
                  align: "flex-end",
                  dir: "row",
                }}
              >
                <Button
                  setting={{
                    color: "var(--color-text-ver2)",
                    backColor: "var(--color-background-focus)",
                  }}
                  style={{ marginRight: 10 }}
                  onClick={() =>
                    submitHandler({
                      fromDate: `${date.year}-${date.month}-${date.day}T00:00:00`,
                      toDate: `${date.year}-${date.month}-${date.day}T01:00:00`,
                      idx: send.idx && send.idx,
                    })
                  }
                >
                  <FontAwesomeIcon icon={faEdit} />
                </Button>
                <Button
                  setting={{
                    color: "var(--color-warning)",
                    backColor: "var(--color-warningBack)",
                  }}
                  onClick={() => deleteCalendar(send.idx)}
                >
                  <FontAwesomeIcon icon={faTrashAlt} />
                </Button>
              </Flex>
            </Title>
            <MyEdit>
              <>
                <ReactSummernote
                  value={content}
                  options={{
                    lang: "ru-RU",
                    dialogsInBody: true,
                    fontNamesIgnoreCheck: ["Roboto"],
                    fontNames: [
                      "Roboto",
                      "Arial",
                      "Arial Black",
                      "Comic Sans MS",
                      "Courier New",
                      "Helvetica Neue",
                      "Helvetica",
                      "Impact",
                      "Lucida Grande",
                      "Tahoma",
                      "Times New Roman",
                      "Verdana",
                    ],

                    toolbar: [
                      ["style", ["style"]],
                      ["font", ["bold", "underline", "clear"]],
                      ["fontsize", ["fontsize"]],
                      ["fontname", ["fontname"]],
                      ["color", ["color"]],
                      ["para", ["ul", "ol", "paragraph"]],
                      ["table", ["table"]],
                      ["insert", ["link", "picture", "video"]],
                      ["view", ["fullscreen", "codeview"]],
                    ],
                  }}
                  onChange={(content) => setContent(content)}
                  // onChange={this.onChange}
                  onImageUpload={onImageUpload}
                />
              </>
            </MyEdit>
          </Flex>
        </Flex>
      </>
    );
  };

  const returnCreating = (popup) =>
    popup && (
      <Popup
        status={true}
        component={popupContents}
        size={{ width: "950px", height: "570px" }}
        setPopup={setCreatePopup}
        notover={false}
      />
    );

  //   const onChangeHandler = (title, content) => {
  //     setSend({ title: send.title, content: send.content, [title]: content });
  //   };

  const uploadImageCallBack = async (file) => {
    try {
      const data = new FormData();
      data.append("img", file[file.length - 1]);
      const res = await imageApi.setPostImage(data);
      return res.data.message;
    } catch (e) {
      console.log(e);
    }
  };
  const onImageUpload = async (images, insertImage) => {
    for (let i = 0; i < images.length; i++) {
      const reader = new FileReader();

      reader.onloadend = () => {
        insertImage(reader.result);
      };
      const data = await uploadImageCallBack(images);
      insertImage(data);
    }
  };

  const submitHandler = async ({ idx, fromDate, toDate }) => {
    try {
      const { data } = await boardApi.saveCalendar({
        studyIdx,
        idx,
        title: send.title,
        content,
        fromDate,
        toDate,
      });
      data && getData.getCalendars();
      data && setCreatePopup(false);
    } catch (e) {
      console.log(e);
    }
  };

  const deleteCalendar = async (idx) => {
    try {
      const data = await boardApi.deleteCalendar(idx);
      data && getData.getCalendars();
      data && setCreatePopup(false);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <Flex setting={{ justify: "center", align: "center", dir: "column" }}>
      <Flex
        setting={{ justify: "center", align: "flex-start", dir: "column" }}
        style={{ width: "80%", margin: "20px 0 " }}
      >
        <Text size={"30px"} weight={"400"}>
          Calendar
        </Text>
      </Flex>

      <Flex
        setting={{ justify: "flex-start", align: "flex-start", dir: "row" }}
        style={{ width: "700px" }}
      >
        <StyledHeader>
          <button
            className="previous_icon"
            onClick={() => changegeMonth(viewDate, "subtract")}
          >
            <FontAwesomeIcon icon={faArrowAltCircleLeft} />
          </button>
          <span className="thisMonth">
            {viewDate.format("YYYY")}/{viewDate.format("MM")}
          </span>
          <button
            className="next_icon"
            onClick={() => changegeMonth(viewDate, "add")}
          >
            <FontAwesomeIcon icon={faArrowAltCircleRight} />
          </button>
        </StyledHeader>
      </Flex>

      <StyledBody>
        <div
          className="weeks"
          style={{ marginBottom: "10px", minHeight: "100%" }}
        >
          <Flex setting={{ justify: "center", align: "center", dir: "row" }}>
            <span className="text">SUN</span>
          </Flex>
          <Flex setting={{ justify: "center", align: "center", dir: "row" }}>
            <span className="text">MON</span>
          </Flex>
          <Flex setting={{ justify: "center", align: "center", dir: "row" }}>
            <span className="text">TUE</span>
          </Flex>
          <Flex setting={{ justify: "center", align: "center", dir: "row" }}>
            <span className="text">WED</span>
          </Flex>
          <Flex setting={{ justify: "center", align: "center", dir: "row" }}>
            <span className="text">THU</span>
          </Flex>
          <Flex setting={{ justify: "center", align: "center", dir: "row" }}>
            <span className="text">FRI</span>
          </Flex>
          <Flex setting={{ justify: "center", align: "center", dir: "row" }}>
            <span className="text">SAT</span>
          </Flex>
        </div>
        <div className="days">{createCalendar()}</div>
      </StyledBody>
      {returnCreating(createPopup)}
    </Flex>
  );
});
const getCurrentState = (state, ownProps) => {
  return state;
};
export default connect(getCurrentState)(Calender);

const StyledHeader = styled.div`
  display: flex;
  justify-content: center;
  align-content: center;
  margin: 20px;
  height: 35px;
  .thisMonth {
    font-weight: 600;
    color: #292929;
    letter-spacing: 0.7px;
    font-size: 25px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  button {
    width: 24px;
    margin: 0 8px;
  }
  .previous_icon {
    width: 20px;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
  }
  .next_icon {
    width: 20px;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
  }
`;

const StyledBody = styled.div`
  margin: 20px 0;

  .calendarOne {
    width: 100%;
    height: 20px;
    border: 1px solid var(--color-border);
    border-radius: 5px;
    color: blue;
    font-size: 10px;
    font-weight: 1000;
  }
  .calendarOne:not(:first-child) {
    margin-top: 5px;
  }

  .day--number {
    width: 25px;
    height: 25px;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .plus {
    width: 25px;
    height: 25px;
    border: 0.5px solid var(--color-border);
    border-radius: 5px;
    color: var(--color-border);
    font-size: 12px;
    opacity: 0;
  }

  .absolute {
    position: absolute;
  }
  .relative {
    background-color: white;
    &:hover .plus {
      opacity: 1;
    }
  }

  .weeks {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr 1fr;
    width: 700px;
    column-gap: 10px;
    min-height: 100px;
  }
  .days {
    display: grid;
    width: 700px;
    grid-auto-rows: auto;
    row-gap: 10px;
  }

  .row {
    display: flex;
    justify-content: space-between;
    align-items: center;
    cursor: pointer;
    width: 70%;
  }
  .row.week {
    height: 18px;
    border-bottom: 1px solid #e8e8e8;
  }
  .box {
    width: 32px;
    height: 32px;
    margin: 6px 6px;
    font-size: 14px;
  }
  .title {
    width: 100%;
    height: 100%;
    font-size: 14px;
  }
  .text {
    position: static;
    font-weight: 600;
    color: var(--color-text-ver3);
  }
  .holiday,
  .grayed {
    color: #484848;
    pointer-events: none;
  }
  .day {
    font-size: 15px;
  }
  .selected {
    width: 32px;
    height: 32px;
    border-radius: 50%;
    background: pink;
    font-weight: 700;
  }
  .today {
    border-radius: 50%;
    font-weight: 500;
    /* color: pink; */
    background-color: blue;
    color: white;
    width: 25px;
    height: 25px;
  }
  .isSelected {
    position: relative;
    color: pink;
    font-size: 10px;
    font-weight: 400;
  }
  .isToday {
    width: 100%;
    height: 100%;
    background-color: var(--color-background);
  }
  .none {
    display: none;
  }
`;
