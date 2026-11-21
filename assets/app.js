(function(){
const $=(s,r=document)=>r.querySelector(s), $$=(s,r=document)=>[...r.querySelectorAll(s)];
// ---------- lightbox ----------
const L=$('#lb'),LI=$('img',L),LS=$('.lbsvg',L),LP=$('p',L);
function lb(o){if(o.svg){LI.hidden=true;LS.hidden=false;LS.innerHTML=o.svg;}else{LS.hidden=true;LI.hidden=false;LI.src=o.src;}LP.textContent=o.cap||'';L.classList.add('on');$('button',L).focus();}
const close=()=>{L.classList.remove('on');LS.innerHTML='';};
$('button',L).addEventListener('click',close);L.addEventListener('click',e=>{if(e.target===L)close();});
document.addEventListener('keydown',e=>{if(e.key==='Escape')close();});
document.addEventListener('click',e=>{const z=e.target.closest('.zoom');if(z){e.preventDefault();lb({src:z.dataset.full,cap:z.dataset.cap});}});
// ---------- map ----------
const FR=[['-120','The last Ice Age','The sea is about 120 metres lower. Australia, New Guinea and Tasmania are one land: Sahul.'],
 ['-18','About 12,000 years ago','Tasmania becomes an island.'],
 ['-4','About 8,000 years ago','New Guinea is cut off.'],
 ['0','Today','The coast we know now.']];
(function(){const m=window.SAHUL,svg=$('#mapsvg');
 const PIN={'Madjedbebe':[12,-10],'Lake Mungo':[-150,-12],'Budj Bim':[-120,22]};
 svg.setAttribute('viewBox',`0 0 ${m.w} ${m.h}`);
 svg.innerHTML=`<rect width="${m.w}" height="${m.h}" fill="#bfe0ea"/>`+FR.map((f,i)=>`<path class="land" data-i="${i}" d="${m[f[0]]}" fill="#c98f4c" opacity="${i?0:1}"/>`).join('')
  +`<path class="today" d="${m['0']}"/>`
  +Object.entries(PIN).map(([n,[dx,dy]])=>{const [x,y]=m.pts[n];return `<g class="pin"><circle cx="${x}" cy="${y}" r="9"/><text x="${x+dx}" y="${y+dy}">${n}</text></g>`}).join('');
 const r=$('#mapr'),lbl=$('#maplbl');let cur=0;
 const show=i=>{cur=i;$$('.land',svg).forEach(p=>p.setAttribute('opacity',+p.dataset.i===i?1:0));lbl.innerHTML=`<b>${FR[i][1]}.</b> ${FR[i][2]}`;r.value=i;r.setAttribute('aria-valuetext',FR[i][1]);};
 r.addEventListener('input',()=>show(+r.value));let t=null;const pb=$('#mapplay');
 const stop=()=>{clearInterval(t);t=null;pb.textContent='▶ Play';};
 pb.addEventListener('click',()=>{if(t){stop();return;}let i=0;show(0);pb.textContent='■ Stop';t=setInterval(()=>{i++;if(i>=FR.length){stop();return;}show(i);},1700);});
 r.addEventListener('pointerdown',()=>{if(t)stop();});
 svg.addEventListener('click',()=>lb({svg:svg.outerHTML.replace('id="mapsvg"',''),cap:FR[cur][1]+'. '+FR[cur][2]}));
 show(0);})();
// ---------- timeline ----------
const EV=[
 {id:'mad',t:'Scientists date stone tools and ochre at Madjedbebe, on Mirarr Country.',d:'About 65,000 years ago (Nature, 2017). Other scientists say about 50,000 to 55,000.'},
 {id:'mun',t:'At Lake Mungo, in south-western New South Wales, a woman is cremated and a man is buried with red ochre.',d:'40,000 to 42,000 years ago (National Museum of Australia).'},
 {id:'tas',t:'The rising sea covers the land bridge, and Tasmania becomes an island.',d:'About 12,000 years ago (National Museum of Australia).'},
 {id:'bud',t:'The Gunditjmara build stone channels and ponds at Budj Bim to catch eels.',d:'For at least 6,600 years (UNESCO).'},
 {id:'fle',t:'Eleven British ships, the First Fleet, arrive at Sydney Cove.',d:'26 January 1788 (National Museum of Australia).'}];
const ORDER=EV.map(e=>e.id);
const tl=$('#tl'),msg=$('#tlmsg');
function render(ids){tl.innerHTML=ids.map(id=>{const e=EV.find(x=>x.id===id);return `<li data-id="${id}"><span class="grip" aria-hidden="true">⋮⋮</span><span class="txt">${e.t}<span class="date">${e.d}</span></span><span class="ud"><button type="button" class="up" aria-label="Move up">▲</button><button type="button" class="dn" aria-label="Move down">▼</button></span></li>`}).join('');}
function cur(){return $$('li',tl).map(li=>li.dataset.id);}
function clearMarks(){$$('li',tl).forEach(li=>li.classList.remove('ok','no'));tl.classList.remove('reveal');msg.textContent='';}
function shuffle(){let a;do{a=ORDER.slice().sort(()=>Math.random()-.5);}while(a.join()===ORDER.join());render(a);clearMarks();}
tl.addEventListener('click',e=>{const b=e.target.closest('button');if(!b)return;const li=b.closest('li');
 if(b.classList.contains('up')&&li.previousElementSibling)tl.insertBefore(li,li.previousElementSibling);
 if(b.classList.contains('dn')&&li.nextElementSibling)tl.insertBefore(li.nextElementSibling,li);
 clearMarks();b.focus();});
// pointer drag (mouse, pen and touch)
let drag=null;
tl.addEventListener('pointerdown',e=>{const g=e.target.closest('.grip');if(!g)return;e.preventDefault();const li=g.closest('li');
 drag={li,id:e.pointerId,y0:e.clientY};li.classList.add('drag');g.setPointerCapture(e.pointerId);clearMarks();});
tl.addEventListener('pointermove',e=>{if(!drag||e.pointerId!==drag.id)return;e.preventDefault();
 const li=drag.li;const place=()=>{li.style.transform=`translateY(${e.clientY-drag.y0}px)`;};place();
 for(let guard=0;guard<6;guard++){const r=li.getBoundingClientRect(),c=r.top+r.height/2;
  const pv=li.previousElementSibling,nx=li.nextElementSibling;let moved=false;const top0=r.top;
  if(pv){const pr=pv.getBoundingClientRect();if(c<pr.top+pr.height/2){tl.insertBefore(li,pv);moved=true;}}
  if(!moved&&nx){const nr=nx.getBoundingClientRect();if(c>nr.top+nr.height/2){tl.insertBefore(nx,li);moved=true;}}
  if(!moved)break;drag.y0+=li.getBoundingClientRect().top-top0;place();}
 // auto-scroll near screen edges
 if(e.clientY<60)window.scrollBy(0,-12);else if(e.clientY>innerHeight-60)window.scrollBy(0,12);});
const end=e=>{if(!drag||e.pointerId!==drag.id)return;drag.li.style.transform='';drag.li.classList.remove('drag');drag=null;};
tl.addEventListener('pointerup',end);tl.addEventListener('pointercancel',end);
$('#tlcheck').addEventListener('click',()=>{const c=cur();let n=0;$$('li',tl).forEach((li,i)=>{const ok=c[i]===ORDER[i];if(ok)n++;li.classList.toggle('ok',ok);li.classList.toggle('no',!ok);});
 msg.textContent=n===ORDER.length?'All in order. Now look at the gaps between the dates.':`${n} of ${ORDER.length} in the right place. Green cards are right. Try moving the red ones.`;});
$('#tlshow').addEventListener('click',()=>{render(ORDER);tl.classList.add('reveal');$$('li',tl).forEach(li=>li.classList.add('ok'));msg.textContent='This is the order, earliest at the top, with the dates from the sources.';});
$('#tlshuffle').addEventListener('click',shuffle);
shuffle();
// ---------- witnesses art ----------
const art=$('#w-budj-art');art.innerHTML=window.EEL;art.addEventListener('click',()=>lb({svg:window.EEL,cap:'Drawing of how a stone eel trap works. Not a picture of a real trap.'}));
// ---------- answers: this browser only ----------
const KEY='ai-thinking-tools-demo-v1';let d={};try{d=JSON.parse(localStorage.getItem(KEY)||'{}')}catch(e){}
const save=()=>{try{localStorage.setItem(KEY,JSON.stringify(d))}catch(e){}};
$$('[data-key]').forEach(el=>{if(d[el.dataset.key]!=null)el.value=d[el.dataset.key];el.addEventListener('input',()=>{d[el.dataset.key]=el.value;save();});});
$$('input[name=finding]').forEach(r=>{if(d.finding===r.value)r.checked=true;r.addEventListener('change',()=>{d.finding=r.value;save();});});
$('#clear').addEventListener('click',()=>{if(confirm('Clear all my answers?')){localStorage.removeItem(KEY);d={};$$('[data-key]').forEach(el=>el.value='');$$('input[name=finding]').forEach(r=>r.checked=false);}});
})();
