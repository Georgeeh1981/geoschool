console.log("GEOSCHOOL login page loaded.");

const loginForm = document.getElementById("loginForm");

if (loginForm) {
  loginForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const email = loginForm.email.value.trim();
    const password = loginForm.password.value.trim();

    if (!email || !password) {
      alert("Please enter both email and password.");
      return;
    }

    // TEMPORARY: just a demo message
    alert(
      `Login request sent.\n\nEmail: ${email}\nPassword length: ${password.length} characters.\n\nBackend authentication will be added soon.`
    );
  });
}
