document.addEventListener("DOMContentLoaded", function () {
    const dobInput = document.getElementById("dob-input");
    const calculateBtn = document.getElementById("calculate-btn");
    const ageResult = document.getElementById("age-result");
    const ageText = document.getElementById("age");

    calculateBtn.addEventListener("click", calculateAge);

    function calculateAge() {
        const dob = new Date(dobInput.value);
        const ageResult = document.getElementById("age-result");
        ageResult.style.display = "block";

        function updateAge() {
            const today = new Date();
            const ageInMilliseconds = today - dob;
            const ageInSeconds = ageInMilliseconds / 1000;
            const ageInMinutes = ageInSeconds / 60;
            const ageInHours = ageInMinutes / 60;
            const ageInDays = ageInHours / 24;
            const ageInYears = ageInDays / 365.25;

            ageText.textContent = `${ageInYears.toFixed(9)} years`;
        }

        // Calculate and update the age immediately
        updateAge();

        // Update the age every second
        setInterval(updateAge, 1);
    }
});
