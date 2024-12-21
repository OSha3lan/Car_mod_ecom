document.addEventListener('DOMContentLoaded', function () {
    const form = document.querySelector('.myform');
    form.addEventListener('submit', function (event) {
        event.preventDefault();

        // Get form data
        const partName = document.getElementById('partName').value.trim();
        const partCategory = document.getElementById('category').value.trim();
        const partPrice = document.getElementById('partPrice').value.trim();
        const partModel = document.getElementById('model').value.trim();
        const partDetails = document.getElementById('details').value.trim();
        const imageUrl = document.getElementById('imageUrl').value.trim();

        // Validate form data
        if (partName.length < 3 || partCategory.length < 3 || partModel.length < 3) {
            alert('Part name, category, and model must each be at least 3 characters long.');
            return;
        }

        if (isNaN(partPrice) || partPrice <= 0) {
            alert('Please enter a valid positive number for the part price.');
            return;
        }

        const urlPattern = /^(https?:\/\/.*\.(?:png|jpg|jpeg|gif))$/i;
        if (!urlPattern.test(imageUrl)) {
            alert('Invalid Image URL. Please provide a valid URL ending in .png, .jpg, .jpeg, or .gif.');
            return;
        }

        // Validate if image URL loads
        const img = new Image();
        img.onload = function () {
            // Image loaded successfully

            // Retrieve existing categories and models
            let categories = JSON.parse(localStorage.getItem('partCategories')) || [];
            let models = JSON.parse(localStorage.getItem('partModels')) || [];

            // Add category and model if not already present
            if (!categories.includes(partCategory)) {
                categories.push(partCategory);
                localStorage.setItem('partCategories', JSON.stringify(categories));
            }
            if (!models.includes(partModel)) {
                models.push(partModel);
                localStorage.setItem('partModels', JSON.stringify(models));
            }

            // Create a new part object
            const newPart = {
                name: partName,
                category: partCategory,
                price: partPrice,
                model: partModel,
                details: partDetails,
                imageUrl: imageUrl,
            };

            // Retrieve and update parts array
            let parts = JSON.parse(localStorage.getItem('myParts')) || [];
            parts.push(newPart);
            localStorage.setItem('myParts', JSON.stringify(parts));

            alert('Part added successfully!');
            form.reset(); // Clear form fields
        };

        img.onerror = function () {
            alert('The provided URL does not point to a valid image.');
        };

        img.src = imageUrl;
    });
});
