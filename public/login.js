document.getElementById("login-form").addEventListener("submit", async (e) => {
  e.preventDefault();

  const username = document.getElementById("username").value.trim();
  const password = document.getElementById("password").value;

  if (!username || !password) {
    alert("Пожалуйста, заполните все поля");
    return;
  }

  try {
    const res = await fetch("/api/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password })
    });

    const data = await res.json();

    if (res.ok) {
      localStorage.setItem("token", data.token); // Сохраняем JWT в localStorage
      alert("Вход выполнен!");
      window.location.href = "/events.html"; // Перенаправление
    } else {
      alert(data.error || "Ошибка входа");
    }
  } catch (err) {
    console.error(err);
    alert("Ошибка соединения с сервером");
  }
});
