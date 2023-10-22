// Function to calculate the amount for a row
function calculateAmount(row) {
    const quantity = parseFloat(row.querySelector('.quantity').value);
    const rate = parseFloat(row.querySelector('.rate').value);
    const amount = quantity * rate || 0;
    row.querySelector('.amount').textContent = amount.toFixed(2);
    return amount;
}

// Function to update the total amount
function updateTotal() {
    const rows = document.querySelectorAll('tbody tr');
    let total = 0;

    rows.forEach((row) => {
        total += calculateAmount(row);
    });
    
    const grandTotal = document.getElementById('grand-total');
    grandTotal.style.display = total > 0 ? '' : 'none';
    document.getElementById('total').textContent = total.toFixed(2);
}

// Function to delete the row
function deleteRow(row) {
    const tableBody = row.parentNode;
    tableBody.removeChild(row);
    updateSNo();
    updateTotal();
}

// Event listener for deleting a row
document.getElementById('data-table').addEventListener('click', function (e) {
    if (e.target.classList.contains('delete-row')) {
        const row = e.target.closest('tr');
        deleteRow(row);
    }
});

// Function to update the S.No
function updateSNo() {
    const rows = document.querySelectorAll('tbody tr');
    let currentRowNumber = 1;
    rows.forEach((row) => {
        const sno = row.querySelector('.updateSNO');
        sno.textContent = currentRowNumber++;
    });
}

// Event listener for adding a new row
document.getElementById('add-row').addEventListener('click', function () {
    const newRow = document.querySelector('tbody tr').cloneNode(true);
    newRow.querySelectorAll('input').forEach((input) => (input.value = ''));
    newRow.querySelector('.amount').innerHTML = '';
   // console.log(newRow.querySelector('.amount').innerHTML);
    document.querySelector('tbody').appendChild(newRow);
    updateSNo();
});

// Event listener for input fields to update amounts
document.getElementById('data-table').addEventListener('input', function (e) {
    if (e.target.classList.contains('quantity') || e.target.classList.contains('rate')) {
        calculateAmount(e.target.closest('tr'));
        updateTotal();
    }
});

// Event listener for toggling the filter input visibility
document.getElementById('toggle-filter').addEventListener('click', function () {
    const searchContainer = document.getElementById('search-container');
    searchContainer.style.display = searchContainer.style.display === 'none' ? 'block' : 'none';

    if (searchContainer.style.display === 'block') {
        document.getElementById('search-input').focus();
    }
});

// Event listener for table filtering

document.getElementById('search-input').addEventListener('input', function () {
    const filterValue = this.value.toLowerCase();
   // console.log(filterValue);
    const rows = document.querySelectorAll('tbody tr');

    rows.forEach((row) => {
        let filtered = false;
        let inputs = row.querySelectorAll('input');
        for(t=0; t<inputs.length; t++) {
            let input = inputs[t];
            if (input) {
              if (input.value.toLowerCase().indexOf(filterValue) > -1) {
                filtered = true;
              }
            }     
        }
        if(filtered===true) {
            row.style.display = '';
        }
        else {
            row.style.display = 'none';
        }
    });
});

// Function to clear the search input
function clearSearch() {
    document.getElementById('search-input').value = '';
}

// Initial filter selection
clearSearch();

// Initial total calculation
updateTotal();
