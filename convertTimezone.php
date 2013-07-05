<?php
/* function converttimezone() is use for converting date into specific timezone.
 * It's realy easy and effective function for timezone conversion.
 * There are three perametes which have $c_date, $timeto, $timefrom.
 * $c_date is date which you want to convert from specific timezone.
 * $timeto is timezone which you want to get result for that timezone.
 * $timefrom is timezone which you want to get result from that timezone.
 * Thank You.
 * Developed by Jekin A. Gohel
 */
$datetime = date('Y-m-d H:i:s',strtotime($_POST['date'].' '.$_POST['time']));
$utcFromDate = converttimezone($datetime,'GMT', $_POST['fromTimezone']);
$utcToDateFinal = converttimezone($utcFromDate, $_POST['toTimezone'],'GMT');
$data = array();
$data['from']['time'] = date('h:i A',strtotime($datetime));
$data['from']['date'] = date('l, F d, Y',strtotime($datetime));
$data['to']['time'] = date('h:i A',strtotime($utcToDateFinal));
$data['to']['date'] = date('l, F d, Y',strtotime($utcToDateFinal));
echo json_encode($data);

function converttimezone($c_date,$timeto='GMT',$timefrom='GMT'){               
    
    //convert one timezone to another timezone
    $dayLightFlag = false;
    $dayLgtSecCurrent = $dayLgtSecReq = 0;   
    $local_timezone = $timefrom;
    date_default_timezone_set($local_timezone);
    $local = date("Y-m-d H:i:s");

    date_default_timezone_set("GMT");
    $gmt = date("Y-m-d H:i:s ");

    $require_timezone = $timeto;
    date_default_timezone_set($require_timezone);
    $required = date("Y-m-d H:i:s ");

    date_default_timezone_set($local_timezone);

    $diff1 = (strtotime($gmt) - strtotime($local));
    $diff2 = (strtotime($required) - strtotime($gmt));

    $date = new DateTime($c_date);

    $date->modify("+$diff1 seconds");
    $date->modify("+$diff2 seconds");

    if ($dayLightFlag) {
        $final_diff = $dayLgtSecCurrent + $dayLgtSecReq;
        $date->modify("$final_diff seconds");
    }
    $timestamp = $date->format('Y-m-d h:i A');
    return $timestamp;   
}
?>
