$(document).ready(function() {
    $.ajax({
        url:'http://5.189.162.172:8080/prometheus/api/v1/query?query=100 - (avg by(alias) (irate(node_cpu_seconds_total%7Bmode%3D%22idle%22%7D%5B1m%5D)) * 100)'
    }).then(function(body) {
        var cpu= parseFloat(body.data.result[0].value[1]);
           cpu=Math.round(cpu);
       $('#CPU').append(cpu + " %)");
       var value=cpu+"%";
       $('#Cbar').css("width",value);
      


    });
    setInterval(function() {


    $.ajax({
        url:'http://5.189.162.172:8080/prometheus/api/v1/query?query=100 - (avg by(alias) (irate(node_cpu_seconds_total%7Bmode%3D%22idle%22%7D%5B1m%5D)) * 100)'
    }).then(function(body) {
        var cpu= parseFloat(body.data.result[0].value[1]);
           cpu=Math.round(cpu);
       $('#CPU').empty();
       $('#CPU').append('CPU( '+cpu + " %)");
       var value=cpu+"%";
       $('#Cbar').css("width",value);
      


    });
},1500);
});

$(document).ready(function() {
    $.ajax({
        url:'http://5.189.162.172:8080/prometheus/api/v1/query?query=(1 - (node_memory_MemAvailable_bytes / (node_memory_MemTotal_bytes)))* 100'
    }).then(function(body) {
        var mem= parseFloat(body.data.result[0].value[1]);
           mem=Math.round(mem);
       $('#MEMO').append(mem + " %)");
       var value=mem+"%";
       $('#Mbar').css("width",value);


    });
});


$(document).ready(function() {
    $.ajax({
        url:'http://5.189.162.172:8080/prometheus/api/v1/query?query=100 - ((node_filesystem_avail_bytes{mountpoint="/",fstype!="rootfs"} * 100) / node_filesystem_size_bytes{mountpoint="/",fstype!="rootfs"})'
    }).then(function(body) {
        var disk= parseFloat(body.data.result[0].value[1]);
           disk=Math.round(disk);
       $('#Disk').append(disk + " %)");
       var value=disk+"%";
       $('#Dbar').css("width",value);

       
     

    });
});
$(document).ready(function() {
    var query='query  query{epochs_aggregate {aggregate {max {number lastBlockTime startedAt} }}}'
    $.ajax('http://5.189.162.172:8090/v1/graphql',
    {
   
     type : "POST",
     contentType: "application/json; charset=UTF-8",
     data: JSON.stringify({ query: query }),
       

   }).then(function(data) {
    console.log(data);

       var start=data.data.epochs_aggregate.aggregate.max.StartedAt;
       var end=data.data.epochs_aggregate.aggregate.max.LastBlockTime;
        var epoch=data.data.epochs_aggregate.aggregate.max.number;
        var diff=Math.abs(end-start);
        console.log(diff);
        $('#Epo').append(epoch);

                             });

});
var mydata1 = "query  {stakePools(where: {id: {_eq: \"4583\"}}) {fixedCost margin  pledge}}"
    $.ajax('http://5.189.162.172:8090/v1/graphql',
         {
        
          type : "POST",
          contentType: "application/json; charset=UTF-8",
          data: JSON.stringify({ query: mydata1 }),
            

        }).then(function(data) {
        var pledge= data.data.stakePools[0].pledge;
        var margin= data.data.stakePools[0].margin;
        var fixedCost= data.data.stakePools[0].fixedCost;
        
        pledge=pledge/1000000000;
        fixedCost=fixedCost/1000000;
        margin=margin*100;
        $('#Pledge').append(pledge+'K ₳');
        $('#Cost').append(fixedCost+' ₳');
        $('#Margin').append(margin+'%');


                                  });