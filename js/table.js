//create the array of objects
const people = [
    { name: "Alice Smith", age: 28, city: "New York" },
    { name: "Bob Jones", age: 35, city: "Chicago" },
    { name: "Charlie Brown", age: 22, city: "Los Angeles" },
    { name: "Diana Prince", age: 31, city: "New York" },
    { name: "Evan Wright", age: 45, city: "Miami" },
    { name: "Fiona Gallagher", age: 26, city: "Chicago" },
    { name: "George Miller", age: 19, city: "Seattle" },
    { name: "Hannah Abbott", age: 33, city: "Los Angeles" }
];

//select all necessary DOM elements
const tableBody = document.getElementById('tableBody');
const searchInput = document.getElementById('searchInput');
const sortByNameBtn = document.getElementById('sortByName');
const sortByAgeBtn = document.getElementById('sortByAge');
const noResultsDiv = document.getElementById('noResults');

//we need a variable to keep track of the current state of the data
//so search and sort don't conflict with each other
let currentData = [...people]; 

//the render function
function renderTable(dataArray) {
    //clear the table body first
    tableBody.innerHTML = '';

    //check if array is empty
    if (dataArray.length === 0) {
        noResultsDiv.style.display = 'block';
        return; // exit the function early
    } else {
        noResultsDiv.style.display = 'none';
    }

    //loop through the data and create rows
    dataArray.forEach(person => {
        const row = document.createElement('tr');

        //create Table Data (td) cells
        const nameCell = document.createElement('td');
        nameCell.textContent = person.name;

        const ageCell = document.createElement('td');
        ageCell.textContent = person.age;

        const cityCell = document.createElement('td');
        cityCell.textContent = person.city;

        //append cells to the row
        row.appendChild(nameCell);
        row.appendChild(ageCell);
        row.appendChild(cityCell);

        //append row to the table body
        tableBody.appendChild(row);
    });
}

//initial render so the table isn't empty on load
renderTable(currentData);


//live search logic
searchInput.addEventListener('input', (event) => {
    const searchTerm = event.target.value.toLowerCase();

    //filter the orignal array based on the search term
    const filteredData = people.filter(person => {
        return (
            person.name.toLowerCase().includes(searchTerm) ||
            person.city.toLowerCase().includes(searchTerm)
        );
    });

    //update current data so sorting works on the filtered results
    currentData = filteredData; 
    
    //redraw the table
    renderTable(currentData);
});


//sort by name logic
sortByNameBtn.addEventListener('click', () => {
    //sort the current data
    currentData.sort((a, b) => {
        // localeCompare to sort strings alphabetically
        return a.name.localeCompare(b.name);
    });

    //redraw table
    renderTable(currentData);
});


//sort by age logic
sortByAgeBtn.addEventListener('click', () => {
    currentData.sort((a, b) => {
        //sort numbers by subtracting them
        return a.age - b.age; 
    });

    //redraw table
    renderTable(currentData);
});