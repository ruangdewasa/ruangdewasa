const ageGate = document.getElementById("ageGate");
const enterBtn = document.getElementById("enterBtn");
const leaveBtn = document.getElementById("leaveBtn");
const menuToggle = document.getElementById("menuToggle");
const mainNav = document.getElementById("mainNav");
const searchInput = document.getElementById("searchInput");
const searchBtn = document.getElementById("searchBtn");
const cards = [...document.querySelectorAll(".article-card")];
const resultCount = document.getElementById("resultCount");
const emptyState = document.getElementById("emptyState");
const toast = document.getElementById("toast");

if (localStorage.getItem("rd_age_verified") === "yes") ageGate.style.display = "none";

enterBtn.addEventListener("click", () => {
  localStorage.setItem("rd_age_verified", "yes");
  ageGate.style.display = "none";
});
leaveBtn.addEventListener("click", () => {
  document.body.innerHTML = `<main style="min-height:100vh;display:grid;place-items:center;padding:30px;background:#0b0d13;color:white;font-family:system-ui;text-align:center"><div><h1>Akses ditutup</h1><p style="color:#9ca5b6">Kamu dapat kembali jika sudah memenuhi batas usia.</p></div></main>`;
});

menuToggle.addEventListener("click", () => mainNav.classList.toggle("open"));
mainNav.querySelectorAll("a").forEach(a => a.addEventListener("click", () => mainNav.classList.remove("open")));

function filterArticles(category = "Semua", term = "") {
  const q = term.trim().toLowerCase();
  let shown = 0;
  cards.forEach(card => {
    const title = card.dataset.title.toLowerCase();
    const cat = card.dataset.category.toLowerCase();
    const matchesCategory = category === "Semua" || cat === category.toLowerCase();
    const matchesText = !q || title.includes(q) || cat.includes(q) || card.textContent.toLowerCase().includes(q);
    const visible = matchesCategory && matchesText;
    card.style.display = visible ? "grid" : "none";
    if (visible) shown++;
  });
  resultCount.textContent = `${shown} artikel`;
  emptyState.hidden = shown !== 0;
}

searchBtn.addEventListener("click", () => {
  filterArticles("Semua", searchInput.value);
  document.getElementById("articles").scrollIntoView({behavior:"smooth"});
});
searchInput.addEventListener("input", () => filterArticles("Semua", searchInput.value));

document.querySelectorAll("[data-filter]").forEach(btn => {
  btn.addEventListener("click", () => {
    filterArticles(btn.dataset.filter, "");
    document.getElementById("articles").scrollIntoView({behavior:"smooth"});
    showToast(`Menampilkan kategori ${btn.dataset.filter}`);
  });
});

document.getElementById("showAllBtn").addEventListener("click", () => {
  searchInput.value = "";
  filterArticles();
  document.getElementById("articles").scrollIntoView({behavior:"smooth"});
});

document.querySelectorAll(".article-btn").forEach(btn => {
  btn.addEventListener("click", () => {
    showToast(`Demo: halaman artikel "${btn.dataset.title}" siap dikembangkan.`);
  });
});

document.getElementById("newsletterForm").addEventListener("submit", e => {
  e.preventDefault();
  showToast("Demo berhasil. Hubungkan form ini ke layanan email saat website online.");
  e.target.reset();
});

function showToast(message) {
  toast.textContent = message;
  toast.classList.add("show");
  clearTimeout(window.toastTimer);
  window.toastTimer = setTimeout(() => toast.classList.remove("show"), 2800);
}

filterArticles();
