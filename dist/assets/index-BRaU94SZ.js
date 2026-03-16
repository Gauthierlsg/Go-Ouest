(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))a(s);new MutationObserver(s=>{for(const i of s)if(i.type==="childList")for(const o of i.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&a(o)}).observe(document,{childList:!0,subtree:!0});function n(s){const i={};return s.integrity&&(i.integrity=s.integrity),s.referrerPolicy&&(i.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?i.credentials="include":s.crossOrigin==="anonymous"?i.credentials="omit":i.credentials="same-origin",i}function a(s){if(s.ep)return;s.ep=!0;const i=n(s);fetch(s.href,i)}})();const ne="go-ouest-2026",We=["go-ouest-2025"],Ye={source:"booting",admin:!1,readOnly:!0,remote:!1,authConfigured:!0,lastRemoteUpdate:null};let g=tt(),I={...Ye},ae=null;const q=[];function Xe(){return g}function R(e){return g.scores[String(e)]||{}}function P(e){return(e==null?void 0:e.s1)!=null&&(e==null?void 0:e.s2)!=null&&Number(e.s1)===Number(e.s2)}function ce(){return Object.values(g.scores).filter(e=>P(e)).length}function Ze(){return C(U(),{persist:!0,notify:!0}),g}function C(e,t={}){const{notify:n=!0,persist:a=!0}=t,s=xe(e),i=!nt(g,s);return g=s,a&&K(),n&&i&&V(),{changed:i,state:g}}function b(){return{...I}}function w(){return I.readOnly}function S(e,t={}){const{forceNotify:n=!1}=t,a={...I,...e},s=!at(I,a);return I=a,(s||n)&&V(),I}function ge(e){ae=e||null}function _e(e,t,n){return w()||(Ne(g,e,t,n),K()),g}async function Re(e,t,n){if(w())return g;const a=st(g);if(Ne(g,e,t,n),K(),V(),P(R(e)))return he(new Error("Match nul interdit : saisis le point decisif pour departager le match.")),g;if(!ae)return g;try{const s=await ae({type:"setScore",matchId:String(e),side:t,value:ue(n)});return s!=null&&s.state&&C(s.state,{persist:!0,notify:!0}),g}catch(s){throw g=a,K(),V(),he(s),s}}function et(e){return q.push(e),()=>{const t=q.indexOf(e);t>=0&&q.splice(t,1)}}function tt(){const e=localStorage.getItem(ne);if(e)return ve(e);for(const t of We){const n=localStorage.getItem(t);if(!n)continue;const a=ve(n);return localStorage.setItem(ne,JSON.stringify(a)),a}return U()}function U(){return{scores:{}}}function ve(e){try{return xe(JSON.parse(e))}catch{return U()}}function xe(e){const t=e==null?void 0:e.scores;if(!t||typeof t!="object"||Array.isArray(t))return U();const n={};return Object.entries(t).forEach(([a,s])=>{if(!s||typeof s!="object"||Array.isArray(s))return;const i={};["s1","s2"].forEach(o=>{const d=ue(s[o]);d!==void 0&&(i[o]=d)}),!(i.s1==null&&i.s2==null)&&(n[String(a)]=i)}),{scores:n}}function Ne(e,t,n,a){if(n!=="s1"&&n!=="s2")return;const s=ue(a);if(s===void 0)return;const i=String(t),o=e.scores[i]?{...e.scores[i]}:{};if(o[n]=s,o.s1==null&&o.s2==null){delete e.scores[i];return}e.scores[i]=o}function ue(e){if(e===""||e==null)return null;const t=Number(e);if(!(!Number.isFinite(t)||t<0))return t}function nt(e,t){return JSON.stringify(e)===JSON.stringify(t)}function at(e,t){const n=Object.keys(e),a=Object.keys(t);return n.length!==a.length?!1:n.every(s=>e[s]===t[s])}function st(e){return JSON.parse(JSON.stringify(e))}function he(e){typeof window>"u"||window.dispatchEvent(new CustomEvent("go-ouest:sync-error",{detail:{error:e}}))}function K(){localStorage.setItem(ne,JSON.stringify(g))}function V(){const e=Xe(),t=b();q.forEach(n=>n(e,t))}const qe=[{id:1,p1:"Colombe",p2:"Pierre"},{id:2,p1:"Castille",p2:"Léo D."},{id:3,p1:"Eugénie",p2:"Cyprien"},{id:4,p1:"Capucine",p2:"Henri"},{id:5,p1:"Valentine",p2:"Hugues"},{id:6,p1:"Candice",p2:"Alfred"},{id:7,p1:"Charlotte",p2:"Hippolyte"},{id:8,p1:"Clarisse",p2:"Alban R."},{id:9,p1:"Marion",p2:"Karol"},{id:10,p1:"Philippine",p2:"Xavier"},{id:11,p1:"Paola A.",p2:"Grégoire"},{id:12,p1:"Marie D.",p2:"Alban"},{id:13,p1:"Louise B.",p2:"Louis S."},{id:14,p1:"Charlotte G.",p2:"Amaury"},{id:15,p1:"Iklil",p2:"Jean"},{id:16,p1:"Margaux",p2:"Donatien"},{id:17,p1:"Paula",p2:"Paul"},{id:18,p1:"Théophile",p2:"Maylis"},{id:19,p1:"Eléonore",p2:"Stan"},{id:20,p1:"Mathilde",p2:"Victor"},{id:25,p1:"Sixtine",p2:"Gaspard"},{id:26,p1:"Anne-Thaïs",p2:"Brieuc"},{id:27,p1:"Aglaé",p2:"Gauthier"}],_=[{name:"Poule A",color:"#1a5c38",teams:[1,8,15,26]},{name:"Poule B",color:"#1a4a7c",teams:[2,9,16,27]},{name:"Poule C",color:"#7c1a1a",teams:[3,10,17]},{name:"Poule D",color:"#6b21a8",teams:[4,11,18]},{name:"Poule E",color:"#92400e",teams:[5,12,19]},{name:"Poule F",color:"#0e6b5e",teams:[6,13,20]},{name:"Poule G",color:"#155e75",teams:[7,14,25]}],D=15,De=5,x=D+De,se=10,H=15,it=e=>qe.find(t=>t.id===e),M=e=>{const t=it(e);return`${t.p1} & ${t.p2}`},X={quarterfinals:[{id:"QF1",label:"QF1",sides:[{qualifier:0},{qualifier:7}]},{id:"QF2",label:"QF2",sides:[{qualifier:1},{qualifier:6}]},{id:"QF3",label:"QF3",sides:[{qualifier:2},{qualifier:5}]},{id:"QF4",label:"QF4",sides:[{qualifier:3},{qualifier:4}]}],semifinals:[{id:"SF1",label:"SF1",sides:[{winnerOf:"QF1"},{winnerOf:"QF2"}]},{id:"SF2",label:"SF2",sides:[{winnerOf:"QF3"},{winnerOf:"QF4"}]}],finals:[{id:"F",label:"Finale",sides:[{winnerOf:"SF1"},{winnerOf:"SF2"}]},{id:"TP",label:"3e place",sides:[{loserOf:"SF1"},{loserOf:"SF2"}]}]};function J(){const e=[];let t=1;return _.forEach(n=>{const a=n.teams;for(let s=0;s<a.length;s++)for(let i=s+1;i<a.length;i++)e.push({id:t++,pool:n.name,color:n.color,t1:a[s],t2:a[i]})}),e}function ot(e){const t={};e.forEach(i=>{var o;(t[o=i.pool]??(t[o]=[])).push(i)});const n=Object.values(t),a=e.length,s=[];return n.forEach((i,o)=>{const d=a/i.length,u=o*(d/n.length);i.forEach((r,l)=>s.push({m:r,pos:u+l*d}))}),s.sort((i,o)=>i.pos-o.pos),s.map(i=>i.m)}function rt(e){const t=ot(e),n=[];for(;t.length;){const a=new Set([...(n[n.length-1]||[]).flatMap(d=>[d.t1,d.t2]),...(n[n.length-2]||[]).flatMap(d=>[d.t1,d.t2])]),s=new Set((n[n.length-1]||[]).flatMap(d=>[d.t1,d.t2])),i=new Set,o=[];for(let d=0;d<3&&o.length<2;d++){const u=d===0?a:d===1?s:new Set;for(let r=0;r<t.length&&o.length<2;r++){const l=t[r];!i.has(l.t1)&&!i.has(l.t2)&&!u.has(l.t1)&&!u.has(l.t2)&&(o.push(l),i.add(l.t1),i.add(l.t2),t.splice(r--,1))}}n.push(o)}return n}function lt(e,t,n){let a=0,s=0,i=0,o=0,d=0,u=0,r=0;return n.filter(l=>l.pool===t&&(l.t1===e||l.t2===e)).forEach(l=>{const f=R(l.id);if(f.s1==null||f.s2==null||P(f))return;const c=l.t1===e?f.s1:f.s2,v=l.t1===e?f.s2:f.s1;a++,u+=c,r+=v,c>v?(s++,d+=3):i++}),{j:a,v:s,d:i,n:o,pts:d,gf:u,ga:r}}function ie(e,t){return e.teams.map(n=>{const a=lt(n,e.name,t);return{id:n,...a,gd:a.gf-a.ga}}).sort((n,a)=>a.pts-n.pts||a.gf-a.ga-(n.gf-n.ga)||a.gf-n.gf)}function He(e){const t=_.map(a=>{var i,o;const s=ie(a,e);return{team:(i=s[0])==null?void 0:i.id,pool:a.name,color:a.color,pts:((o=s[0])==null?void 0:o.pts)??0}}),n=_.filter(a=>a.teams.length>=4).map(a=>{var i,o,d,u,r;const s=ie(a,e);return{team:(i=s[1])==null?void 0:i.id,pool:a.name,color:a.color,pts:((o=s[1])==null?void 0:o.pts)??0,gf:((d=s[1])==null?void 0:d.gf)??0,ga:((u=s[1])==null?void 0:u.ga)??0,gd:((r=s[1])==null?void 0:r.gd)??0,isWild:!0}}).sort((a,s)=>s.gd-a.gd)[0];return[...t,n]}function je(e){var i;const t=He(e),n=new Map(t.filter(o=>o==null?void 0:o.team).map(o=>[o.team,o])),a={},s={quarterfinals:Z(X.quarterfinals,t,n,a),semifinals:Z(X.semifinals,t,n,a),finals:Z(X.finals,t,n,a)};return{qualifiers:t,rounds:s,champion:((i=s.finals[0])==null?void 0:i.winner)??null}}function Z(e,t,n,a){return e.map(s=>{const i=s.sides.map(r=>dt(r,t,a)),o=R(s.id),d=ct(i,o,n),u={id:s.id,label:s.label,sides:i,score:o,ready:i.every(r=>r==null?void 0:r.team),...d};return a[s.id]=u,u})}function dt(e,t,n){var a,s;return e.qualifier!=null?t[e.qualifier]??null:e.winnerOf?((a=n[e.winnerOf])==null?void 0:a.winner)??null:e.loserOf?((s=n[e.loserOf])==null?void 0:s.loser)??null:null}function ct(e,t,n){const[a,s]=e;if(!(a!=null&&a.team)||!(s!=null&&s.team)||t.s1==null||t.s2==null||P(t))return{winner:null,loser:null,isTie:P(t)};const i=t.s1>t.s2?a.team:s.team,o=i===a.team?s.team:a.team;return{winner:n.get(i)??{team:i},loser:n.get(o)??{team:o},isTie:!1}}const ut=["QF1","QF2","QF3","QF4","SF1","SF2","F","TP"];function mt(){const e={};return J().forEach(t=>{e[String(t.id)]=ft()}),ut.forEach(t=>{e[t]=pt()}),{scores:e}}function ft(){return Ge(4,9)}function pt(){return Ge(4,9)}function Ge(e,t){const n=be(e,t),a=be(0,Math.max(0,n-1));return Math.random()<.5?{s1:n,s2:a}:{s1:a,s2:n}}function be(e,t){return Math.floor(Math.random()*(t-e+1))+e}function gt(e){var u;const t=J(),n=ce(),a=n>1?"scores invalides":"score invalide",i=(u=He(t).find(r=>r==null?void 0:r.isWild))==null?void 0:u.team,o=r=>["r1","r2","r3","rn"][Math.min(r,3)],d=r=>{const f=ie(r,t).map((c,v)=>`
      <tr class="${v===0||c.id===i?"q":""}">
        <td><span class="rnk ${o(v)}">${v+1}</span></td>
        <td><span class="duo-name">${M(c.id)}${c.id===i?" ⭐":""}</span></td>
        <td>${c.j}</td>
        <td>${c.v}</td>
        <td>${c.d}</td>
        <td>${c.gd>0?`+${c.gd}`:c.gd}</td>
        <td><span class="pts-badge">${c.pts}</span></td>
      </tr>`).join("");return`
      <div class="pool-card">
        <div class="pool-hdr" style="background:${r.color}">
          <h3>${r.name}</h3>
          <span class="badge">${r.teams.length} duos</span>
        </div>
        <table class="stand-table">
          <thead><tr><th>#</th><th>Duo</th><th>J</th><th>V</th><th>D</th><th>GA</th><th>Pts</th></tr></thead>
          <tbody>${f}</tbody>
        </table>
      </div>`};e.innerHTML=`
    <div class="tourney-meta">${qe.length} duos · ${_.length} poules · ${t.length} matchs · 2 terrains · 6h</div>
    ${n?`
      <div class="banner error">
        ⚠️ <div><strong>${n} ${a}.</strong> Les matchs nuls ne comptent pas dans le classement. Saisis le point decisif pour valider ces rencontres.</div>
      </div>
    `:""}
    <div class="banner info">
      ℹ️ <div>
        <strong>Format :</strong> 7 poules → top 1 de chaque poule + meilleur 2ème entre <strong>Poule A</strong> et <strong>Poule B</strong> au <strong>goal avérage</strong> = <strong>8 qualifiés</strong>.
        Ligne <span class="q-sample">orange</span> = qualifié provisoire.
      </div>
    </div>
    <div class="pools-grid">${_.map(d).join("")}</div>`}const vt=[{id:"QF1",round:"Quart de finale",tag:"QF1",color:"#a34710",fallbacks:["1er Poule A","Meilleur 2e"]},{id:"QF2",round:"Quart de finale",tag:"QF2",color:"#a34710",fallbacks:["1er Poule B","1er Poule G"]},{id:"QF3",round:"Quart de finale",tag:"QF3",color:"#a34710",fallbacks:["1er Poule C","1er Poule F"]},{id:"QF4",round:"Quart de finale",tag:"QF4",color:"#a34710",fallbacks:["1er Poule D","1er Poule E"]},{id:"SF1",round:"Demi-finale",tag:"SF1",color:"#7c3aed",fallbacks:["Vainqueur QF1","Vainqueur QF2"]},{id:"SF2",round:"Demi-finale",tag:"SF2",color:"#7c3aed",fallbacks:["Vainqueur QF3","Vainqueur QF4"]},{id:"TP",round:"3e place",tag:"3e place",color:"#0f766e",fallbacks:["Perdant SF1","Perdant SF2"]},{id:"F",round:"Finale",tag:"Finale",color:"#c2450a",fallbacks:["Vainqueur SF1","Vainqueur SF2"]}];function ye(e){return e.replace(/\D+/g,"").slice(0,2)}function O(e){const t=Math.floor(e/60),n=e%60;return`${String(t).padStart(2,"0")}:${String(n).padStart(2,"0")}`}function ht(e){const t=Math.floor(e/60),n=e%60;return`${t}h${n>0?String(n).padStart(2,"0"):""}`}function bt(e){const t=w(),n=J(),a=rt(n),s=yt(n,a),i=s.endMinutes-se*60,o=ce(),d=o>1?"scores invalides":"score invalide";e.innerHTML=`
    <div class="banner">
      ⚠️ <strong>${n.length} matchs de poule + 8 matchs de phase finale · pause ${H} min · fin estimée ${O(s.endMinutes)} (~${ht(i)}).</strong>
      Si ça dépasse : réduire les matchs à <strong>${D-2}-${D-1} min</strong> et garder la transition fluide.
    </div>
    ${o?`
      <div class="banner error">
        ⚠️ <div><strong>${o} ${d}.</strong> Les matchs nuls sont interdits : saisis le point decisif pour valider ces matchs.</div>
      </div>
    `:""}
    <div class="planning-header">
      <span class="section-title">Planning</span>
      <span class="planning-meta">Début ${String(se).padStart(2,"0")}h00 · matchs ${D} min + ${De} min transition · pause ${H} min avant les quarts</span>
    </div>
    <section class="planning-section">
      <div class="planning-section__header">
        <div>
          <div class="planning-section__eyebrow">Bloc 1</div>
          <h3 class="planning-section__title">Phase de poules</h3>
        </div>
        <div class="planning-section__meta">${n.length} matchs · fin estimée ${O(s.poolEndMinutes)}</div>
      </div>
      ${we(s.poolCourts,t)}
    </section>

    <div class="planning-separator" role="separator" aria-label="Pause avant la phase finale">
      <div class="planning-separator__line"></div>
      <div class="planning-separator__badge">
        <span class="planning-separator__eyebrow">Transition</span>
        <strong>${O(s.poolEndMinutes)} · Pause ${H} min</strong>
        <span>Calcul des qualifiés puis lancement de la phase finale à ${O(s.knockoutStart)}</span>
      </div>
      <div class="planning-separator__line"></div>
    </div>

    <section class="planning-section planning-section--knockout">
      <div class="planning-section__header">
        <div>
          <div class="planning-section__eyebrow">Bloc 2</div>
          <h3 class="planning-section__title">Phase finale</h3>
        </div>
        <div class="planning-section__meta">8 matchs à élimination directe · fin estimée ${O(s.endMinutes)}</div>
      </div>
      ${we(s.knockoutCourts,t)}
    </section>`,e.dataset.scoreBound!=="true"&&(e.addEventListener("input",u=>{if(w())return;const r=u.target;if(!r.dataset.mid)return;const l=ye(r.value);r.value!==l&&(r.value=l),_e(r.dataset.mid,r.dataset.side,l)}),e.addEventListener("focusout",u=>{if(w())return;const r=u.target;if(!r.dataset.mid)return;const l=ye(r.value);r.value!==l&&(r.value=l),Re(r.dataset.mid,r.dataset.side,l)}),e.addEventListener("keydown",u=>{if(u.key!=="Enter")return;const r=u.target;r.dataset.mid&&r.blur()}),e.dataset.scoreBound="true")}function yt(e,t){const n=[[],[]],a=se*60;t.forEach((l,f)=>{const c=a+f*x;n[0].push(l[0]?Se(l[0],c):$e(c)),n[1].push(l[1]?Se(l[1],c):$e(c))});const s=a+t.length*x,i=s+H,{rounds:o}=je(e),d=Object.fromEntries([...o.quarterfinals,...o.semifinals,...o.finals].map(l=>[l.id,l])),u=[[],[]],r=[["QF1","QF2"],["QF3","QF4"],["SF1","SF2"],["TP","F"]];return r.forEach((l,f)=>{const c=i+f*x;u[0].push(Fe(d[l[0]],c,l[0])),u[1].push(Fe(d[l[1]],c,l[1]))}),{poolCourts:n,knockoutCourts:u,poolEndMinutes:s,knockoutStart:i,endMinutes:i+r.length*x}}function Se(e,t){return{type:"match",matchId:e.id,startMinutes:t,leftLabel:M(e.t1),rightLabel:M(e.t2),tag:e.pool,tagColor:e.color,detail:"Phase de poules",editable:!0,kind:"pool"}}function Fe(e,t,n){const a=vt.find(s=>s.id===n);return{type:"match",matchId:e.id,startMinutes:t,leftLabel:Ee(e.sides[0],a.fallbacks[0]),rightLabel:Ee(e.sides[1],a.fallbacks[1]),tag:a.tag,tagColor:a.color,detail:a.round,editable:e.ready,kind:"knockout"}}function $e(e){return{type:"empty",startMinutes:e}}function Ee(e,t){return e!=null&&e.team?M(e.team):t}function we(e,t){return`
    <div class="courts-grid">
      <div class="court-card">
        <div class="court-hdr c1-hdr">🎾 Terrain 1</div>
        ${e[0].map(n=>ke(n,t)).join("")}
      </div>
      <div class="court-card">
        <div class="court-hdr c2-hdr">🎾 Terrain 2</div>
        ${e[1].map(n=>ke(n,t)).join("")}
      </div>
    </div>`}function ke(e,t){if(e.type==="empty")return`
      <div class="empty-slot">
        <span class="m-time">${O(e.startMinutes)}</span>
        <span>—</span>
      </div>`;const n=R(e.matchId),a=P(n),s=t||!e.editable;return`
    <div class="match-row ${e.kind==="knockout"?"match-row--knockout":""} ${a?"match-row--invalid":""}" data-mid="${e.matchId}">
      <span class="m-time">${O(e.startMinutes)}</span>
      <div class="m-body">
        <div class="m-teams">${e.leftLabel} <span class="vs">vs</span> ${e.rightLabel}</div>
        <div class="m-subline">
          <span class="m-pool-tag" style="background:${e.tagColor}">${e.tag}</span>
          <span class="m-stage-copy ${a?"m-stage-copy--error":""}">${a?"Score incorrect : pas de match nul, ajouter le point decisif":e.detail}</span>
        </div>
      </div>
      <div class="m-score">
        <input class="sc-input ${a?"sc-input--invalid":""}" type="text" inputmode="numeric" pattern="[0-9]*" maxlength="2"
          value="${n.s1??""}" placeholder="—"
          data-mid="${e.matchId}" data-side="s1" ${s?"disabled":""}>
        <span class="sc-sep">:</span>
        <input class="sc-input ${a?"sc-input--invalid":""}" type="text" inputmode="numeric" pattern="[0-9]*" maxlength="2"
          value="${n.s2??""}" placeholder="—"
          data-mid="${e.matchId}" data-side="s2" ${s?"disabled":""}>
      </div>
    </div>`}const St=[["QF1","SF1"],["QF2","SF1"],["QF3","SF2"],["QF4","SF2"],["SF1","F"],["SF2","F"],["SF1","TP"],["SF2","TP"],["F","CHAMPION"]];function Oe(e){return e.replace(/\D+/g,"").slice(0,2)}const Ft=e=>e!=null&&e.team?`<span class="m-pool-tag" style="background:${e.color??"#888"}">${e.pool??"Phase finale"}${e.isWild?" ⭐":""}</span>`:'<span class="b-team-meta">À déterminer</span>',Ce=(e,t,n,a,s)=>{if(!(e!=null&&e.team))return'<div class="b-team b-team--tbd"><span>À déterminer</span></div>';const i=R(t);return`
    <div class="b-team">
      <div class="b-team-main">
        ${Ft(e)}
        <span>${M(e.team)}</span>
      </div>
      <div class="b-score">
        <input class="b-score-input " type="text" inputmode="numeric" pattern="[0-9]*" maxlength="2"
          value="${i[n]??""}" placeholder="—"
          data-mid="${t}" data-side="${n}" ${a?"disabled":""}>
      </div>
    </div>`};function $t(e){const t=w(),n=J(),{qualifiers:a,rounds:s,champion:i}=je(n),[o,d,u,r,l,f,c,v]=a,T=ce(),y=T>1?"scores invalides":"score invalide",Y=a.map((m,p)=>`
    <div class="qual-card" style="border-color:${(m==null?void 0:m.color)||"#aaa"}">
      <div class="qual-pool" style="color:${(m==null?void 0:m.color)||"#aaa"}">
        ${(m==null?void 0:m.pool)||"—"}${m!=null&&m.isWild?" ⭐ Wildcard":""}
      </div>
      <div class="qual-name">${m!=null&&m.team?M(m.team):"—"}</div>
      <div class="qual-meta">QF${p+1} · ${(m==null?void 0:m.pts)??0} pts</div>
    </div>`).join("");e.innerHTML=`
    <div class="banner info">
      ℹ️ Les quarts se remplissent selon les résultats des poules.
      Saisissez ensuite les scores de phase finale ici pour faire avancer automatiquement le bracket. Les matchs nuls sont interdits.
    </div>
    ${T?`
      <div class="banner error">
        ⚠️ <div><strong>${T} ${y}.</strong> En cas d'égalité, saisis le point decisif pour valider le match.</div>
      </div>
    `:""}

    <div class="section-card">
      <div class="section-title" style="margin-bottom:1rem">Phase finale · 8 qualifiés</div>
      <div class="bracket-wrap">
        <div class="bracket-stage">
          <svg class="bracket-svg" aria-hidden="true"></svg>
          <div class="bracket">

            <div class="b-round b-round--quarters">
              <div class="b-round-title">Quarts de finale</div>
              <div class="b-round-body">
                ${$(s.quarterfinals[0],`${(o==null?void 0:o.pool)??"—"} vs ${(v==null?void 0:v.pool)??"—"}`,t)}
                ${$(s.quarterfinals[1],`${(d==null?void 0:d.pool)??"—"} vs ${(c==null?void 0:c.pool)??"—"}`,t)}
                ${$(s.quarterfinals[2],`${(u==null?void 0:u.pool)??"—"} vs ${(f==null?void 0:f.pool)??"—"}`,t)}
                ${$(s.quarterfinals[3],`${(r==null?void 0:r.pool)??"—"} vs ${(l==null?void 0:l.pool)??"—"}`,t)}
              </div>
            </div>

            <div class="b-round b-round--semis">
              <div class="b-round-title">Demi-finales</div>
              <div class="b-round-body">
                ${$(s.semifinals[0],"Vainqueurs QF1/QF2",t)}
                ${$(s.semifinals[1],"Vainqueurs QF3/QF4",t)}
              </div>
            </div>

            <div class="b-round b-round--finals">
              <div class="b-round-title">Finale</div>
              <div class="b-round-body">
                ${$(s.finals[0],"Vainqueurs SF",t)}
                <div class="b-label-3rd">3ème place</div>
                ${$(s.finals[1],"Perdants SF",t)}
              </div>
            </div>

            <div class="b-round b-round--champion">
              <div class="b-round-title">Champion</div>
              <div class="b-round-body">
                <div class="trophy-box" data-node-id="CHAMPION">
                  <div class="trophy-icon">🏆</div>
                  <div class="trophy-name">GO OUEST 2026</div>
                  <div class="trophy-sub">${i!=null&&i.team?M(i.team):"À déterminer"}</div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>

    <div class="section-card" style="margin-top:1.25rem">
      <div class="section-title" style="margin-bottom:1rem">Qualifiés provisoires</div>
      <div class="qual-grid">${Y}</div>
    </div>`,Et(e),oe(e),e.dataset.scoreBound!=="true"&&(e.addEventListener("input",m=>{if(w())return;const p=m.target;if(!p.dataset.mid)return;const k=Oe(p.value);p.value!==k&&(p.value=k),_e(p.dataset.mid,p.dataset.side,k)}),e.addEventListener("focusout",m=>{if(w())return;const p=m.target;if(!p.dataset.mid)return;const k=Oe(p.value);p.value!==k&&(p.value=k),Re(p.dataset.mid,p.dataset.side,k)}),e.addEventListener("keydown",m=>{if(m.key!=="Enter")return;const p=m.target;p.dataset.mid&&p.blur()}),e.dataset.scoreBound="true")}function Et(e){e._bracketResizeObserver||(e._bracketResizeObserver=new ResizeObserver(()=>oe(e)));const t=e.querySelector(".bracket-stage");e._observedBracketStage&&e._observedBracketStage!==t&&e._bracketResizeObserver.unobserve(e._observedBracketStage),t&&e._observedBracketStage!==t&&(e._bracketResizeObserver.observe(t),e._observedBracketStage=t),e._bracketWindowBound||(e._bracketWindowBound=!0,window.addEventListener("resize",()=>oe(e)))}function oe(e){e._bracketRaf&&cancelAnimationFrame(e._bracketRaf),e._bracketRaf=requestAnimationFrame(()=>{e._bracketRaf=null,wt(e)})}function wt(e){const t=e.querySelector(".bracket-stage");if(!t)return;const n={quarters:t.querySelector(".b-round--quarters .b-round-body"),semis:t.querySelector(".b-round--semis .b-round-body"),finals:t.querySelector(".b-round--finals .b-round-body"),champion:t.querySelector(".b-round--champion .b-round-body")},a={QF1:t.querySelector('[data-match-id="QF1"]'),QF2:t.querySelector('[data-match-id="QF2"]'),QF3:t.querySelector('[data-match-id="QF3"]'),QF4:t.querySelector('[data-match-id="QF4"]'),SF1:t.querySelector('[data-match-id="SF1"]'),SF2:t.querySelector('[data-match-id="SF2"]'),F:t.querySelector('[data-match-id="F"]'),TP:t.querySelector('[data-match-id="TP"]'),CHAMPION:t.querySelector('[data-node-id="CHAMPION"]')};if(Object.values(n).some(y=>!y)||Object.values(a).some(y=>!y))return;const s=t.querySelector(".b-label-3rd");if(!s)return;const i=a.QF1.getBoundingClientRect().height,o=a.CHAMPION.getBoundingClientRect().height,d=s.getBoundingClientRect().height,u=16,r=24,l=28,f=10,c={QF1:0,QF2:i+u};c.QF3=c.QF2+i+r,c.QF4=c.QF3+i+u,c.SF1=ee(c.QF1+i/2,c.QF2+i/2)-i/2,c.SF2=ee(c.QF3+i/2,c.QF4+i/2)-i/2,c.F=ee(c.SF1+i/2,c.SF2+i/2)-i/2;const v=c.F+i+l;c.TP=v+d+f,c.CHAMPION=c.F+(i-o)/2;const T=Math.max(c.QF4+i,c.SF2+i,c.TP+i,c.CHAMPION+o);Object.values(n).forEach(y=>{y.style.height=`${T}px`}),["QF1","QF2","QF3","QF4","SF1","SF2","F","TP"].forEach(y=>{const Y=a[y];Y.style.top=`${c[y]}px`}),s.style.top=`${v}px`,a.CHAMPION.style.top=`${c.CHAMPION}px`,kt(t)}function ee(e,t){return(e+t)/2}function kt(e){const t=e.querySelector(".bracket-svg");if(!t)return;const n=e.getBoundingClientRect(),a=Math.ceil(n.width),s=Math.ceil(n.height);t.setAttribute("viewBox",`0 0 ${a} ${s}`),t.setAttribute("width",a),t.setAttribute("height",s),t.innerHTML=St.map(([i,o])=>{const d=Be(e,i),u=Be(e,o);if(!d||!u)return"";const r=Me(d,"right",n),l=Me(u,"left",n),f=r.x+(l.x-r.x)/2;return`<path d="M ${r.x} ${r.y} L ${f} ${r.y} L ${f} ${l.y} L ${l.x} ${l.y}" />`}).join("")}function Be(e,t){return t==="CHAMPION"?e.querySelector('[data-node-id="CHAMPION"]'):e.querySelector(`[data-match-id="${t}"] .b-match`)}function Me(e,t,n){const a=e.getBoundingClientRect();return{x:Math.round((t==="left"?a.left:a.right)-n.left),y:Math.round(a.top+a.height/2-n.top)}}function $(e,t,n){return`
    <div class="b-match-wrap" data-match-id="${e.id}">
      <div class="b-match">
        <div class="b-match-head">
          <span>${e.label}</span>
          ${e.isTie?'<span class="b-error">Pas de match nul</span>':`<span class="b-side-label">${t}</span>`}
        </div>
        ${Ce(e.sides[0],e.id,"s1",!e.ready||n)}
        ${Ce(e.sides[1],e.id,"s2",!e.ready||n)}
      </div>
    </div>`}const Ot=5e3,me="/api/tournament",re="/api/admin/session",fe={poules:()=>gt(document.getElementById("poules")),planning:()=>bt(document.getElementById("planning")),finale:()=>$t(document.getElementById("finale"))};let Ke="poules",te=null,j=null,h=!1,B=!1,Ve=null,N=null,Ie=null,Le=Promise.resolve(),L=null;document.querySelectorAll(".tab-btn").forEach(e=>{e.addEventListener("click",()=>Bt(e.dataset.tab))});At();Tt();_t();Qt();window.addEventListener("go-ouest:sync-error",e=>{var n,a;const t=((a=(n=e.detail)==null?void 0:n.error)==null?void 0:a.message)||"Synchronisation impossible.";F(t,"error")});et(()=>{E(),fe[Ke]()});Ct();async function Ct(){await Mt(),E(),fe.poules()}function Bt(e){document.querySelectorAll(".tab-content").forEach(t=>t.classList.remove("active")),document.querySelectorAll(".tab-btn").forEach(t=>t.classList.remove("active")),document.getElementById(e).classList.add("active"),document.querySelector(`[data-tab="${e}"]`).classList.add("active"),Ke=e,fe[e]()}async function Mt(){const e=await Lt();await It(e)||Pt(Ve,e)}async function It(e){try{const t=await A(me);return C(t.state,{persist:!0,notify:!1}),S({source:"remote",remote:!0,admin:e.admin,readOnly:!e.admin,authConfigured:e.authConfigured,lastRemoteUpdate:t.updatedAt??null}),ge(n=>de(n)),Rt(),!0}catch(t){return Ve=t,ze(),ge(null),!1}}async function Lt(){try{const e=await A(re);return{admin:!!e.admin,authConfigured:e.configured!==!1}}catch(e){return{admin:!1,authConfigured:e.status!==503}}}function Pt(e,t){if(Ht()){S({source:"local-dev",remote:!1,admin:!0,readOnly:!1,authConfigured:!0,lastRemoteUpdate:null}),F("API Vercel indisponible ici : mode local de developpement actif.","info");return}S({source:"remote-down",remote:!1,admin:!1,readOnly:!0,authConfigured:(t==null?void 0:t.authConfigured)??!1,lastRemoteUpdate:null}),F((e==null?void 0:e.message)||"Synchronisation indisponible : la page reste en lecture seule.","error")}function At(){const e=document.getElementById("admin-access-trigger"),t=document.getElementById("admin-modal"),n=t.querySelectorAll("[data-admin-close]"),a=document.getElementById("admin-login-form"),s=document.getElementById("admin-password"),i=document.getElementById("admin-logout");e.addEventListener("click",()=>qt()),n.forEach(o=>{o.addEventListener("click",()=>Q())}),a.addEventListener("submit",async o=>{if(o.preventDefault(),!h){le(),h=!0,E();try{await A(re,{method:"POST",body:{password:s.value}}),b().remote?(S({admin:!0,readOnly:!1}),await pe({silent:!0,forceRender:!0})):S({admin:!0,readOnly:!1,source:"local-admin"}),Q(),F(b().remote?"Mode admin active sur cet appareil.":"Mode admin local actif sur cet appareil.",b().remote?"success":"warning")}catch(d){Te(d.message||"Connexion admin impossible.")}finally{h=!1,E()}}}),i.addEventListener("click",async()=>{if(!h){if(b().source==="local-dev"){Q();return}h=!0,le(),E();try{await A(re,{method:"DELETE"}),S({admin:!1,readOnly:!0}),F("Mode admin desactive sur cet appareil.","success"),Q()}catch(o){Te(o.message||"Deconnexion impossible.")}finally{h=!1,E()}}}),document.addEventListener("keydown",o=>{const d=document.getElementById("confirm-modal");if(o.key==="Escape"&&d&&!d.hidden){z(!1);return}o.key==="Escape"&&!t.hidden&&Q()})}function Tt(){const e=document.getElementById("backup-mock"),t=document.getElementById("backup-reset");[e,t].forEach(n=>{n.addEventListener("pointerdown",a=>{a.preventDefault()})}),e.addEventListener("click",async()=>{!Ae()||B||!await Qe({title:"Generer des mock data ?",copy:"Tous les scores actuels seront remplaces par des resultats aleatoires pour tester le tournoi.",submitLabel:"Generer",submitVariant:"primary"})||await Pe(async()=>{const a=mt();if(b().remote){const s=await de({type:"replaceState",state:a});s!=null&&s.state&&C(s.state,{persist:!0,notify:!0})}else C(a,{persist:!0,notify:!0});F("Mock data generee pour les tests.","success")},"Generation mock impossible.")}),t.addEventListener("click",async()=>{!Ae()||B||!await Qe({title:"Reinitialiser tous les scores ?",copy:"Tous les scores de poules et de phase finale seront effaces sur tous les appareils synchronises.",submitLabel:"Reinitialiser",submitVariant:"danger"})||await Pe(async()=>{if(b().remote){const a=await de({type:"reset"});a!=null&&a.state&&C(a.state,{persist:!0,notify:!0})}else Ze();F("Scores reinitialises.","success")},"Reinitialisation impossible.")})}function Qt(){const t=document.getElementById("confirm-modal").querySelectorAll("[data-confirm-close]"),n=document.getElementById("confirm-modal-submit");t.forEach(a=>{a.addEventListener("click",()=>z(!1))}),n.addEventListener("click",()=>z(!0))}async function Pe(e,t){B=!0,E();try{await e()}catch(n){F(n.message||t,"error")}finally{B=!1,E()}}function _t(){const e=document.getElementById("admin-toolbar");e&&(window.addEventListener("resize",G),"ResizeObserver"in window&&(Ie=new ResizeObserver(()=>{G()}),Ie.observe(e)),G())}async function pe(e={}){const{silent:t=!1,forceRender:n=!1}=e;if(b().remote&&!Dt())try{const a=await A(me),{changed:s}=C(a.state,{persist:!0,notify:!0});S({lastRemoteUpdate:a.updatedAt??null},{forceNotify:n&&!s})}catch(a){a.status===401&&S({admin:!1,readOnly:!0}),t||F(a.message||"Synchronisation impossible.","error")}}function Rt(){ze(),j=window.setInterval(()=>{document.visibilityState!=="hidden"&&pe({silent:!0})},Ot),document.addEventListener("visibilitychange",Ue)}function ze(){j&&(window.clearInterval(j),j=null),document.removeEventListener("visibilitychange",Ue)}function Ue(){document.visibilityState==="visible"&&pe({silent:!0,forceRender:!0})}function E(){const e=b(),t=document.getElementById("admin-toolbar"),n=document.getElementById("admin-access-trigger"),a=document.getElementById("sync-badge"),s=document.getElementById("backup-mock"),i=document.getElementById("backup-reset");document.body.classList.toggle("is-admin",e.admin),document.body.classList.toggle("is-public",!e.admin),t.hidden=!e.admin,t.setAttribute("aria-hidden",String(!e.admin)),t.inert=!e.admin,a.textContent=Nt(e),n.textContent=e.admin?"Admin connecte":"Connexion admin",n.disabled=h||B,s.disabled=!e.admin||B,i.disabled=!e.admin||B,e.admin||z(!1),G(),Je()}function G(){N&&window.cancelAnimationFrame(N),N=window.requestAnimationFrame(()=>{N=null,xt()})}function xt(){const e=document.getElementById("admin-toolbar"),t=document.documentElement.style;if(!e||e.hidden){t.setProperty("--admin-toolbar-offset","0px");return}const n=window.getComputedStyle(e);if(n.display==="none"||n.visibility==="hidden"){t.setProperty("--admin-toolbar-offset","0px");return}const a=Number.parseFloat(n.bottom)||0,s=Math.ceil(e.getBoundingClientRect().height+a+24);t.setProperty("--admin-toolbar-offset",`${s}px`)}function Ae(){return b().admin?!0:(F("Connexion admin requise pour cette action.","error"),!1)}function Nt(e){return e.source==="local-dev"?"Mode local":e.source==="local-admin"?"Admin local":e.admin?"Mode admin":"Lecture seule"}function Je(){const e=b(),t=document.getElementById("admin-modal"),n=document.getElementById("admin-modal-title"),a=document.getElementById("admin-modal-copy"),s=document.getElementById("admin-login-form"),i=document.getElementById("admin-logged-panel"),o=i.querySelector(".admin-logged-panel__text"),d=document.getElementById("admin-password"),u=document.getElementById("admin-login-submit"),r=document.getElementById("admin-logout"),l=jt(e);u.disabled=h||!l,r.disabled=h,e.admin?(n.textContent=e.source==="local-dev"?"Mode local de developpement":e.source==="local-admin"?"Mode admin local":"Mode admin actif",a.textContent=e.source==="local-dev"?"Cette version locale reste editable sur cet appareil meme sans API admin.":e.source==="local-admin"?"Le mot de passe a ete accepte, mais la synchro distante est indisponible. Les changements resteront locaux a cet appareil.":"Cet appareil peut saisir les scores, generer des donnees de test et reinitialiser le tournoi.",s.hidden=!0,i.hidden=!1,o.textContent=e.source==="local-dev"?"Tu peux tester la saisie localement ici, mais rien n’est partage avec les autres appareils.":e.source==="local-admin"?"Tu peux saisir localement sur cet appareil en attendant le retour de la synchro.":"Tu peux maintenant saisir les scores et utiliser la barre d’actions admin en bas de page.",r.textContent=e.source==="local-dev"?"Fermer":"Se deconnecter"):(n.textContent="Connexion admin",a.textContent=e.authConfigured?e.remote?"Entrez le mot de passe organisateurs pour debloquer la saisie sur cet appareil.":"La synchro distante est indisponible, mais tu peux quand meme ouvrir un mode admin local sur cet appareil.":"La connexion admin n’est pas encore configuree sur ce deploiement.",s.hidden=!l,i.hidden=!0,d.disabled=h||!l,r.textContent="Se deconnecter"),!t.hidden&&!e.admin&&!h&&!d.disabled&&window.setTimeout(()=>d.focus(),0)}function qt(){const e=document.getElementById("admin-modal");e.hidden=!1,W(),Je()}function Q(){const e=document.getElementById("admin-modal"),t=document.getElementById("admin-password");e.hidden=!0,W(),t.value="",le()}function le(){const e=document.getElementById("admin-error");e.textContent=""}function Te(e){const t=document.getElementById("admin-error");t.textContent=e}function F(e,t=""){const n=document.getElementById("backup-status");n.textContent=e,n.dataset.kind=t,te&&clearTimeout(te),te=window.setTimeout(()=>{n.textContent="",n.dataset.kind=""},3500)}function Qe(e){const t=document.getElementById("confirm-modal"),n=document.getElementById("confirm-modal-title"),a=document.getElementById("confirm-modal-copy"),s=document.getElementById("confirm-modal-submit");return L&&(L(!1),L=null),n.textContent=e.title,a.textContent=e.copy,s.textContent=e.submitLabel||"Confirmer",s.classList.remove("backup-btn--primary","backup-btn--danger"),s.classList.add(e.submitVariant==="danger"?"backup-btn--danger":"backup-btn--primary"),t.hidden=!1,W(),new Promise(i=>{L=i,window.setTimeout(()=>s.focus(),0)})}function z(e){const t=document.getElementById("confirm-modal"),n=L;t.hidden=!0,W(),L=null,n&&n(e)}function W(){const e=document.getElementById("admin-modal"),t=document.getElementById("confirm-modal"),n=e&&!e.hidden||t&&!t.hidden;document.body.classList.toggle("admin-modal-open",!!n)}function de(e){const t=async()=>{try{const a=await A(me,{method:"POST",body:e});return a!=null&&a.updatedAt&&S({lastRemoteUpdate:a.updatedAt}),a}catch(a){throw a.status===401&&S({admin:!1,readOnly:!0}),a}},n=Le.then(t,t);return Le=n.catch(()=>{}),n}function Dt(){return!!document.querySelector(".sc-input:focus, .b-score-input:focus")}function Ht(){return["localhost","127.0.0.1"].includes(window.location.hostname)}function jt(e){return e.source==="local-dev"?!0:e.authConfigured}async function A(e,t={}){const n={method:t.method||"GET",credentials:"same-origin",headers:{Accept:"application/json",...t.headers}};t.body!==void 0&&(n.body=JSON.stringify(t.body),n.headers["Content-Type"]="application/json");let a;try{a=await fetch(e,n)}catch{throw new Error("API Vercel indisponible sur cet environnement.")}const s=await Gt(a);if(!a.ok){const i=new Error((s==null?void 0:s.error)||(s==null?void 0:s.message)||`Erreur ${a.status}`);throw i.status=a.status,i.payload=s,i}return s}async function Gt(e){if((e.headers.get("content-type")||"").includes("application/json"))return e.json();const n=await e.text();if(!n)return{};try{return JSON.parse(n)}catch{return{message:n}}}
