const token = localStorage.getItem("token");

// Если токена нет — редирект на страницу входа
if (!token) {
  window.location.href = "/login.html";
}

document.getElementById("logout-btn").addEventListener("click", () => {
  localStorage.removeItem("token");
  window.location.href = "/login.html";
});

const eventsContainer = document.getElementById("events-container");
const form = document.getElementById("event-form");

async function loadEvents() {
  try {
    const res = await fetch("/api/events", {
      headers: {
        "Authorization": `Bearer ${token}`
      }
    });

    if (!res.ok) throw new Error("Ошибка авторизации");

    const events = await res.json();

    eventsContainer.innerHTML = "";
    events.forEach(e => {
      const div = document.createElement("div");
      div.className = "card my-2 p-3";
      div.innerHTML = `
        <strong>${e.theme}</strong><br>
        ${e.comment}<br>
        <small>${e.date}</small>
        <button class="btn btn-sm btn-danger mt-2" onclick="deleteEvent('${e._id}')">Удалить</button>
      `;
      eventsContainer.appendChild(div);
    });

  } catch (err) {
    alert("Ошибка загрузки данных. Пожалуйста, войдите снова.");
    localStorage.removeItem("token");
    window.location.href = "/login.html";
  }
}

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const event = {
    theme: document.getElementById("theme").value,
    comment: document.getElementById("comment").value,
    date: document.getElementById("date").value,
    favorite: false,
    archive: false
  };

  try {
    const res = await fetch("/api/events", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      },
      body: JSON.stringify(event)
    });

    if (!res.ok) throw new Error("Ошибка добавления");

    form.reset();
    loadEvents();
  } catch (err) {
    alert("Ошибка добавления. Войдите снова.");
    localStorage.removeItem("token");
    window.location.href = "/login.html";
  }
});

async function deleteEvent(id) {
  if (!confirm("Удалить событие?")) return;

  try {
    const res = await fetch(`/api/events/${id}`, {
      method: "DELETE",
      headers: {
        "Authorization": `Bearer ${token}`
      }
    });

    if (!res.ok) throw new Error("Ошибка удаления");

    loadEvents();
  } catch (err) {
    alert("Ошибка удаления. Войдите снова.");
    localStorage.removeItem("token");
    window.location.href = "/login.html";
  }
}

// Инициализация
loadEvents();
