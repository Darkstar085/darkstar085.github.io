const glow=document.querySelector(".cursor-glow");window.addEventListener("pointermove",e=>{if(glow){glow.style.left=e.clientX+"px";glow.style.top=e.clientY+"px"}});if(window.lucide)lucide.createIcons();
const observer=new IntersectionObserver(entries=>entries.forEach(e=>{if(e.isIntersecting)e.target.classList.add("visible")}),{threshold:.12});document.querySelectorAll(".reveal").forEach((el,i)=>{el.style.transitionDelay=(i%4)*70+"ms";observer.observe(el)});
const links=[...document.querySelectorAll(".nav-links a")];
const sections=links.map(a=>document.querySelector(a.getAttribute("href"))).filter(Boolean);
const spy=new IntersectionObserver(entries=>entries.forEach(e=>{if(e.isIntersecting){links.forEach(a=>a.classList.remove("active"));const x=links.find(a=>a.getAttribute("href")==="#"+e.target.id);x?.classList.add("active")}}),{rootMargin:"-35% 0px -55% 0px"});sections.forEach(s=>spy.observe(s));
const menu=document.querySelector(".menu"),nav=document.querySelector(".nav-links");menu?.addEventListener("click",()=>nav.classList.toggle("open"));links.forEach(a=>a.addEventListener("click",()=>nav.classList.remove("open")));
