document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('loginForm');

    form.addEventListener('submit', function (event) {
        event.preventDefault();

        const email = document.getElementById('email').value.trim();
        const password = document.getElementById('password').value.trim();
        const storedUsersJSON = localStorage.getItem("myUsers");
        const storedUsers = JSON.parse(storedUsersJSON) || [];
        let loggedInUser = null; // Variable to store the logged-in user
        
        // Loop through the stored users array
        for (const storedUser of storedUsers) {
            // Check if email and password match
            if (email === storedUser.Email && password === storedUser.Password) {
                // Store the logged-in user in sessionStorage
                loggedInUser = {
                    ID: storedUser.ID,
                    Name: storedUser.Name,
                    Email: storedUser.Email,
                    Admin: storedUser.Admin,
                };

                sessionStorage.setItem('loggedInUser', JSON.stringify(loggedInUser));
                alert('Login successful!');
                
                // Exit the loop since we found the user
                break;
            }
        }

        // If no matching user was found
        if (!loggedInUser) {
            alert('Invalid email or password!');
        }
    });
});
