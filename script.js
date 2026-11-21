(function(){
'use strict';
var $=function(s,c){return(c||document).querySelector(s)},$$=function(s,c){return Array.prototype.slice.call((c||document).querySelectorAll(s))};
var reduce=matchMedia('(prefers-reduced-motion: reduce)').matches;
var root=document.documentElement;

/* tema (claro/escuro) com memória */
var themeBtn=$('#theme'),meta=$('meta[name="theme-color"]');
function systemDark(){return matchMedia('(prefers-color-scheme: dark)').matches}
function applyTheme(t){root.setAttribute('data-theme',t);if(meta)meta.content=t==='dark'?'#15162f':'#1f2044'}
var saved=null;try{saved=localStorage.getItem('mt-theme')}catch(e){}
applyTheme(saved||(systemDark()?'dark':'light'));
themeBtn.addEventListener('click',function(){
var n=root.getAttribute('data-theme')==='dark'?'light':'dark';
applyTheme(n);try{localStorage.setItem('mt-theme',n)}catch(e){}});

/* letras do título */
var h=$('#logo-h1'),t=$('.tech',h);
h.textContent='';
'Menger'.split('').forEach(function(c,i){var s=document.createElement('span');s.className='l';s.style.setProperty('--i',i);s.setAttribute('aria-hidden','true');s.textContent=c;h.appendChild(s)});
h.appendChild(t);

/* faixa que corre */
var w=['Redes sociais','Tráfego pago','Sites','Identidade visual','Automação','Conteúdo'],o='';
for(var k=0;k<4;k++)w.forEach(function(x){o+=x+'<i>✦</i>'});
$('#tk').innerHTML=o;

/* menu do celular */
var burger=$('#burger'),menu=$('#menu');
function setMenu(open){
burger.setAttribute('aria-expanded',open);burger.setAttribute('aria-label',open?'Fechar menu':'Abrir menu');
document.body.classList.toggle('menu-open',open)}
burger.addEventListener('click',function(){setMenu(burger.getAttribute('aria-expanded')!=='true')});
$$('a',menu).forEach(function(a){a.addEventListener('click',function(){setMenu(false)})});
addEventListener('keydown',function(e){if(e.key==='Escape'&&burger.getAttribute('aria-expanded')==='true'){setMenu(false);burger.focus()}});
matchMedia('(min-width: 761px)').addEventListener('change',function(e){if(e.matches)setMenu(false)});

/* sanfona */
var svcs=$$('.svc');
svcs.forEach(function(s){var b=$('button',s);b.addEventListener('click',function(){
var open=!s.classList.contains('open');
svcs.forEach(function(e){e.classList.remove('open');$('button',e).setAttribute('aria-expanded','false')});
if(open){s.classList.add('open');b.setAttribute('aria-expanded','true')}})});

/* botão "Quero isso" já escolhe o serviço no formulário */
$$('.more').forEach(function(a){a.addEventListener('click',function(){
var sel=$('#servico');for(var i=0;i<sel.options.length;i++)if(sel.options[i].text===a.dataset.svc)sel.selectedIndex=i})});

/* entrada ao rolar */
var io=new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting){e.target.classList.add('in');io.unobserve(e.target)}})},{threshold:.12});
$$('.rv').forEach(function(e){io.observe(e)});

/* link ativo no menu */
var links=$$('#menu a:not(.btn)'),secs=['servicos','metodo','contato'].map(function(id){return document.getElementById(id)});
var spy=new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting){links.forEach(function(a){a.classList.toggle('on',a.getAttribute('href')==='#'+e.target.id)})}})},{rootMargin:'-45% 0px -50% 0px'});
secs.forEach(function(s){spy.observe(s)});

/* barra de progresso e sombra do topo */
var bar=$('#progress'),head=$('#top'),tick=false;
function onScroll(){
var max=root.scrollHeight-innerHeight;
bar.style.transform='scaleX('+(max>0?scrollY/max:0)+')';
head.classList.toggle('stuck',scrollY>10);tick=false}
addEventListener('scroll',function(){if(!tick){tick=true;requestAnimationFrame(onScroll)}},{passive:true});
onScroll();

/* formulário -> WhatsApp */
var form=$('#form');
form.addEventListener('submit',function(e){
e.preventDefault();
var nome=form.nome.value.trim(),err=$('.err',form);
if(!nome){err.textContent='Diga seu nome para a gente saber com quem está falando.';form.nome.setAttribute('aria-invalid','true');form.nome.focus();return}
err.textContent='';form.nome.removeAttribute('aria-invalid');
var emp=form.empresa.value.trim(),msg=form.msg.value.trim();
var txt='Olá! Sou '+nome+(emp?' da empresa '+emp:'')+'.\nTenho interesse em: '+form.servico.value+'.'+(msg?'\n\n'+msg:'');
var url='https://wa.me/5549999468486?text='+encodeURIComponent(txt);
var win=window.open(url,'_blank','noopener');
if(!win)location.href=url});
form.nome.addEventListener('input',function(){$('.err',form).textContent='';form.nome.removeAttribute('aria-invalid')});

/* blob e botão magnético (só com mouse) */
if(!reduce&&matchMedia('(hover:hover) and (pointer:fine)').matches){
var bl=$('#blob'),x=innerWidth/2,y=300,tx=x,ty=y,run=true;
addEventListener('pointermove',function(e){tx=e.clientX;ty=e.clientY});
document.addEventListener('visibilitychange',function(){run=!document.hidden;if(run)loop()});
function loop(){if(!run)return;x+=(tx-x)*.08;y+=(ty-y)*.08;bl.style.transform='translate('+x+'px,'+y+'px)';requestAnimationFrame(loop)}
loop();
$$('.hero .btn,.cta .send').forEach(function(b){
b.addEventListener('pointermove',function(e){var r=b.getBoundingClientRect();b.style.transform='translate('+(e.clientX-r.left-r.width/2)*.2+'px,'+(e.clientY-r.top-r.height/2)*.3+'px) scale(1.05)'});
b.addEventListener('pointerleave',function(){b.style.transform=''})});
}
})();
