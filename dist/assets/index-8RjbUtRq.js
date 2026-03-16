(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const n of document.querySelectorAll('link[rel="modulepreload"]'))a(n);new MutationObserver(n=>{for(const r of n)if(r.type==="childList")for(const i of r.addedNodes)i.tagName==="LINK"&&i.rel==="modulepreload"&&a(i)}).observe(document,{childList:!0,subtree:!0});function s(n){const r={};return n.integrity&&(r.integrity=n.integrity),n.referrerPolicy&&(r.referrerPolicy=n.referrerPolicy),n.crossOrigin==="use-credentials"?r.credentials="include":n.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function a(n){if(n.ep)return;n.ep=!0;const r=s(n);fetch(n.href,r)}})();const T="go-ouest-2026",ce=["go-ouest-2025"],le="go-ouest-backup",de=1;let S=me(),O=null;function W(){return L()}function F(e,t,s,a={}){const{notify:n=!0}=a;S.scores[e]||(S.scores[e]={}),S.scores[e][t]=s===""?null:Number(s),_(n)}function E(e){return L().scores[e]||{}}function U(){return{format:le,version:de,exportedAt:new Date().toISOString(),state:JSON.parse(JSON.stringify(L()))}}function Y(e){return S=Z(e),_(!0),S}function ue(){return S={scores:{}},_(!0),S}function pe(e){return O=Z(e),H(),O}function D(){O=null,H()}function g(){return O!=null}function fe(e){X.push(e)}const X=[];function me(){const e=localStorage.getItem(T);if(e)return z(e);for(const t of ce){const s=localStorage.getItem(t);if(!s)continue;const a=z(s);return localStorage.setItem(T,JSON.stringify(a)),a}return{scores:{}}}function L(){return O??S}function z(e){try{const t=JSON.parse(e);return ee(t)}catch{return{scores:{}}}}function Z(e){if(typeof e=="string")try{e=JSON.parse(e)}catch{throw new Error("Le fichier importe n’est pas un JSON valide.")}const t=(e==null?void 0:e.state)??e;if(!t||typeof t!="object")throw new Error("Le fichier importe ne contient pas d’etats de tournoi.");if(!("scores"in t))throw new Error("Le fichier importe ne contient pas de scores de tournoi.");return ee(t)}function ee(e){const t=e==null?void 0:e.scores;if(!t||typeof t!="object"||Array.isArray(t))return{scores:{}};const s={};return Object.entries(t).forEach(([a,n])=>{if(!n||typeof n!="object"||Array.isArray(n))return;const r={};["s1","s2"].forEach(i=>{const o=he(n[i]);o!==void 0&&(r[i]=o)}),Object.keys(r).length>0&&(s[a]=r)}),{scores:s}}function he(e){if(e===""||e==null)return null;const t=Number(e);if(!(!Number.isFinite(t)||t<0))return t}function _(e=!0){localStorage.setItem(T,JSON.stringify(S)),e&&H()}function H(){const e=L();X.forEach(t=>t(e))}const te=[{id:1,p1:"Colombe",p2:"Pierre"},{id:2,p1:"Castille",p2:"Léo D."},{id:3,p1:"Eugénie",p2:"Cyprien"},{id:4,p1:"Capucine",p2:"Henri"},{id:5,p1:"Valentine",p2:"Hugues"},{id:6,p1:"Candice",p2:"Alfred"},{id:7,p1:"Charlotte",p2:"Hippolyte"},{id:8,p1:"Clarisse",p2:"Alban R."},{id:9,p1:"Marion",p2:"Karol"},{id:10,p1:"Philippine",p2:"Xavier"},{id:11,p1:"Paola A.",p2:"Grégoire"},{id:12,p1:"Marie D.",p2:"Alban"},{id:13,p1:"Louise B.",p2:"Louis S."},{id:14,p1:"Charlotte G.",p2:"Amaury"},{id:15,p1:"Iklil",p2:"Jean"},{id:16,p1:"Margaux",p2:"Donatien"},{id:17,p1:"Paula",p2:"Paul"},{id:18,p1:"Théophile",p2:"Maylis"},{id:19,p1:"Eléonore",p2:"Stan"},{id:20,p1:"Mathilde",p2:"Victor"},{id:25,p1:"Sixtine",p2:"Gaspard"},{id:26,p1:"Anne-Thaïs",p2:"Brieuc"},{id:27,p1:"Aglaé",p2:"Gauthier"}],k=[{name:"Poule A",color:"#1a5c38",teams:[1,8,15,26]},{name:"Poule B",color:"#1a4a7c",teams:[2,9,16,27]},{name:"Poule C",color:"#7c1a1a",teams:[3,10,17]},{name:"Poule D",color:"#6b21a8",teams:[4,11,18]},{name:"Poule E",color:"#92400e",teams:[5,12,19]},{name:"Poule F",color:"#0e6b5e",teams:[6,13,20]},{name:"Poule G",color:"#155e75",teams:[7,14,25]}],ge=15,ve=5,se=ge+ve,be=10,ye=e=>te.find(t=>t.id===e),w=e=>{const t=ye(e);return`${t.p1} & ${t.p2}`},P={quarterfinals:[{id:"QF1",label:"QF1",sides:[{qualifier:0},{qualifier:7}]},{id:"QF2",label:"QF2",sides:[{qualifier:1},{qualifier:6}]},{id:"QF3",label:"QF3",sides:[{qualifier:2},{qualifier:5}]},{id:"QF4",label:"QF4",sides:[{qualifier:3},{qualifier:4}]}],semifinals:[{id:"SF1",label:"SF1",sides:[{winnerOf:"QF1"},{winnerOf:"QF2"}]},{id:"SF2",label:"SF2",sides:[{winnerOf:"QF3"},{winnerOf:"QF4"}]}],finals:[{id:"F",label:"Finale",sides:[{winnerOf:"SF1"},{winnerOf:"SF2"}]},{id:"TP",label:"3e place",sides:[{loserOf:"SF1"},{loserOf:"SF2"}]}]};function j(){const e=[];let t=1;return k.forEach(s=>{const a=s.teams;for(let n=0;n<a.length;n++)for(let r=n+1;r<a.length;r++)e.push({id:t++,pool:s.name,color:s.color,t1:a[n],t2:a[r]})}),e}function Se(e){const t={};e.forEach(r=>{var i;(t[i=r.pool]??(t[i]=[])).push(r)});const s=Object.values(t),a=e.length,n=[];return s.forEach((r,i)=>{const o=a/r.length,f=i*(o/s.length);r.forEach((u,c)=>n.push({m:u,pos:f+c*o}))}),n.sort((r,i)=>r.pos-i.pos),n.map(r=>r.m)}function $e(e){const t=Se(e),s=[];for(;t.length;){const a=new Set([...(s[s.length-1]||[]).flatMap(o=>[o.t1,o.t2]),...(s[s.length-2]||[]).flatMap(o=>[o.t1,o.t2])]),n=new Set((s[s.length-1]||[]).flatMap(o=>[o.t1,o.t2])),r=new Set,i=[];for(let o=0;o<3&&i.length<2;o++){const f=o===0?a:o===1?n:new Set;for(let u=0;u<t.length&&i.length<2;u++){const c=t[u];!r.has(c.t1)&&!r.has(c.t2)&&!f.has(c.t1)&&!f.has(c.t2)&&(i.push(c),r.add(c.t1),r.add(c.t2),t.splice(u--,1))}}s.push(i)}return s}function Fe(e,t,s){let a=0,n=0,r=0,i=0,o=0,f=0,u=0;return s.filter(c=>c.pool===t&&(c.t1===e||c.t2===e)).forEach(c=>{const d=E(c.id);if(d.s1==null||d.s2==null)return;const l=c.t1===e?d.s1:d.s2,v=c.t1===e?d.s2:d.s1;a++,f+=l,u+=v,l>v?(n++,o+=3):l===v?(i++,o+=1):r++}),{j:a,v:n,d:r,n:i,pts:o,gf:f,ga:u}}function N(e,t){return e.teams.map(s=>({id:s,...Fe(s,e.name,t)})).sort((s,a)=>a.pts-s.pts||a.gf-a.ga-(s.gf-s.ga)||a.gf-s.gf)}function we(e){const t=k.map(a=>{var r,i;const n=N(a,e);return{team:(r=n[0])==null?void 0:r.id,pool:a.name,color:a.color,pts:((i=n[0])==null?void 0:i.pts)??0}}),s=k.filter(a=>a.teams.length>=4).map(a=>{var r,i,o,f;const n=N(a,e);return{team:(r=n[1])==null?void 0:r.id,pool:a.name,color:a.color,pts:((i=n[1])==null?void 0:i.pts)??0,gf:((o=n[1])==null?void 0:o.gf)??0,ga:((f=n[1])==null?void 0:f.ga)??0,isWild:!0}}).sort((a,n)=>n.pts-a.pts||n.gf-n.ga-(a.gf-a.ga)||n.gf-a.gf)[0];return[...t,s]}function Oe(e){var r;const t=we(e),s=new Map(t.filter(i=>i==null?void 0:i.team).map(i=>[i.team,i])),a={},n={quarterfinals:B(P.quarterfinals,t,s,a),semifinals:B(P.semifinals,t,s,a),finals:B(P.finals,t,s,a)};return{qualifiers:t,rounds:n,champion:((r=n.finals[0])==null?void 0:r.winner)??null}}function B(e,t,s,a){return e.map(n=>{const r=n.sides.map(u=>ke(u,t,a)),i=E(n.id),o=Ee(r,i,s),f={id:n.id,label:n.label,sides:r,score:i,ready:r.every(u=>u==null?void 0:u.team),...o};return a[n.id]=f,f})}function ke(e,t,s){var a,n;return e.qualifier!=null?t[e.qualifier]??null:e.winnerOf?((a=s[e.winnerOf])==null?void 0:a.winner)??null:e.loserOf?((n=s[e.loserOf])==null?void 0:n.loser)??null:null}function Ee(e,t,s){const[a,n]=e;if(!(a!=null&&a.team)||!(n!=null&&n.team)||t.s1==null||t.s2==null||t.s1===t.s2)return{winner:null,loser:null,isTie:t.s1!=null&&t.s1===t.s2};const r=t.s1>t.s2?a.team:n.team,i=r===a.team?n.team:a.team;return{winner:s.get(r)??{team:r},loser:s.get(i)??{team:i},isTie:!1}}function Le(e){const t=j(),s=n=>["r1","r2","r3","rn"][Math.min(n,3)],a=n=>{const i=N(n,t).map((o,f)=>`
      <tr class="${f===0?"q":""}">
        <td><span class="rnk ${s(f)}">${f+1}</span></td>
        <td><span class="duo-name">${w(o.id)}</span></td>
        <td>${o.j}</td>
        <td>${o.v}</td>
        <td>${o.d}</td>
        <td><span class="pts-badge">${o.pts}</span></td>
      </tr>`).join("");return`
      <div class="pool-card">
        <div class="pool-hdr" style="background:${n.color}">
          <h3>${n.name}</h3>
          <span class="badge">${n.teams.length} duos</span>
        </div>
        <table class="stand-table">
          <thead><tr><th>#</th><th>Duo</th><th>J</th><th>V</th><th>D</th><th>Pts</th></tr></thead>
          <tbody>${i}</tbody>
        </table>
      </div>`};e.innerHTML=`
    <div class="tourney-meta">${te.length} duos · ${k.length} poules · ${t.length} matchs · 2 terrains · 6h</div>
    <div class="banner info">
      ℹ️ <div>
        <strong>Format :</strong> 7 poules → top 1 de chaque poule + meilleur 2ème = <strong>8 qualifiés</strong>.
        Ligne <span class="q-sample">orange</span> = qualifié provisoire.
      </div>
    </div>
    <div class="pools-grid">${k.map(a).join("")}</div>`}function A(e){return e.replace(/\D+/g,"").slice(0,2)}function J(e){const t=be*60+e*se,s=Math.floor(t/60),a=t%60;return`${String(s).padStart(2,"0")}:${String(a).padStart(2,"0")}`}function Me(e){const t=g(),s=j(),a=$e(s),n=a.length*se,r=Math.floor(n/60),i=n%60,o=(c,d)=>{if(!c)return`<div class="empty-slot"><span class="m-time">${J(d)}</span><span>—</span></div>`;const l=E(c.id);return`
      <div class="match-row" data-mid="${c.id}">
        <span class="m-time">${J(d)}</span>
        <div class="m-body">
          <div class="m-teams">${w(c.t1)} <span class="vs">vs</span> ${w(c.t2)}</div>
          <span class="m-pool-tag" style="background:${c.color}">${c.pool}</span>
        </div>
        <div class="m-score">
          <input class="sc-input" type="text" inputmode="numeric" pattern="[0-9]*" maxlength="2"
            value="${l.s1??""}" placeholder="—"
            data-mid="${c.id}" data-side="s1" ${t?"disabled":""}>
          <span class="sc-sep">:</span>
          <input class="sc-input" type="text" inputmode="numeric" pattern="[0-9]*" maxlength="2"
            value="${l.s2??""}" placeholder="—"
            data-mid="${c.id}" data-side="s2" ${t?"disabled":""}>
        </div>
      </div>`};let f="",u="";a.forEach((c,d)=>{f+=o(c[0]||null,d),u+=o(c[1]||null,d)}),e.innerHTML=`
    <div class="banner">
      ⚠️ <strong>${s.length} matchs · ${a.length} créneaux · ~${r}h${i>0?i:""}.</strong>
      Si ça dépasse 6h : réduire les matchs à <strong>12-13 min</strong> (transition incluse).
    </div>
    <div class="planning-header">
      <span class="section-title">Planning</span>
      <span class="planning-meta">Début 10h00 · matchs de 15 min</span>
    </div>
    <div class="courts-grid">
      <div class="court-card">
        <div class="court-hdr c1-hdr">🎾 Terrain 1</div>
        ${f}
      </div>
      <div class="court-card">
        <div class="court-hdr c2-hdr">🎾 Terrain 2</div>
        ${u}
      </div>
    </div>`,e.dataset.scoreBound!=="true"&&(e.addEventListener("input",c=>{if(g())return;const d=c.target;if(!d.dataset.mid)return;const l=A(d.value);d.value!==l&&(d.value=l),F(Number(d.dataset.mid),d.dataset.side,l,{notify:!1})}),e.addEventListener("change",c=>{if(g())return;const d=c.target;if(!d.dataset.mid)return;const l=A(d.value);d.value!==l&&(d.value=l),F(Number(d.dataset.mid),d.dataset.side,l)}),e.addEventListener("focusout",c=>{if(g())return;const d=c.target;if(!d.dataset.mid)return;const l=A(d.value);d.value!==l&&(d.value=l),F(Number(d.dataset.mid),d.dataset.side,l)}),e.dataset.scoreBound="true")}const Pe=[["QF1","SF1"],["QF2","SF1"],["QF3","SF2"],["QF4","SF2"],["SF1","F"],["SF2","F"],["SF1","TP"],["SF2","TP"],["F","CHAMPION"]];function C(e){return e.replace(/\D+/g,"").slice(0,2)}const Be=e=>e!=null&&e.team?`<span class="m-pool-tag" style="background:${e.color??"#888"}">${e.pool??"Phase finale"}${e.isWild?" ⭐":""}</span>`:'<span class="b-team-meta">À déterminer</span>',K=(e,t,s,a)=>{if(!(e!=null&&e.team))return'<div class="b-team b-team--tbd"><span>À déterminer</span></div>';const n=E(t);return`
    <div class="b-team">
      <div class="b-team-main">
        ${Be(e)}
        <span>${w(e.team)}</span>
      </div>
      <div class="b-score">
        <input class="b-score-input" type="text" inputmode="numeric" pattern="[0-9]*" maxlength="2"
          value="${n[s]??""}" placeholder="—"
          data-mid="${t}" data-side="${s}" ${a?"disabled":""}>
      </div>
    </div>`};function Ae(e){const t=g(),s=j(),{qualifiers:a,rounds:n,champion:r}=Oe(s),[i,o,f,u,c,d,l,v]=a,M=a.map((p,m)=>`
    <div class="qual-card" style="border-color:${(p==null?void 0:p.color)||"#aaa"}">
      <div class="qual-pool" style="color:${(p==null?void 0:p.color)||"#aaa"}">
        ${(p==null?void 0:p.pool)||"—"}${p!=null&&p.isWild?" ⭐ Wildcard":""}
      </div>
      <div class="qual-name">${p!=null&&p.team?w(p.team):"—"}</div>
      <div class="qual-meta">QF${m+1} · ${(p==null?void 0:p.pts)??0} pts</div>
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
                ${$(n.quarterfinals[0],`${(i==null?void 0:i.pool)??"—"} vs ${(v==null?void 0:v.pool)??"—"}`,t)}
                ${$(n.quarterfinals[1],`${(o==null?void 0:o.pool)??"—"} vs ${(l==null?void 0:l.pool)??"—"}`,t)}
                ${$(n.quarterfinals[2],`${(f==null?void 0:f.pool)??"—"} vs ${(d==null?void 0:d.pool)??"—"}`,t)}
                ${$(n.quarterfinals[3],`${(u==null?void 0:u.pool)??"—"} vs ${(c==null?void 0:c.pool)??"—"}`,t)}
              </div>
            </div>

            <div class="b-round b-round--semis">
              <div class="b-round-title">Demi-finales</div>
              <div class="b-round-body">
                ${$(n.semifinals[0],"Vainqueurs QF1/QF2",t)}
                ${$(n.semifinals[1],"Vainqueurs QF3/QF4",t)}
              </div>
            </div>

            <div class="b-round b-round--finals">
              <div class="b-round-title">Finale</div>
              <div class="b-round-body">
                ${$(n.finals[0],"Vainqueurs SF",t)}
                <div class="b-label-3rd">3ème place</div>
                ${$(n.finals[1],"Perdants SF",t)}
              </div>
            </div>

            <div class="b-round b-round--champion">
              <div class="b-round-title">Champion</div>
              <div class="b-round-body">
                <div class="trophy-box" data-node-id="CHAMPION">
                  <div class="trophy-icon">🏆</div>
                  <div class="trophy-name">GO OUEST 2026</div>
                  <div class="trophy-sub">${r!=null&&r.team?w(r.team):"À déterminer"}</div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>

    <div class="section-card" style="margin-top:1.25rem">
      <div class="section-title" style="margin-bottom:1rem">Qualifiés provisoires</div>
      <div class="qual-grid">${M}</div>
    </div>`,Ce(e),I(e),e.dataset.scoreBound!=="true"&&(e.addEventListener("input",p=>{if(g())return;const m=p.target;if(!m.dataset.mid)return;const h=C(m.value);m.value!==h&&(m.value=h),F(m.dataset.mid,m.dataset.side,h,{notify:!1})}),e.addEventListener("change",p=>{if(g())return;const m=p.target;if(!m.dataset.mid)return;const h=C(m.value);m.value!==h&&(m.value=h),F(m.dataset.mid,m.dataset.side,h)}),e.addEventListener("focusout",p=>{if(g())return;const m=p.target;if(!m.dataset.mid)return;const h=C(m.value);m.value!==h&&(m.value=h),F(m.dataset.mid,m.dataset.side,h)}),e.dataset.scoreBound="true")}function Ce(e){e._bracketResizeObserver||(e._bracketResizeObserver=new ResizeObserver(()=>I(e)));const t=e.querySelector(".bracket-stage");e._observedBracketStage&&e._observedBracketStage!==t&&e._bracketResizeObserver.unobserve(e._observedBracketStage),t&&e._observedBracketStage!==t&&(e._bracketResizeObserver.observe(t),e._observedBracketStage=t),e._bracketWindowBound||(e._bracketWindowBound=!0,window.addEventListener("resize",()=>I(e)))}function I(e){e._bracketRaf&&cancelAnimationFrame(e._bracketRaf),e._bracketRaf=requestAnimationFrame(()=>{e._bracketRaf=null,Qe(e)})}function Qe(e){const t=e.querySelector(".bracket-stage");if(!t)return;const s={quarters:t.querySelector(".b-round--quarters .b-round-body"),semis:t.querySelector(".b-round--semis .b-round-body"),finals:t.querySelector(".b-round--finals .b-round-body"),champion:t.querySelector(".b-round--champion .b-round-body")},a={QF1:t.querySelector('[data-match-id="QF1"]'),QF2:t.querySelector('[data-match-id="QF2"]'),QF3:t.querySelector('[data-match-id="QF3"]'),QF4:t.querySelector('[data-match-id="QF4"]'),SF1:t.querySelector('[data-match-id="SF1"]'),SF2:t.querySelector('[data-match-id="SF2"]'),F:t.querySelector('[data-match-id="F"]'),TP:t.querySelector('[data-match-id="TP"]'),CHAMPION:t.querySelector('[data-node-id="CHAMPION"]')};if(Object.values(s).some(p=>!p)||Object.values(a).some(p=>!p))return;const n=t.querySelector(".b-label-3rd");if(!n)return;const r=a.QF1.getBoundingClientRect().height,i=a.CHAMPION.getBoundingClientRect().height,o=n.getBoundingClientRect().height,f=16,u=24,c=28,d=10,l={QF1:0,QF2:r+f};l.QF3=l.QF2+r+u,l.QF4=l.QF3+r+f,l.SF1=Q(l.QF1+r/2,l.QF2+r/2)-r/2,l.SF2=Q(l.QF3+r/2,l.QF4+r/2)-r/2,l.F=Q(l.SF1+r/2,l.SF2+r/2)-r/2;const v=l.F+r+c;l.TP=v+o+d,l.CHAMPION=l.F+(r-i)/2;const M=Math.max(l.QF4+r,l.SF2+r,l.TP+r,l.CHAMPION+i);Object.values(s).forEach(p=>{p.style.height=`${M}px`}),["QF1","QF2","QF3","QF4","SF1","SF2","F","TP"].forEach(p=>{const m=a[p];m.style.top=`${l[p]}px`}),n.style.top=`${v}px`,a.CHAMPION.style.top=`${l.CHAMPION}px`,xe(t)}function Q(e,t){return(e+t)/2}function xe(e){const t=e.querySelector(".bracket-svg");if(!t)return;const s=e.getBoundingClientRect(),a=Math.ceil(s.width),n=Math.ceil(s.height);t.setAttribute("viewBox",`0 0 ${a} ${n}`),t.setAttribute("width",a),t.setAttribute("height",n),t.innerHTML=Pe.map(([r,i])=>{const o=G(e,r),f=G(e,i);if(!o||!f)return"";const u=V(o,"right",s),c=V(f,"left",s),d=u.x+(c.x-u.x)/2;return`<path d="M ${u.x} ${u.y} L ${d} ${u.y} L ${d} ${c.y} L ${c.x} ${c.y}" />`}).join("")}function G(e,t){return t==="CHAMPION"?e.querySelector('[data-node-id="CHAMPION"]'):e.querySelector(`[data-match-id="${t}"] .b-match`)}function V(e,t,s){const a=e.getBoundingClientRect();return{x:Math.round((t==="left"?a.left:a.right)-s.left),y:Math.round(a.top+a.height/2-s.top)}}function $(e,t,s){return`
    <div class="b-match-wrap" data-match-id="${e.id}">
      <div class="b-match">
        <div class="b-match-head">
          <span>${e.label}</span>
          ${e.isTie?'<span class="b-error">Pas de match nul</span>':`<span class="b-side-label">${t}</span>`}
        </div>
        ${K(e.sides[0],e.id,"s1",!e.ready||s)}
        ${K(e.sides[1],e.id,"s2",!e.ready||s)}
      </div>
    </div>`}const q={poules:()=>Le(document.getElementById("poules")),planning:()=>Me(document.getElementById("planning")),finale:()=>Ae(document.getElementById("finale"))};let ne="poules",x=null,b=null;function Te(e){document.querySelectorAll(".tab-content").forEach(t=>t.classList.remove("active")),document.querySelectorAll(".tab-btn").forEach(t=>t.classList.remove("active")),document.getElementById(e).classList.add("active"),document.querySelector(`[data-tab="${e}"]`).classList.add("active"),ne=e,q[e]()}document.querySelectorAll(".tab-btn").forEach(e=>{e.addEventListener("click",()=>Te(e.dataset.tab))});Re();Ne();fe(()=>{oe(),ie(),q[ne](),ae()});oe();ie();q.poules();ae();function Ne(){const e=document.getElementById("backup-export"),t=document.getElementById("backup-share"),s=document.getElementById("backup-import-trigger"),a=document.getElementById("backup-import-input"),n=document.getElementById("backup-reset");e.addEventListener("click",()=>{const r=new Blob([JSON.stringify(U(),null,2)],{type:"application/json"}),i=URL.createObjectURL(r),o=document.createElement("a");o.href=i,o.download=`go-ouest-2026-backup-${Ie()}.json`,document.body.append(o),o.click(),o.remove(),URL.revokeObjectURL(i),y("Backup JSON exporte.","success")}),t.addEventListener("click",async()=>{const r=_e(U());try{await navigator.clipboard.writeText(r),y("Lien de partage copie.","success")}catch{window.prompt("Copie ce lien de partage :",r),y("Lien de partage genere.","success")}}),s.addEventListener("click",()=>a.click()),a.addEventListener("change",async r=>{var f;const i=(f=r.target.files)==null?void 0:f[0];if(r.target.value="",!(!i||!window.confirm("Importer ce backup remplacera les scores actuels sur cet appareil. Continuer ?")))try{const u=await i.text();Y(u),y("Backup importe avec succes.","success")}catch(u){y(u.message||"Import impossible.","error")}}),n.addEventListener("click",()=>{const r=re()>0;window.confirm(r?"Reinitialiser tous les scores locaux ? Pense a exporter un backup avant de confirmer.":"Reinitialiser les scores locaux ?")&&(ue(),y("Scores reinitialises.","success"))})}function ae(){const e=document.getElementById("backup-meta");if(!e)return;if(g()){e.textContent="Mode partage lecture seule actif sur cet appareil";return}const t=re(),s=Object.keys(W().scores).length;e.textContent=t>0?`${t} match${t>1?"s":""} saisi${t>1?"s":""} · ${s} entree${s>1?"s":""} sauvegardee${s>1?"s":""} localement`:"Aucun score saisi pour l’instant · sauvegarde locale active"}function y(e,t){const s=document.getElementById("backup-status");s&&(s.textContent=e,s.dataset.kind=t,x&&clearTimeout(x),x=window.setTimeout(()=>{s.textContent="",s.dataset.kind=""},3500))}function re(){return Object.values(W().scores).filter(e=>(e==null?void 0:e.s1)!=null&&(e==null?void 0:e.s2)!=null).length}function Ie(){const e=new Date,t=s=>String(s).padStart(2,"0");return[e.getFullYear(),t(e.getMonth()+1),t(e.getDate()),"-",t(e.getHours()),t(e.getMinutes()),t(e.getSeconds())].join("")}function Re(){const e=window.location.hash.startsWith("#")?window.location.hash.slice(1):"";if(!e)return;const s=new URLSearchParams(e).get("share");if(s)try{b=je(s),pe(b)}catch{b=null,R(),y("Lien de partage invalide.","error")}}function ie(){var s,a;const e=document.getElementById("share-panel");if(!e)return;if(!g()||!b){e.hidden=!0,e.innerHTML="";return}const t=b.exportedAt?new Date(b.exportedAt).toLocaleString("fr-FR"):"date inconnue";e.hidden=!1,e.innerHTML=`
    <div class="share-panel__copy">
      <div class="share-panel__title">Lien partage lecture seule</div>
      <div class="share-panel__meta">Snapshot charge depuis un autre appareil · exporte le ${t}</div>
    </div>
    <div class="share-panel__actions">
      <button id="share-import-local" class="backup-btn backup-btn--primary" type="button">Copier sur cet appareil</button>
      <button id="share-exit" class="backup-btn" type="button">Quitter le partage</button>
    </div>`,(s=e.querySelector("#share-import-local"))==null||s.addEventListener("click",()=>{const n=b;b=null,R(),D(),Y(n),y("Etat partage importe localement.","success")}),(a=e.querySelector("#share-exit"))==null||a.addEventListener("click",()=>{b=null,R(),D(),y("Mode partage ferme.","success")})}function oe(){var t,s;const e=g();document.body.dataset.readonly=e?"true":"false",(t=document.getElementById("backup-import-trigger"))==null||t.toggleAttribute("disabled",e),(s=document.getElementById("backup-reset"))==null||s.toggleAttribute("disabled",e)}function _e(e){const t=new URL(window.location.href);return t.hash=`share=${He(e)}`,t.toString()}function R(){const e=new URL(window.location.href);e.hash="",window.history.replaceState({},"",e)}function He(e){const t=JSON.stringify(e),s=new TextEncoder().encode(t);let a="";return s.forEach(n=>{a+=String.fromCharCode(n)}),btoa(a).replace(/\+/g,"-").replace(/\//g,"_").replace(/=+$/g,"")}function je(e){const t=e.replace(/-/g,"+").replace(/_/g,"/"),s=t+"=".repeat((4-t.length%4)%4),a=atob(s),n=Uint8Array.from(a,r=>r.charCodeAt(0));return JSON.parse(new TextDecoder().decode(n))}
