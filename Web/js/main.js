// Define User class
class User {
    static count = 0;
    constructor(name, email, password, admin) {
        User.count++;
        this.ID = User.count;
        this.Name = name;
        this.Email = email;
        this.Password = password;
        this.Admin = admin;
    }
}

class Client extends User {
    constructor(name, email, password) {
        super(name, email, password, false); // Pass false for admin parameter
        this.RequestedParts = []; // Initialize requested parts array for clients
    }

    requestPart(part) {
        this.RequestedParts.push(part);
        console.log(`${this.Name} requested the part: ${part.Name}`);
    }
}

class Admin extends User {
    constructor(name, email, password) {
        super(name, email, password, true); // Pass true for admin parameter
    }
}

class CarPart {
    static count = 0;
    constructor(name, description, category, availability) {
        this.ID = ++CarPart.count;
        this.Name = name;
        this.Description = description;
        this.Category = category;
        this.Available = availability;
    }
}

// Initialize localStorage if not already set
if (!localStorage.getItem('users')) {
    let users = [];
    localStorage.setItem('users', JSON.stringify(users));
}

if (!localStorage.getItem('carParts')) {
    let parts = [
        new CarPart("Alloy Wheels", "High-quality alloy wheels for sports cars.", "Wheels", true),
        new CarPart("Turbocharger", "Enhances engine power and performance.", "Engine", true),
        new CarPart("Leather Seats", "Premium leather seats for comfort.", "Interior", true),
        new CarPart("Spoiler", "Aerodynamic spoiler for better control.", "Exterior", true),
    ];
    localStorage.setItem('carParts', JSON.stringify(parts));
}

if (!localStorage.getItem('categories')) {
    const parts = JSON.parse(localStorage.getItem('carParts'));
    const categoriesSet = new Set(parts.map(part => part.Category));
    const categories = ["All Categories", ...categoriesSet];
    localStorage.setItem('categories', JSON.stringify(categories));
}

// Function to populate select options dynamically
if (window.location.pathname.includes("Home.html")) {
    function populateSelectOptions(selectElementId, optionsArray) {
        const selectElement = document.getElementById(selectElementId);
        optionsArray.forEach(option => {
            const optionElement = document.createElement('option');
            optionElement.value = option;
            optionElement.textContent = option;
            selectElement.appendChild(optionElement);
        });
    }

    // Retrieve categories from localStorage
    const storedCategoriesJSON = localStorage.getItem('categories');
    const categories = JSON.parse(storedCategoriesJSON) || [];

    // Populate category select options
    populateSelectOptions('categoryFilter', categories);

    function filterTable(parts) {
        // Get filter values
        const searchText = document.querySelector('input[type="text"]').value.toLowerCase();
        const categoryFilter = document.getElementById('categoryFilter').value;
        const availabilityFilter = document.getElementById('availabilityFilter').value;

        console.log("Search Text:", searchText); // Debugging
        console.log("Category Filter:", categoryFilter); // Debugging
        console.log("Availability Filter:", availabilityFilter); // Debugging

        // Filter parts based on selected criteria
        const filteredParts = parts.filter(part => {
            const isAvailable = part.Available; // Use the actual boolean value
            console.log("Part Available:", isAvailable); // Debugging

            return (
                (searchText === '' || part.Name.toLowerCase().includes(searchText)) &&
                (categoryFilter === 'All Categories' || part.Category === categoryFilter) &&
                (availabilityFilter === 'All Parts' || 
                 (availabilityFilter === 'available' && isAvailable) || 
                 (availabilityFilter === 'notavailable' && !isAvailable))
            );
        });

        // Render filtered results in the table
        renderTable(filteredParts);
    }

    function renderTable(filteredParts) {
        const tableBody = document.querySelector('#table tbody');
        tableBody.innerHTML = ''; // Clear existing table rows

        // Generate HTML for table rows
        filteredParts.forEach(part => {
            const availability = part.Available ? 'Available' : 'Not Available';
            const rowHTML = `
                <tr>
                    <th scope="row">${part.ID}</th>
                    <td>${part.Name}</td>
                    <td>${part.Description}</td>
                    <td>${part.Category}</td>
                    <td>${availability}</td>
                    <td>
                        <div class="adminBTN" style="display: none;">
                            <a href="/edit-part?partid=${part.ID}"><button type="button" class="btn btn-primary">Edit</button></a>
                            <a href="/delete-part?partid=${part.ID}"><button type="button" class="btn btn-danger">Delete</button></a>
                        </div>
                        <div class="userBTN">
                            <a href="details.html"><button type="button" class="btn btn-primary">Details</button></a>
                            <a href="request.html"><button type="button" class="btn btn-danger">Request</button></a>
                        </div>
                    </td>
                </tr>
            `;
            tableBody.insertAdjacentHTML('beforeend', rowHTML);
        });
    }

    // Retrieve stored parts from localStorage
    const storedPartsJSON = localStorage.getItem('carParts');
    const storedParts = JSON.parse(storedPartsJSON);

    // Display parts on Home.html
    if (window.location.pathname.includes("Home.html")) {
        filterTable(storedParts);
    }

    // Add event listeners to filter inputs
    document.querySelector('input[type="text"]').addEventListener('input', () => filterTable(storedParts));
    document.getElementById('categoryFilter').addEventListener('change', () => filterTable(storedParts));
    document.getElementById('availabilityFilter').addEventListener('change', () => filterTable(storedParts));
}
