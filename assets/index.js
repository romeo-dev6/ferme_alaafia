/* ── Loader ── */
// window.addEventListener('load',()=>{
//   setTimeout(()=>{document.getElementById('loader').classList.add('hidden')},1900);
// });

/* ── Cursor ── */
const dot=document.getElementById('cursorDot'),ring=document.getElementById('cursorRing');
if(window.matchMedia('(pointer:fine)').matches){
  document.addEventListener('mousemove',e=>{
    dot.style.left=e.clientX+'px';dot.style.top=e.clientY+'px';
    ring.style.left=e.clientX+'px';ring.style.top=e.clientY+'px';
  });
}else{dot.style.display='none';ring.style.display='none';}

/* ── Nav scroll ── */
const navEl=document.getElementById('nav');
window.addEventListener('scroll',()=>{navEl.classList.toggle('scrolled',window.scrollY>50)},{passive:true});

/* ── Drawer ── */
function toggleDrawer(){document.getElementById('navDrawer')?.classList.toggle('open')}
const hamburger=document.getElementById('hamburger');
const drawerLinks=document.querySelectorAll('#navDrawer a');
const galleryItems=document.querySelectorAll('.gallery-item[data-light]');
const lightbox=document.getElementById('lightbox');
const lightboxClose=document.querySelector('.lightbox-close');
const contactSubmit=document.getElementById('contactSubmit');

hamburger?.addEventListener('click',toggleDrawer);
drawerLinks.forEach(link=>link.addEventListener('click',toggleDrawer));
galleryItems.forEach(item=>item.addEventListener('click',()=>openLight(item.dataset.light)));
lightbox?.addEventListener('click',e=>{if(e.target===lightbox)closeLight()});
lightboxClose?.addEventListener('click',closeLight);
contactSubmit?.addEventListener('click',sendForm);

/* ── Reveal ── */
const ro=new IntersectionObserver(entries=>entries.forEach(e=>{if(e.isIntersecting){e.target.classList.add('visible');ro.unobserve(e.target)}}),{threshold:.1});
document.querySelectorAll('.reveal,.reveal-left,.reveal-right').forEach(el=>ro.observe(el));

/* ── Images locales ── */
const localImgs={
  heroImg:   'assets/img/webp/hero.webp',
  aboutMain: 'assets/img/webp/about-main.webp',
  aboutSec:  'assets/img/webp/about-sec.webp',
  act1:      'assets/img/webp/act1.webp',
  act2:      'assets/img/webp/act2.webp',
  act3:      'assets/img/webp/act3.webp',
  rando1:    'assets/img/webp/rando1.webp',
  rando2:    'assets/img/webp/rando2.webp',
  rando3:    'assets/img/webp/rando3.webp',
  cult1:     'assets/img/webp/cult1.webp',
  cult2:     'assets/img/webp/cult2.webp',
  restoMain: 'assets/img/webp/resto-main.webp',
  food1:     'assets/img/webp/food1.webp',
  food2:     'assets/img/webp/food2.webp',
  food3:     'assets/img/webp/food3.webp',
  food4:     'assets/img/webp/food4.webp',
  gi1:       'assets/img/webp/gi1.webp',
  gi2:       'assets/img/webp/gi2.webp',
  gi3:       'assets/img/webp/gi3.webp',
  gi4:       'assets/img/webp/gi4.webp',
  gi5:       'assets/img/webp/gi5.webp',
  gi6:       'assets/img/webp/gi6.webp',
  gi7:       'assets/img/webp/gi7.webp',
  gi8:       'assets/img/webp/gi8.webp',
  contactImg:'assets/img/webp/contact.webp',
  temo1:     'assets/img/webp/temo1.webp',
  temo2:     'assets/img/webp/temo2.webp',
  temo3:     'assets/img/webp/temo3.webp',
};
Object.entries(localImgs).forEach(([id,src])=>{
  const el=document.getElementById(id);
  if(!el) return;
  el.src = src;
  el.addEventListener('load',()=>el.classList.remove('img-ph'));
  el.addEventListener('error',()=>el.classList.remove('img-ph'));
});

/* ── Lightbox ── */
function openLight(id){
  const src=document.getElementById(id)?.src;
  if(!src)return;
  document.getElementById('lbImg').src=src;
  document.getElementById('lightbox').classList.add('open');
  document.body.style.overflow='hidden';
}
function closeLight(){
  document.getElementById('lightbox').classList.remove('open');
  document.body.style.overflow='';
}
document.addEventListener('keydown',e=>{if(e.key==='Escape')closeLight()});

/* ── Form ── */
function sendForm(){
  const form = document.querySelector('.contact-form-wrap');
  const emailInput = form.querySelector('input[type="email"]');
  const nameInput = form.querySelector('input[type="text"]');
  const phoneInput = form.querySelector('input[type="tel"]');
  const dateInput = form.querySelector('input[type="date"]');
  const messageInput = form.querySelector('textarea');
  
  // Validation de l'email
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailInput.value || !emailRegex.test(emailInput.value)) {
    alert('Veuillez entrer une adresse email valide.');
    emailInput.focus();
    return;
  }
  
  // Validation du nom
  if (!nameInput.value || nameInput.value.trim().length < 2) {
    alert('Veuillez entrer votre nom complet.');
    nameInput.focus();
    return;
  }
  
  // Validation du téléphone
  if (!phoneInput.value || phoneInput.value.trim().length < 8) {
    alert('Veuillez entrer un numéro de téléphone valide.');
    phoneInput.focus();
    return;
  }
  
  // Validation de la date
  if (!dateInput.value) {
    alert('Veuillez sélectionner une date souhaitée.');
    dateInput.focus();
    return;
  }
  
  // Validation du message
  if (!messageInput.value || messageInput.value.trim().length < 10) {
    alert('Veuillez entrer un message d\'au moins 10 caractères.');
    messageInput.focus();
    return;
  }
  
  const t=document.getElementById('toast');
  t.classList.add('show');
  setTimeout(()=>t.classList.remove('show'),4000);
  
  // Réinitialiser le formulaire après succès
  form.reset();
}

/* ── Active nav on scroll ── */
const sections=document.querySelectorAll('section[id]');
window.addEventListener('scroll',()=>{
  let cur='';
  sections.forEach(s=>{if(window.scrollY>=s.offsetTop-80)cur=s.id});
  document.querySelectorAll('.nav-links a').forEach(a=>{
    const href=a.getAttribute('href');
    a.style.color=href==='#'+cur?(navEl.classList.contains('scrolled')?'var(--leaf)':'white'):'';
  });
},{passive:true});

/* ── Back to top button ── */
const backToTop=document.getElementById('backToTop');
if(backToTop){
  window.addEventListener('scroll',()=>{
    backToTop.classList.toggle('visible',window.scrollY>300);
  },{passive:true});
  backToTop.addEventListener('click',()=>{
    window.scrollTo({top:0,behavior:'smooth'});
  });
}