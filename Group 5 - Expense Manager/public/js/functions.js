const incTotal = document.querySelector('#incomeTotal');
const expTotal = document.querySelector('#expenseTotal');
const blcTotal = document.querySelector('#balanceTotal');
let incValue = 0;
let expValue = 0;
let blcValue = 0;
let balanceTotalInTable = 0;

const renderTable = (doc) => {
    const incomeTB = document.querySelector('.expenseIncomeTB');

    let html = [
        `
            <th scope="col">
                <div class="custom-control custom-checkbox">
                    <input type="checkbox" name="docsCheckbox" class="custom-control-input" 
                        value="${doc.id}">
                </div>
            </th>
            <td id="type" class="center">${doc.data().category} </td>
            <td>${doc.data().memo}</td>
            <td id="date">${doc.data().date}</td>
            <td style="text-align:right; font-weight:bold;" id="amount" class="amountColor">${doc.data().amt}</td>
            <td class="balance"></td>
        `
    ].join('');

    const span = document.createElement('tr');
    span.setAttribute('data-id', doc.id);
    span.innerHTML = html;
    incomeTB.appendChild(span);
}

const tableRenderer = () => {
    auth.onAuthStateChanged((user) => {
        if (user) {
            //--------------------------------------------------------

            db.collection('budgetCollection').where('userUID', '==', user.uid).orderBy('postDate', 'desc').get().then(querySnapshots => {
                querySnapshots.docs.forEach(doc => {
                    renderTable(doc);
                });
            });

            setTimeout(() => {
                const myTable = document.querySelector('.myTable');
                if ($('.myTable').children().length > 0) {
                    var tableChildren = myTable.children;
                    for (var index = 0; index < tableChildren.length; index++) {
                        getTrElement(tableChildren[index]);
                    }
                }
            }, 2000);

            //----------------------------------------------------------------------------------------
        } else {
            console.log('no user logged in');
        }
    });
}

tableRenderer();
//---------------------------------------------------- 

const getTrElement = (element) => {
    db.collection("budgetCollection").doc(element.getAttribute('data-id')).get().then((doc) => {
        if (doc.exists) {
            let td = document.createElement('td');
            td.textContent = balanceTotalInTable;
            var trChildren = Array.from(element.children);

            if (doc.data().incomeOrExpense == 'income') {
                balanceTotalInTable += parseFloat(doc.data().amt);
                trChildren.forEach(element => {
                    if (element.className == "amountColor") {
                        element.style.color = 'green';
                    }
                    if (element.className == "balance") {
                        element.textContent = balanceTotalInTable;
                    }
                });
            }
            else {
                balanceTotalInTable -= parseFloat(doc.data().amt);
                trChildren.forEach(element => {
                    if (element.className == "amountColor") {
                        element.style.color = 'red';
                    }
                    if (element.className == "balance") {
                        element.textContent = balanceTotalInTable;
                    }
                });
            }
        } else {

        }
    }).catch((error) => {

    });
}

const deleteDocs = document.querySelector('#deleteDocs');
deleteDocs.addEventListener('click', (e) => {
    var expenseArray = [];

    $("input:checkbox[name=docsCheckbox]:checked").each(function () {
        expenseArray.push($(this).val());
    });

    expenseArray.forEach(element => {
        db.collection("budgetCollection").doc(element).delete().then(() => {
            $('.expenseIncomeTB').empty();
            tableRenderer();
            chartPie();
            chartBar();
        }).catch((error) => {
            console.error("Error removing document: ", error);
        });
    });
});




