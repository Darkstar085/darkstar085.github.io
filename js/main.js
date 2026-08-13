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
      document.querySelector('#repo-count').textContent = data.public_repos ?? '—';
      document.querySelector('#followers').textContent = data.followers ?? '—';
      // GitHub's public user endpoint does not expose total stars, so keep this honest.
      document.querySelector('#stars').textContent = '—';
    } catch {
      ['repo-count','followers','stars'].forEach(id => { const el=document.querySelector('#'+id); if(el) el.textContent='—'; });
    }
  }
  loadGithub();

  const sections = [...document.querySelectorAll('main section[id]')];
  const links = [...document.querySelectorAll('.nav a')];
  const activeObserver = new IntersectionObserver(entries => entries.forEach(entry => {
    if (!entry.isIntersecting) return;
    links.forEach(link => link.classList.toggle('active', link.getAttribute('href') === '#' + entry.target.id));
  }), { rootMargin: '-35% 0px -55% 0px', threshold: 0 });
  sections.forEach(section => activeObserver.observe(section));
})();
