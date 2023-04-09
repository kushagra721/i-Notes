import React from 'react'


const Graph = () => {


    
    const graph = ()=>{
        // Load the Visualization API and the corechart package
google.charts.load('current', {'packages':['corechart']});

// Set a callback to run when the Visualization API is loaded
google.charts.setOnLoadCallback(drawChart);

// Callback that creates and populates a data table, instantiates the chart, and draws it
function drawChart() {
  // Define the data for New York City and Los Angeles
  var nyc_temps = [32.6, 36.1, 44.1, 54.1, 64.2, 73.2, 78.8, 76.8, 70.7, 60.8, 50.1, 38.9];
  var la_temps = [58.3, 60.0, 60.8, 63.0, 64.9, 67.1, 71.7, 72.2, 71.7, 68.8, 64.3, 60.3];
  var data = new google.visualization.DataTable();
  data.addColumn('string', 'Month');
  data.addColumn('number', 'New York City');
  data.addColumn('number', 'Los Angeles');
  for (var i = 0; i < 12; i++) {
    data.addRow([getMonth(i), nyc_temps[i], la_temps[i]]);
  }

  // Define options for the chart
  var options = {
    title: 'Temperature Comparison Graph',
    curveType: 'function',
    legend: { position: 'bottom' },
    hAxis: { title: 'Month' },
    vAxis: { title: 'Temperature (Fahrenheit)' }
  };

  // Instantiate and draw the chart, passing in some options
  var chart = new google.visualization.LineChart(document.getElementById('prim'));
  chart.draw(data, options);
}

// Helper function to get the name of the month given its number (0-11)
function getMonth(monthNumber) {
  var months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  return months[monthNumber];
}


    }
   
    return (
        <>

    <button type="button" className="btn btn-primary my-3" onClick={graph}>Click me to fetch graph api</button>
    <div id="prim"></div>

           

           
        </>
    )
}

export default Graph