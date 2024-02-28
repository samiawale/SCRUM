// document.addEventListener('DOMContentLoaded', function() {
//     // Sample Mitarbeiter data
//     const mitarbeiterData = [
//         { id: 1, name: 'Mitarbeiter 1' },
//         { id: 2, name: 'Mitarbeiter 2' },
//         // Add more Mitarbeiter data as needed
//     ];

//     // Sample Baum data
//     const baumData = [
//         { id: 101, name: 'Baum 1' },
//         { id: 102, name: 'Baum 2' },
//         // Add more Baum data as needed
//     ];

//     // Function to create table rows
//     function createTableRow(data, tableId) {
//         const table = document.getElementById(tableId);
//         data.forEach(item => {
//             const row = table.insertRow();
//             const cell1 = row.insertCell(0);
//             const cell2 = row.insertCell(1);
//             cell1.textContent = item.id;
//             cell2.textContent = item.name;
//         });
//     }

    // JavaScript-Code zum Öffnen und Schließen des Modals
// var orderModal = document.getElementById('orderModal');
// var createOrderBtn = document.getElementById('createOrderBtn');

// createOrderBtn.addEventListener('click', openModal);

// function openModal() {
//     orderModal.style.display = 'block';
// }

// function closeModal() {
//     orderModal.style.display = 'none';
// }

// // // Schließen Sie das Modal, wenn der Benutzer außerhalb des Modals klickt
// window.addEventListener('click', function(event) {
//     if (event.target === orderModal) {
//         orderModal.style.display = 'none';
//     }
// });

//     // Generate Mitarbeiter table
//     createTableRow(mitarbeiterData, 'mitarbeiterTable');

//     // Generate Baum table
//     createTableRow(baumData, 'baumTable');
// });
// ... (vorheriger JavaScript-Code bleibt unverändert) ...





// // Mitarbeiter- und Baumoptionen dynamisch generieren
// var mitarbeiterSelect = document.getElementById('mitarbeiterSelect');
// var baumSelect = document.getElementById('baumSelect');

// // Hier sollten Sie Ihre tatsächlichen Daten für Mitarbeiter und Bäume einfügen
// var mitarbeiterData = ['Mitarbeiter 1', 'Mitarbeiter 2', 'Mitarbeiter 3'];
// var baumData = ['Baum 1', 'Baum 2', 'Baum 3'];

// // Mitarbeiteroptionen hinzufügen
// mitarbeiterData.forEach(function(mitarbeiter) {
//     var option = document.createElement('option');
//     option.value = mitarbeiter;
//     option.textContent = mitarbeiter;
//     mitarbeiterSelect.appendChild(option);
// });

// // Baumoptionen hinzufügen
// baumData.forEach(function(baum) {
//     var option = document.createElement('option');
//     option.value = baum;
//     option.textContent = baum;
//     baumSelect.appendChild(option);
// });

// Auftragsformular verarbeiten
var orderForm = document.getElementById('orderForm');
orderForm.addEventListener('submit', function(event) {
    event.preventDefault();

    // Hier können Sie die ausgewählten Mitarbeiter und Bäume verarbeiten
    var selectedMitarbeiter = mitarbeiterSelect.value;
    var selectedBaum = baumSelect.value;

    // Hier können Sie die Zuweisung von Aufgaben an Mitarbeiter und Bäume durchführen
    console.log('Mitarbeiter:', selectedMitarbeiter);
    console.log('Baum:', selectedBaum);

    // Schließen Sie das Modal nach dem Absenden des Formulars
    closeModal();
});
var trees = [
    { id: 1, name: 'Eiche 1', age: 50, type: 'oak', lat: 52.12, lng: 11.62 },
    { id: 2, name: 'Ahorn 1', age: 30, type: 'maple', lat: 52.13, lng: 11.63 },
    // Add more trees...
];
document.addEventListener('DOMContentLoaded', function () {
    var assignBtns = document.querySelectorAll('.assignBtn');
    var assignmentForm = document.getElementById('assignmentForm');
    var workerSelect = document.getElementById('workerSelect');
    var actionSelect = document.getElementById('actionSelect');
    var itemIdInput = document.getElementById('itemId');
    var assignmentModal = new bootstrap.Modal(document.getElementById('assignmentModal'));

    assignBtns.forEach(function (btn) {
        btn.addEventListener('click', function () {
            var itemId = btn.getAttribute('data-id');
            itemIdInput.value = itemId;
            assignmentModal.show();
        });
    });

    assignmentForm.addEventListener('submit', function (event) {
        event.preventDefault();
        var itemId = itemIdInput.value;
        var selectedWorker = workerSelect.value;
        var selectedAction = actionSelect.value;

        // Log the assignment details (replace this with your actual logic)
        console.log('Item ID:', itemId);
        console.log('Assigned Worker ID:', selectedWorker);
        console.log('Selected Action:', selectedAction);

        // Close the modal after submission
        assignmentModal.hide();
    });
});
function filterTrees() {
    var treeName = document.getElementById('treeName').value.toLowerCase();
    var treeAge = parseInt(document.getElementById('treeAge').value, 10);
    var treeType = document.getElementById('treeType').value.toLowerCase();

    // Filter trees based on criteria
    var filteredTrees = trees.filter(function (tree) {
        return (tree.name.toLowerCase().includes(treeName) &&
            (!treeAge || tree.age === treeAge) &&
            (treeType === 'all' || tree.type === treeType));
    });

    function displaySelectedTrees(selectedTrees) {
        var selectedTreesList = document.getElementById('selectedTrees');
        selectedTreesList.innerHTML = '';
    
        selectedTrees.forEach(function (tree) {
            var listItem = document.createElement('li');
            listItem.textContent = tree.name;
            selectedTreesList.appendChild(listItem);
        });
    }


    // Highlight filtered trees on the map (replace with your logic)
    highlightTrees(filteredTrees);

    // Display selected trees in the list
    displaySelectedTrees(filteredTrees);
}
function createAssignment() {
    var selectedTrees = trees.filter(function (tree) {
        // Implement logic to get selected trees based on your application state
        return false;
    });

    // Open a modal or perform other actions to create an assignment
}


function closeModal() {
    var assignmentForm = document.getElementById('assignmentForm');
    assignmentForm.reset();
    var assignmentModal = new bootstrap.Modal(document.getElementById('assignmentModal'));
    assignmentModal.hide();
}
