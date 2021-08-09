const date = document.querySelector(".inp");
const button = document.querySelector(".btn");
const resultBox = document.querySelector(".result-box");

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
    yyddmm = dateString.year.slice(-2)+dateString.month+dateString.day;
    ddmmyyyy = dateString.day+dateString.month+dateString.year;
    mmddyyyy = dateString.month+dateString.day+dateString.year;
    yyyyddmm = dateString.year+dateString.month+dateString.day;

    return [ddmmyy,mmddyy,yyddmm,ddmmyyyy,mmddyyyy,yyyyddmm];
}

function checkPalindromeForAllFormats(date){
    let dateString = convertDateToString(date);
    let dateFormatList = dateFormats(dateString);
    let isPalindrome = false;
    dateFormatList.forEach((item)=>{
        let reverseDateString = reverseString(item);
        let result = checkPalindrome(item,reverseDateString);
        if(result){
            isPalindrome = true;
            return;
        }
    })
    return isPalindrome;
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

   while(!isPalindrome){
    noOfDays = noOfDays + 1;
    isPalindrome = checkPalindromeForAllFormats(nextDate);
    if(!isPalindrome){
        nextDate = increementDay(nextDate)
    }
   }
   return [noOfDays,nextDate]
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
    while(!isPalindrome){
        noOfDays = noOfDays + 1;
       isPalindrome  = checkPalindromeForAllFormats(prevDate);
       if(!isPalindrome){
           prevDate = decreementDay(prevDate);
       }
    }
    return [noOfDays,prevDate]
}
