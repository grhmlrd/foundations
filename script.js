const confirmPassword = document.getElementById("confirmpassword");
const password = document.getElementById("password");
const button = document.querySelector("button");
const error = document.querySelector(".error");

password.addEventListener("input", () => {
	console.log(password.value);
});

button.addEventListener("click", () => {
	const isMatch = password.value === confirmPassword.value;

	// Remove previous outline classes
	password.classList.remove("red-outline", "green-outline");
	confirmPassword.classList.remove("red-outline", "green-outline");

	if (!isMatch) {
		password.classList.add("red-outline");
		confirmPassword.classList.add("red-outline");
		error.style.display = "block"; // Show error message
	} else {
		password.classList.add("green-outline");
		confirmPassword.classList.add("green-outline");
		error.style.display = "none"; // Hide error message if password matches
	}
});
