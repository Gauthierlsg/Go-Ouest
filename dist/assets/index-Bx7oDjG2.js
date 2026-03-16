(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))a(s);new MutationObserver(s=>{for(const i of s)if(i.type==="childList")for(const l of i.addedNodes)l.tagName==="LINK"&&l.rel==="modulepreload"&&a(l)}).observe(document,{childList:!0,subtree:!0});function n(s){const i={};return s.integrity&&(i.integrity=s.integrity),s.referrerPolicy&&(i.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?i.credentials="include":s.crossOrigin==="anonymous"?i.credentials="omit":i.credentials="same-origin",i}function a(s){if(s.ep)return;s.ep=!0;const i=n(s);fetch(s.href,i)}})();const Q=[{id:1,p1:"Colombe",p2:"Pierre"},{id:2,p1:"Castille",p2:"Léo D."},{id:3,p1:"Eugénie",p2:"Cyprien"},{id:4,p1:"Capucine",p2:"Henri"},{id:5,p1:"Valentine",p2:"Hugues"},{id:6,p1:"Candice",p2:"Alfred"},{id:7,p1:"Charlotte",p2:"Hippolyte"},{id:8,p1:"Clarisse",p2:"Alban R."},{id:9,p1:"Marion",p2:"Karol"},{id:10,p1:"Philippine",p2:"Xavier"},{id:11,p1:"Paola A.",p2:"Grégoire"},{id:12,p1:"Marie D.",p2:"Alban"},{id:13,p1:"Louise B.",p2:"Louis S."},{id:14,p1:"Charlotte G.",p2:"Amaury"},{id:15,p1:"Iklil",p2:"Jean"},{id:16,p1:"Margaux",p2:"Donatien"},{id:17,p1:"Paula",p2:"Paul"},{id:18,p1:"Théophile",p2:"Maylis"},{id:19,p1:"Eléonore",p2:"Stan"},{id:20,p1:"Mathilde",p2:"Victor"},{id:25,p1:"Sixtine",p2:"Gaspard"},{id:26,p1:"Anne-Thaïs",p2:"Brieuc"},{id:27,p1:"Aglaé",p2:"Gauthier"}],$=[{name:"Poule A",color:"#1a5c38",teams:[1,8,15,26]},{name:"Poule B",color:"#1a4a7c",teams:[2,9,16,27]},{name:"Poule C",color:"#7c1a1a",teams:[3,10,17]},{name:"Poule D",color:"#6b21a8",teams:[4,11,18]},{name:"Poule E",color:"#92400e",teams:[5,12,19]},{name:"Poule F",color:"#0e6b5e",teams:[6,13,20]},{name:"Poule G",color:"#155e75",teams:[7,14,25]}],D=15,I=5,A=D+I,R=10,O="go-ouest-2026",_=["go-ouest-2025"];let g=K();function C(e,t,n){g.scores[e]||(g.scores[e]={}),g.scores[e][t]=n===""?null:Number(n),j()}function y(e){return g.scores[e]||{}}function H(e){N.push(e)}const N=[];function K(){const e=localStorage.getItem(O);if(e)return E(e);for(const t of _){const n=localStorage.getItem(t);if(!n)continue;const a=E(n);return localStorage.setItem(O,JSON.stringify(a)),a}return{scores:{}}}function E(e){try{const t=JSON.parse(e);return{scores:(t==null?void 0:t.scores)??{}}}catch{return{scores:{}}}}function j(){localStorage.setItem(O,JSON.stringify(g)),N.forEach(e=>e(g))}const k=e=>Q.find(t=>t.id===e),h=e=>{const t=k(e);return`${t.p1} & ${t.p2}`},S={quarterfinals:[{id:"QF1",label:"QF1",sides:[{qualifier:0},{qualifier:7}]},{id:"QF2",label:"QF2",sides:[{qualifier:1},{qualifier:6}]},{id:"QF3",label:"QF3",sides:[{qualifier:2},{qualifier:5}]},{id:"QF4",label:"QF4",sides:[{qualifier:3},{qualifier:4}]}],semifinals:[{id:"SF1",label:"SF1",sides:[{winnerOf:"QF1"},{winnerOf:"QF2"}]},{id:"SF2",label:"SF2",sides:[{winnerOf:"QF3"},{winnerOf:"QF4"}]}],finals:[{id:"F",label:"Finale",sides:[{winnerOf:"SF1"},{winnerOf:"SF2"}]},{id:"TP",label:"3e place",sides:[{loserOf:"SF1"},{loserOf:"SF2"}]}]};function P(){const e=[];let t=1;return $.forEach(n=>{const a=n.teams;for(let s=0;s<a.length;s++)for(let i=s+1;i<a.length;i++)e.push({id:t++,pool:n.name,color:n.color,t1:a[s],t2:a[i]})}),e}function G(e){const t={};e.forEach(i=>{var l;(t[l=i.pool]??(t[l]=[])).push(i)});const n=Object.values(t),a=e.length,s=[];return n.forEach((i,l)=>{const r=a/i.length,c=l*(r/n.length);i.forEach((o,d)=>s.push({m:o,pos:c+d*r}))}),s.sort((i,l)=>i.pos-l.pos),s.map(i=>i.m)}function x(e){const t=G(e),n=[];for(;t.length;){const a=new Set([...(n[n.length-1]||[]).flatMap(r=>[r.t1,r.t2]),...(n[n.length-2]||[]).flatMap(r=>[r.t1,r.t2])]),s=new Set((n[n.length-1]||[]).flatMap(r=>[r.t1,r.t2])),i=new Set,l=[];for(let r=0;r<3&&l.length<2;r++){const c=r===0?a:r===1?s:new Set;for(let o=0;o<t.length&&l.length<2;o++){const d=t[o];!i.has(d.t1)&&!i.has(d.t2)&&!c.has(d.t1)&&!c.has(d.t2)&&(l.push(d),i.add(d.t1),i.add(d.t2),t.splice(o--,1))}}n.push(l)}return n}function U(e,t,n){let a=0,s=0,i=0,l=0,r=0,c=0,o=0;return n.filter(d=>d.pool===t&&(d.t1===e||d.t2===e)).forEach(d=>{const p=y(d.id);if(p.s1==null||p.s2==null)return;const m=d.t1===e?p.s1:p.s2,b=d.t1===e?p.s2:p.s1;a++,c+=m,o+=b,m>b?(s++,r+=3):m===b?(l++,r+=1):i++}),{j:a,v:s,d:i,n:l,pts:r,gf:c,ga:o}}function w(e,t){return e.teams.map(n=>({id:n,...U(n,e.name,t)})).sort((n,a)=>a.pts-n.pts||a.gf-a.ga-(n.gf-n.ga)||a.gf-n.gf)}function V(e){const t=$.map(a=>{var i,l;const s=w(a,e);return{team:(i=s[0])==null?void 0:i.id,pool:a.name,color:a.color,pts:((l=s[0])==null?void 0:l.pts)??0}}),n=$.filter(a=>a.teams.length>=4).map(a=>{var i,l,r,c;const s=w(a,e);return{team:(i=s[1])==null?void 0:i.id,pool:a.name,color:a.color,pts:((l=s[1])==null?void 0:l.pts)??0,gf:((r=s[1])==null?void 0:r.gf)??0,ga:((c=s[1])==null?void 0:c.ga)??0,isWild:!0}}).sort((a,s)=>s.pts-a.pts||s.gf-s.ga-(a.gf-a.ga)||s.gf-a.gf)[0];return[...t,n]}function J(e){var i;const t=V(e),n=new Map(t.filter(l=>l==null?void 0:l.team).map(l=>[l.team,l])),a={},s={quarterfinals:F(S.quarterfinals,t,n,a),semifinals:F(S.semifinals,t,n,a),finals:F(S.finals,t,n,a)};return{qualifiers:t,rounds:s,champion:((i=s.finals[0])==null?void 0:i.winner)??null}}function F(e,t,n,a){return e.map(s=>{const i=s.sides.map(o=>W(o,t,a)),l=y(s.id),r=Y(i,l,n),c={id:s.id,label:s.label,sides:i,score:l,ready:i.every(o=>o==null?void 0:o.team),...r};return a[s.id]=c,c})}function W(e,t,n){var a,s;return e.qualifier!=null?t[e.qualifier]??null:e.winnerOf?((a=n[e.winnerOf])==null?void 0:a.winner)??null:e.loserOf?((s=n[e.loserOf])==null?void 0:s.loser)??null:null}function Y(e,t,n){const[a,s]=e;if(!(a!=null&&a.team)||!(s!=null&&s.team)||t.s1==null||t.s2==null||t.s1===t.s2)return{winner:null,loser:null,isTie:t.s1!=null&&t.s1===t.s2};const i=t.s1>t.s2?a.team:s.team,l=i===a.team?s.team:a.team;return{winner:n.get(i)??{team:i},loser:n.get(l)??{team:l},isTie:!1}}function z(e){const t=P(),n=s=>["r1","r2","r3","rn"][Math.min(s,3)],a=s=>{const l=w(s,t).map((r,c)=>`
      <tr class="${c===0?"q":""}">
        <td><span class="rnk ${n(c)}">${c+1}</span></td>
        <td><span class="duo-name">${h(r.id)}</span></td>
        <td>${r.j}</td>
        <td>${r.v}</td>
        <td>${r.d}</td>
        <td><span class="pts-badge">${r.pts}</span></td>
      </tr>`).join("");return`
      <div class="pool-card">
        <div class="pool-hdr" style="background:${s.color}">
          <h3>${s.name}</h3>
          <span class="badge">${s.teams.length} duos</span>
        </div>
        <table class="stand-table">
          <thead><tr><th>#</th><th>Duo</th><th>J</th><th>V</th><th>D</th><th>Pts</th></tr></thead>
          <tbody>${l}</tbody>
        </table>
      </div>`};e.innerHTML=`
    <div class="tourney-meta">${Q.length} duos · ${$.length} poules · ${t.length} matchs · 2 terrains · 6h</div>
    <div class="banner info">
      ℹ️ <div>
        <strong>Format :</strong> 7 poules → top 1 de chaque poule + meilleur 2ème = <strong>8 qualifiés</strong>.
        Ligne <span class="q-sample">orange</span> = qualifié provisoire.
      </div>
    </div>
    <div class="pools-grid">${$.map(a).join("")}</div>`}function M(e){const t=R*60+e*A,n=Math.floor(t/60),a=t%60;return`${String(n).padStart(2,"0")}:${String(a).padStart(2,"0")}`}function X(e){const t=P(),n=x(t),a=n.length*A,s=Math.floor(a/60),i=a%60,l=(o,d)=>{if(!o)return`<div class="empty-slot"><span class="m-time">${M(d)}</span><span>—</span></div>`;const p=y(o.id);return`
      <div class="match-row" data-mid="${o.id}">
        <span class="m-time">${M(d)}</span>
        <div class="m-body">
          <div class="m-teams">${h(o.t1)} <span class="vs">vs</span> ${h(o.t2)}</div>
          <span class="m-pool-tag" style="background:${o.color}">${o.pool}</span>
        </div>
        <div class="m-score">
          <input class="sc-input" type="number" min="0" max="99"
            value="${p.s1??""}" placeholder="—"
            data-mid="${o.id}" data-side="s1">
          <span class="sc-sep">:</span>
          <input class="sc-input" type="number" min="0" max="99"
            value="${p.s2??""}" placeholder="—"
            data-mid="${o.id}" data-side="s2">
        </div>
      </div>`};let r="",c="";n.forEach((o,d)=>{r+=l(o[0]||null,d),c+=l(o[1]||null,d)}),e.innerHTML=`
    <div class="banner">
      ⚠️ <strong>${t.length} matchs · ${n.length} créneaux · ~${s}h${i>0?i:""}.</strong>
      Si ça dépasse 6h : réduire les matchs à <strong>12-13 min</strong> (transition incluse).
    </div>
    <div class="planning-header">
      <span class="section-title">Planning</span>
      <span class="planning-meta">Début 10h00 · matchs de 15 min</span>
    </div>
    <div class="courts-grid">
      <div class="court-card">
        <div class="court-hdr c1-hdr">🎾 Terrain 1</div>
        ${r}
      </div>
      <div class="court-card">
        <div class="court-hdr c2-hdr">🎾 Terrain 2</div>
        ${c}
      </div>
    </div>`,e.dataset.scoreBound!=="true"&&(e.addEventListener("input",o=>{const d=o.target;d.dataset.mid&&C(Number(d.dataset.mid),d.dataset.side,d.value)}),e.dataset.scoreBound="true")}const Z=e=>e!=null&&e.team?`<span class="m-pool-tag" style="background:${e.color??"#888"}">${e.pool??"Phase finale"}${e.isWild?" ⭐":""}</span>`:'<span class="b-team-meta">À déterminer</span>',L=(e,t,n,a)=>{if(!(e!=null&&e.team))return'<div class="b-team b-team--tbd"><span>À déterminer</span></div>';const s=y(t);return`
    <div class="b-team">
      <div class="b-team-main">
        ${Z(e)}
        <span>${h(e.team)}</span>
      </div>
      <div class="b-score">
        <input class="b-score-input" type="number" min="0" max="99"
          value="${s[n]??""}" placeholder="—"
          data-mid="${t}" data-side="${n}" ${a?"disabled":""}>
      </div>
    </div>`},f=(e,t)=>`
  <div class="b-match-wrap">
    <div class="b-match">
      <div class="b-match-head">
        <span>${e.label}</span>
        ${e.isTie?'<span class="b-error">Pas de match nul</span>':`<span class="b-side-label">${t}</span>`}
      </div>
      ${L(e.sides[0],e.id,"s1",!e.ready)}
      ${L(e.sides[1],e.id,"s2",!e.ready)}
    </div>
  </div>`;function q(e){const t=P(),{qualifiers:n,rounds:a,champion:s}=J(t),[i,l,r,c,o,d,p,m]=n,b=n.map((u,v)=>`
    <div class="qual-card" style="border-color:${(u==null?void 0:u.color)||"#aaa"}">
      <div class="qual-pool" style="color:${(u==null?void 0:u.color)||"#aaa"}">
        ${(u==null?void 0:u.pool)||"—"}${u!=null&&u.isWild?" ⭐ Wildcard":""}
      </div>
      <div class="qual-name">${u!=null&&u.team?h(u.team):"—"}</div>
      <div class="qual-meta">QF${v+1} · ${(u==null?void 0:u.pts)??0} pts</div>
    </div>`).join("");e.innerHTML=`
    <div class="banner info">
      ℹ️ Les quarts se remplissent selon les résultats des poules.
      Saisissez ensuite les scores de phase finale ici pour faire avancer automatiquement le bracket.
    </div>

    <div class="section-card">
      <div class="section-title" style="margin-bottom:1rem">Phase finale · 8 qualifiés</div>
      <div class="bracket-wrap">
        <div class="bracket">

          <!-- Quarts de finale : 2 paires de 2 matchs -->
          <div class="b-round">
            <div class="b-round-title">Quarts de finale</div>
            <div class="b-pair">
              ${f(a.quarterfinals[0],`${(i==null?void 0:i.pool)??"—"} vs ${(m==null?void 0:m.pool)??"—"}`)}
              ${f(a.quarterfinals[1],`${(l==null?void 0:l.pool)??"—"} vs ${(p==null?void 0:p.pool)??"—"}`)}
            </div>
            <div class="b-round-spacer"></div>
            <div class="b-pair">
              ${f(a.quarterfinals[2],`${(r==null?void 0:r.pool)??"—"} vs ${(d==null?void 0:d.pool)??"—"}`)}
              ${f(a.quarterfinals[3],`${(c==null?void 0:c.pool)??"—"} vs ${(o==null?void 0:o.pool)??"—"}`)}
            </div>
          </div>

          <!-- Demi-finales : 1 paire de 2 matchs, alignée avec les QF -->
          <div class="b-round">
            <div class="b-round-title">Demi-finales</div>
            <div class="b-pair b-pair--sf" style="margin-top:3rem">
              ${f(a.semifinals[0],"Vainqueurs QF1/QF2")}
              ${f(a.semifinals[1],"Vainqueurs QF3/QF4")}
            </div>
          </div>

          <!-- Finale + 3ème place, centrés sur la SF -->
          <div class="b-round">
            <div class="b-round-title">Finale</div>
            <div class="b-pair b-pair--solo" style="margin-top:9rem">
              ${f(a.finals[0],"Vainqueurs SF")}
            </div>
            <div class="b-label-3rd" style="margin-top:1.5rem">3ème place</div>
            <div class="b-pair b-pair--solo" style="margin-top:0.5rem">
              ${f(a.finals[1],"Perdants SF")}
            </div>
          </div>

          <!-- Champion -->
          <div class="b-round">
            <div class="b-round-title" style="margin-top:10rem">Champion</div>
            <div class="trophy-box">
              <div class="trophy-icon">🏆</div>
              <div class="trophy-name">GO OUEST 2026</div>
              <div class="trophy-sub">${s!=null&&s.team?h(s.team):"À déterminer"}</div>
            </div>
          </div>

        </div>
      </div>
    </div>

    <div class="section-card" style="margin-top:1.25rem">
      <div class="section-title" style="margin-bottom:1rem">Qualifiés provisoires</div>
      <div class="qual-grid">${b}</div>
    </div>`,e.dataset.scoreBound!=="true"&&(e.addEventListener("input",u=>{const v=u.target;v.dataset.mid&&C(v.dataset.mid,v.dataset.side,v.value)}),e.dataset.scoreBound="true")}const T={poules:()=>z(document.getElementById("poules")),planning:()=>X(document.getElementById("planning")),finale:()=>q(document.getElementById("finale"))};let B="poules";function ee(e){document.querySelectorAll(".tab-content").forEach(t=>t.classList.remove("active")),document.querySelectorAll(".tab-btn").forEach(t=>t.classList.remove("active")),document.getElementById(e).classList.add("active"),document.querySelector(`[data-tab="${e}"]`).classList.add("active"),B=e,T[e]()}document.querySelectorAll(".tab-btn").forEach(e=>{e.addEventListener("click",()=>ee(e.dataset.tab))});H(()=>T[B]());T.poules();
