(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const a of document.querySelectorAll('link[rel="modulepreload"]'))s(a);new MutationObserver(a=>{for(const n of a)if(n.type==="childList")for(const o of n.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&s(o)}).observe(document,{childList:!0,subtree:!0});function i(a){const n={};return a.integrity&&(n.integrity=a.integrity),a.referrerPolicy&&(n.referrerPolicy=a.referrerPolicy),a.crossOrigin==="use-credentials"?n.credentials="include":a.crossOrigin==="anonymous"?n.credentials="omit":n.credentials="same-origin",n}function s(a){if(a.ep)return;a.ep=!0;const n=i(a);fetch(a.href,n)}})();const R=[{id:1,p1:"Colombe",p2:"Pierre"},{id:2,p1:"Castille",p2:"Léo D."},{id:3,p1:"Eugénie",p2:"Cyprien"},{id:4,p1:"Capucine",p2:"Henri"},{id:5,p1:"Valentine",p2:"Hugues"},{id:6,p1:"Candice",p2:"Alfred"},{id:7,p1:"Charlotte",p2:"Hippolyte"},{id:8,p1:"Clarisse",p2:"Alban R."},{id:9,p1:"Marion",p2:"Karol"},{id:10,p1:"Philippine",p2:"Xavier"},{id:11,p1:"Paola A.",p2:"Grégoire"},{id:12,p1:"Marie D.",p2:"Alban"},{id:13,p1:"Louise B.",p2:"Louis S."},{id:14,p1:"Charlotte G.",p2:"Amaury"},{id:15,p1:"Iklil",p2:"Jean"},{id:16,p1:"Margaux",p2:"Donatien"},{id:17,p1:"Paula",p2:"Paul"},{id:18,p1:"Théophile",p2:"Maylis"},{id:19,p1:"Eléonore",p2:"Stan"},{id:20,p1:"Mathilde",p2:"Victor"},{id:25,p1:"Sixtine",p2:"Gaspard"},{id:26,p1:"Anne-Thaïs",p2:"Brieuc"},{id:27,p1:"Aglaé",p2:"Gauthier"}],$=[{name:"Poule A",color:"#1a5c38",teams:[1,8,15,26]},{name:"Poule B",color:"#1a4a7c",teams:[2,9,16,27]},{name:"Poule C",color:"#7c1a1a",teams:[3,10,17]},{name:"Poule D",color:"#6b21a8",teams:[4,11,18]},{name:"Poule E",color:"#92400e",teams:[5,12,19]},{name:"Poule F",color:"#0e6b5e",teams:[6,13,20]},{name:"Poule G",color:"#155e75",teams:[7,14,25]}],D=15,j=5,I=D+j,z=10,T="go-ouest-2026",G=["go-ouest-2025"];let b=U();function S(e,t,i,s={}){const{notify:a=!0}=s;b.scores[e]||(b.scores[e]={}),b.scores[e][t]=i===""?null:Number(i),V(a)}function F(e){return b.scores[e]||{}}function K(e){q.push(e)}const q=[];function U(){const e=localStorage.getItem(T);if(e)return k(e);for(const t of G){const i=localStorage.getItem(t);if(!i)continue;const s=k(i);return localStorage.setItem(T,JSON.stringify(s)),s}return{scores:{}}}function k(e){try{const t=JSON.parse(e);return{scores:(t==null?void 0:t.scores)??{}}}catch{return{scores:{}}}}function V(e=!0){localStorage.setItem(T,JSON.stringify(b)),e&&q.forEach(t=>t(b))}const W=e=>R.find(t=>t.id===e),y=e=>{const t=W(e);return`${t.p1} & ${t.p2}`},O={quarterfinals:[{id:"QF1",label:"QF1",sides:[{qualifier:0},{qualifier:7}]},{id:"QF2",label:"QF2",sides:[{qualifier:1},{qualifier:6}]},{id:"QF3",label:"QF3",sides:[{qualifier:2},{qualifier:5}]},{id:"QF4",label:"QF4",sides:[{qualifier:3},{qualifier:4}]}],semifinals:[{id:"SF1",label:"SF1",sides:[{winnerOf:"QF1"},{winnerOf:"QF2"}]},{id:"SF2",label:"SF2",sides:[{winnerOf:"QF3"},{winnerOf:"QF4"}]}],finals:[{id:"F",label:"Finale",sides:[{winnerOf:"SF1"},{winnerOf:"SF2"}]},{id:"TP",label:"3e place",sides:[{loserOf:"SF1"},{loserOf:"SF2"}]}]};function C(){const e=[];let t=1;return $.forEach(i=>{const s=i.teams;for(let a=0;a<s.length;a++)for(let n=a+1;n<s.length;n++)e.push({id:t++,pool:i.name,color:i.color,t1:s[a],t2:s[n]})}),e}function J(e){const t={};e.forEach(n=>{var o;(t[o=n.pool]??(t[o]=[])).push(n)});const i=Object.values(t),s=e.length,a=[];return i.forEach((n,o)=>{const d=s/n.length,p=o*(d/i.length);n.forEach((l,r)=>a.push({m:l,pos:p+r*d}))}),a.sort((n,o)=>n.pos-o.pos),a.map(n=>n.m)}function Y(e){const t=J(e),i=[];for(;t.length;){const s=new Set([...(i[i.length-1]||[]).flatMap(d=>[d.t1,d.t2]),...(i[i.length-2]||[]).flatMap(d=>[d.t1,d.t2])]),a=new Set((i[i.length-1]||[]).flatMap(d=>[d.t1,d.t2])),n=new Set,o=[];for(let d=0;d<3&&o.length<2;d++){const p=d===0?s:d===1?a:new Set;for(let l=0;l<t.length&&o.length<2;l++){const r=t[l];!n.has(r.t1)&&!n.has(r.t2)&&!p.has(r.t1)&&!p.has(r.t2)&&(o.push(r),n.add(r.t1),n.add(r.t2),t.splice(l--,1))}}i.push(o)}return i}function X(e,t,i){let s=0,a=0,n=0,o=0,d=0,p=0,l=0;return i.filter(r=>r.pool===t&&(r.t1===e||r.t2===e)).forEach(r=>{const f=F(r.id);if(f.s1==null||f.s2==null)return;const c=r.t1===e?f.s1:f.s2,h=r.t1===e?f.s2:f.s1;s++,p+=c,l+=h,c>h?(a++,d+=3):c===h?(o++,d+=1):n++}),{j:s,v:a,d:n,n:o,pts:d,gf:p,ga:l}}function L(e,t){return e.teams.map(i=>({id:i,...X(i,e.name,t)})).sort((i,s)=>s.pts-i.pts||s.gf-s.ga-(i.gf-i.ga)||s.gf-i.gf)}function Z(e){const t=$.map(s=>{var n,o;const a=L(s,e);return{team:(n=a[0])==null?void 0:n.id,pool:s.name,color:s.color,pts:((o=a[0])==null?void 0:o.pts)??0}}),i=$.filter(s=>s.teams.length>=4).map(s=>{var n,o,d,p;const a=L(s,e);return{team:(n=a[1])==null?void 0:n.id,pool:s.name,color:s.color,pts:((o=a[1])==null?void 0:o.pts)??0,gf:((d=a[1])==null?void 0:d.gf)??0,ga:((p=a[1])==null?void 0:p.ga)??0,isWild:!0}}).sort((s,a)=>a.pts-s.pts||a.gf-a.ga-(s.gf-s.ga)||a.gf-s.gf)[0];return[...t,i]}function ee(e){var n;const t=Z(e),i=new Map(t.filter(o=>o==null?void 0:o.team).map(o=>[o.team,o])),s={},a={quarterfinals:Q(O.quarterfinals,t,i,s),semifinals:Q(O.semifinals,t,i,s),finals:Q(O.finals,t,i,s)};return{qualifiers:t,rounds:a,champion:((n=a.finals[0])==null?void 0:n.winner)??null}}function Q(e,t,i,s){return e.map(a=>{const n=a.sides.map(l=>te(l,t,s)),o=F(a.id),d=se(n,o,i),p={id:a.id,label:a.label,sides:n,score:o,ready:n.every(l=>l==null?void 0:l.team),...d};return s[a.id]=p,p})}function te(e,t,i){var s,a;return e.qualifier!=null?t[e.qualifier]??null:e.winnerOf?((s=i[e.winnerOf])==null?void 0:s.winner)??null:e.loserOf?((a=i[e.loserOf])==null?void 0:a.loser)??null:null}function se(e,t,i){const[s,a]=e;if(!(s!=null&&s.team)||!(a!=null&&a.team)||t.s1==null||t.s2==null||t.s1===t.s2)return{winner:null,loser:null,isTie:t.s1!=null&&t.s1===t.s2};const n=t.s1>t.s2?s.team:a.team,o=n===s.team?a.team:s.team;return{winner:i.get(n)??{team:n},loser:i.get(o)??{team:o},isTie:!1}}function ae(e){const t=C(),i=a=>["r1","r2","r3","rn"][Math.min(a,3)],s=a=>{const o=L(a,t).map((d,p)=>`
      <tr class="${p===0?"q":""}">
        <td><span class="rnk ${i(p)}">${p+1}</span></td>
        <td><span class="duo-name">${y(d.id)}</span></td>
        <td>${d.j}</td>
        <td>${d.v}</td>
        <td>${d.d}</td>
        <td><span class="pts-badge">${d.pts}</span></td>
      </tr>`).join("");return`
      <div class="pool-card">
        <div class="pool-hdr" style="background:${a.color}">
          <h3>${a.name}</h3>
          <span class="badge">${a.teams.length} duos</span>
        </div>
        <table class="stand-table">
          <thead><tr><th>#</th><th>Duo</th><th>J</th><th>V</th><th>D</th><th>Pts</th></tr></thead>
          <tbody>${o}</tbody>
        </table>
      </div>`};e.innerHTML=`
    <div class="tourney-meta">${R.length} duos · ${$.length} poules · ${t.length} matchs · 2 terrains · 6h</div>
    <div class="banner info">
      ℹ️ <div>
        <strong>Format :</strong> 7 poules → top 1 de chaque poule + meilleur 2ème = <strong>8 qualifiés</strong>.
        Ligne <span class="q-sample">orange</span> = qualifié provisoire.
      </div>
    </div>
    <div class="pools-grid">${$.map(s).join("")}</div>`}function P(e){return e.replace(/\D+/g,"").slice(0,2)}function N(e){const t=z*60+e*I,i=Math.floor(t/60),s=t%60;return`${String(i).padStart(2,"0")}:${String(s).padStart(2,"0")}`}function ne(e){const t=C(),i=Y(t),s=i.length*I,a=Math.floor(s/60),n=s%60,o=(l,r)=>{if(!l)return`<div class="empty-slot"><span class="m-time">${N(r)}</span><span>—</span></div>`;const f=F(l.id);return`
      <div class="match-row" data-mid="${l.id}">
        <span class="m-time">${N(r)}</span>
        <div class="m-body">
          <div class="m-teams">${y(l.t1)} <span class="vs">vs</span> ${y(l.t2)}</div>
          <span class="m-pool-tag" style="background:${l.color}">${l.pool}</span>
        </div>
        <div class="m-score">
          <input class="sc-input" type="text" inputmode="numeric" pattern="[0-9]*" maxlength="2"
            value="${f.s1??""}" placeholder="—"
            data-mid="${l.id}" data-side="s1">
          <span class="sc-sep">:</span>
          <input class="sc-input" type="text" inputmode="numeric" pattern="[0-9]*" maxlength="2"
            value="${f.s2??""}" placeholder="—"
            data-mid="${l.id}" data-side="s2">
        </div>
      </div>`};let d="",p="";i.forEach((l,r)=>{d+=o(l[0]||null,r),p+=o(l[1]||null,r)}),e.innerHTML=`
    <div class="banner">
      ⚠️ <strong>${t.length} matchs · ${i.length} créneaux · ~${a}h${n>0?n:""}.</strong>
      Si ça dépasse 6h : réduire les matchs à <strong>12-13 min</strong> (transition incluse).
    </div>
    <div class="planning-header">
      <span class="section-title">Planning</span>
      <span class="planning-meta">Début 10h00 · matchs de 15 min</span>
    </div>
    <div class="courts-grid">
      <div class="court-card">
        <div class="court-hdr c1-hdr">🎾 Terrain 1</div>
        ${d}
      </div>
      <div class="court-card">
        <div class="court-hdr c2-hdr">🎾 Terrain 2</div>
        ${p}
      </div>
    </div>`,e.dataset.scoreBound!=="true"&&(e.addEventListener("input",l=>{const r=l.target;if(!r.dataset.mid)return;const f=P(r.value);r.value!==f&&(r.value=f),S(Number(r.dataset.mid),r.dataset.side,f,{notify:!1})}),e.addEventListener("change",l=>{const r=l.target;if(!r.dataset.mid)return;const f=P(r.value);r.value!==f&&(r.value=f),S(Number(r.dataset.mid),r.dataset.side,f)}),e.addEventListener("focusout",l=>{const r=l.target;if(!r.dataset.mid)return;const f=P(r.value);r.value!==f&&(r.value=f),S(Number(r.dataset.mid),r.dataset.side,f)}),e.dataset.scoreBound="true")}const ie=[["QF1","SF1"],["QF2","SF1"],["QF3","SF2"],["QF4","SF2"],["SF1","F"],["SF2","F"],["SF1","TP"],["SF2","TP"],["F","CHAMPION"]];function M(e){return e.replace(/\D+/g,"").slice(0,2)}const re=e=>e!=null&&e.team?`<span class="m-pool-tag" style="background:${e.color??"#888"}">${e.pool??"Phase finale"}${e.isWild?" ⭐":""}</span>`:'<span class="b-team-meta">À déterminer</span>',B=(e,t,i,s)=>{if(!(e!=null&&e.team))return'<div class="b-team b-team--tbd"><span>À déterminer</span></div>';const a=F(t);return`
    <div class="b-team">
      <div class="b-team-main">
        ${re(e)}
        <span>${y(e.team)}</span>
      </div>
      <div class="b-score">
        <input class="b-score-input" type="text" inputmode="numeric" pattern="[0-9]*" maxlength="2"
          value="${a[i]??""}" placeholder="—"
          data-mid="${t}" data-side="${i}" ${s?"disabled":""}>
      </div>
    </div>`},g=(e,t)=>`
  <div class="b-match-wrap" data-match-id="${e.id}">
    <div class="b-match">
      <div class="b-match-head">
        <span>${e.label}</span>
        ${e.isTie?'<span class="b-error">Pas de match nul</span>':`<span class="b-side-label">${t}</span>`}
      </div>
      ${B(e.sides[0],e.id,"s1",!e.ready)}
      ${B(e.sides[1],e.id,"s2",!e.ready)}
    </div>
  </div>`;function oe(e){const t=C(),{qualifiers:i,rounds:s,champion:a}=ee(t),[n,o,d,p,l,r,f,c]=i,h=i.map((v,u)=>`
    <div class="qual-card" style="border-color:${(v==null?void 0:v.color)||"#aaa"}">
      <div class="qual-pool" style="color:${(v==null?void 0:v.color)||"#aaa"}">
        ${(v==null?void 0:v.pool)||"—"}${v!=null&&v.isWild?" ⭐ Wildcard":""}
      </div>
      <div class="qual-name">${v!=null&&v.team?y(v.team):"—"}</div>
      <div class="qual-meta">QF${u+1} · ${(v==null?void 0:v.pts)??0} pts</div>
    </div>`).join("");e.innerHTML=`
    <div class="banner info">
      ℹ️ Les quarts se remplissent selon les résultats des poules.
      Saisissez ensuite les scores de phase finale ici pour faire avancer automatiquement le bracket.
    </div>

    <div class="section-card">
      <div class="section-title" style="margin-bottom:1rem">Phase finale · 8 qualifiés</div>
      <div class="bracket-wrap">
        <div class="bracket-stage">
          <svg class="bracket-svg" aria-hidden="true"></svg>
          <div class="bracket">

            <div class="b-round b-round--quarters">
              <div class="b-round-title">Quarts de finale</div>
              <div class="b-round-body">
                ${g(s.quarterfinals[0],`${(n==null?void 0:n.pool)??"—"} vs ${(c==null?void 0:c.pool)??"—"}`)}
                ${g(s.quarterfinals[1],`${(o==null?void 0:o.pool)??"—"} vs ${(f==null?void 0:f.pool)??"—"}`)}
                ${g(s.quarterfinals[2],`${(d==null?void 0:d.pool)??"—"} vs ${(r==null?void 0:r.pool)??"—"}`)}
                ${g(s.quarterfinals[3],`${(p==null?void 0:p.pool)??"—"} vs ${(l==null?void 0:l.pool)??"—"}`)}
              </div>
            </div>

            <div class="b-round b-round--semis">
              <div class="b-round-title">Demi-finales</div>
              <div class="b-round-body">
                ${g(s.semifinals[0],"Vainqueurs QF1/QF2")}
                ${g(s.semifinals[1],"Vainqueurs QF3/QF4")}
              </div>
            </div>

            <div class="b-round b-round--finals">
              <div class="b-round-title">Finale</div>
              <div class="b-round-body">
                ${g(s.finals[0],"Vainqueurs SF")}
                <div class="b-label-3rd">3ème place</div>
                ${g(s.finals[1],"Perdants SF")}
              </div>
            </div>

            <div class="b-round b-round--champion">
              <div class="b-round-title">Champion</div>
              <div class="b-round-body">
                <div class="trophy-box" data-node-id="CHAMPION">
                  <div class="trophy-icon">🏆</div>
                  <div class="trophy-name">GO OUEST 2026</div>
                  <div class="trophy-sub">${a!=null&&a.team?y(a.team):"À déterminer"}</div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>

    <div class="section-card" style="margin-top:1.25rem">
      <div class="section-title" style="margin-bottom:1rem">Qualifiés provisoires</div>
      <div class="qual-grid">${h}</div>
    </div>`,le(e),A(e),e.dataset.scoreBound!=="true"&&(e.addEventListener("input",v=>{const u=v.target;if(!u.dataset.mid)return;const m=M(u.value);u.value!==m&&(u.value=m),S(u.dataset.mid,u.dataset.side,m,{notify:!1})}),e.addEventListener("change",v=>{const u=v.target;if(!u.dataset.mid)return;const m=M(u.value);u.value!==m&&(u.value=m),S(u.dataset.mid,u.dataset.side,m)}),e.addEventListener("focusout",v=>{const u=v.target;if(!u.dataset.mid)return;const m=M(u.value);u.value!==m&&(u.value=m),S(u.dataset.mid,u.dataset.side,m)}),e.dataset.scoreBound="true")}function le(e){e._bracketResizeObserver||(e._bracketResizeObserver=new ResizeObserver(()=>A(e)));const t=e.querySelector(".bracket-stage");e._observedBracketStage&&e._observedBracketStage!==t&&e._bracketResizeObserver.unobserve(e._observedBracketStage),t&&e._observedBracketStage!==t&&(e._bracketResizeObserver.observe(t),e._observedBracketStage=t),e._bracketWindowBound||(e._bracketWindowBound=!0,window.addEventListener("resize",()=>A(e)))}function A(e){e._bracketRaf&&cancelAnimationFrame(e._bracketRaf),e._bracketRaf=requestAnimationFrame(()=>{e._bracketRaf=null,de(e)})}function de(e){const t=e.querySelector(".bracket-stage");if(!t)return;const i={quarters:t.querySelector(".b-round--quarters .b-round-body"),semis:t.querySelector(".b-round--semis .b-round-body"),finals:t.querySelector(".b-round--finals .b-round-body"),champion:t.querySelector(".b-round--champion .b-round-body")},s={QF1:t.querySelector('[data-match-id="QF1"]'),QF2:t.querySelector('[data-match-id="QF2"]'),QF3:t.querySelector('[data-match-id="QF3"]'),QF4:t.querySelector('[data-match-id="QF4"]'),SF1:t.querySelector('[data-match-id="SF1"]'),SF2:t.querySelector('[data-match-id="SF2"]'),F:t.querySelector('[data-match-id="F"]'),TP:t.querySelector('[data-match-id="TP"]'),CHAMPION:t.querySelector('[data-node-id="CHAMPION"]')};if(Object.values(i).some(u=>!u)||Object.values(s).some(u=>!u))return;const a=t.querySelector(".b-label-3rd");if(!a)return;const n=s.QF1.getBoundingClientRect().height,o=s.CHAMPION.getBoundingClientRect().height,d=a.getBoundingClientRect().height,p=16,l=24,r=28,f=10,c={QF1:0,QF2:n+p};c.QF3=c.QF2+n+l,c.QF4=c.QF3+n+p,c.SF1=w(c.QF1+n/2,c.QF2+n/2)-n/2,c.SF2=w(c.QF3+n/2,c.QF4+n/2)-n/2,c.F=w(c.SF1+n/2,c.SF2+n/2)-n/2;const h=c.F+n+r;c.TP=h+d+f,c.CHAMPION=c.F+(n-o)/2;const v=Math.max(c.QF4+n,c.SF2+n,c.TP+n,c.CHAMPION+o);Object.values(i).forEach(u=>{u.style.height=`${v}px`}),["QF1","QF2","QF3","QF4","SF1","SF2","F","TP"].forEach(u=>{const m=s[u];m.style.top=`${c[u]}px`}),a.style.top=`${h}px`,s.CHAMPION.style.top=`${c.CHAMPION}px`,ce(t)}function w(e,t){return(e+t)/2}function ce(e){const t=e.querySelector(".bracket-svg");if(!t)return;const i=e.getBoundingClientRect(),s=Math.ceil(i.width),a=Math.ceil(i.height);t.setAttribute("viewBox",`0 0 ${s} ${a}`),t.setAttribute("width",s),t.setAttribute("height",a),t.innerHTML=ie.map(([n,o])=>{const d=_(e,n),p=_(e,o);if(!d||!p)return"";const l=H(d,"right",i),r=H(p,"left",i),f=l.x+(r.x-l.x)/2;return`<path d="M ${l.x} ${l.y} L ${f} ${l.y} L ${f} ${r.y} L ${r.x} ${r.y}" />`}).join("")}function _(e,t){return t==="CHAMPION"?e.querySelector('[data-node-id="CHAMPION"]'):e.querySelector(`[data-match-id="${t}"] .b-match`)}function H(e,t,i){const s=e.getBoundingClientRect();return{x:Math.round((t==="left"?s.left:s.right)-i.left),y:Math.round(s.top+s.height/2-i.top)}}const E={poules:()=>ae(document.getElementById("poules")),planning:()=>ne(document.getElementById("planning")),finale:()=>oe(document.getElementById("finale"))};let x="poules";function ue(e){document.querySelectorAll(".tab-content").forEach(t=>t.classList.remove("active")),document.querySelectorAll(".tab-btn").forEach(t=>t.classList.remove("active")),document.getElementById(e).classList.add("active"),document.querySelector(`[data-tab="${e}"]`).classList.add("active"),x=e,E[e]()}document.querySelectorAll(".tab-btn").forEach(e=>{e.addEventListener("click",()=>ue(e.dataset.tab))});K(()=>E[x]());E.poules();
