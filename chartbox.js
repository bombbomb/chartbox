var express = require('express');
var app = express();
var Highcharts = require('highcharts');
var hcServer = new Highcharts(3003);

var bodyParser = require('body-parser');

app.use(bodyParser.json());

app.get('/health-check', function (req, res) {
    var chartOptions = {
        title: {
            text: 'Monthly Average Temperature',
            x: -20 //center
        },
        subtitle: {
            text: 'Source: WorldClimate.com',
            x: -20
        },
        xAxis: {
            categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
        },
        yAxis: {
            title: {
                text: 'Temperature (C)'
            },
            plotLines: [{
                value: 0,
                width: 1,
                color: '#808080'
            }]
        },
        tooltip: {
            valueSuffix: 'C'
        },
        legend: {
            layout: 'vertical',
            align: 'right',
            verticalAlign: 'middle',
            borderWidth: 0
        },
        series: [
            {
                name: 'Tokyo',
                data: [7.0, 6.9, 9.5, 14.5, 18.2, 21.5, 25.2, 26.5, 23.3, 18.3, 13.9, 9.6]
            },
            {
                name: 'New York',
                data: [-0.2, 0.8, 5.7, 11.3, 17.0, 22.0, 24.8, 24.1, 20.1, 14.1, 8.6, 2.5]
            },
            {
                name: 'Berlin',
                data: [-0.9, 0.6, 3.5, 8.4, 13.5, 17.0, 18.6, 17.9, 14.3, 9.0, 3.9, 1.0]
            },
            {
                name: 'London',
                data: [3.9, 4.2, 5.7, 8.5, 11.9, 15.2, 17.0, 16.6, 14.2, 10.3, 6.6, 4.8]
            }
        ]
    };
    var imgOptions = {
        width: 640,
        scale: 2
    };

    hcServer.render(imgOptions, chartOptions, function(base64png) {
        respondWithPng(base64png, res);
    });
});

app.post('/', function (req, res) {
    hcServer.render(req.body.imgOptions, req.body.chartOptions, function (base64png) {
        respondWithPng(base64png, res);
    });
});


function respondWithPng(base64png, res) {
    var b = new Buffer(base64png, 'base64');
    //var pngData = b.toString();
    res.set('Content-Type', 'image/png');
    res.write(b);
    res.end();
}

var server = app.listen(80, function () {
    var host = server.address().address;
    var port = server.address().port;
    console.log('Chartbox listening at http://%s:%s', host, port);
});