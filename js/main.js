(() => {
  const menuButton = document.querySelector(".menu-toggle");
  const nav = document.querySelector("#nav");

  menuButton?.addEventListener("click", () => {
    const open = nav.classList.toggle("open");
    menuButton.setAttribute("aria-expanded", String(open));
  });

  nav?.querySelectorAll("a").forEach(link => {
    link.addEventListener("click", () => {
      nav.classList.remove("open");
      menuButton?.setAttribute("aria-expanded", "false");
    });
  });

  const phrases = [
    "Android & custom ROMs",
    "open-source projects",
    "Linux & automation",
    "web experiments"
  ];

  const target = document.querySelector("#typing");
  let phrase = 0, char = 0, deleting = false;

  function type() {
    if (!target) return;
    const current = phrases[phrase];

    if (!deleting) {
      target.textContent = current.slice(0, ++char);
      if (char === current.length) {
        deleting = true;
        setTimeout(type, 1500);
        return;
      }
    } else {
      target.textContent = current.slice(0, --char);
      if (char === 0) {
        deleting = false;
        phrase = (phrase + 1) % phrases.length;
      }
    }
    setTimeout(type, deleting ? 45 : 80);
  }
  type();

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });

  document.querySelectorAll(".reveal").forEach(el => observer.observe(el));

  document.querySelector("#year").textContent = new Date().getFullYear();

  async function loadGithub() {
    try {
      const response = await fetch("https://api.github.com/users/Darkstar085");
      if (!response.ok) throw new Error("GitHub API unavailable");
      const data = await response.json();

      document.querySelector("#github-avatar").src = data.avatar_url;
      document.querySelector("#github-avatar").alt = `${data.login} avatar`;
      document.querySelector("#github-name").textContent = data.name || data.login;
      document.querySelector("#github-bio").textContent =
        data.bio || "Open-source enthusiast";
      document.querySelector("#repo-count").textContent = data.public_repos;
      document.querySelector("#followers").textContent = data.followers;
      document.querySelector("#following").textContent = data.following;

      const year = new Date(data.created_at).getFullYear();
      document.querySelector("#account-age").textContent = year;
    } catch {
      document.querySelector("#github-bio").textContent =
        "Open-source enthusiast • GitHub";
      document.querySelector("#repo-count").textContent = "—";
      document.querySelector("#followers").textContent = "—";
      document.querySelector("#following").textContent = "—";
      document.querySelector("#account-age").textContent = "—";
    }
  }

  loadGithub();
})();
