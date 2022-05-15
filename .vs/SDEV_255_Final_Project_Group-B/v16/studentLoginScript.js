async function login(username, password) {
    const response = await fetch("/student/auth", {
        method: "POST",
        body: new URLSearchParams ({
            username: username,
            password: password })
        });

        if (response.ok) {
            const tokenResponse = await response.json();
            localStorage.setItem("token",
            tokenResponse.token);
        }
}

async function displayStatus() {
    const token = localStorage.getItem("token");

    const response = await fetch("/student/status", {
        headers: { "X-Auth": token }
    });

    if (response.ok) {
        const students = await response.json();
        let html = "";
        for (let student of students) {
            html += "<li>" + student.username + " - " + student.status + "</li>";
        }
        const status = ducoment.querySelector("ul");
        status.innerHTML = html;
    }
}