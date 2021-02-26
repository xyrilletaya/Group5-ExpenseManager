// Set new default font family and font color to mimic Bootstrap's default styling
Chart.defaults.global.defaultFontFamily = 'Nunito', '-apple-system,system-ui,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,sans-serif';
Chart.defaults.global.defaultFontColor = '#858796';

const chartBar = () => {
    var expenseGroupsByBar = {};
    auth.onAuthStateChanged((user) => {
        db.collection('budgetCollection').where('userUID', '==', user.uid).orderBy('date').get().then(querySnapshots => {
            $('#myBarChart').empty();
            querySnapshots.docs.forEach(doc => {
                if (doc.data().incomeOrExpense == 'expense') {
                    if (!expenseGroupsByBar[doc.data().date]) {
                        expenseGroupsByBar[doc.data().date] = [];
                    }
                    expenseGroupsByBar[doc.data().date].push(doc.data());
                }
            });

            Object.keys(expenseGroupsByBar).forEach(date => {
                var expenseTotal = 0;
                var label = '';
                for (var index = 0; index < expenseGroupsByBar[date].length; index++) {
                    if (expenseGroupsByBar[date][index].date) {
                        expenseTotal += parseInt(expenseGroupsByBar[date][index].amt);
                        label = expenseGroupsByBar[date][index].date;
                    }
                }
                addDatainBar(expenseTotal, label);
            });
        });
    });


    // Pie Chart Example
    var ctxBar = document.getElementById("myBarChart");
    var myBarChart = new Chart(ctxBar, {
        type: 'bar',
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
            scales: {
                yAxes: [{
                    ticks: {
                        beginAtZero: true,
                        min: 0,
                    }
                }]
            },
            responsive: true,
            maintainAspectRatio: true,
            plugins: {
                datalabels: {
                    color: '#000',
                    anchor: 'center',
                }
            },
            legend: {
                display: false
            }
        },
    });

    var categoryTotal = 0;
    var label = '';
    var categoryChecker = '';


    function addDatainBar(data, label) {
        var backgroundColor = [];
        var hoverColor = [];
        for (var i = 0; i < myBarChart.config.data.datasets[0].data.length; i++) {

            var color = "rgba(" + Math.floor(Math.random() * 255) + "," + Math.floor(Math.random() * 255) + "," + Math.floor(Math.random() * 255) + ",";

            backgroundColor.push(color + "1)");
            hoverColor.push(color + "0.8)");
        }

        myBarChart.config.data.datasets[0].backgroundColor = backgroundColor;
        myBarChart.config.data.datasets[0].hoverBackgroundColor = hoverColor;
        myBarChart.data.labels.push(label);
        myBarChart.data.datasets.forEach((dataset) => {
            dataset.data.push(data);
        });
        myBarChart.update();
    }
}

chartBar();

const barChartBtn = document.querySelector('#barChartBtn');
barChartBtn.addEventListener('click', (e) => {
    e.preventDefault();
    chartBar();
});