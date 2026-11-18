(function(){
var reduce=matchMedia('(prefers-reduced-motion: reduce)').matches;
// letras do título
var h=document.getElementById('logo-h1'),t=h.querySelector('.tech');
h.textContent='';
'Menger'.split('').forEach(function(c,i){var s=document.createElement('span');s.className='l';s.style.setProperty('--i',i);s.setAttribute('aria-hidden','true');s.textContent=c;h.appendChild(s)});
h.appendChild(t);
// faixa
var w=['Redes sociais','Tráfego pago','Sites','Identidade visual','Automação','Conteúdo'],o='';
for(var k=0;k<4;k++)w.forEach(function(x){o+=x+'<i>✦</i>'});
document.getElementById('tk').innerHTML=o;
// sanfona
document.querySelectorAll('.svc button').forEach(function(b){b.addEventListener('click',function(){
var p=b.parentNode,open=!p.classList.contains('open');
document.querySelectorAll('.svc.open').forEach(function(e){e.classList.remove('open');e.firstChild.setAttribute('aria-expanded','false')});
if(open){p.classList.add('open');b.setAttribute('aria-expanded','true')}})});
// entrada ao rolar
var io=new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting){e.target.classList.add('in');io.unobserve(e.target)}})},{threshold:.15});
document.querySelectorAll('.rv').forEach(function(e){io.observe(e)});
// blob e botão magnético
if(!reduce&&matchMedia('(hover:hover)').matches){
var bl=document.getElementById('blob'),x=innerWidth/2,y=300,tx=x,ty=y;
addEventListener('pointermove',function(e){tx=e.clientX;ty=e.clientY});
(function loop(){x+=(tx-x)*.08;y+=(ty-y)*.08;bl.style.transform='translate('+x+'px,'+y+'px)';requestAnimationFrame(loop)})();
document.querySelectorAll('.hero .btn,.cta .btn').forEach(function(b){
b.addEventListener('pointermove',function(e){var r=b.getBoundingClientRect();b.style.transform='translate('+(e.clientX-r.left-r.width/2)*.2+'px,'+(e.clientY-r.top-r.height/2)*.3+'px) scale(1.05)'});
b.addEventListener('pointerleave',function(){b.style.transform=''})});
}
})();