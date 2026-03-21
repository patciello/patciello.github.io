// Wait for the DOM to fully load before attaching events
document.addEventListener("DOMContentLoaded", () => {
	const contactForm = document.getElementById("contact-form");

	if (contactForm) {
		contactForm.addEventListener("submit", function (event) {
			// Prevent the default form submission (which would cause a page reload)
			event.preventDefault();

			// Capture the user's name from the input field
			const nameInput = document.getElementById("name").value;

			// Provide a visual response
			alert(`Thanks for reaching out, ${nameInput}! (This is a simulated submission)`);

			// Clear the form fields after submission
			contactForm.reset();
		});
	}
});
