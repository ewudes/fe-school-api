document.getElementById("register-form").addEventListener("submit", async (e) => {
  e.preventDefault();

  const username = document.getElementById("username").value.trim();
  const password = document.getElementById("password").value;

  if (!username || !password) {
    alert("Пожалуйста, заполните все поля");
    return;
  }

  try {
    const res = await fetch("/api/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password })
    });

    if (res.ok) {
      alert("Регистрация прошла успешно! Теперь войдите.");
      window.location.href = "/login.html";
    } else {
      const data = await res.json();
      alert(data.error || "Ошибка регистрации");
    }
  } catch (err) {
    console.error(err);
    alert("Ошибка соединения с сервером");
  }
});
