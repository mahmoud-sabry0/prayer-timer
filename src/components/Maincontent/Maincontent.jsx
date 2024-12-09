import React, { useEffect, useState } from "react";
import Stack from "@mui/material/Stack";
import Prayer from "../prayer/Prayer";
import img from "../../image/download.jpg";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import moment from "moment";
import "moment/dist/locale/ar-dz";
import axios from "axios";
moment.locale("ar");

export default function Maincontent() {
  const [nextPrayerIndex, setNextPrayerIndex] = useState(0)
  const [timings, setTimings] = useState({
    Fajr: "04:52",
    Dhuhr: "11:38",
    Asr: "14:44",
    Sunset: "17:04",
    Isha: "18:34",
  });
  /////////P
const [remainingTime,setRemainingTime]=useState("")

  const [selectedCity, setSelectedCity] = useState({
    displayName: "مصر",
    apiName: "Egypt",
  });
  /////
  const availableCities = [
    { displayName: "مصر", apiName: "Egypt" },
    { displayName: "الرياض", apiName: "Riyadh" },
    { displayName: "الاردن", apiName: "Jordan" },
    { displayName: "المغرب", apiName: "Morocco" },
    { displayName: "فلسطين", apiName: "Palestine" },
  ];
  const prayersArray = [
    {key:"Fajr", displayName:"الفجر" },
    {key:"Dhuhr", displayName: "الظهر" },
    {key:"Asr", displayName: "العصر" },
    {key:"Sunset", displayName: "المغرب" },
    {key:"Isha", displayName: "العشاء" },
  ];

  ///
  const [today, setToday] = useState("");


  /////
  const gitTimings = async () => {
    const response = await axios.get(
      `https://api.aladhan.com/v1/timingsByCity?country=SA&city=${selectedCity.apiName}`
    );
    setTimings(response.data.data.timings);
  };
  useEffect(() => {
    gitTimings();
}, [selectedCity]);
////////////////////
  useEffect(()=>{
let interval= setInterval(()=>{
  setupCountdownTimer();
      
    },1000);
    const t = moment();
    setToday(t.format("الوقت الان: Do MMMM YYYY | h:mm"));

    return()=>{
      clearInterval(interval);
    }
  },[timings]);

  const setupCountdownTimer=()=>{
    const momentNow = moment();
    let PrayerIndex=2;

    if (momentNow.isAfter(moment(timings["Fajr"],"hh:mm"))&&
    momentNow.isBefore(moment(timings["Dhuhr"],"hh:mm"))) {
      PrayerIndex=1;

    }else if(momentNow.isAfter(moment(timings["Dhuhr"],"hh:mm"))&&
    momentNow.isBefore(moment(timings["Asr"],"hh:mm"))){
      PrayerIndex=2;
    }else if(momentNow.isAfter(moment(timings["Asr"],"hh:mm"))&&
    momentNow.isBefore(moment(timings["Sunset"],"hh:mm"))){
      PrayerIndex=3;
    }else if(momentNow.isAfter(moment(timings["Sunset"],"hh:mm"))&&
    momentNow.isBefore(moment(timings["Isha"],"hh:mm"))){
    
      PrayerIndex=4;
    }else {
      PrayerIndex=0;
    }
    setNextPrayerIndex(PrayerIndex)

const nextPrayerObject=prayersArray[PrayerIndex];
const nextPrayerTimer=timings[nextPrayerObject.key];
const nextPrayerTimeMoment=moment(nextPrayerTimer,"hh:mm")
const remainingTime=moment(nextPrayerTimer,"hh:mm").diff(momentNow);

if (remainingTime < 0) {
  const midnightDiff=moment("23:59:59","hh:mm:ss").diff(momentNow);
const fajrToMidnightDiff=nextPrayerTimeMoment.diff(moment("00:00:00","hh:mm:ss"))
const totalDiffernce= midnightDiff + fajrToMidnightDiff;
remainingTime = totalDiffernce;
}
const durationRemainingTime=moment.duration(remainingTime);
setRemainingTime(` ${durationRemainingTime.seconds()}: ${durationRemainingTime.minutes()} : ${durationRemainingTime.hours()}`);
// console.log(
//   "duration isss",
//   durationRemainingTime.hours(),
//   durationRemainingTime.minutes(),
//   durationRemainingTime.seconds(),
// )
  };

  const handleCityChange = (event) => {
    const cityObject = availableCities.find((city) => {
      return city.apiName === event.target.value;
    });
    console.log("the now value is",event.target.value);
    setSelectedCity(cityObject);
  };

  return (
    <>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <div>
          <h1>{selectedCity.displayName}</h1>
          <h2>{today}</h2>
        </div>

        <div>
          <h2>متبقي حتي صلاه {prayersArray[nextPrayerIndex].displayName}</h2>
          <h1>{remainingTime}</h1>
        </div>
      </div>
      <hr />
      <Stack direction="row" justifyContent="space-around">
        <Prayer name="الفجر" time={timings.Fajr} img={img} />
        <Prayer name="الظهر" time={timings.Dhuhr} img={img} />
        <Prayer name="العصر" time={timings.Asr} img={img} />
        <Prayer name="المغرب" time={timings.Sunset} img={img} />
        <Prayer name="العشاء" time={timings.Isha} img={img} />
      </Stack>

      <Stack
        direction="row"
        justifyContent="center"
        style={{ marginTop: "20px" }}
      >
        <FormControl style={{ width: "20%" }}>
          <InputLabel id="demo-simple-select-label">المدينه</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            // value={age}
            label="Age"
            onChange={handleCityChange}
          >
            {availableCities.map((city) => {
              return (
                <MenuItem key={city.apiName} value={city.apiName}>
                  {city.displayName}
                </MenuItem>
              );
            })}
          </Select>
        </FormControl>
      </Stack>
    </>
  );
}
