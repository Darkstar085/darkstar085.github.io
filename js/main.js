(() => {
  const menuButton = document.querySelector('.menu-toggle');
  const nav = document.querySelector('#nav');

  menuButton?.addEventListener('click', () => {
    const open = nav.classList.toggle('open');
    menuButton.setAttribute('aria-expanded', String(open));
  });

  nav?.querySelectorAll('a').forEach(link => link.addEventListener('click', () => {
    nav.classList.remove('open');
    menuButton?.setAttribute('aria-expanded', 'false');
  }));

  const target = document.querySelector('#typing');
  if (target) {
    const phrases = ['Android & custom ROMs', 'open-source projects', 'Linux & automation', 'web experiments'];
    let phrase = 0, char = 0, deleting = false;
    function type() {
      const current = phrases[phrase];
      target.textContent = current.slice(0, deleting ? --char : ++char);
      if (!deleting && char === current.length) { deleting = true; setTimeout(type, 1500); return; }
      if (deleting && char === 0) { deleting = false; phrase = (phrase + 1) % phrases.length; }
      setTimeout(type, deleting ? 45 : 80);
    }
    type();
  }

  const observer = new IntersectionObserver(entries => entries.forEach(entry => {
    if (entry.isIntersecting) { entry.target.classList.add('visible'); observer.unobserve(entry.target); }
  }), { threshold: 0.12 });
  document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

  const year = document.querySelector('#year');
  if (year) year.textContent = new Date().getFullYear();

  async function loadGithub() {
    try {
      const response = await fetch('https://api.github.com/users/Darkstar085');
      if (!response.ok) throw new Error('GitHub API unavailable');
      const data = await response.json();
      const repo = document.querySelector('#repo-count');
      const followers = document.querySelector('#followers');
      const following = document.querySelector('#following');
      const since = document.querySelector('#github-since');
      const avatar = document.querySelector('#github-avatar');
      const name = document.querySelector('#github-name');
      const bio = document.querySelector('#github-bio');
      if (repo) repo.textContent = data.public_repos ?? '—';
      if (followers) followers.textContent = data.followers ?? '—';
      if (following) following.textContent = data.following ?? '—';
      if (since) since.textContent = data.created_at ? new Date(data.created_at).getFullYear() : '—';
      if (avatar && data.avatar_url) avatar.src = data.avatar_url;
      if (name) name.textContent = (data.name || 'SIPUN').toUpperCase().replace(/\s+/g, ' ');
      if (bio) bio.textContent = data.bio || 'Android & Open Source';
    } catch {
      // Keep the static fallback values if GitHub is unavailable.
    }
  }
  loadGithub();

  const sections = [...document.querySelectorAll('main section[id]')];
  const links = [...document.querySelectorAll('.nav a')];
  const timelineLinks = [...document.querySelectorAll('.timeline-dot')];
  const activeObserver = new IntersectionObserver(entries => entries.forEach(entry => {
    if (!entry.isIntersecting) return;
    const hash = '#' + entry.target.id;
    links.forEach(link => link.classList.toggle('active', link.getAttribute('href') === hash));
    timelineLinks.forEach(link => link.classList.toggle('active', link.getAttribute('href') === hash));
  }), { rootMargin: '-35% 0px -55% 0px', threshold: 0 });
  sections.forEach(section => activeObserver.observe(section));

  timelineLinks.forEach(link => link.addEventListener('click', () => {
    timelineLinks.forEach(item => item.classList.remove('active'));
    link.classList.add('active');
  }));
})();
