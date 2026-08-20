const glow=document.querySelector(".cursor-glow");window.addEventListener("pointermove",e=>{if(glow){glow.style.left=e.clientX+"px";glow.style.top=e.clientY+"px"}});if(window.lucide)lucide.createIcons();
const observer=new IntersectionObserver(entries=>entries.forEach(e=>{if(e.isIntersecting)e.target.classList.add("visible")}),{threshold:.12});document.querySelectorAll(".reveal").forEach((el,i)=>{el.style.transitionDelay=(i%4)*70+"ms";observer.observe(el)});
const links=[...document.querySelectorAll(".nav-links a")];
const sections=links.map(a=>document.querySelector(a.getAttribute("href"))).filter(Boolean);
const spy=new IntersectionObserver(entries=>entries.forEach(e=>{if(e.isIntersecting){links.forEach(a=>a.classList.remove("active"));const x=links.find(a=>a.getAttribute("href")==="#"+e.target.id);x?.classList.add("active")}}),{rootMargin:"-35% 0px -55% 0px"});sections.forEach(s=>spy.observe(s));
const menu=document.querySelector(".menu"),nav=document.querySelector(".nav-links");menu?.addEventListener("click",()=>nav.classList.toggle("open"));links.forEach(a=>a.addEventListener("click",()=>nav.classList.remove("open")));

/* v9: fetch the daily-generated GitHub project list */
async function loadProjects(){
  const grid=document.querySelector("#project-grid");
  if(!grid) return;
  try{
    const res=await fetch("data/projects.json", {cache:"no-store"});
    if(!res.ok) throw new Error("projects.json unavailable");
    const projects=await res.json();
    if(!Array.isArray(projects) || !projects.length) throw new Error("No projects");
    grid.innerHTML=projects.slice(0,5).map((p,i)=>`
      <a class="project reveal" data-repo href="${escapeHtml(p.html_url)}" target="_blank" rel="noreferrer">
        <div class="project-icon ${projectTone(i)}"><i data-lucide="${projectIcon(p.language)}"></i></div>
        
        <p>${escapeHtml(p.category || "GITHUB PROJECT")}</p>
        <h3>${escapeHtml(p.name)}</h3>
        <span class="project-desc">${escapeHtml(p.description || "Open-source project by Darkstar085.")}</span>
        <div class="project-meta">
          ${p.language ? `<span>${escapeHtml(p.language)}</span>` : ""}
          <span class="repo-stars">★ ${Number(p.stargazers_count||0)}</span>
          <span>Updated ${escapeHtml(p.updated_label || "")}</span>
        </div>
      </a>`).join("");
    if(window.lucide) lucide.createIcons();
    grid.querySelectorAll(".reveal").forEach(el=>observer.observe(el));
  }catch(err){
    grid.innerHTML='<div class="project-loading">Projects are temporarily unavailable. The daily GitHub sync will refresh this section automatically.</div>';
    console.warn(err);
  }
}
function escapeHtml(v){
  return String(v??"").replace(/[&<>"']/g,m=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#039;"}[m]));
}
function projectTone(i){return ["purple-icon","blue-icon","green-icon","orange-icon","cyan-icon"][i%5]}
function projectIcon(language){
  const map={JavaScript:"braces",TypeScript:"braces",Python:"file-code-2",Java:"coffee",Kotlin:"code-2","C++":"code-2",C:"code-2",Shell:"terminal",HTML:"file-code",CSS:"palette"};
  return map[language]||"folder-git-2";
}
loadProjects();

/* v10: persistent light/dark theme switcher */
(function(){
  const button = document.querySelector("#theme-toggle");
  if(!button) return;
  const saved = localStorage.getItem("darkstar-theme");
  const preferredLight = window.matchMedia && window.matchMedia("(prefers-color-scheme: light)").matches;
  const initial = saved || (preferredLight ? "light" : "dark");

  function applyTheme(theme){
    const light = theme === "light";
    document.body.classList.toggle("light-theme", light);
    button.setAttribute("aria-label", light ? "Switch to dark theme" : "Switch to light theme");
    button.setAttribute("title", light ? "Switch to dark theme" : "Switch to light theme");
    const icon = button.querySelector("[data-lucide]");
    if(icon){
      icon.setAttribute("data-lucide", light ? "moon" : "sun");
      if(window.lucide) lucide.createIcons();
    }
    localStorage.setItem("darkstar-theme", theme);
  }

  applyTheme(initial);
  button.addEventListener("click", function(){
    applyTheme(document.body.classList.contains("light-theme") ? "dark" : "light");
  });
})();
