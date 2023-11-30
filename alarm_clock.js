let main_time = document.getElementById('time');
let set_alarm = document.getElementById('set_alarm');
let hour = document.getElementById("hours");
let min = document.getElementById('min');

let select = document.querySelectorAll("select");
let alarm_list = document.getElementById('alarm_list');
const currentTime = new Date();

let alarmTime;

var audio = new Audio("assets/alarm_tone.wav");

// this interval is used to set the time showing on the clock

setInterval(() => {
    let t = new Date();

    let ampm;

    let h = t.getHours();
    let m = t.getMinutes();
    let s = t.getSeconds();

    if (h < 10) {
        h = "0" + h;
    }


    if (m < 10) {
        m = "0" + m;
    }
    if (s < 10) {
        s = "0" + s;
    }
    if (h > 12) {
        ampm = "PM";
    } else {
        ampm = "AM";
    }
    main_time.innerHTML = `${h}:${m}:${s} ${ampm}`;


}, 1000);

// setting the values of inputs dropdown list

for (let i = 23; i >= 0; i--) {
    if (i < 10) {
        i = "0" + i;
    }
    let option = `<option value = ${i}>${i}</option>`
    select[0].firstElementChild.insertAdjacentHTML("afterend", option);
}
for (let i = 59; i >= 0; i--) {
    if (i < 10) {
        i = "0" + i;
    }
    let option = `<option value = ${i}>${i}</option>`
    select[1].firstElementChild.insertAdjacentHTML("afterend", option);
}

// setting the value of alarm time.

function setAlarm() {
    let time = `${select[0].value}:${select[1].value} ${select[2].value}`

    if (time.includes("hour") || time.includes("min")) {
        alert("enter a valid time");
    }
    alarmTime = time;
}

// putting the values of alarm in the alarm list.

let listkey = 0;

function setAlarmList() {

    sessionStorage.setItem(listkey, alarmTime);

    alarm_list.innerHTML += `
        <ul >
            <li class="list">${sessionStorage.getItem(listkey)}
            
            <button class="setbtn" value="off" >OFF</button>    
            <button class="removebtn" >remove</button>    
            </li>
            </ul>
        `

    listkey++;

    // here is the code for button to on/off the alarm.

    const onOff = document.querySelectorAll('.setbtn');
    for (let i = 0; i < onOff.length; i++) {

        onOff[i].addEventListener("click", () => {
            if (onOff[i].value == "off") {
                onOff[i].value = "on";
                onOff[i].innerHTML = "ON";
                alarmTime = sessionStorage.getItem(i);
                

                ringingAlarm();

            } else {
                onOff[i].value = "off";
                onOff[i].innerHTML = "OFF";
                alarmTime = "a";
            }
        })
    }

    // here is the code for removing the selected alarm from the list.
    const close = document.querySelectorAll('.removebtn');
    for (let i = 0; i < close.length; i++) {

        close[i].addEventListener("click", () => {

            close[i].parentElement.innerHTML = "";
            sessionStorage.removeItem(i);

        })
    }
}

function removeAlarm(value) {
    localStorage.removeItem(value);
}

//function to ring the alarm

function ringingAlarm() {
    const timing = setInterval(() => {
        let t = new Date();

        let ampm;

        let h = t.getHours();
        let m = t.getMinutes();
        let s = t.getSeconds();

        if (h < 10) {
            h = "0" + h;
        }

        if (m < 10) {
            m = "0" + m;
        }
        if (s < 10) {
            s = "0" + s;
        }
        if (h > 12) {
            ampm = "PM";
        } else {
            ampm = "AM";
        }

        // here we are checking whether alarm time is arrived or not.

        if (alarmTime == `${h}:${m} ${ampm}`) {
            audio.play();

            // here we are making the stop button to stop the ongoing alarm... set alarm button is converted into stop alarm when alarm is ringing.

            set_alarm.innerHTML = "Stop Alarm";
            set_alarm.classList.add("stop-button");

            let stopbtn = document.querySelector(".stop-button");
            stopbtn.removeEventListener('click', setAlarmList);
            stopbtn.addEventListener("click", () => {
                audio.pause();
                clearInterval(timing);
                set_alarm.innerHTML = "Set Alarm";
                set_alarm.addEventListener('click', setAlarmList);
                set_alarm.addEventListener('click', setAlarm);


            })
        } else {
            set_alarm.innerHTML = "Set Alarm";
        }
    }, 1000)

}


set_alarm.addEventListener('click', setAlarm);
set_alarm.addEventListener('click', setAlarmList);



