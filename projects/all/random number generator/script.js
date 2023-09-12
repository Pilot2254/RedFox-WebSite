function generate() {
	var min = parseInt(document.getElementById("min").value);
	var max = parseInt(document.getElementById("max").value);

	if (isNaN(min) || isNaN(max)) {
		alert("Please enter valid numbers for both minimum and maximum.");
		return;
	}

	if (min >= max) {
		alert("The minimum number must be less than the maximum number.");
		return;
	}

	var randomNumber = Math.floor(Math.random() * (max - min + 1)) + min;
	document.getElementById("result").innerHTML = "Your random number is: " + randomNumber;
}
