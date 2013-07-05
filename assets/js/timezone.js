if($('#homeClock').length>0){
    function worldClock(zone, region){
        var dst = 0
        var time = new Date()
        var gmtMS = time.getTime() + (time.getTimezoneOffset() * 60000)
       
        var gmtTime = new Date(gmtMS)
        var day = gmtTime.getDate()
        var month = gmtTime.getMonth()
        var year = gmtTime.getYear()
        if(year < 1000){
            year += 1900
        }
        var monthArray = new Array("January", "February", "March", "April", "May", "June", "July", "August", 
            "September", "October", "November", "December")
        var monthDays = new Array("31", "28", "31", "30", "31", "30", "31", "31", "30", "31", "30", "31")
        if (year%4 == 0){
            monthDays = new Array("31", "29", "31", "30", "31", "30", "31", "31", "30", "31", "30", "31")
        }
        if(year%100 == 0 && year%400 != 0){
            monthDays = new Array("31", "28", "31", "30", "31", "30", "31", "31", "30", "31", "30", "31")
        }
        var hr = gmtTime.getHours() + zone
        var min = gmtTime.getMinutes()
        var sec = gmtTime.getSeconds()
    
        if (hr >= 24){
            hr = hr-24
            day -= -1
        }
        if (hr < 0){
            hr -= -24
            day -= 1
        }
        if (hr < 10){
            hr = " " + hr
        }
        if (min < 10){
            min = "0" + min
        }
        if (sec < 10){
            sec = "0" + sec
        }
        if (day <= 0){
            if (month == 0){
                month = 11
                year -= 1
            }
            else{
                month = month -1
            }
            day = monthDays[month]
        }
        if(day > monthDays[month]){
            day = 1
            if(month == 11){
                month = 0
                year -= -1
            }
            else{
                month -= -1
            }
        }
        if (region == "NAmerica"){
            var startDST = new Date()
            var endDST = new Date()
            startDST.setMonth(3)
            startDST.setHours(2)
            startDST.setDate(1)
            var dayDST = startDST.getDay()
            if (dayDST != 0){
                startDST.setDate(8-dayDST)
            }
            else{
                startDST.setDate(1)
            }
            endDST.setMonth(9)
            endDST.setHours(1)
            endDST.setDate(31)
            dayDST = endDST.getDay()
            endDST.setDate(31-dayDST)
            var currentTime = new Date()
            currentTime.setMonth(month)
            currentTime.setYear(year)
            currentTime.setDate(day)
            currentTime.setHours(hr)
            if(currentTime >= startDST && currentTime < endDST){
                dst = 1
            }
        }
        if (region == "Europe"){
            var startDST = new Date()
            var endDST = new Date()
            startDST.setMonth(2)
            startDST.setHours(1)
            startDST.setDate(31)
            var dayDST = startDST.getDay()
            startDST.setDate(31-dayDST)
            endDST.setMonth(9)
            endDST.setHours(0)
            endDST.setDate(31)
            dayDST = endDST.getDay()
            endDST.setDate(31-dayDST)
            var currentTime = new Date()
            currentTime.setMonth(month)
            currentTime.setYear(year)
            currentTime.setDate(day)
            currentTime.setHours(hr)
            if(currentTime >= startDST && currentTime < endDST){
                dst = 1
            }
        }

        if (region == "SAmerica"){
            var startDST = new Date()
            var endDST = new Date()
            startDST.setMonth(9)
            startDST.setHours(0)
            startDST.setDate(1)
            var dayDST = startDST.getDay()
            if (dayDST != 0){
                startDST.setDate(22-dayDST)
            }
            else{
                startDST.setDate(15)
            }
            endDST.setMonth(1)
            endDST.setHours(11)
            endDST.setDate(1)
            dayDST = endDST.getDay()
            if (dayDST != 0){
                endDST.setDate(21-dayDST)
            }
            else{
                endDST.setDate(14)
            }
            var currentTime = new Date()
            currentTime.setMonth(month)
            currentTime.setYear(year)
            currentTime.setDate(day)
            currentTime.setHours(hr)
            if(currentTime >= startDST || currentTime < endDST){
                dst = 1
            }
        }
        if (region == "Cairo"){
            var startDST = new Date()
            var endDST = new Date()
            startDST.setMonth(3)
            startDST.setHours(0)
            startDST.setDate(30)
            var dayDST = startDST.getDay()
            if (dayDST < 5){
                startDST.setDate(28-dayDST)
            }
            else {
                startDST.setDate(35-dayDST)
            }
            endDST.setMonth(8)
            endDST.setHours(11)
            endDST.setDate(30)
            dayDST = endDST.getDay()
            if (dayDST < 4){
                endDST.setDate(27-dayDST)
            }
            else{
                endDST.setDate(34-dayDST)
            }
            var currentTime = new Date()
            currentTime.setMonth(month)
            currentTime.setYear(year)
            currentTime.setDate(day)
            currentTime.setHours(hr)
            if(currentTime >= startDST && currentTime < endDST){
                dst = 1
            }
        }
        if (region == "Israel"){
            var startDST = new Date()
            var endDST = new Date()
            startDST.setMonth(3)
            startDST.setHours(2)
            startDST.setDate(1)
            endDST.setMonth(8)
            endDST.setHours(2)
            endDST.setDate(25)
            dayDST = endDST.getDay()
            if (dayDST != 0){
                endDST.setDate(32-dayDST)
            }
            else{
                endDST.setDate(1)
                endDST.setMonth(9)
            }
            var currentTime = new Date()
            currentTime.setMonth(month)
            currentTime.setYear(year)
            currentTime.setDate(day)
            currentTime.setHours(hr)
            if(currentTime >= startDST && currentTime < endDST){
                dst = 1
            }
        }
        if (region == "Beirut"){
            var startDST = new Date()
            var endDST = new Date()
            startDST.setMonth(2)
            startDST.setHours(0)
            startDST.setDate(31)
            var dayDST = startDST.getDay()
            startDST.setDate(31-dayDST)
            endDST.setMonth(9)
            endDST.setHours(11)
            endDST.setDate(31)
            dayDST = endDST.getDay()
            endDST.setDate(30-dayDST)
            var currentTime = new Date()
            currentTime.setMonth(month)
            currentTime.setYear(year)
            currentTime.setDate(day)
            currentTime.setHours(hr)
            if(currentTime >= startDST && currentTime < endDST){
                dst = 1
            }
        }
        if (region == "Baghdad"){
            var startDST = new Date()
            var endDST = new Date()
            startDST.setMonth(3)
            startDST.setHours(3)
            startDST.setDate(1)
            endDST.setMonth(9)
            endDST.setHours(3)
            endDST.setDate(1)
            dayDST = endDST.getDay()
            var currentTime = new Date()
            currentTime.setMonth(month)
            currentTime.setYear(year)
            currentTime.setDate(day)
            currentTime.setHours(hr)
            if(currentTime >= startDST && currentTime < endDST){
                dst = 1
            }
        }
        if (region == "Australia"){
            var startDST = new Date()
            var endDST = new Date()
            startDST.setMonth(9)
            startDST.setHours(2)
            startDST.setDate(31)
            var dayDST = startDST.getDay()
            startDST.setDate(31-dayDST)
            endDST.setMonth(2)
            endDST.setHours(2)
            endDST.setDate(31)
            dayDST = endDST.getDay()
            endDST.setDate(31-dayDST)
            var currentTime = new Date()
            currentTime.setMonth(month)
            currentTime.setYear(year)
            currentTime.setDate(day)
            currentTime.setHours(hr)
            if(currentTime >= startDST || currentTime < endDST){
                dst = 1
            }
        }

	
        if (dst == 1){
            hr -= -1
            if (hr >= 24){
                hr = hr-24
                day -= -1
            }
            if (hr < 10){
                hr = " " + hr
            }
            if(day > monthDays[month]){
                day = 1
                if(month == 11){
                    month = 0
                    year -= -1
                }
                else{
                    month -= -1
                }
            }
            return monthArray[month] + " " + day + ", " + year + "<br><i class='icon-time'></i><span class='timer'>" + hr + ":" + min + ":" + sec + "</span> DST"
        }
        else{
            return monthArray[month] + " " + day + ", " + year + "<br><i class='icon-time'></i><span class='timer'>" + hr + ":" + min + ":" + sec + "</span>";
        }
    }

    function worldClockZone(){
        document.getElementById("GMT").innerHTML = worldClock(0, "Greenwich")
        document.getElementById("Vancouver").innerHTML = worldClock(-8, "NAmerica")
        document.getElementById("SanFrancisco").innerHTML = worldClock(-8, "NAmerica")
        document.getElementById("Seattle").innerHTML = worldClock(-8, "NAmerica")
        document.getElementById("LosAngeles").innerHTML = worldClock(-8, "NAmerica")
        document.getElementById("Denver").innerHTML = worldClock(-7, "NAmerica")
        document.getElementById("MexicoCity").innerHTML = worldClock(-6, "NAmerica")
        document.getElementById("Houston").innerHTML = worldClock(-6, "NAmerica")
        document.getElementById("Minneapolis").innerHTML = worldClock(-6, "NAmerica")
        document.getElementById("NewOrleans").innerHTML = worldClock(-6, "NAmerica")
        document.getElementById("Chicago").innerHTML = worldClock(-6, "NAmerica")
        document.getElementById("Montgomery").innerHTML = worldClock(-6, "NAmerica")
        document.getElementById("Indianapolis").innerHTML = worldClock(-5, "NAmerica")
        document.getElementById("Atlanta").innerHTML = worldClock(-5, "NAmerica")
        document.getElementById("Detroit").innerHTML = worldClock(-5, "NAmerica")
        document.getElementById("Miami").innerHTML = worldClock(-5, "NAmerica")
        document.getElementById("WashingtonDC").innerHTML = worldClock(-5, "NAmerica")
        document.getElementById("Philadelphia").innerHTML = worldClock(-5, "NAmerica")
        document.getElementById("NewYork").innerHTML = worldClock(-5, "NAmerica")
        document.getElementById("Montreal").innerHTML = worldClock(-5, "NAmerica")
        document.getElementById("Boston").innerHTML = worldClock(-5, "NAmerica")
        document.getElementById("BuenosAires").innerHTML = worldClock(-3, "BuenosAires")
        document.getElementById("SaoPaulo").innerHTML = worldClock(-3, "SAmerica")
        document.getElementById("RioDeJaneiro").innerHTML = worldClock(-3, "SAmerica")
        document.getElementById("Lisbon").innerHTML = worldClock(0, "Europe")
        document.getElementById("Dublin").innerHTML = worldClock(0, "Europe")
        document.getElementById("London").innerHTML = worldClock(0, "Europe")
        document.getElementById("Madrid").innerHTML = worldClock(1, "Europe")
        document.getElementById("Barcelona").innerHTML = worldClock(1, "Europe")
        document.getElementById("Paris").innerHTML = worldClock(1, "Europe")
        document.getElementById("Brussels").innerHTML = worldClock(1, "Europe")
        document.getElementById("Amsterdam").innerHTML = worldClock(1, "Europe")
        document.getElementById("Frankfurt").innerHTML = worldClock(1, "Europe")
        document.getElementById("Rome").innerHTML = worldClock(1, "Europe")
        document.getElementById("Berlin").innerHTML = worldClock(1, "Europe")
        document.getElementById("Prague").innerHTML = worldClock(1, "Europe")
        document.getElementById("Vienna").innerHTML = worldClock(1, "Europe")
        document.getElementById("Stockholm").innerHTML = worldClock(1, "Europe")
        document.getElementById("Athens").innerHTML = worldClock(2, "Europe")
        document.getElementById("Helsinki").innerHTML = worldClock(2, "Europe")
        document.getElementById("Minsk").innerHTML = worldClock(2, "Europe")
        document.getElementById("Istanbul").innerHTML = worldClock(2, "Europe")
        document.getElementById("Cairo").innerHTML = worldClock(2, "Cairo")
        document.getElementById("Jerusalem").innerHTML = worldClock(2, "Israel")
        document.getElementById("Beirut").innerHTML = worldClock(2, "Beirut")
        document.getElementById("Moscow").innerHTML = worldClock(3, "Europe")
        document.getElementById("Baghdad").innerHTML = worldClock(3, "Baghdad")
        document.getElementById("Dubai").innerHTML = worldClock(4, "Dubai")
        document.getElementById("Bangkok").innerHTML = worldClock(7, "Bangkok")
        document.getElementById("Jakarta").innerHTML = worldClock(7, "Jakarta")
        document.getElementById("HongKong").innerHTML = worldClock(8, "HongKong")
        document.getElementById("Beijing").innerHTML = worldClock(8, "Beijing")
        document.getElementById("Shanghai").innerHTML = worldClock(8, "Shanghai")
        document.getElementById("Seoul").innerHTML = worldClock(9, "Seoul")
        document.getElementById("Tokyo").innerHTML = worldClock(9, "Tokyo")
        document.getElementById("Melbourne").innerHTML = worldClock(10, "Australia")
        document.getElementById("Sydney").innerHTML = worldClock(10, "Australia")
        document.getElementById("Brisbane").innerHTML = worldClock(10, "Brisbane")
        document.getElementById("Vladivostok").innerHTML = worldClock(10, "Europe")
        document.getElementById("Kamchatka").innerHTML = worldClock(12, "Europe")

        setTimeout("worldClockZone()", 1000)
    }
    window.onload=worldClockZone;
}

function updateClock() {
    var hours,minutes,seconds,format;
    $('.timezoneContainer').each(function () {
        hours = $(this).find('.time_hour').html();
        minutes = $(this).find('.time_min').html();
        seconds = $(this).find('.time_sec').html();
        format = $(this).find('.time_format').html();
        
        if(hours>12){
            hours = '01';
        }
        if(minutes>59){
            minutes = '00';
            if (hours < 9) {
                hours++;
                hours = "0"+hours;
            }else
                hours++;
        }
        if(seconds>59){
            seconds = '00';
            if (minutes < 9) {
                minutes++;
                minutes = "0"+minutes;
            }else
                minutes++;
        }
        
        if (seconds < 9) {
            seconds++;
            seconds = "0"+seconds;
        }else{
            seconds++;
        }
        $(this).find('.time_hour').html(hours);
        $(this).find('.time_min').html(minutes);
        $(this).find('.time_sec').html(seconds);
    });
}
function updateClock24() {
    var hours,minutes,seconds,format;
    $('.timezoneContainer').each(function () {
        hours = $(this).find('.time_hour').html();
        minutes = $(this).find('.time_min').html();
        seconds = $(this).find('.time_sec').html();
        format = $(this).find('.time_format').html();
        
        if(hours>24){
            hours = '01';
        }
        if(minutes>59){
            minutes = '00';
            if (hours < 9) {
                hours++;
                hours = "0"+hours;
            }else
                hours++;
        }
        if(seconds>59){
            seconds = '00';
            if (minutes < 9) {
                minutes++;
                minutes = "0"+minutes;
            }else
                minutes++;
        }
        
        if (seconds < 9) {
            seconds++;
            seconds = "0"+seconds;
        }else{
            seconds++;
        }
        $(this).find('.time_hour').html(hours);
        $(this).find('.time_min').html(minutes);
        $(this).find('.time_sec').html(seconds);
    });
}
setInterval(function() {
    if($('.homeClock').length>0)
        updateClock();
    if($('.timeclock').length>0)
        updateClock24();
}, 1000);
function getTimezoneName() {
    tmSummer = new Date(Date.UTC(2005, 6, 30, 0, 0, 0, 0));
    so = -1 * tmSummer.getTimezoneOffset();
    tmWinter = new Date(Date.UTC(2005, 12, 30, 0, 0, 0, 0));
    wo = -1 * tmWinter.getTimezoneOffset();

    if (-660 == so && -660 == wo) return 'Pacific/Midway';
    if (-600 == so && -600 == wo) return 'Pacific/Tahiti';
    if (-570 == so && -570 == wo) return 'Pacific/Marquesas';
    if (-540 == so && -600 == wo) return 'America/Adak';
    if (-540 == so && -540 == wo) return 'Pacific/Gambier';
    if (-480 == so && -540 == wo) return 'US/Alaska';
    if (-480 == so && -480 == wo) return 'Pacific/Pitcairn';
    if (-420 == so && -480 == wo) return 'US/Pacific';
    if (-420 == so && -420 == wo) return 'US/Arizona';
    if (-360 == so && -420 == wo) return 'US/Mountain';
    if (-360 == so && -360 == wo) return 'America/Guatemala';
    if (-360 == so && -300 == wo) return 'Pacific/Easter';
    if (-300 == so && -360 == wo) return 'US/Central';
    if (-300 == so && -300 == wo) return 'America/Bogota';
    if (-240 == so && -300 == wo) return 'US/Eastern';
    if (-240 == so && -240 == wo) return 'America/Caracas';
    if (-240 == so && -180 == wo) return 'America/Santiago';
    if (-180 == so && -240 == wo) return 'Canada/Atlantic';
    if (-180 == so && -180 == wo) return 'America/Montevideo';
    if (-180 == so && -120 == wo) return 'America/Sao_Paulo';
    if (-150 == so && -210 == wo) return 'America/St_Johns';
    if (-120 == so && -180 == wo) return 'America/Godthab';
    if (-120 == so && -120 == wo) return 'America/Noronha';
    if (-60 == so && -60 == wo) return 'Atlantic/Cape_Verde';
    if (0 == so && -60 == wo) return 'Atlantic/Azores';
    if (0 == so && 0 == wo) return 'Africa/Casablanca';
    if (60 == so && 0 == wo) return 'Europe/London';
    if (60 == so && 60 == wo) return 'Africa/Algiers';
    if (60 == so && 120 == wo) return 'Africa/Windhoek';
    if (120 == so && 60 == wo) return 'Europe/Amsterdam';
    if (120 == so && 120 == wo) return 'Africa/Harare';
    if (180 == so && 120 == wo) return 'Europe/Athens';
    if (180 == so && 180 == wo) return 'Africa/Nairobi';
    if (240 == so && 180 == wo) return 'Europe/Moscow';
    if (240 == so && 240 == wo) return 'Asia/Dubai';
    if (270 == so && 210 == wo) return 'Asia/Tehran';
    if (270 == so && 270 == wo) return 'Asia/Kabul';
    if (300 == so && 240 == wo) return 'Asia/Baku';
    if (300 == so && 300 == wo) return 'Asia/Karachi';
    if (330 == so && 330 == wo) return 'Asia/Kolkata';
    if (345 == so && 345 == wo) return 'Asia/Katmandu';
    if (360 == so && 300 == wo) return 'Asia/Yekaterinburg';
    if (360 == so && 360 == wo) return 'Asia/Colombo';
    if (390 == so && 390 == wo) return 'Asia/Rangoon';
    if (420 == so && 360 == wo) return 'Asia/Almaty';
    if (420 == so && 420 == wo) return 'Asia/Bangkok';
    if (480 == so && 420 == wo) return 'Asia/Krasnoyarsk';
    if (480 == so && 480 == wo) return 'Australia/Perth';
    if (540 == so && 480 == wo) return 'Asia/Irkutsk';
    if (540 == so && 540 == wo) return 'Asia/Tokyo';
    if (570 == so && 570 == wo) return 'Australia/Darwin';
    if (570 == so && 630 == wo) return 'Australia/Adelaide';
    if (600 == so && 540 == wo) return 'Asia/Yakutsk';
    if (600 == so && 600 == wo) return 'Australia/Brisbane';
    if (600 == so && 660 == wo) return 'Australia/Sydney';
    if (630 == so && 660 == wo) return 'Australia/Lord_Howe';
    if (660 == so && 600 == wo) return 'Asia/Vladivostok';
    if (660 == so && 660 == wo) return 'Pacific/Guadalcanal';
    if (690 == so && 690 == wo) return 'Pacific/Norfolk';
    if (720 == so && 660 == wo) return 'Asia/Magadan';
    if (720 == so && 720 == wo) return 'Pacific/Fiji';
    if (720 == so && 780 == wo) return 'Pacific/Auckland';
    if (765 == so && 825 == wo) return 'Pacific/Chatham';
    if (780 == so && 780 == wo) return 'Pacific/Enderbury'
    if (840 == so && 840 == wo) return 'Pacific/Kiritimati';
    return 'US/Pacific';
}
function dayName(day){
    var weekday=new Array(7);
    weekday[0]="Sunday";
    weekday[1]="Monday";
    weekday[2]="Tuesday";
    weekday[3]="Wednesday";
    weekday[4]="Thursday";
    weekday[5]="Friday";
    weekday[6]="Saturday";
    return weekday[day];
}
function monthName(month){
    var monthNames = [ "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December" ];
    return monthNames[month];
}
var geocoder;

if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(successFunction, errorFunction);
} 
//Get the latitude and the longitude;
function successFunction(position) {
    var lat = position.coords.latitude;
    var lng = position.coords.longitude;
    codeLatLng(lat, lng)
}

function errorFunction(){
    alert("Geocoder failed");
}

function initialize() {
    geocoder = new google.maps.Geocoder();
}

function codeLatLng(lat, lng) {
    var latlng = new google.maps.LatLng(lat, lng);
    geocoder.geocode({
        'latLng': latlng
    }, function(results, status) {
        if (status == google.maps.GeocoderStatus.OK) {
            console.log(results[2].formatted_address)
            if($('.city_name').length>0)
                $('.city_name').html(results[2].formatted_address);
            if (results[1]) {
                //formatted address
                //alert(results[0].formatted_address)
                //find country name
                for (var i=0; i<results[0].address_components.length; i++) {
                    for (var b=0;b<results[0].address_components[i].types.length;b++) {

                        //there are different types that might hold a city admin_area_lvl_1 usually does in come cases looking for sublocality type will be more appropriate
                        if (results[0].address_components[i].types[b] == "administrative_area_level_1") {
                            //this is the object you are looking for
                            city= results[0].address_components[i];
                            break;
                        }
                    }
                }
                //city data
                //alert(city.short_name + " " + city.long_name)


            } else {
                //alert("No results found");
            }
        } else {
            //alert("Geocoder failed due to: " + status);
        }
    });
}