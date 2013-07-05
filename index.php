<?php include('header.php') ?>
<div class="timeclock">
    <div class="timezoneContainer">
        <span class="time_hour"></span>:<span class="time_min"></span>:<span class="time_sec"></span>
    </div>
</div>
<div class="pull-right">
    <h1 class="today_date" style="text-align: right"></h1>
    <h1 class="city_name" style="text-align: right"></h1>
</div>
<?php include('footer.php') ?>
<script>
    $(document).ready(function(){
        var date = new Date();
        var hours = '',mins = '', secs = '';
        if(date.getHours()<10)
            hours = '0'+date.getHours();
        else
            hours = date.getHours();
        if(date.getMinutes()<10)
            mins = '0'+date.getMinutes();
        else
            mins = date.getMinutes();
        if(date.getSeconds()<10)
            secs = '0'+date.getSeconds();
        else
            secs = date.getSeconds();
        $('.time_hour').html(hours);
        $('.time_min').html(mins);
        $('.time_sec').html(secs);
        $('.today_date').html(dayName(date.getDay())+', '+monthName(date.getMonth())+' '+date.getDate()+', '+date.getFullYear());
    });
</script>
<script type="text/javascript"> 
    
</script> 