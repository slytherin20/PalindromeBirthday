const date = document.querySelector(".inp");
const button = document.querySelector(".btn");
const resultBox = document.querySelector(".result-box");

function convertDate(){
    let val = date.value;
    let yyyy = val.slice(0,4);
    let yy = yyyy.slice(2);
    let mm = val.slice(5,7);
    let dd = val.slice(8);
    let d1 = mm.slice(0,1);
    let d2 = mm.slice(1);
    let reverseYYYY = yyyy.split("").reverse().join("");
    let reverseYY = yy.split("").reverse().join("");
    if((reverseYYYY===(dd+mm)) || (reverseYYYY===(mm+dd)) || (reverseYY+d2===(dd+d1)))
    {
        showResult(1)
    }
    else{
        anyPrevDate(yyyy,yy,reverseYYYY,reverseYY,mm,dd);
      //  anyNextDate(yyyy,yy,reverseYYYY,reverseYY,mm,dd);
    }
}

function anyPrevDate(yyyy,yy,reverseYYYY,reverseYY,mm,dd){
    //dd-mm-yy
    let [DDMMYY,noOfDaysDDMMYY] = prevDDMMYY(yy,reverseYY,mm,dd);
    //mm-dd-yy
    let [MMDDYY,noOfDaysMMDDYY] = prevMMDDYY(yy,reverseYY,mm,dd);
    //dd-mm-yyyy 
    prevDDMMYYYY(yyyy,reverseYYYY,mm,dd);
    //mm-dd-yyyy
   // prevMMDDYYYY(yyyy,reverseYYYY,mm,dd);
}

function prevDDMMYYYY(yyyy,reverseYYYY,mm,dd){
    
}

function prevDDMMYY(yy,reverseYY,mm,dd){
    let x = yy.slice(0,1);
    let y = yy.slice(1);
        while(Number(reverseYY)>30){
            y = String(Number(y)-1);
            reverseYY = y+x;
            yy = x+y;
            console.log("reverse yr:",reverseYY)
        }
   console.log(reverseYY+"/"+"11"+"/"+yy);
   let bday = birthdayDate();
   let noOfDays = dateDifference("11"+"/"+reverseYY+"/"+yy,bday);
    return [reverseYY+"/"+"11"+"/"+yy,noOfDays];
}

function prevMMDDYY(yy,reverseYY,mm,dd){
    let x = yy.slice(0,1);
    let y = yy.slice(1);
    while(Number(reverseYY)>12){
        y = String(Number(y)-1);
        reverseYY = y+x;
        yy = x+y;
    }
   bday = birthdayDate();
    let date1 = reverseYY+"/"+"11"+"/"+yy;
    let date2 = reverseYY+"/"+"22"+"/"+yy;
    noOfDays1 = dateDifference(date1,bday);
    noOfDays2 = dateDifference(date2,bday);
    if(noOfDays1<noOfDays2) return [date1,noOfDays1]
    else return [date2,noOfDays2]
}

function birthdayDate(){
    let bday = date.value;
    bdayArr = bday.split("-");
    bday = bdayArr[1]+"/"+bdayArr[2]+"/"+bdayArr[0];
    console.log(bday)
    return bday;
}

function dateDifference(date1,date2){
    let Date1 = new Date(date1);
    let Date2 = new Date(date2);
    timeDiff = Math.abs(Date1.getTime()-Date2.getTime());
    noOfDays = timeDiff/(24*3600*1000)
    return noOfDays;
}

function showResult(val){
    const loader = document.createElement("img");
    loader.setAttribute("src","https://media.giphy.com/media/K9GWAtJoaaIy7vSCW8/giphy.gif");
    loader.setAttribute("alt","loading");
    resultBox.appendChild(loader);
    resultBox.scrollIntoView();
    val?window.setTimeout(()=>showSuccess(loader),4000): showNewDate()
}

function showSuccess(child){
    resultBox.removeChild(child);
    const success = document.createElement("h2");
    const img = document.createElement("img");
    success.setAttribute("class","success");
    success.innerText = "Yes! Your birthday is a palindrome.";
    img.setAttribute("src","https://media.giphy.com/media/xTgeJ6yVlfWHpxgApO/giphy.gif");
    img.setAttribute("alt","success");
    resultBox.appendChild(success);
    resultBox.appendChild(img);
}
































function validDate(mm,dd,yr){
    if(mm==="02" && ((dd<=29 && isLeapYear) || (dd<=28 && !isLeapYear))){
        console.log("Month is february");
        newDate = dd+"/"+mm+"/"+yr;
        console.log(newDate)
        return true;
    }
    else if(mm%2===0 && mm!=="07" && dd<=30){
        console.log("month is even");
        newDate = dd+"/"+mm+"/"+yr;
        console.log(newDate)
        return true;
    }
    else if(mm%2!==0 && dd<=31){
        console.log("month is odd");
        newDate = dd+"/"+mm+"/"+yr;
        console.log(newDate)
        return true;
    }
}
function isLeapYear(yr){
    if(yr%400===0)
        return true
    if(yr%100===0)
        return false
    if(yr%4===0)
        return true
    return false
}

button.addEventListener("click",convertDate);