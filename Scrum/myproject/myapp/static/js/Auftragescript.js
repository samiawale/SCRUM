// Aufträge.js

// Function to fetch Aufträge from the database
async function fetchAuftraege() {
    try {
        // Make a request to your backend API to get Aufträge data
        const response = await fetch('/get-mitarbeiter-auftrag/');
        const data = await response.json();

        // Display Aufträge in the table
        displayAuftraegeTable(data);
    } catch (error) {
        console.error('Error fetching Aufträge:', error);
    }
}

// Function to display Aufträge in the table
function displayAuftraegeTable(auftraege) {
    var table = document.getElementById('auftraegeTabelle');

    // Clear existing table rows
    table.innerHTML = '<thead><tr><th>Baum ID</th><th>Gattung</th><th>Pflanzjahr</th><th>Aktion</th></tr></thead>';

    auftraege.forEach(function (auftrag) {
        var row = table.insertRow();

        // Insert data into the table cells
        var cell1 = row.insertCell(0);
        cell1.textContent = auftrag.baumId;

        var cell2 = row.insertCell(1);
        cell2.textContent = auftrag.gattung;

        var cell3 = row.insertCell(2);
        cell3.textContent = auftrag.pflanzjahr;

        var cell4 = row.insertCell(3);
        cell4.textContent = auftrag.aktion;
    });
}

// Event listener for "Aufträge anzeigen" button
document.getElementById('AufträgeAnzeigen').addEventListener('click', fetchAuftraege);
