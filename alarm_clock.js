let main_time = document.getElementById('time');
let set_alarm = document.getElementById('set_alarm');
let hour = document.getElementById("hours");
let min = document.getElementById('min');
let alarmTime;
let select = document.querySelectorAll("select");
let alarm_list = document.getElementById('alarm_list');
const currentTime = new Date();
setInterval(()=>{
    let t =  new Date();
    
    let ampm;
   
    let h= t.getHours();
    let m= t.getMinutes();
    let s= t.getSeconds();

    if(h<10){
        h = "0" + h;
     }
    //else if(h>12){
    //     h = h - '12';
    // }

    if(m<10){
        m = "0" + m;
    }
    if(s<10){
        s = "0" + s;
    }
    if(h>12){
        ampm = "PM";
    }else{
        ampm = "AM";
    }
     main_time.innerHTML = `${h}:${m}:${s} ${ampm}`;

    if(alarmTime==`${h}:${m} ${ampm}`){
        play();
    }

},1000);

for(let i=24 ; i>0 ; i--){
    if(i<10){
        i = "0" + i;
    }
    let option = `<option value = ${i}>${i}</option>`
    select[0].firstElementChild.insertAdjacentHTML("afterend",option);
}
for(let i=59 ; i>0 ; i--){
    if(i<10){
        i = "0" + i;
    }
    let option = `<option value = ${i}>${i}</option>`
    select[1].firstElementChild.insertAdjacentHTML("afterend",option);
}

function setAlarm(){
    let time = `${select[0].value}:${select[1].value} ${select[2].value}`

    if(time.includes("hour")|| time.includes("hour")){
        alert("enter a valid time");
    }
    alarmTime = time;
}

function play (){
    var audio = new Audio("assets/alarm_tone.wav");
    audio.play();
    setTimeout(()=>{
        audio.pause();
    },3000)
}
 function setAlarmList(){
    let listkey = 0;
    localStorage.setItem(listkey,alarmTime);
    // i++;
    listkey++;
   

    for(let i = 0 ; i< localStorage.length;i++){
        alarm_list.innerHTML += `
        <ul >
            <li class="list">${localStorage.getItem(i)}
            <button class="span" >remove</button>
            </li>
            </ul>
        `
    } const close = document.querySelectorAll('.span');
    for(let i=0 ; i<close.length ; i++){
        close[i].addEventListener("click", ()=>{
            close[i].parentElement.style.display = "none";
        })
    }
 }
 
function removeAlarm(value){
    localStorage.removeItem(value);
}
 set_alarm.addEventListener('click',setAlarm);
 set_alarm.addEventListener('click',setAlarmList);


// setAlarmList();
