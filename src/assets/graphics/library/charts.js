/* CandleStick */  

google.charts.load('current', {'packages':['corechart']});
  google.charts.setOnLoadCallback(drawCandlestick);

  function drawCandlestick() {
    var data = google.visualization.arrayToDataTable([
      ['Mon', 20, 28, 38, 45],
      ['Tue', 31, 38, 55, 66],
      ['Wed', 50, 55, 77, 80],
      ['Thu', 77, 77, 66, 50],
      ['Fri', 68, 66, 22, 15]
      // Treat first row as data as well.
    ], true);

    var options = {
      legend:'none'
    };

    var chart = new google.visualization.CandlestickChart(document.getElementById('candlestick_div'));

    chart.draw(data, options);
  }

/* lineChart */

google.charts.setOnLoadCallback(drawCurveTypes);

function drawCurveTypes() {
      var data = new google.visualization.DataTable();
      data.addColumn('number', 'X');
      data.addColumn('number', 'Dogs');
      data.addColumn('number', 'Cats');

      data.addRows([
        [0, 0, 0],    [1, 10, 5],   [2, 23, 15],  [3, 17, 9],   [4, 18, 10],  [5, 9, 5],
        [6, 11, 3],   [7, 27, 19],  [8, 33, 25],  [9, 40, 32],  [10, 32, 24], [11, 35, 27],
        [12, 30, 22], [13, 40, 32], [14, 42, 34], [15, 47, 39], [16, 44, 36], [17, 48, 40],
        [18, 52, 44], [19, 54, 46], [20, 42, 34], [21, 55, 47], [22, 56, 48], [23, 57, 49],
        [24, 60, 52], [25, 50, 42], [26, 52, 44], [27, 51, 43], [28, 49, 41], [29, 53, 45],
        [30, 55, 47], [31, 60, 52], [32, 61, 53], [33, 59, 51], [34, 62, 54], [35, 65, 57],
        [36, 62, 54], [37, 58, 50], [38, 55, 47], [39, 61, 53], [40, 64, 56], [41, 65, 57],
        [42, 63, 55], [43, 66, 58], [44, 67, 59], [45, 69, 61], [46, 69, 61], [47, 70, 62],
        [48, 72, 64], [49, 68, 60], [50, 66, 58], [51, 65, 57], [52, 67, 59], [53, 70, 62],
        [54, 71, 63], [55, 72, 64], [56, 73, 65], [57, 75, 67], [58, 70, 62], [59, 68, 60],
        [60, 64, 56], [61, 60, 52], [62, 65, 57], [63, 67, 59], [64, 68, 60], [65, 69, 61],
        [66, 70, 62], [67, 72, 64], [68, 75, 67], [69, 80, 72]
      ]);

      var options = {
        hAxis: {
          title: 'Time'
        },
        vAxis: {
          title: 'Popularity'
        },
        series: {
          1: {curveType: 'function'}
        }
        
      };

      var chart = new google.visualization.LineChart(document.getElementById('linechart_div'));
      chart.draw(data, options);
    }

/* Combo Chart */

      google.charts.setOnLoadCallback(drawVisualization);

      function drawVisualization() {
        // Some raw data (not necessarily accurate)
        var data = google.visualization.arrayToDataTable([
         ['Month', 'Bolivia', 'Ecuador', 'Madagascar', 'Papua New Guinea', 'Rwanda', 'Average'],
         ['2004/05',  165,      938,         522,             998,           450,      614.6],
         ['2005/06',  135,      1120,        599,             1268,          288,      682],
         ['2006/07',  157,      1167,        587,             807,           397,      623],
         ['2007/08',  139,      1110,        615,             968,           215,      609.4],
         ['2008/09',  136,      691,         629,             1026,          366,      569.6]
      ]);

    var options = {
      title : 'Monthly Coffee Production by Country',
      vAxis: {title: 'Cups'},
      hAxis: {title: 'Month'},
      seriesType: 'bars',
      series: {5: {type: 'line'}}
    };

    var chart = new google.visualization.ComboChart(document.getElementById('combochart_div'));
    chart.draw(data, options);
  }

/* Pie Chart */

      google.charts.load('current', {'packages':['corechart']});
      google.charts.setOnLoadCallback(drawChart);

      function drawChart() {

        var data = google.visualization.arrayToDataTable([
          ['Task', 'Hours per Day'],
          ['Work',     11],
          ['Eat',      2],
          ['Commute',  2],
          ['Watch TV', 2],
          ['Sleep',    7]
        ]);

        var options = {
          title: 'My Daily Activities'
        };

        var chart = new google.visualization.PieChart(document.getElementById('piechart'));

        chart.draw(data, options);
      }


/* Histogram */

google.charts.setOnLoadCallback(histogram);
function histogram() {
var data = google.visualization.arrayToDataTable([
  ['Dinosaur', 'Length'],
  ['Acrocanthosaurus (top-spined lizard)', 12.2],
  ['Albertosaurus (Alberta lizard)', 9.1],
  ['Allosaurus (other lizard)', 12.2],
  ['Apatosaurus (deceptive lizard)', 22.9],
  ['Archaeopteryx (ancient wing)', 0.9],
  ['Argentinosaurus (Argentina lizard)', 36.6],
  ['Baryonyx (heavy claws)', 9.1],
  ['Brachiosaurus (arm lizard)', 30.5],
  ['Ceratosaurus (horned lizard)', 6.1],
  ['Coelophysis (hollow form)', 2.7],
  ['Compsognathus (elegant jaw)', 0.9],
  ['Deinonychus (terrible claw)', 2.7],
  ['Diplodocus (double beam)', 27.1],
  ['Dromicelomimus (emu mimic)', 3.4],
  ['Gallimimus (fowl mimic)', 5.5],
  ['Mamenchisaurus (Mamenchi lizard)', 21.0],
  ['Megalosaurus (big lizard)', 7.9],
  ['Microvenator (small hunter)', 1.2],
  ['Ornithomimus (bird mimic)', 4.6],
  ['Oviraptor (egg robber)', 1.5],
  ['Plateosaurus (flat lizard)', 7.9],
  ['Sauronithoides (narrow-clawed lizard)', 2.0],
  ['Seismosaurus (tremor lizard)', 45.7],
  ['Spinosaurus (spiny lizard)', 12.2],
  ['Supersaurus (super lizard)', 30.5],
  ['Tyrannosaurus (tyrant lizard)', 15.2],
  ['Ultrasaurus (ultra lizard)', 30.5],
  ['Velociraptor (swift robber)', 1.8]]);

var options = {
  title: 'Lengths of dinosaurs, in meters',
  legend: { position: 'none' },
};

var chart = new google.visualization.Histogram(document.getElementById('histogram_div'));
chart.draw(data, options);
}