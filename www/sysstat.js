var series = {};

$(function () {

    $.getJSON('data.js', function(data) {

        // Form data into series
        var series = [
            { name: "User", data: [] },
            { name: "Nice", data: [] },
            { name: "System", data: [] },
            { name: "IOWait", data: [] },
            { name: "Steal", data: [] },
            { name: "Idle", data: [] },
        ];

        for (var timestamp in data) {
            // Timestamp in milliseconds used by highcharts
            var mts = timestamp * 1000;

            series[0].data.push([mts, data[timestamp][0]]);
            series[1].data.push([mts, data[timestamp][1]]);
            series[2].data.push([mts, data[timestamp][2]]);
            series[3].data.push([mts, data[timestamp][3]]);
            series[4].data.push([mts, data[timestamp][4]]);
            series[5].data.push([mts, data[timestamp][5]]);
        }

        $('#target').highcharts({
            chart: {
                type: 'area'
            },
            title: {
                text: 'sysstat data'
            },
            xAxis: {
                type: "datetime"
            },
            yAxis: {
                max: 100
            },
            tooltip: {
                shared: true,
            },
            plotOptions: {
                area: {
                    stacking: 'normal',
                    marker: {
                        enabled: false
                    }
                }
            },
            series: series
        });
    });
});

