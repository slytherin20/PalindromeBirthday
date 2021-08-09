const date = document.querySelector(".inp");
const button = document.querySelector(".btn");
const resultBox = document.querySelector(".result-box");
const loadingBox = document.querySelector(".loading");
const result = document.querySelector(".result");

button.addEventListener("click",showResuts);

function showResuts(){
    if(date.value){
        result.innerText = "";
        loadingBox.classList.remove("hidden");
        window.setTimeout(findPalindromeOrNot,5000);
    }
    else{
        result.innerText = "Please enter date to show results.";
    }
}

function getDateObject(){
    let dateObj = date.value;
    let arr = dateObj.split("-").reverse();
    let dd = Number(arr[0]);
    let mm = Number(arr[1]);
    let yyyy = Number(arr[2]);

    dateObj = {
        day:dd,
        month:mm,
        year:yyyy
    }
    return dateObj;
}

function findPalindromeOrNot(){
        let dateString = "";
        let dateObj =  getDateObject();
        let [nextDays,nextPalindromeDate,nextDateFormat] = getNextPalindromeDate(dateObj);
        let [prevDays, prevPalindromeDate,prevDateFormat] = getPreviousPalindromeDate(dateObj);
        loadingBox.classList.add("hidden");
        if(nextDays<prevDays){
            dateString =  getDateInCorrectFormat(nextPalindromeDate,nextDateFormat);
            result.innerText = `Next palindrome date is ${dateString} (${nextDateFormat}). You missed it by ${nextDays} days.`
            }
        else{
           dateString = getDateInCorrectFormat(prevPalindromeDate,prevDateFormat);
           result.innerText = `Nearest palindrome date was ${dateString} (${prevDateFormat}). You missed it by ${prevDays} days.`
    
            }
}

function getDateInCorrectFormat(palindromeDate,format){
    palindromeDate = convertDateToString(palindromeDate)
    let dateString="";
    let formatArr = format.split("-");
    for(let i=0;i<formatArr.length;i++){
        if(formatArr[i]==="dd"){
                dateString = dateString + palindromeDate.day
        }
        else if(formatArr[i]==="mm"){
                dateString = dateString + palindromeDate.month;
        }
        else if(formatArr[i]==="yy") {
            dateString = dateString + palindromeDate.year.slice(-2);
        }
        else{
            dateString = dateString + palindromeDate.year;
        }
        if(i!==2){
            dateString = dateString + "-";
        }
    }
    return dateString;
}

function reverseString(dateString){
    return dateString.split("").reverse().join("");
}

function checkPalindrome(dateString,reverseDateString){
    return dateString===reverseDateString;
}

function convertDateToString(date){
    let dateString={};
    if(date.day<10){
        dateString.day = "0"+date.day
    }
    else{
        dateString.day = date.day.toString()
    }
    if(date.month<10){
        dateString.month = "0"+date.month
    }
    else{
        dateString.month = date.month.toString()
    }
    dateString.year = date.year.toString()
    return dateString;
}

function dateFormats(dateString){
    let ddmmyy,mmddyy,yyddmm,ddmmyyyy,mmddyyyy,yyyyddmm;

    ddmmyy = dateString.day+dateString.month+dateString.year.slice(-2);
    mmddyy = dateString.month+dateString.day+dateString.year.slice(-2);
    yyddmm = dateString.year.slice(-2)+dateString.day+dateString.month;
    ddmmyyyy = dateString.day+dateString.month+dateString.year;
    mmddyyyy = dateString.month+dateString.day+dateString.year;
    yyyyddmm = dateString.year+dateString.month+dateString.day;

    return [ddmmyy,mmddyy,yyddmm,ddmmyyyy,mmddyyyy,yyyyddmm];
}

function checkPalindromeForAllFormats(date){
    let formats = {
        0:"dd-mm-yy",
        1:"mm-dd-yy",
        2:"yy-dd-mm",
        3: "dd-mm-yyyy",
        4: "mm-dd-yyyy",
        5:"yyyy-dd-mm"
    }
    let palindromeFormat = "";
    let dateString = convertDateToString(date);
    let dateFormatList = dateFormats(dateString);
    let isPalindrome = false;

    dateFormatList.forEach((item,index)=>{
        let reverseDateString = reverseString(item);
        let result = checkPalindrome(item,reverseDateString);
        if(result){
            isPalindrome = true;
            palindromeFormat = formats[index];
            return;
        }
    })
    return [isPalindrome,palindromeFormat];
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

function increementDay(date){
    let day = date.day + 1;
    let month = date.month;
    let year = date.year;

    let daysInMonths = [31,28,31,30,31,30,31,31,30,31,30,31];

    //Month is Feb.
    if(month===2){
        if(isLeapYear(year)){
            if(day>29){
                day = 1;
                month = month + 1;
            }
        }
        else{
            if(day>28){
                day = 1;
                month = month +1;
            }
        }
    }
    else{
        if(day > daysInMonths[month-1]){
            day = 1;
            month = month + 1;
        }
    }
    if(month>12){
        day = 1;
        month = 1;
        year = year + 1;
    }

    return {day : day, month : month, year: year} 
}

function getNextPalindromeDate(date){
   let isPalindrome = false;
   let nextDate = increementDay(date);
   let noOfDays = 0;
   let palindromeFormat = "";

   while(!isPalindrome){
    noOfDays = noOfDays + 1;
    [isPalindrome,palindromeFormat] = checkPalindromeForAllFormats(nextDate);
    if(!isPalindrome){
        nextDate = increementDay(nextDate)
    }
   }
   return [noOfDays,nextDate,palindromeFormat]
}

function decreementDay(date){ 
    let day = date.day - 1;
    let month = date.month;
    let year = date.year;

    let daysInMonths = [31,28,31,30,31,30,31,31,30,31,30,31];

    if(day <1 ){   
        month = month - 1;
        if(month<1){
            day = 31;
            month = 12;
            year = year - 1;
        }
        else if(month===2){
            if(isLeapYear(year)){
                day = 29
            }
            else{
                day = 28
            }
        }
        else{
            day = daysInMonths[month-1];
        }
    }

    return {day : day, month : month, year: year}
}

function getPreviousPalindromeDate(date){  
    let isPalindrome = false;
    let prevDate = decreementDay(date); 
    let noOfDays = 0
    let palindromeFormat= "";
    while(!isPalindrome){
        noOfDays = noOfDays + 1;  
       [isPalindrome,palindromeFormat]  = checkPalindromeForAllFormats(prevDate);
       if(!isPalindrome){
           prevDate = decreementDay(prevDate);
       }
    }
    return [noOfDays,prevDate,palindromeFormat]
}
