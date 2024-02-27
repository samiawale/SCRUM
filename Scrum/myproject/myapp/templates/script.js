document.addEventListener('DOMContentLoaded', function() {
    // Sample Mitarbeiter data
    const mitarbeiterData = [
        { id: 1, name: 'Mitarbeiter 1' },
        { id: 2, name: 'Mitarbeiter 2' },
        // Add more Mitarbeiter data as needed
    ];

    // Sample Baum data
    const baumData = [
        { id: 101, name: 'Baum 1' },
        { id: 102, name: 'Baum 2' },
        // Add more Baum data as needed
    ];

    // Function to create table rows
    function createTableRow(data, tableId) {
        const table = document.getElementById(tableId);
        data.forEach(item => {
            const row = table.insertRow();
            const cell1 = row.insertCell(0);
            const cell2 = row.insertCell(1);
            cell1.textContent = item.id;
            cell2.textContent = item.name;
        });
    }

    // Generate Mitarbeiter table
    createTableRow(mitarbeiterData, 'mitarbeiterTable');

    // Generate Baum table
    createTableRow(baumData, 'baumTable');
});
