(function () {
  const stars=[[10,7,2,0],[31,17,3,.8],[77,9,2,1.4],[90,24,3,.3],[15,36,2,2],[85,45,2,1.1],[8,62,3,.5],[54,5,2,2.4],[92,71,2,1.7],[23,85,3,.9],[72,92,2,2.2],[46,54,2,1.3],[64,30,2,.6],[38,76,2,1.9]];
  document.getElementById('sky').innerHTML=stars.map(([x,y,s,d])=>`<span class="star" style="left:${x}%;top:${y}%;width:${s}px;height:${s}px;animation-delay:${d}s"></span>`).join('');
  document.getElementById('row').innerHTML=[0,12,24,34,46].map((o,i)=>`<span class="ph"><span class="sh" style="--o:${o}px;transition-delay:${(0.24*i).toFixed(2)}s"></span></span>`).join('');
  const program=[['18:00','Qonaqların qarşılanması'],['18:30','Nişan və üzük taxılması'],['19:30','Şam yeməyi'],['20:00','Rəqs']];
  document.getElementById('prog').innerHTML=program.map(([t,n])=>`<div><span class="sans">${t}</span><span>${n}</span></div>`).join('');
  const target=Date.parse('2026-11-29T18:00:00+04:00');
  const pad=n=>String(n).padStart(2,'0');
  const tick=()=>{
    let diff=Math.max(0,target-Date.now());
    const d=Math.floor(diff/86400000);diff-=d*86400000;
    const h=Math.floor(diff/3600000);diff-=h*3600000;
    const m=Math.floor(diff/60000);diff-=m*60000;
    const s=Math.floor(diff/1000);
    document.getElementById('cd-d').textContent=d;
    document.getElementById('cd-h').textContent=pad(h);
    document.getElementById('cd-m').textContent=pad(m);
    document.getElementById('cd-s').textContent=pad(s);
  };
  tick();setInterval(tick,1000);
  const gate=document.getElementById('gate'),page=document.getElementById('page');
  let busy=false;
  const toTop=()=>{page.scrollTop=0;page.scrollTo&&page.scrollTo(0,0);};
  document.getElementById('open').addEventListener('click',()=>{
    if(busy)return;busy=true;
    toTop();
    page.classList.remove('run');void page.offsetWidth;page.classList.add('run');
    page.classList.add('show');page.removeAttribute('aria-hidden');
    gate.classList.add('open');
    requestAnimationFrame(toTop);
    setTimeout(()=>{busy=false;},1000);
  });
  document.getElementById('replay').addEventListener('click',()=>{
    if(busy)return;busy=true;
    gate.classList.remove('open');
    page.classList.remove('show');page.setAttribute('aria-hidden','true');
    setTimeout(()=>{toTop();page.classList.remove('run');busy=false;},800);
  });
})();
