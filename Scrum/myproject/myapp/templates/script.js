// List of Mitarbeiter
var employees = ['John Doe', 'Joema Ma', 'Max Mustermann', 'Anna Musterfrau', 'Chris Smith' , 'None'];

// List of Trees
var trees = [
    { id: 1, Gattung: 'Eiche 1', Pflanzjahr: 1990, Gebiet: 'AMT 66', Strasse: 'johannes-goederitz-strasse', lat: 123, Long: 456, is_water: true },
    { id: 2, Gattung: 'Ahorn 1', Pflanzjahr: 1973, Gebiet: 'oeffentliches Gruen', Strasse: 'Musterstrasse', lat: 123, Long: 456, is_water: false },
    { id: 3, Gattung: 'Birke 1', Pflanzjahr: 1998, Gebiet: 'Spielplatz', Strasse: 'Parkweg', lat: 123, Long: 456, is_water: true },
    { id: 4, Gattung: 'Kiefer 1', Pflanzjahr: 2005, Gebiet: 'AMT 66', Strasse: 'Hauptstrasse', lat: 123, Long: 456, is_water: false },
    { id: 5, Gattung: 'Ulme 1', Pflanzjahr: 2004, Gebiet: 'Amt 66', Strasse: 'Baumallee', lat: 123, Long: 456, is_water: true }
];


// Function to populate the table
function populateTable() {
    var tableBody = document.getElementById('treeTableBody');
    tableBody.innerHTML = '';

    trees.forEach(function (tree) {
        var row = document.createElement('tr');
        row.innerHTML = `
            <td>${tree.id}</td>
            <td>${tree.Gattung}</td>
            <td>${tree.Pflanzjahr}</td>
            <td>${tree.Gebiet}</td>
            <td>${tree.Strasse}</td>
            <td>${tree.lat}</td>
            <td>${tree.Long}</td>
            <td>${tree.is_water}</td>
            <td>
                <select class="form-select" id="employeeSelect_${tree.id}">
                    ${employees.map(employee => `<option value="${employee}">${employee}</option>`).join('')}
                </select>
            </td>
            <td>
                <select class="form-select" id="actionSelect_${tree.id}">
                    <option value="gießen">Gießen</option>
                    <option value="schneiden">Schneiden</option>
                    <option value="vollpflege">Vollpflege</option>
                </select>
            </td>
            <td>
                <input type="checkbox" id="selectCheckbox_${tree.id}" class="form-check-input">
            </td>
        `;

        tableBody.appendChild(row);
    });
}

// Function to filter the table
function filterTable() {
    var employeeFilter = document.getElementById('employeeName').value;
    var actionFilter = document.getElementById('treeAction').value;

    var filteredTrees = trees.filter(function (tree) {
        return (employeeFilter === 'all' || document.getElementById(`employeeSelect_${tree.id}`).value === employeeFilter) &&
            (actionFilter === 'all' || document.getElementById(`actionSelect_${tree.id}`).value === actionFilter);
    });

    populateTable(); // Reset table
    highlightFilteredTrees(filteredTrees);
}

// Function to highlight filtered trees (replace with your logic)
function highlightFilteredTrees(filteredTrees) {
    filteredTrees.forEach(function (tree) {
        // Implement logic to highlight trees in the table (e.g., change row color)
    });
}

// Function to create an assignment with selected trees
// Function to create an assignment with selected trees
function createAssignment() {
    var selectedTrees = trees.filter(function (tree) {
        return document.getElementById(`selectCheckbox_${tree.id}`).checked;
    });

    var assignments = selectedTrees.map(function (tree) {
        return {
            treeId: tree.id,
            treeName: tree.Gattung, // Use Gattung property for treeName
            employee: document.getElementById(`employeeSelect_${tree.id}`).value,
            action: document.getElementById(`actionSelect_${tree.id}`).value
        };
    });

    console.log(assignments); // You can now handle these assignments accordingly

    // Display confirmation message
    var confirmationMsg = document.getElementById('confirmationMsg');
    confirmationMsg.style.display = 'block';

    // Optional: Hide the message after a few seconds (e.g., 3 seconds)
    setTimeout(function () {
        confirmationMsg.style.display = 'none';
    }, 3000);
}


// Initial population of the table
populateTable();
