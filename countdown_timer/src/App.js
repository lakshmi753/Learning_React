import React, { useState } from "react";

export default function App() {
  const [userDate, setUserDate] = useState("");
  // const [presentDate, setPresentDate] = useState(new Date());
  const [days, setDays] = useState(0);
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);
  const [intervalId, setIntervalId] = useState(0);

  function handleTimer() {
    // const userDate = e.target.value;
    const endDate = new Date(userDate);

    const presentDate = new Date();

    const timeDifference = endDate - presentDate;

    if (timeDifference < 0) return;

    const timeDiffInSec = Math.floor(timeDifference / 1000);

    // Number of days............
    // const days = Math.floor(timeDiffInSec / 86400); // 1 day = 86400 secs.
    setDays(Math.floor(timeDiffInSec / 86400));

    // Number of hours..........
    const remainingSecAfterDays = timeDiffInSec % 86400;

    //const hours = Math.floor(remainingSecAfterDays / 3600); // 1 hour = 3600 secs.
    setHours(Math.floor(remainingSecAfterDays / 3600));

    // Number of minutes..............
    const remainingsecAfterHours = remainingSecAfterDays % 3600;

    //const minutes = Math.floor(remainingsecAfterHours / 60); // 1 minute = 60 secs.
    setMinutes(Math.floor(remainingsecAfterHours / 60));

    // Number of seconds................
    //const seconds = remainingsecAfterHours % 60;
    setSeconds(remainingsecAfterHours % 60);

    // Setting Timer ......................
    //displayTimer(days, hours, minutes, seconds);
  }

  function handleResetTimer() {
    setUserDate("");
    setDays(0);
    setHours(0);
    setMinutes(0);
    setSeconds(0);
    clearInterval(intervalId);
  }

  function handleIntervalTimer() {
    let newIntervalId = setInterval(() => {
      handleTimer();
    }, 1000);

    setIntervalId(newIntervalId);
  }

  return (
    <div>
      <Header />
      <Section userDate={userDate} setUserDate={setUserDate} />
      <Main
        onHandleTimer={handleTimer}
        days={days}
        hours={hours}
        minutes={minutes}
        seconds={seconds}
        onHandleResetTimer={handleResetTimer}
        onIntervalTimer={handleIntervalTimer}
      />
    </div>
  );
}

function Header() {
  return (
    <header>
      <h1>CountDown Timer ⌚</h1>
    </header>
  );
}

function Section({ userDate, setUserDate }) {
  return (
    <section>
      <h2>Set the CountDown Ending Date...</h2>
      <div className="dateTimeBox">
        <span>Enter date and time : </span>
        <input
          type="text"
          placeholder="04 April 2024, 10:00 am"
          value={userDate}
          onChange={(e) => setUserDate(e.target.value)}
        />
      </div>
      <p>
        (Follow the same format for date and time as shown in the input area.)
      </p>
    </section>
  );
}

function Main({
  onHandleTimer,
  days,
  hours,
  minutes,
  seconds,
  onHandleResetTimer,
  onIntervalTimer,
}) {
  function handleSetTimer() {
    onHandleTimer();

    onIntervalTimer();
  }

  return (
    <main>
      <div className="countDownContainer">
        <div className="countBox">
          <div className="count count-1">{days}</div>
          <p>Days</p>
        </div>
        <div className="countBox">
          <div className="count count-2">{hours}</div>
          <p>Hours</p>
        </div>
        <div className="countBox">
          <div className="count count-3">{minutes}</div>
          <p>Minutes</p>
        </div>
        <div className="countBox">
          <div className="count count-4">{seconds}</div>
          <p>Seconds</p>
        </div>
      </div>
      <div className="btn-box">
        <button className="btn" onClick={handleSetTimer}>
          Set Timer
        </button>
        <button className="btn" onClick={onHandleResetTimer}>
          Reset Timer
        </button>
      </div>
    </main>
  );
}
