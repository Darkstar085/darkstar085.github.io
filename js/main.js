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


/* ===== Hero v3 behavior ===== */
document.addEventListener('DOMContentLoaded', () => {
  const hero = document.querySelector('#home');
  const timeline = document.querySelector('.timeline');
  const timelineDots = [...document.querySelectorAll('.timeline-dot')];
  const sections = [...document.querySelectorAll('main section[id]')];

  // Timeline is completely hidden while the hero is in view.
  const updateTimelineVisibility = () => {
    if (!hero || !timeline) return;
    timeline.classList.toggle('timeline-visible', hero.getBoundingClientRect().bottom <= 8);
  };
  updateTimelineVisibility();
  window.addEventListener('scroll', updateTimelineVisibility, { passive: true });
  window.addEventListener('resize', updateTimelineVisibility);

  // Dots are actual navigation controls and stay synchronized with sections.
  timelineDots.forEach(dot => {
    dot.addEventListener('click', event => {
      event.preventDefault();
      const target = document.querySelector(dot.getAttribute('href'));
      if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  });

  if (sections.length && timelineDots.length) {
    const dotObserver = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        const hash = '#' + entry.target.id;
        timelineDots.forEach(dot => {
          dot.classList.toggle('active', dot.getAttribute('href') === hash);
        });
      });
    }, { rootMargin: '-35% 0px -55% 0px', threshold: 0 });

    sections.forEach(section => dotObserver.observe(section));
  }

  // Five rotating terminal snapshots.
  const command = document.querySelector('#terminal-command');
  const output = document.querySelector('#terminal-output');
  const index = document.querySelector('#terminal-index');
  const total = document.querySelector('#terminal-total');

  const items = [
    ['status', '<span class="green">●</span> building &amp; learning'],
    ['focus', '<span class="hero-terminal-output-purple">→</span> Android internals &amp; custom ROMs'],
    ['stack', '<span class="hero-terminal-output-blue">◆</span> Kotlin · Java · C/C++ · Python'],
    ['working-on', '<span class="hero-terminal-output-orange">↳</span> open-source projects &amp; experiments'],
    ['exploring', '<span class="green">●</span> Linux · automation · the web']
  ];

  let current = 0;
  if (total) total.textContent = String(items.length).padStart(2, '0');

  const rotateTerminal = () => {
    if (!command || !output || !index) return;

    output.classList.add('is-changing');
    setTimeout(() => {
      command.textContent = items[current][0];
      output.innerHTML = items[current][1];
      index.textContent = String(current + 1).padStart(2, '0');
      output.classList.remove('is-changing');
      current = (current + 1) % items.length;
    }, 180);
  };

  setInterval(rotateTerminal, 2800);
});
