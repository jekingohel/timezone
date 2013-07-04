<?php include('header.php') ?>
<?php
$idents = DateTimeZone::listIdentifiers();
//http://time.is/compare
?>
<div class="loader"><img src="assets/img/ajax-loader.gif"/></div>
<h1>Time here and there</h1>
<div class="form-actions">
    <form id="converttimeForm" name="converttimeForm" class="form-horizontal" method="post"  style="margin: 0">
        <div class="control-group">
            <label class="control-label">Location or time zone : </label>
            <div class="controls">
                <input type="text" name="from_location" class="" id="from_location"/>
            </div>
        </div>
        <div class="control-group">
            <label class="control-label">Other locations or time zones : </label>
            <div class="controls">
                <input type="text" name="to_location" class="" id="to_location"/>
            </div>
        </div>
        <div class="control-group">
            <label class="control-label">Date : </label>
            <div class="controls">
                <input type="text" name="date" readonly id="date" class="datepicker" placeholder="Enter a date"/>
            </div>
        </div>
        <div class="control-group">
            <label class="control-label">Time : </label>
            <div class="controls">
                <input type="text" name="time" id="time" readonly  class="timepicker input-small" placeholder="Enter a time"/>
            </div>
        </div>
        <div class="control-group">
            <div class="controls">
                <input type="submit" name="submit" class="btn btn-info" id="compare_time" value="Compare time" />
            </div>
        </div>
    </form>
</div>
<div class="details">
    <h2>Time in <span class="fromLocation text-warning">Rajkot</span> and <span class="toLocation text-success">New York</span></h2>
    <p class="text-info">When the time was <b><span class="fromresTime">08:00 AM</span> on <span class="fromresDate"></span></b> in <span class="fromLocation text-warning">Rajkot</span>, it was <b><span class="toresTime">08:00 AM</span> on <span class="toresDate"></span></b> in <span class="toLocation text-success">New York</span>.</p>
    <div class="pull-left" style="width:50%">
        <blockquote>
            <table>
                <tr>
                    <td><b>From Location </b></td><td>&nbsp;:&nbsp;</td>
                    <td class="fromLocation">Rajkot, Gujrat</td>
                </tr>
                <tr>
                    <td>Current Time</td><td>&nbsp;:&nbsp;</td>
                    <td class="fromCurrentTime">Thursday, July 4, 2013 12:42 PM</td>
                </tr>
                <tr>
                    <td>Time zone</td><td>&nbsp;:&nbsp;</td>
                    <td class="fromTimezone">Brasilia Standard Time (America/Sao_Paulo)</td>
                </tr>
                <tr>
                    <td>Map</td><td>&nbsp;:&nbsp;</td>
                    <td><div id="from_map_canvas" style="width: 100%; height: 200px"></div></td>
                </tr>
            </table>
        </blockquote>
    </div>
    <div class="pull-left" style="width:50%">
        <blockquote>
            <table>
                <tr>
                    <td><b>To Location </b>  </td><td>&nbsp;:&nbsp;</td>
                    <td class="toLocation">Rajkot, Gujrat</td>
                </tr>
                <tr>
                    <td>Current Time</td><td>&nbsp;:&nbsp;</td>
                    <td class="toCurrentTime">Thursday, July 4, 2013 12:42 PM</td>
                </tr>
                <tr>
                    <td>Time zone</td><td>&nbsp;:&nbsp;</td>
                    <td class="toTimezone">Brasilia Standard Time (America/Sao_Paulo)</td>
                </tr>
                <tr>
                    <td>Map</td><td>&nbsp;:&nbsp;</td>
                    <td><div id="to_map_canvas" style="width: 100%; height: 200px"></div></td>
                </tr>
            </table>
        </blockquote>
    </div>
</div>

<?php include('footer.php') ?>
<script>
    var tagObject = {};
    $(document).ready(function(){
        $('.datepicker').datepicker({
            currentText: "Now",
            format: 'yyyy-mm-dd',
            autoclose : true
        });   
        $('.timepicker').timepicker();
        $("#from_location").geocomplete({ map: "#from_map_canvas",mapOptions: { zoom: 10 } }).bind("geocode:result", function(event, result){
            tagObject['from_location'] = result
            var latitute= result.geometry.location.jb;
            var longitute = result.geometry.location.kb;
            getTimezone(latitute,longitute,'from_location');
        });
        $("#to_location").geocomplete({ map: "#to_map_canvas",mapOptions: { zoom: 10 } }).bind("geocode:result", function(event, result){
            tagObject['to_location'] = result;
            var latitute= result.geometry.location.jb;
            var longitute = result.geometry.location.kb;
            getTimezone(latitute,longitute,'to_location');
        });
        $('#converttimeForm').submit(function(){
            var success =  $('#converttimeForm').valid();
            if (success == true){
                $('.loader').show();
                $('.fromLocation').html($('#from_location').val());
                $('.toLocation').html($('#to_location').val());
                var fromDate = new Date(tagObject.from_location.current_timestamp);
                var toDate = new Date(tagObject.to_location.current_timestamp);
                $('.fromCurrentTime').html(dayName(fromDate.getDay())+', '+monthName(fromDate.getMonth())+' '+fromDate.getDate()+', '+fromDate.getFullYear()+' '+fromDate.toLocaleTimeString());
                $('.toCurrentTime').html(dayName(toDate.getDay())+', '+monthName(toDate.getMonth())+' '+toDate.getDate()+', '+toDate.getFullYear()+' '+toDate.toLocaleTimeString());
                $('.fromTimezone').html(tagObject.from_location.geo.timeZoneName+' ('+tagObject.from_location.geo.timeZoneId+')');
                $('.toTimezone').html(tagObject.to_location.geo.timeZoneName+' ('+tagObject.to_location.geo.timeZoneId+')');
                $.post('convertTimezone.php',
                    { 
                        fromTimezone : tagObject.from_location.geo.timeZoneId, 
                        toTimezone : tagObject.to_location.geo.timeZoneId,
                        date : $('#date').val(),
                        time : $('#time').val()
                    },function(response){
                        var res = $.parseJSON(response);
                        $('.fromresTime').html(res.from.time)
                        $('.fromresDate').html(res.from.date)
                        $('.toresTime').html(res.to.time)
                        $('.toresDate').html(res.to.date)
                        $('.details').css('opacity','1')
                        $('.loader').fadeOut();
                });
                console.log(tagObject);
                return false;
            }else{
                return false;
            }
            return false;
        });
        $validator=$("#converttimeForm").validate({
            rules:{
                date:{
                    required:true
                },
                time:{
                    required:true
                },
                to_location: {
                    required:true
                },
                from_location: {
                    required:true
                }
            },
            errorClass: "help-inline",
            errorElement: "span",
            errorPlacement: function (error, element) {
                error.appendTo(element.parents(".controls:first"));
            },
            highlight:function(element, errorClass, validClass) {
                $(element).parents('.control-group').addClass('error');
                $(element).parents('.control-group').removeClass('success');
            },
            unhighlight: function(element, errorClass, validClass) {
                $(element).parents('.control-group').removeClass('error');
                $(element).parents('.control-group').addClass('success');
            }               
        }); 
    });
    function calcTime(offset) {
        d = new Date();
        utc = d.getTime() + (d.getTimezoneOffset() * 60000);
        offset = offset*1000;
        var of = (Math.floor(offset/3600) +'.'+ Math.floor(offset % 3600))/1000;
        nd = new Date(utc +  (3600000*of));
        return (utc +  (3600000*of));
    }
    function getTimezone(latitute,longitute,type){
        $.getJSON('https://maps.googleapis.com/maps/api/timezone/json?location='+latitute+','+longitute+'&timestamp='+ Math.round(+new Date()/1000) +'&sensor=true',
        function(data){
            tagObject[type]['geo'] = data;
            tagObject[type]['current_timestamp'] = calcTime(data.rawOffset);
        });
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
</script>