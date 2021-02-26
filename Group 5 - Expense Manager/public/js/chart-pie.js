// Set new default font family and font color to mimic Bootstrap's default styling
Chart.defaults.global.defaultFontFamily = 'Nunito', '-apple-system,system-ui,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,sans-serif';
Chart.defaults.global.defaultFontColor = '#858796';

const chartPie = () => {
  var expenseGroupsByPie = {};
  auth.onAuthStateChanged((user) => {
    db.collection('budgetCollection').where('userUID', '==', user.uid).get().then(querySnapshots => {
      querySnapshots.docs.forEach(doc => {
        if (doc.data().incomeOrExpense == 'expense') {
          if (!expenseGroupsByPie[doc.data().category]) {
            expenseGroupsByPie[doc.data().category] = [];
          }
          expenseGroupsByPie[doc.data().category].push(doc.data());
        }
      });

      Object.keys(expenseGroupsByPie).forEach(category => {
        var expenseTotal = 0;
        var label = '';
        for (var index = 0; index < expenseGroupsByPie[category].length; index++) {
          if (expenseGroupsByPie[category][index].category) {
            expenseTotal += parseInt(expenseGroupsByPie[category][index].amt);
            label = expenseGroupsByPie[category][index].category;
          }
        }
        addData(expenseTotal, label);
      });
    });
  });

  var ctx = document.getElementById("myPieChart");
  var myPieChart = new Chart(ctx, {
    type: 'pie',
    data: {
      labels: [],
      datasets: [{
        data: [], //kukunin nyo tong value sa database
        backgroundColor: ["rgba(" + Math.floor(Math.random() * 255) + "," + Math.floor(Math.random() * 255) + "," + Math.floor(Math.random() * 255) + ",",],
        hoverBackgroundColor: [],
        hoverBorderColor: "rgba(234, 236, 244, 1)",
      }],
    },
    options: {
      responsive: true,
      maintainAspectRatio: true,
      tooltips: {
        enabled: true,
        backgroundColor: "rgb(255,255,255)",
        bodyFontColor: "#858796",
        borderColor: '#dddfeb',
        borderWidth: 1,
        xPadding: 15,
        yPadding: 15,
        caretPadding: 10,
      },
      plugins: {
        datalabels: {
          formatter: (value, ctx) => {
            let sum = 0;
            let dataArr = ctx.chart.data.datasets[0].data;
            dataArr.map(data => {
              sum += data;
            });
            let percentage = (value * 100 / sum).toFixed(2) + "%";
            return percentage;
          },
          color: '#323232',
          anchor: 'center',
          font: {
            weight: 'bold'
          },
        }
      },
      legend: {
        display: true
      },
      cutoutPercentage: 0,
    },
  });

  function addData(data, label) {
    var backgroundColor = [];
    var hoverColor = [];
    for (var i = 0; i < myPieChart.config.data.datasets[0].data.length; i++) {

      // We generate a random color
      var color = "rgba(" + Math.floor(Math.random() * 255) + "," + Math.floor(Math.random() * 255) + "," + Math.floor(Math.random() * 255) + ",";

      // We push this new color to both background and border color arrays
      // .. a lighter color is used for the background
      backgroundColor.push(color + "1)");
      hoverColor.push(color + "0.8)");
    }

    myPieChart.config.data.datasets[0].backgroundColor = backgroundColor;
    myPieChart.config.data.datasets[0].hoverBackgroundColor = hoverColor;
    myPieChart.data.labels.push(label);
    myPieChart.data.datasets.forEach((dataset) => {
      dataset.data.push(data);
    });
    myPieChart.update();
  }
}

// Pie Chart Example

chartPie();

const pieChartBtn = document.querySelector('#pieChartBtn');
pieChartBtn.addEventListener('click', (e) => {
  e.preventDefault();
  chartPie();
});

