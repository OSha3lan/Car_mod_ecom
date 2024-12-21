// Wait for the DOM to load
document.addEventListener('DOMContentLoaded', function () {
    // Function to display a success message
    function displaySuccessMessage(message) {
        // Check if a message container already exists
        let messageContainer = document.querySelector('.success-message');

        // If it doesn't exist, create one
        if (!messageContainer) {
            messageContainer = document.createElement('div');
            messageContainer.classList.add('success-message');
            messageContainer.style.position = 'fixed';
            messageContainer.style.top = '20px';
            messageContainer.style.right = '20px';
            messageContainer.style.backgroundColor = '#4CAF50';
            messageContainer.style.color = '#fff';
            messageContainer.style.padding = '10px 20px';
            messageContainer.style.borderRadius = '5px';
            messageContainer.style.boxShadow = '0 2px 5px rgba(0, 0, 0, 0.3)';
            messageContainer.style.fontSize = '16px';
            messageContainer.style.zIndex = '1000';

            document.body.appendChild(messageContainer);
        }

        // Set the message text
        messageContainer.textContent = message;

        // Display the message and hide it after 3 seconds
        messageContainer.style.display = 'block';
        setTimeout(() => {
            messageContainer.style.display = 'none';
        }, 3000);
    }

    // Add event listeners to all request buttons
    document.querySelectorAll('.request-button').forEach(button => {
        button.addEventListener('click', function () {
            // Show the success message
            displaySuccessMessage('Your Product Is Requested Successfully');
        });
    });
});
