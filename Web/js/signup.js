document.addEventListener("DOMContentLoaded", function () {
  const signupForm = document.getElementById("signupForm");

  signupForm.addEventListener("submit", function (event) {
      event.preventDefault();

      // Retrieve user input
      const firstName = document.getElementById("txt").value;
      const lastName = document.getElementById("txt2").value;
      const email = document.getElementById("mail").value;
      const password = document.getElementById("pass").value;
      const confirmPassword = document.getElementById("pass2").value;
      const userType = document.querySelector('input[name="userType"]:checked').value;

      // Check if passwords match
      if (password !== confirmPassword) {
          alert("Passwords do not match");
          return;
      }

      // Retrieve array of users from local storage
      const storedUsersJSON = localStorage.getItem("myUsers");
      const storedUsers = JSON.parse(storedUsersJSON) || [];

      // Generate a unique ID (timestamp or sequential based on stored users)
      const newID = storedUsers.length > 0 ? storedUsers[storedUsers.length - 1].ID + 1 : 1;

      // Create a new user object based on user type
      let newUser;
      if (userType === "user") {
          newUser = {
              ID: newID,
              Name: firstName + " " + lastName,
              Email: email,
              Password: password,
              Admin: false
          };
      } else if (userType === "admin") {
          newUser = {
              ID: newID,
              Name: firstName + " " + lastName,
              Email: email,
              Password: password,
              Admin: true
          };
      }

      // Push the new user object into the array of users
      storedUsers.push(newUser);

      // Update the array of users in local storage
      localStorage.setItem("myUsers", JSON.stringify(storedUsers));

      alert("User signed up successfully");

      // Optionally, reset the form after successful signup
      signupForm.reset();
  });
});
