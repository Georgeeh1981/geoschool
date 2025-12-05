const sampleShifts = [
  {
    day: "Lun",
    start: "08:00",
    end: "16:00",
    role: "Cocina",
    employee: "Ana Pérez",
    location: "Cocina Central",
    status: "Publicado",
  },
  {
    day: "Lun",
    start: "12:00",
    end: "20:00",
    role: "Sala",
    employee: "Carlos Ruiz",
    location: "Sala Norte",
    status: "Pendiente",
  },
  {
    day: "Mar",
    start: "07:00",
    end: "15:00",
    role: "Logística",
    employee: "Lucía Gómez",
    location: "Cocina Central",
    status: "Cambiado",
  },
];

let shifts = [...sampleShifts];

const shiftList = document.getElementById("shiftList");
const shiftForm = document.getElementById("shiftForm");
const locationFilter = document.getElementById("locationFilter");
const statusFilter = document.getElementById("statusFilter");

function statusBadge(status) {
  const normalized = status.toLowerCase();
  if (normalized === "publicado") return "badge published";
  if (normalized === "pendiente") return "badge pending";
  return "badge changed";
}

function renderShifts() {
  if (!shiftList) return;
  const locationValue = locationFilter?.value ?? "all";
  const statusValue = statusFilter?.value ?? "all";

  shiftList.innerHTML = "";

  const filtered = shifts.filter((shift) => {
    const matchesLocation = locationValue === "all" || shift.location === locationValue;
    const matchesStatus = statusValue === "all" || shift.status === statusValue;
    return matchesLocation && matchesStatus;
  });

  filtered.forEach((shift) => {
    const row = document.createElement("div");
    row.className = "shift-row";
    row.innerHTML = `
      <span>${shift.day}</span>
      <span><strong>${shift.start} - ${shift.end}</strong> · ${shift.role}</span>
      <span>${shift.location}</span>
      <span>${shift.employee}</span>
      <span><span class="${statusBadge(shift.status)}">${shift.status}</span></span>
    `;
    shiftList.appendChild(row);
  });

  if (filtered.length === 0) {
    const empty = document.createElement("p");
    empty.className = "muted";
    empty.textContent = "No hay turnos con los filtros actuales.";
    shiftList.appendChild(empty);
  }
}

shiftForm?.addEventListener("submit", (event) => {
  event.preventDefault();
  const data = new FormData(shiftForm);
  const newShift = {
    employee: data.get("employee")?.toString().trim() ?? "",
    role: data.get("role")?.toString().trim() ?? "",
    start: data.get("start")?.toString() ?? "",
    end: data.get("end")?.toString() ?? "",
    day: data.get("day")?.toString() ?? "",
    location: data.get("location")?.toString() ?? "",
    status: data.get("status")?.toString() ?? "Publicado",
  };

  shifts = [...shifts, newShift];
  renderShifts();
  shiftForm.reset();
});

locationFilter?.addEventListener("change", renderShifts);
statusFilter?.addEventListener("change", renderShifts);

// --- Clock logic ---
const clockBtn = document.getElementById("clockBtn");
const clockStatus = document.getElementById("clockStatus");
const clockWindow = document.getElementById("clockWindow");
const clockMessage = document.getElementById("clockMessage");
const clockHistory = document.getElementById("clockHistory");
const clearHistory = document.getElementById("clearHistory");
const nextShift = document.getElementById("nextShift");

let isCheckedIn = false;
let events = [];

function nowText() {
  return new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
}

function evaluateWindow() {
  const now = new Date();
  const currentMinutes = now.getHours() * 60 + now.getMinutes();
  const start = 8 * 60; // 08:00
  const end = 16 * 60; // 16:00

  const inWindow = currentMinutes >= start - 15 && currentMinutes <= end + 15;
  clockWindow.textContent = inWindow ? "En ventana" : "Fuera de ventana";
  clockWindow.classList.toggle("success", inWindow);
  clockWindow.classList.toggle("danger", !inWindow);
  clockMessage.textContent = inWindow
    ? "Puedes fichar sin autorización."
    : "Fuera de horario: captura motivo al fichar.";
}

function renderClock() {
  clockStatus.textContent = isCheckedIn ? "En turno" : "Fuera de turno";
  clockBtn.textContent = isCheckedIn ? "Finalizar turno" : "Iniciar turno";
  evaluateWindow();
}

function renderHistory() {
  clockHistory.innerHTML = "";
  events
    .slice()
    .reverse()
    .forEach((item) => {
      const entry = document.createElement("li");
      entry.innerHTML = `<span>${item.time} · ${item.label}</span><small class="muted">${item.detail}</small>`;
      clockHistory.appendChild(entry);
    });
}

clockBtn?.addEventListener("click", () => {
  const time = nowText();
  if (!isCheckedIn) {
    events.push({ label: "Check-in", time, detail: "Marcado desde web" });
  } else {
    events.push({ label: "Check-out", time, detail: "Cerrado correctamente" });
  }
  isCheckedIn = !isCheckedIn;
  renderClock();
  renderHistory();
});

clearHistory?.addEventListener("click", () => {
  events = [];
  renderHistory();
});

// --- Messaging ---
const channels = [
  {
    id: "turnos",
    name: "Turnos · Cocina",
    description: "Cambios y confirmaciones de horario",
    meta: "5 miembros",
    messages: [
      { author: "Ana", body: "Publicados los turnos de la semana 12.", time: "08:10" },
      { author: "Carlos", body: "Necesito swap del martes tarde.", time: "08:25" },
    ],
  },
  {
    id: "tablón",
    name: "Tablón de anuncios",
    description: "Comunicados oficiales",
    meta: "Visible para todo el equipo",
    messages: [
      { author: "RRHH", body: "Recuerda registrar check-in antes de 5 min del inicio.", time: "07:50" },
      { author: "Gerencia", body: "Capacitación de seguridad el jueves 15:00.", time: "09:00" },
    ],
  },
  {
    id: "operaciones",
    name: "Operaciones",
    description: "Checklist de apertura/cierre",
    meta: "7 miembros",
    messages: [
      { author: "Lucía", body: "Neveras inventariadas. Faltan guantes talla M.", time: "09:15" },
    ],
  },
];

const channelList = document.getElementById("channelList");
const messageThread = document.getElementById("messageThread");
const messageForm = document.getElementById("messageForm");
const messageInput = document.getElementById("messageInput");
const activeChannelTitle = document.getElementById("activeChannel");
const channelMeta = document.getElementById("channelMeta");
const messageSearch = document.getElementById("messageSearch");

let currentChannel = channels[0];

function renderChannels(filterText = "") {
  channelList.innerHTML = "";
  channels
    .filter((channel) => channel.name.toLowerCase().includes(filterText.toLowerCase()))
    .forEach((channel) => {
      const item = document.createElement("div");
      item.className = `channel ${channel.id === currentChannel.id ? "active" : ""}`;
      item.innerHTML = `<strong>${channel.name}</strong><p>${channel.description}</p>`;
      item.addEventListener("click", () => {
        currentChannel = channel;
        renderChannels(filterText);
        renderThread();
      });
      channelList.appendChild(item);
    });
}

function renderThread() {
  activeChannelTitle.textContent = currentChannel.name;
  channelMeta.textContent = `${currentChannel.meta} · ${currentChannel.messages.length} mensajes`;
  messageThread.innerHTML = "";
  currentChannel.messages.forEach((msg) => {
    const bubble = document.createElement("div");
    bubble.className = "message";
    bubble.innerHTML = `<strong>${msg.author}</strong><p>${msg.body}</p><small>${msg.time}</small>`;
    messageThread.appendChild(bubble);
  });
}

messageForm?.addEventListener("submit", (event) => {
  event.preventDefault();
  const text = messageInput.value.trim();
  if (!text) return;
  const time = nowText();
  currentChannel.messages.push({ author: "Tú", body: text, time });
  messageInput.value = "";
  renderThread();
});

messageSearch?.addEventListener("input", (event) => {
  const value = event.target.value.toString();
  renderChannels(value);
});

function initialize() {
  renderShifts();
  renderClock();
  renderHistory();
  renderChannels();
  renderThread();

  if (nextShift) {
    const sampleNext = shifts[0];
    nextShift.textContent = `${sampleNext.start} - ${sampleNext.end} · ${sampleNext.location}`;
  }
}

document.addEventListener("DOMContentLoaded", initialize);
