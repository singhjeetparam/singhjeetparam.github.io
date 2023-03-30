// FETCHING ALL REQUIRED ELEMENTS
const setHour = document.querySelectorAll(".setHour");
const setMin = document.querySelectorAll(".setMin");
const totalOfRows = document.querySelectorAll(".totalOfRow");
const totalHours = document.querySelector("#totalHours");
const startTimes = document.querySelectorAll(".startTime");
const endTimes = document.querySelectorAll(".endTime");
const breakDeductions = document.querySelectorAll(".breakDeduction");

//DESTRUCTURING VARIABLES FORM ARRAYS
const [startHourInput, startMinInput, startAmPmInput] = startTimes;
const [endHourInput, endMinInput, endAmPmInput] = endTimes;
const [breakHourInput, breakMinInput] = breakDeductions;


// CALCULATION FUNCTION
const clickCalculate = (e) => {
    //PREVENTING THE SUBMISSION OF FORM
  e.preventDefault();
    // INITIALISING VARIABLES
  let totalHour = 0,totalMin = 0;
//   LOOP FOR ITERATING OVER EACH ELEMENT OF STARTTIMES
  for (let ind = 0; ind < startTimes.length; ind++) {
    
    // INITIALISING VARIABLES AND FETCHING THEIR VALUES AND IF THE VALUE IS NULL THEN SET IT TO 0
    const [startHour, startMin, start_AM_PM] = [
      parseInt(startTimes[ind].children[0].value) || 0,
      parseInt(startTimes[ind].children[1].value) || 0,
      startTimes[ind].children[2].value,
    ];
    
       // INITIALISING VARIABLES AND FETCHING THEIR VALUES AND IF THE VALUE IS NULL THEN SET IT TO 0
    let [endHour, endMin, end_AM_PM] = [
      parseInt(endTimes[ind].children[0].value) || 0,
      parseInt(endTimes[ind].children[1].value) || 0,
      endTimes[ind].children[2].value,
    ];
   // INITIALISING VARIABLES AND FETCHING THEIR VALUES AND IF THE VALUE IS NULL THEN SET IT TO 0
    let [breakHour, breakMin] = [
      parseInt(breakDeductions[ind].children[0].value) || 0,
      parseInt(breakDeductions[ind].children[1].value) || 0,
    ];

    let [resHour, resMin] = ["0", "00"];

    
    // TIME CALCULATION
    if (startHour == 0 || endHour == 0) {
        resHour = "0";
        resMin = "00";
      } else {
        //CONVERT START AND END TIME TO 24-HOUR FORMAT
        if (start_AM_PM === "PM") {
          startHour = startHour === 12 ? 12 : startHour + 12;
        } else if (start_AM_PM === "AM" && startHour === 12) {
          startHour = 0;
        }
        
        if (end_AM_PM === "PM") {
          endHour = endHour === 12 ? 12 : endHour + 12;
        } else if (end_AM_PM === "AM" && endHour === 12) {
          endHour = 24;
        }
        
        //CALCULATE THE DURATION OF THE WORKDAY
        const [workHour, workMin] = calCTime(startHour, startMin, endHour, endMin);
        
        
        //DEDEUCT THE BREAK TIME FROM WORKDAY
        const [resultHour, resultMin] = calCTime(breakHour, breakMin, workHour, workMin);
        
        resHour = resultHour.toString();
        resMin = resultMin.toString().padStart(2, "0");
      }
      
    totalOfRows[ind].innerHTML = `${resHour}.${resMin == 0 ? "00" : resMin}`;
    totalHour += parseInt(resHour);
    totalMin += parseInt(resMin);
  }
  totalHour += Math.floor(totalMin / 60);
  totalMin = totalMin % 60;
  totalHours.innerHTML = `${totalHour}.${totalMin == 0 ? "00" : totalMin}`;
};

// TIME CALCULATION FUNCTION
const calCTime = (stHour, stMin, endHour, endMin) => {
  let hour, min;
  if (stMin > endMin) {
    hour = endHour - stHour - 1;
    min = 60 - (stMin - endMin);
  } else {
    hour = endHour - stHour;
    min = endMin - stMin;
  }

  return [Math.abs(hour), Math.abs(min)];
};

// CLEARING ALL THE DEFAULT VALUES 
const clickClearAll = (e) => {
  e.preventDefault();

  // SET 0
  setHour.forEach((hour, idx) => {
    hour.value = "";
    setMin[idx].value = "";
  });

  totalOfRows.forEach((elem) => {
    elem.innerHTML = "- -";
  });

  // SET AM IN PM 
  startTimes.forEach((startTime) => {
    const endTime = startTime.nextElementSibling;

    // START TIME
    startTime.children[2].value = "AM";

    // END TIME
    endTime.children[2].value = "PM";
  });

  totalHours.innerText = "- -";
};
