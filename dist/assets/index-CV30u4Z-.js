(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))n(s);new MutationObserver(s=>{for(const o of s)if(o.type==="childList")for(const r of o.addedNodes)r.tagName==="LINK"&&r.rel==="modulepreload"&&n(r)}).observe(document,{childList:!0,subtree:!0});function i(s){const o={};return s.integrity&&(o.integrity=s.integrity),s.referrerPolicy&&(o.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?o.credentials="include":s.crossOrigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function n(s){if(s.ep)return;s.ep=!0;const o=i(s);fetch(s.href,o)}})();const E=[{id:1,p1:"Colombe",p2:"Pierre"},{id:2,p1:"Castille",p2:"Léo D."},{id:3,p1:"Eugénie",p2:"Cyprien"},{id:4,p1:"Capucine",p2:"Henri"},{id:5,p1:"Valentine",p2:"Hugues"},{id:6,p1:"Candice",p2:"Alfred"},{id:7,p1:"Charlotte",p2:"Hippolyte"},{id:8,p1:"Clarisse",p2:"Alban R."},{id:9,p1:"Marion",p2:"Karol"},{id:10,p1:"Philippine",p2:"Xavier"},{id:11,p1:"Paola A.",p2:"Grégoire"},{id:12,p1:"Marie D.",p2:"Alban"},{id:13,p1:"Louise B.",p2:"Louis S."},{id:14,p1:"Charlotte G.",p2:"Amaury"},{id:15,p1:"Iklil",p2:"Jean"},{id:16,p1:"Margaux",p2:"Donatien"},{id:17,p1:"Paula",p2:"Paul"},{id:18,p1:"Théophile",p2:"Maylis"},{id:19,p1:"Eléonore",p2:"Stan"},{id:20,p1:"Mathilde",p2:"Victor"},{id:25,p1:"Sixtine",p2:"Gaspard"},{id:26,p1:"Anne-Thaïs",p2:"Brieuc"},{id:27,p1:"Aglaé",p2:"Gauthier"}],h=[{name:"Poule A",color:"#1a5c38",teams:[1,6,11,16,25]},{name:"Poule B",color:"#1a4a7c",teams:[2,7,12,17,26]},{name:"Poule C",color:"#7c1a1a",teams:[3,8,13,18,27]},{name:"Poule D",color:"#6b21a8",teams:[4,9,14,19]},{name:"Poule E",color:"#92400e",teams:[5,10,15,20]}],C=15,I=5,L=C+I,N=10,M="go-ouest-2025";let u=JSON.parse(localStorage.getItem(M)||'{"scores":{}}');function D(t,e,i){u.scores[t]||(u.scores[t]={}),u.scores[t][e]=i===""?null:Number(i),B()}function T(t){return u.scores[t]||{}}function w(t){O.push(t)}const O=[];function B(){localStorage.setItem(M,JSON.stringify(u)),O.forEach(t=>t(u))}const H=t=>E.find(e=>e.id===t),v=t=>{const e=H(t);return`${e.p1} & ${e.p2}`};function g(){const t=[];let e=1;return h.forEach(i=>{const n=i.teams;for(let s=0;s<n.length;s++)for(let o=s+1;o<n.length;o++)t.push({id:e++,pool:i.name,color:i.color,t1:n[s],t2:n[o]})}),t}function _(t){const e=[...t],i=[];for(;e.length;){const n=new Set,s=[];for(let o=0;o<e.length&&s.length<2;o++){const r=e[o];!n.has(r.t1)&&!n.has(r.t2)&&(s.push(r),n.add(r.t1),n.add(r.t2),e.splice(o--,1))}i.push(s)}return i}function x(t,e,i){let n=0,s=0,o=0,r=0,c=0,d=0,l=0;return i.filter(a=>a.pool===e&&(a.t1===t||a.t2===t)).forEach(a=>{const p=T(a.id);if(p.s1==null||p.s2==null)return;const f=a.t1===t?p.s1:p.s2,b=a.t1===t?p.s2:p.s1;n++,d+=f,l+=b,f>b?(s++,c+=3):f===b?(r++,c+=1):o++}),{j:n,v:s,d:o,n:r,pts:c,gf:d,ga:l}}function $(t,e){return t.teams.map(i=>({id:i,...x(i,t.name,e)})).sort((i,n)=>n.pts-i.pts||n.gf-n.ga-(i.gf-i.ga)||n.gf-i.gf)}function j(t){const e=h.map(n=>{var o,r;const s=$(n,t);return{team:(o=s[0])==null?void 0:o.id,pool:n.name,color:n.color,pts:((r=s[0])==null?void 0:r.pts)??0}}),i=h.map(n=>{var o,r;const s=$(n,t);return{team:(o=s[1])==null?void 0:o.id,pool:n.name,color:n.color,pts:((r=s[1])==null?void 0:r.pts)??0,isWild:!0}}).sort((n,s)=>s.pts-n.pts);return[...e,i[0]]}function R(t){const e=g(),i=s=>["r1","r2","r3","rn"][Math.min(s,3)],n=s=>{const r=$(s,e).map((c,d)=>`
      <tr class="${d===0?"q":""}">
        <td><span class="rnk ${i(d)}">${d+1}</span></td>
        <td><span class="duo-name">${v(c.id)}</span></td>
        <td>${c.j}</td>
        <td>${c.v}</td>
        <td>${c.d}</td>
        <td><span class="pts-badge">${c.pts}</span></td>
      </tr>`).join("");return`
      <div class="pool-card">
        <div class="pool-hdr" style="background:${s.color}">
          <h3>${s.name}</h3>
          <span class="badge">${s.teams.length} duos</span>
        </div>
        <table class="stand-table">
          <thead><tr><th>#</th><th>Duo</th><th>J</th><th>V</th><th>D</th><th>Pts</th></tr></thead>
          <tbody>${r}</tbody>
        </table>
      </div>`};t.innerHTML=`
    <div class="banner info">
      ℹ️ <div>
        <strong>Format :</strong> 5 poules → top 1 de chaque poule + meilleur 2ème = <strong>6 qualifiés</strong>.
        Ligne <span class="q-sample">verte</span> = qualifié provisoire.
      </div>
    </div>
    <div class="pools-grid">${h.map(n).join("")}</div>`}function S(t){const e=N*60+t*L,i=Math.floor(e/60),n=e%60;return`${String(i).padStart(2,"0")}:${String(n).padStart(2,"0")}`}function k(t){const e=g(),i=_(e),n=i.length*L,s=Math.floor(n/60),o=n%60,r=(l,a)=>{if(!l)return`<div class="empty-slot"><span class="m-time">${S(a)}</span><span>—</span></div>`;const p=T(l.id);return`
      <div class="match-row" data-mid="${l.id}">
        <span class="m-time">${S(a)}</span>
        <div class="m-body">
          <div class="m-teams">${v(l.t1)} <span class="vs">vs</span> ${v(l.t2)}</div>
          <span class="m-pool-tag" style="background:${l.color}">${l.pool}</span>
        </div>
        <div class="m-score">
          <input class="sc-input" type="number" min="0" max="99"
            value="${p.s1??""}" placeholder="—"
            data-mid="${l.id}" data-side="s1">
          <span class="sc-sep">:</span>
          <input class="sc-input" type="number" min="0" max="99"
            value="${p.s2??""}" placeholder="—"
            data-mid="${l.id}" data-side="s2">
        </div>
      </div>`};let c="",d="";i.forEach((l,a)=>{c+=r(l[0]||null,a),d+=r(l[1]||null,a)}),t.innerHTML=`
    <div class="banner">
      ⚠️ <strong>${e.length} matchs · ${i.length} créneaux · ~${s}h${o>0?o:""}.</strong>
      Pour tenir en 6h : réduire les matchs à <strong>10-12 min</strong> ou passer à <strong>5 poules de 4</strong> (30 matchs).
    </div>
    <div class="planning-header">
      <span class="section-title">Planning</span>
      <span class="planning-meta">Début 10h00 · matchs de 15 min</span>
    </div>
    <div class="courts-grid">
      <div class="court-card">
        <div class="court-hdr c1-hdr">🎾 Terrain 1</div>
        ${c}
      </div>
      <div class="court-card">
        <div class="court-hdr c2-hdr">🎾 Terrain 2</div>
        ${d}
      </div>
    </div>`,t.addEventListener("input",l=>{const a=l.target;a.dataset.mid&&D(Number(a.dataset.mid),a.dataset.side,a.value)})}const P=(t,e)=>{const i=t!=null&&t.team?v(t.team):"— À déterminer —";return`<div class="b-team"><div>${t!=null&&t.team?`<span class="m-pool-tag" style="background:${t.color}">${t.pool}${t.isWild?" ⭐":""}</span> `:""}${i}</div><span class="b-sc">—</span></div>`},m=(t,e)=>`
  <div class="b-match">
    ${P(t)}
    ${P(e)}
  </div>`;function F(t){const e=g(),i=j(e),[n,s,o,r,c,d]=i,l=i.map((a,p)=>`
    <div class="qual-card" style="border-color:${(a==null?void 0:a.color)||"#aaa"}">
      <div class="qual-pool" style="color:${(a==null?void 0:a.color)||"#aaa"}">
        ${(a==null?void 0:a.pool)||"—"}${a!=null&&a.isWild?" ⭐ Wildcard":""}
      </div>
      <div class="qual-name">${a!=null&&a.team?v(a.team):"—"}</div>
      <div class="qual-meta">SF${p+1} · ${(a==null?void 0:a.pts)??0} pts</div>
    </div>`).join("");t.innerHTML=`
    <div class="banner info">
      ℹ️ Le bracket se remplit automatiquement selon les résultats des poules.
      Entrez les scores dans l'onglet <strong>Planning</strong>.
    </div>

    <div class="section-card">
      <div class="section-title" style="margin-bottom:1rem">Phase finale · 6 qualifiés</div>
      <div class="bracket-wrap">
        <div class="bracket">

          <div class="b-round">
            <div class="b-round-title">Demi-finales</div>
            ${m(n,r)}
            ${m(s,c)}
            ${m(o,d)}
          </div>

          <div class="b-round">
            <div class="b-round-title" style="margin-top:1.5rem">Finale</div>
            ${m(null,null)}
            <div class="b-label-3rd">3ème place</div>
            ${m(null,null)}
          </div>

          <div class="b-round">
            <div class="b-round-title" style="margin-top:5.5rem">Champion</div>
            <div class="trophy-box">
              <div class="trophy-icon">🏆</div>
              <div class="trophy-name">GO OUEST 2025</div>
              <div class="trophy-sub">À déterminer</div>
            </div>
          </div>

        </div>
      </div>
    </div>

    <div class="section-card" style="margin-top:1.25rem">
      <div class="section-title" style="margin-bottom:1rem">Qualifiés provisoires</div>
      <div class="qual-grid">${l}</div>
    </div>`}const G=g();document.getElementById("stat-duos").textContent=E.length;document.getElementById("stat-matches").textContent=G.length;const y={poules:()=>R(document.getElementById("poules")),planning:()=>k(document.getElementById("planning")),finale:()=>F(document.getElementById("finale"))};let A="poules";function U(t){document.querySelectorAll(".tab-content").forEach(e=>e.classList.remove("active")),document.querySelectorAll(".tab-btn").forEach(e=>e.classList.remove("active")),document.getElementById(t).classList.add("active"),document.querySelector(`[data-tab="${t}"]`).classList.add("active"),A=t,y[t]()}document.querySelectorAll(".tab-btn").forEach(t=>{t.addEventListener("click",()=>U(t.dataset.tab))});w(()=>y[A]());y.poules();
