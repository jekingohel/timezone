<?php include('header.php') ?>
<?php
$idents = DateTimeZone::listIdentifiers();
?>
<h1>Convert Timezone</h1>
<div class="form-actions">
    <form style="margin: 0">
        <label class="inline-label">Location or time zone : </label>
        <input type="text" name="from_location" class="" id="from_location"/>
        &nbsp;&nbsp;<label class="inline-label">Other locations or time zones : </label>
        <input type="text" name="to_location" class="" id="to_location"/>
        &nbsp;&nbsp;<label class="inline-label">Date/Time : </label>
        <input type="text" name="date" class="datepicker" placeholder="Enter a date"/>
        <input type="text" name="time" class="timepicker input-small" placeholder="Enter a time"/><br/>
        <button type="submit" name="submit" class="btn btn-info" >Submit</button>
    </form>
</div>
<?php include('footer.php') ?>
<script>
    $(document).ready(function(){
        //$('select').select2();
        //$('#from_timezone').select2('val',getTimezoneName());
        $('.datepicker').datepicker({
            currentText: "Now",
            format: 'yyyy-mm-dd',
            autoclose : true
        });   
        $('.timepicker').timepicker();
        $("#from_location").geocomplete();
        $("#to_location").geocomplete().bind("geocode:result", function(event, result){
            var latitute= result.geometry.location.jb;
            var longitute = result.geometry.location.kb;
            $.getJSON('https://maps.googleapis.com/maps/api/timezone/json?location='+latitute+','+longitute+'&timestamp='+ Math.round(+new Date()/1000) +'&sensor=true',
            function(data){
                console.log(data);
                console.log(calcTime(result.formatted_address,data.rawOffset));
            });
        });;
    });
    function calcTime(city, offset) {
        d = new Date();
        utc = d.getTime() + (d.getTimezoneOffset() * 60000);
        offset = offset*1000;
        var of = (Math.floor(offset/3600) +'.'+ Math.floor(offset % 3600))/1000;
        nd = new Date(utc +  (3600000*of));
        return "The local time in " + city + " is " + nd.toLocaleString();
    }
</script>