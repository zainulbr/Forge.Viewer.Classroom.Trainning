AutodeskNamespace('Viewing.ClassroomTrainning');

Viewing.ClassroomTrainning.Extension = function( viewer, option ){
    Autodesk.Viewing.Extension.call( this, viewer, option );
};


Viewing.ClassroomTrainning.Extension.prototype = Object.create(Autodesk.Viewing.Extension.prototype);
Viewing.ClassroomTrainning.Extension.prototype.constructor = Viewing.ClassroomTrainning.Extension;


var loadSmoothieChart = ()=>{
    // Randomly add a data point every 500ms
    var random1 = new TimeSeries();
    var random2 = new TimeSeries();
    var random3 = new TimeSeries();
    setInterval(function () {
        random1.append(new Date().getTime(), Math.random() * 10000);
        random2.append(new Date().getTime(), Math.random() * 10000);
        random3.append(new Date().getTime(), Math.random() * 10000);
    }, 500);

    function createTimeline() {
        var chart1 = new SmoothieChart();
        chart1.addTimeSeries(random1, { strokeStyle: 'rgba(0, 255, 0, 1)', fillStyle: 'rgba(0, 255, 0, 0.2)', lineWidth: 1 });
        chart1.streamTo(document.getElementById("chart1"), 1000);

        var chart2 = new SmoothieChart();
        chart2.addTimeSeries(random2, { strokeStyle: 'rgba(0, 255, 0, 1)', fillStyle: 'rgba(0, 255, 0, 0.2)', lineWidth: 1 });
        chart2.streamTo(document.getElementById("chart2"), 1000);

        var chart3 = new SmoothieChart();
        chart3.addTimeSeries(random3, { strokeStyle: 'rgba(0, 255, 0, 1)', fillStyle: 'rgba(0, 255, 0, 0.2)', lineWidth:1 });
        chart3.streamTo(document.getElementById("chart3"), 1000);
    }
    createTimeline();

}

var loadGoogleChart = ()=>{
    /////////////////////////////////////////////////////////////////////////
    google.charts.load('current', { 'packages': ['gauge'] });
    google.charts.setOnLoadCallback(drawChart);

    function drawChart() {

        var data = google.visualization.arrayToDataTable([
            ['Label', 'Value'],
            ['Memory', 80],
            ['CPU', 55],
            ['Network', 68]
        ]);

        var options = {
            width: 400, height: 120,
            redFrom: 90, redTo: 100,
            yellowFrom: 75, yellowTo: 90,
            minorTicks: 5
        };


        var chart = new google.visualization.Gauge(document.getElementById('chartDiv'));

        chart.draw(data, options);

        setInterval(function () {
            data.setValue(0, 1, 40 + Math.round(60 * Math.random()));
            chart.draw(data, options);
        }, 13000);
        setInterval(function () {
            data.setValue(1, 1, 40 + Math.round(60 * Math.random()));
            chart.draw(data, options);
        }, 5000);
        setInterval(function () {
            data.setValue(2, 1, 60 + Math.round(20 * Math.random()));
            chart.draw(data, options);
        }, 26000);
    }    

    drawChart();
    
}


Viewing.ClassroomTrainning.Extension.prototype.load  = ()=>{
    // alert('My Extension is loaded');
    // var self = this;
    loadSmoothieChart();
    loadGoogleChart();





    return true;
};

Viewing.ClassroomTrainning.Extension.prototype.unload  = ()=>{
    alert('My Extension is unloaded');
    return true;
    
};


Autodesk.Viewing.theExtensionManager.registerExtension(
    'MyExtension', Viewing.ClassroomTrainning.Extension);

