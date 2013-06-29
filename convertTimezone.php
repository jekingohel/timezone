<?php include('header.php') ?>
<?php

    $list = DateTimeZone::listAbbreviations();
    $idents = DateTimeZone::listIdentifiers();
    
    $data = $offset = $added = array();
    foreach ($list as $abbr => $info) {
        foreach ($info as $zone) {
            if (!empty($zone['timezone_id'])
                    AND
                    !in_array($zone['timezone_id'], $added)
                    AND
                    in_array($zone['timezone_id'], $idents)) {
                $z = new DateTimeZone($zone['timezone_id']);
                $c = new DateTime(null, $z);
                $zone['time'] = $c->format('h:i:s A');
                $zone['time_hour'] = $c->format('h');
                $zone['time_min'] = $c->format('i');
                $zone['time_sec'] = $c->format('s');
                $zone['time_format'] = $c->format('A');
                $data[] = $zone;
                $offset[] = $z->getOffset($c);
                $added[] = $zone['timezone_id'];
            }
        }
    }
    
   //print_r($added);
    array_multisort($offset, SORT_ASC, $data);
    $options = array();
    foreach ($data as $key => $row) {
        //$options[$row['timezone_id']] = $row['time'] . ' - GMT' . formatOffset($row['offset']) . ' ' . $row['timezone_id'];
        $options[$row['timezone_id']] = array(
                                            'offset_string' => 'GMT '. formatOffset($row['offset']),
                                            'offset' => formatOffset($row['offset']),
                                            'time' => $row['time'],
                                            'time_hour' => $row['time_hour'],
                                            'time_min' => $row['time_min'],
                                            'time_sec' => $row['time_sec'],
                                            'time_format' => $row['time_format'],
                                        );
    }
    function formatOffset($offset) {
            $hours = $offset / 3600;
            $remainder = $offset % 3600;
            $sign = $hours > 0 ? '+' : '-';
            $hour = (int) abs($hours);
            $minutes = (int) abs($remainder / 60);

            if ($hour == 0 AND $minutes == 0) {
                $sign = ' ';
            }
            return $sign . str_pad($hour, 2, '0', STR_PAD_LEFT) .':'. str_pad($minutes,2, '0');

    }
    $rowsData = array_chunk($options,5,true);
    //echo '<pre>';
?>
<h1>World clock by timezone</h1>
<table cellspacing="5px" class="table table-hover">
    <tbody>
    <?php
        foreach($rowsData as $key=>$value){
    ?>
            <tr>
                <?php 
                    foreach($value as $k=>$val){
                        $params = '"'.$val["time_hour"].'","'.$val["time_min"].'","'.$val['time_sec'].'","'.$val['time_format'].'"';
                        //$params = "{$val["time_hour']}','{$val['time_min']}','{$val['time_sec']}','{$val['time_format']}')";
                        $events = "updateClock(".$params."); setInterval('updateClock(".$params.")', 1000 )";
                        //$event = "setInterval('updateClock(, 200)";
                 ?>
                        <td class="timezoneContainer">
                            <b><?= $k ?></b>
                            <p>
                                <i class='icon-time'></i> 
                                <span class="time_hour"><?= $val['time_hour'] ?></span> :
                                <span class="time_min"><?= $val['time_min'] ?></span> : 
                                <span class="time_sec"><?= $val['time_sec'] ?></span> &nbsp;
                                <span class="time_format"><?= $val['time_format'] ?></span>
                            </p>
                            <p>
                                <i class="icon-map-marker"></i><span class="badge badge-inverse"><?= $val['offset_string'] ?></span>
                            </p>
                        </td>
                <?php
                    }
                ?>
            </tr>
    <?php
        }
    ?>
    </tbody>
</table>
<?php include('footer.php') ?>