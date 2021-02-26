const disableIncome = document.querySelector('#otherCategoryIncome');
const incomeDP = document.querySelector('#incomeDP');

var today = new Date();
var dd = today.getDate();
var mm = today.getMonth() + 1; //January is 0!
var yyyy = today.getFullYear();
if (dd < 10) {
    dd = '0' + dd
}
if (mm < 10) {
    mm = '0' + mm
}

today = yyyy + '-' + mm + '-' + dd;
document.getElementById("expenseDate").setAttribute("max", today);
document.getElementById("incomeDate").setAttribute("max", today);

incomeDP.addEventListener('change', (e) => {
    if (e.target.value != '') {
        disableIncome.disabled = true;
        disableIncome.setAttribute('aria-label', "Disabled select example");
        disableIncome.value = "";
    }
    else {
        disableIncome.disabled = false;
        disableIncome.removeAttribute('aria-label', "Disabled select example");
    }
});

disableIncome.addEventListener('change', (event) => {
    if (event.target.value != '') {
        incomeDP.disabled = true;
        incomeDP.setAttribute('aria-label', "Disabled select example");
        incomeDP.value = "";
    }
    else {
        incomeDP.disabled = false;
        incomeDP.removeAttribute('aria-label', "Disabled select example");
    }
});

const disabledExpense = document.querySelector('#otherCategoryExpense');
const expenseDP = document.querySelector('#expenseDP');

expenseDP.addEventListener('change', (e) => {
    if (e.target.value != '') {
        disabledExpense.disabled = true;
        disabledExpense.setAttribute('aria-label', "Disabled select example");
        disabledExpense.value = "";
    }
    else {
        disabledExpense.disabled = false;
        disabledExpense.removeAttribute('aria-label', "Disabled select example");
    }
});

disabledExpense.addEventListener('change', (event) => {
    if (event.target.value != '') {
        expenseDP.disabled = true;
        expenseDP.setAttribute('aria-label', "Disabled select example");
        expenseDP.value = "";
    }
    else {
        expenseDP.disabled = false;
        expenseDP.removeAttribute('aria-label', "Disabled select example");
    }
});

auth.onAuthStateChanged((user) => {
    const income = document.querySelector('#income-form');
    income.addEventListener('submit', (e) => {
        e.preventDefault();
        let categoryValue = '';
        if (income['incomeDP'].value == '' && income['otherCategoryIncome'].value.length != '') {
            categoryValue = income['otherCategoryIncome'].value;
        }
        else if (income['incomeDP'].value != '' && income['otherCategoryIncome'].value.length == '') {
            categoryValue = income['incomeDP'].value;
        }


        db.collection('budgetCollection').add({
            category: categoryValue.toUpperCase(), //dropdown input
            memo: income['incomeMemo'].value, //string input
            date: income['incomeDate'].value, //date
            amt: parseFloat(income['incomeAmt'].value).toFixed(2), //number
            incomeOrExpense: 'income',
            userUID: user.uid,
            postDate: firebase.firestore.Timestamp.now()
        }).then((docRef) => {
            // $('#successIncomeModal').modal('show');
            // setTimeout(function() {$('#successIncomeModal').modal('hide');}, 2500);
            income.reset();
            $('.expenseIncomeTB').empty();
            $('#incomeModal').modal('hide');
            tableRenderer();
            chartPie();
            chartBar();
            
        }).catch(e => {
            console.log(e);
        });
    })

    //------------------------------------------------------------
    const expense = document.querySelector('#expense-form');
    expense.addEventListener('submit', (e) => {

        e.preventDefault();
        let categoryValue = '';
        if (expense['expenseDP'].value == '' && expense['otherCategoryExpense'].value.length != '') {
            categoryValue = expense['otherCategoryExpense'].value;
        }
        else if (expense['expenseDP'].value != '' && expense['otherCategoryExpense'].value.length == '') {
            categoryValue = expense['expenseDP'].value;
        }

        db.collection('budgetCollection').add({
            category: categoryValue.toUpperCase(),
            memo: expense['expenseMemo'].value,
            date: expense['expenseDate'].value,
            amt: parseFloat(expense['expenseAmt'].value).toFixed(2),
            incomeOrExpense: 'expense',
            userUID: user.uid,
            postDate: firebase.firestore.Timestamp.now(),
            color: '#000',
        }).then((docRef) => {
            // $('#failIncomeModal').modal('show');
            // setTimeout(function() {$('#failIncomeModal').modal('hide');}, 2500);
            expense.reset();
            $('.expenseIncomeTB').empty();
            $('#expenseModal').modal('hide');
            tableRenderer();
            chartPie();
            chartBar();
            // location.reload();
        }).catch(e => {
            console.log(e);
        });

    })
});