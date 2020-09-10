$(document).ready(function() {
    $.ajax({
        url:'http://5.189.162.172:8080/prometheus/api/v1/query?query=100 - (avg by(alias) (irate(node_cpu_seconds_total%7Bmode%3D%22idle%22%7D%5B1m%5D)) * 100)'
    }).then(function(body) {
       $('#CPU').append(body.data.result[0].value[1] + " %)");


    });
});

$(document).ready(function() {
    $.ajax({
        url:'http://5.189.162.172:8080/prometheus/api/v1/query?query=(1 - (node_memory_MemAvailable_bytes / (node_memory_MemTotal_bytes)))* 100'
    }).then(function(body) {
       $('#MEMO').append(body.data.result[0].value[1] + " %)");


    });
});


$(document).ready(function() {
    $.ajax({
        url:'http://5.189.162.172:8080/prometheus/api/v1/query?query=100 - ((node_filesystem_avail_bytes{mountpoint="/",fstype!="rootfs"} * 100) / node_filesystem_size_bytes{mountpoint="/",fstype!="rootfs"})'
    }).then(function(body) {
       $('#Disk').append(body.data.result[0].value[1] + " %)");


    });
});
$(document).ready(function() {
    $.ajax({
        url:'http://5.189.162.172:8080/prometheus/api/v1/query?query=cardano_node_ChainDB_metrics_epoch_int'
    }).then(function(body) {
       $('#Epo').append(body.data.result[0].value[1]);


    });
});
