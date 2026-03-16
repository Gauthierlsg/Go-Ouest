(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))a(s);new MutationObserver(s=>{for(const i of s)if(i.type==="childList")for(const o of i.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&a(o)}).observe(document,{childList:!0,subtree:!0});function n(s){const i={};return s.integrity&&(i.integrity=s.integrity),s.referrerPolicy&&(i.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?i.credentials="include":s.crossOrigin==="anonymous"?i.credentials="omit":i.credentials="same-origin",i}function a(s){if(s.ep)return;s.ep=!0;const i=n(s);fetch(s.href,i)}})();const ne="go-ouest-2026",Xe=["go-ouest-2025"],Ze={source:"booting",admin:!1,readOnly:!0,remote:!1,authConfigured:!0,lastRemoteUpdate:null};let g=at(),P={...Ze},ae=null;const q=[];function et(){return g}function x(e){return g.scores[String(e)]||{}}function I(e){return(e==null?void 0:e.s1)!=null&&(e==null?void 0:e.s2)!=null&&Number(e.s1)===Number(e.s2)}function ce(){return Object.values(g.scores).filter(e=>I(e)).length}function tt(){return M(U(),{persist:!0,notify:!0}),g}function M(e,t={}){const{notify:n=!0,persist:a=!0}=t,s=Ne(e),i=!st(g,s);return g=s,a&&K(),n&&i&&V(),{changed:i,state:g}}function h(){return{...P}}function w(){return P.readOnly}function S(e,t={}){const{forceNotify:n=!1}=t,a={...P,...e},s=!it(P,a);return P=a,(s||n)&&V(),P}function ge(e){ae=e||null}function xe(e,t,n){return w()||(qe(g,e,t,n),K()),g}async function Re(e,t,n){if(w())return g;const a=ot(g);if(qe(g,e,t,n),K(),V(),I(x(e)))return be(new Error("Match nul interdit : saisis le point decisif pour departager le match.")),g;if(!ae)return g;try{const s=await ae({type:"setScore",matchId:String(e),side:t,value:ue(n)});return s!=null&&s.state&&M(s.state,{persist:!0,notify:!0}),g}catch(s){throw g=a,K(),V(),be(s),s}}function nt(e){return q.push(e),()=>{const t=q.indexOf(e);t>=0&&q.splice(t,1)}}function at(){const e=localStorage.getItem(ne);if(e)return ve(e);for(const t of Xe){const n=localStorage.getItem(t);if(!n)continue;const a=ve(n);return localStorage.setItem(ne,JSON.stringify(a)),a}return U()}function U(){return{scores:{}}}function ve(e){try{return Ne(JSON.parse(e))}catch{return U()}}function Ne(e){const t=e==null?void 0:e.scores;if(!t||typeof t!="object"||Array.isArray(t))return U();const n={};return Object.entries(t).forEach(([a,s])=>{if(!s||typeof s!="object"||Array.isArray(s))return;const i={};["s1","s2"].forEach(o=>{const d=ue(s[o]);d!==void 0&&(i[o]=d)}),!(i.s1==null&&i.s2==null)&&(n[String(a)]=i)}),{scores:n}}function qe(e,t,n,a){if(n!=="s1"&&n!=="s2")return;const s=ue(a);if(s===void 0)return;const i=String(t),o=e.scores[i]?{...e.scores[i]}:{};if(o[n]=s,o.s1==null&&o.s2==null){delete e.scores[i];return}e.scores[i]=o}function ue(e){if(e===""||e==null)return null;const t=Number(e);if(!(!Number.isFinite(t)||t<0))return t}function st(e,t){return JSON.stringify(e)===JSON.stringify(t)}function it(e,t){const n=Object.keys(e),a=Object.keys(t);return n.length!==a.length?!1:n.every(s=>e[s]===t[s])}function ot(e){return JSON.parse(JSON.stringify(e))}function be(e){typeof window>"u"||window.dispatchEvent(new CustomEvent("go-ouest:sync-error",{detail:{error:e}}))}function K(){localStorage.setItem(ne,JSON.stringify(g))}function V(){const e=et(),t=h();q.forEach(n=>n(e,t))}const De=[{id:1,p1:"Colombe",p2:"Pierre"},{id:2,p1:"Castille",p2:"Léo D."},{id:3,p1:"Eugénie",p2:"Cyprien"},{id:4,p1:"Capucine",p2:"Henri"},{id:5,p1:"Valentine",p2:"Hugues"},{id:6,p1:"Candice",p2:"Alfred"},{id:7,p1:"Charlotte",p2:"Hippolyte"},{id:8,p1:"Clarisse",p2:"Alban R."},{id:9,p1:"Marion",p2:"Karol"},{id:10,p1:"Philippine",p2:"Xavier"},{id:11,p1:"Paola A.",p2:"Grégoire"},{id:12,p1:"Marie D.",p2:"Alban"},{id:13,p1:"Louise B.",p2:"Louis S."},{id:14,p1:"Charlotte G.",p2:"Amaury"},{id:15,p1:"Iklil",p2:"Jean"},{id:16,p1:"Margaux",p2:"Donatien"},{id:17,p1:"Paula",p2:"Paul"},{id:18,p1:"Théophile",p2:"Maylis"},{id:19,p1:"Eléonore",p2:"Stan"},{id:20,p1:"Mathilde",p2:"Victor"},{id:25,p1:"Sixtine",p2:"Gaspard"},{id:26,p1:"Anne-Thaïs",p2:"Brieuc"},{id:27,p1:"Aglaé",p2:"Gauthier"}],Q=[{name:"Poule A",color:"#1a5c38",teams:[1,8,15,26]},{name:"Poule B",color:"#1a4a7c",teams:[2,9,16,27]},{name:"Poule C",color:"#7c1a1a",teams:[3,10,17]},{name:"Poule D",color:"#6b21a8",teams:[4,11,18]},{name:"Poule E",color:"#92400e",teams:[5,12,19]},{name:"Poule F",color:"#0e6b5e",teams:[6,13,20]},{name:"Poule G",color:"#155e75",teams:[7,14,25]}],D=15,je=5,R=D+je,se=10,j=15,rt=e=>De.find(t=>t.id===e),k=e=>{const t=rt(e);return`${t.p1} & ${t.p2}`},X={quarterfinals:[{id:"QF1",label:"QF1",sides:[{qualifier:0},{qualifier:7}]},{id:"QF2",label:"QF2",sides:[{qualifier:1},{qualifier:6}]},{id:"QF3",label:"QF3",sides:[{qualifier:2},{qualifier:5}]},{id:"QF4",label:"QF4",sides:[{qualifier:3},{qualifier:4}]}],semifinals:[{id:"SF1",label:"SF1",sides:[{winnerOf:"QF1"},{winnerOf:"QF2"}]},{id:"SF2",label:"SF2",sides:[{winnerOf:"QF3"},{winnerOf:"QF4"}]}],finals:[{id:"F",label:"Finale",sides:[{winnerOf:"SF1"},{winnerOf:"SF2"}]},{id:"TP",label:"3e place",sides:[{loserOf:"SF1"},{loserOf:"SF2"}]}]};function J(){const e=[];let t=1;return Q.forEach(n=>{const a=n.teams;for(let s=0;s<a.length;s++)for(let i=s+1;i<a.length;i++)e.push({id:t++,pool:n.name,color:n.color,t1:a[s],t2:a[i]})}),e}function lt(e){const t={};e.forEach(i=>{var o;(t[o=i.pool]??(t[o]=[])).push(i)});const n=Object.values(t),a=e.length,s=[];return n.forEach((i,o)=>{const d=a/i.length,u=o*(d/n.length);i.forEach((r,l)=>s.push({m:r,pos:u+l*d}))}),s.sort((i,o)=>i.pos-o.pos),s.map(i=>i.m)}function dt(e){const t=lt(e),n=[];for(;t.length;){const a=new Set([...(n[n.length-1]||[]).flatMap(d=>[d.t1,d.t2]),...(n[n.length-2]||[]).flatMap(d=>[d.t1,d.t2])]),s=new Set((n[n.length-1]||[]).flatMap(d=>[d.t1,d.t2])),i=new Set,o=[];for(let d=0;d<3&&o.length<2;d++){const u=d===0?a:d===1?s:new Set;for(let r=0;r<t.length&&o.length<2;r++){const l=t[r];!i.has(l.t1)&&!i.has(l.t2)&&!u.has(l.t1)&&!u.has(l.t2)&&(o.push(l),i.add(l.t1),i.add(l.t2),t.splice(r--,1))}}n.push(o)}return n}function ct(e,t,n){let a=0,s=0,i=0,o=0,d=0,u=0,r=0;return n.filter(l=>l.pool===t&&(l.t1===e||l.t2===e)).forEach(l=>{const f=x(l.id);if(f.s1==null||f.s2==null||I(f))return;const c=l.t1===e?f.s1:f.s2,v=l.t1===e?f.s2:f.s1;a++,u+=c,r+=v,c>v?(s++,d+=3):i++}),{j:a,v:s,d:i,n:o,pts:d,gf:u,ga:r}}function ie(e,t){return e.teams.map(n=>{const a=ct(n,e.name,t);return{id:n,...a,gd:a.gf-a.ga}}).sort((n,a)=>a.pts-n.pts||a.gf-a.ga-(n.gf-n.ga)||a.gf-n.gf)}function He(e){const t=Q.map(a=>{var i,o;const s=ie(a,e);return{team:(i=s[0])==null?void 0:i.id,pool:a.name,color:a.color,pts:((o=s[0])==null?void 0:o.pts)??0}}),n=Q.filter(a=>a.teams.length>=4).map(a=>{var i,o,d,u,r;const s=ie(a,e);return{team:(i=s[1])==null?void 0:i.id,pool:a.name,color:a.color,pts:((o=s[1])==null?void 0:o.pts)??0,gf:((d=s[1])==null?void 0:d.gf)??0,ga:((u=s[1])==null?void 0:u.ga)??0,gd:((r=s[1])==null?void 0:r.gd)??0,isWild:!0}}).sort((a,s)=>s.gd-a.gd)[0];return[...t,n]}function Ge(e){var i;const t=He(e),n=new Map(t.filter(o=>o==null?void 0:o.team).map(o=>[o.team,o])),a={},s={quarterfinals:Z(X.quarterfinals,t,n,a),semifinals:Z(X.semifinals,t,n,a),finals:Z(X.finals,t,n,a)};return{qualifiers:t,rounds:s,champion:((i=s.finals[0])==null?void 0:i.winner)??null}}function Z(e,t,n,a){return e.map(s=>{const i=s.sides.map(r=>ut(r,t,a)),o=x(s.id),d=mt(i,o,n),u={id:s.id,label:s.label,sides:i,score:o,ready:i.every(r=>r==null?void 0:r.team),...d};return a[s.id]=u,u})}function ut(e,t,n){var a,s;return e.qualifier!=null?t[e.qualifier]??null:e.winnerOf?((a=n[e.winnerOf])==null?void 0:a.winner)??null:e.loserOf?((s=n[e.loserOf])==null?void 0:s.loser)??null:null}function mt(e,t,n){const[a,s]=e;if(!(a!=null&&a.team)||!(s!=null&&s.team)||t.s1==null||t.s2==null||I(t))return{winner:null,loser:null,isTie:I(t)};const i=t.s1>t.s2?a.team:s.team,o=i===a.team?s.team:a.team;return{winner:n.get(i)??{team:i},loser:n.get(o)??{team:o},isTie:!1}}const ft=["QF1","QF2","QF3","QF4","SF1","SF2","F","TP"];function pt(){const e={};return J().forEach(t=>{e[String(t.id)]=gt()}),ft.forEach(t=>{e[t]=vt()}),{scores:e}}function gt(){return Ke(4,9)}function vt(){return Ke(4,9)}function Ke(e,t){const n=he(e,t),a=he(0,Math.max(0,n-1));return Math.random()<.5?{s1:n,s2:a}:{s1:a,s2:n}}function he(e,t){return Math.floor(Math.random()*(t-e+1))+e}function bt(e){var u;const t=J(),n=ce(),a=n>1?"scores invalides":"score invalide",i=(u=He(t).find(r=>r==null?void 0:r.isWild))==null?void 0:u.team,o=r=>["r1","r2","r3","rn"][Math.min(r,3)],d=r=>{const f=ie(r,t).map((c,v)=>`
      <tr class="${v===0||c.id===i?"q":""}">
        <td><span class="rnk ${o(v)}">${v+1}</span></td>
        <td><span class="duo-name">${k(c.id)}${c.id===i?" ⭐":""}</span></td>
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
    <div class="tourney-meta">${De.length} duos · ${Q.length} poules · ${t.length} matchs · 2 terrains · 6h</div>
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
    <div class="pools-grid">${Q.map(d).join("")}</div>`}const ht=[{id:"QF1",round:"Quart de finale",tag:"QF1",color:"#a34710",fallbacks:["1er Poule A","Meilleur 2e"]},{id:"QF2",round:"Quart de finale",tag:"QF2",color:"#a34710",fallbacks:["1er Poule B","1er Poule G"]},{id:"QF3",round:"Quart de finale",tag:"QF3",color:"#a34710",fallbacks:["1er Poule C","1er Poule F"]},{id:"QF4",round:"Quart de finale",tag:"QF4",color:"#a34710",fallbacks:["1er Poule D","1er Poule E"]},{id:"SF1",round:"Demi-finale",tag:"SF1",color:"#7c3aed",fallbacks:["Vainqueur QF1","Vainqueur QF2"]},{id:"SF2",round:"Demi-finale",tag:"SF2",color:"#7c3aed",fallbacks:["Vainqueur QF3","Vainqueur QF4"]},{id:"TP",round:"3e place",tag:"3e place",color:"#0f766e",fallbacks:["Perdant SF1","Perdant SF2"]},{id:"F",round:"Finale",tag:"Finale",color:"#c2450a",fallbacks:["Vainqueur SF1","Vainqueur SF2"]}];function ye(e){return e.replace(/\D+/g,"").slice(0,2)}function C(e){const t=Math.floor(e/60),n=e%60;return`${String(t).padStart(2,"0")}:${String(n).padStart(2,"0")}`}function yt(e){const t=Math.floor(e/60),n=e%60;return`${t}h${n>0?String(n).padStart(2,"0"):""}`}function St(e){const t=w(),n=J(),a=dt(n),s=$t(n,a),i=s.endMinutes-se*60,o=ce(),d=o>1?"scores invalides":"score invalide";e.innerHTML=`
    <div class="banner banner--planning">
      <div class="banner-row">⚠️ <strong>Fin estimée ${C(s.endMinutes)}</strong> · ${yt(i)} au total</div>
      <div class="banner-sub">${n.length} matchs de poule + 8 matchs de finale · pause ${j} min</div>
      <div class="banner-sub">Si ça dépasse : passer les matchs à <strong>${D-2}-${D-1} min</strong></div>
    </div>
    ${o?`
      <div class="banner error">
        ⚠️ <div><strong>${o} ${d}.</strong> Les matchs nuls sont interdits : saisis le point decisif pour valider ces matchs.</div>
      </div>
    `:""}
    <div class="planning-header">
      <span class="section-title">Planning</span>
      <span class="planning-meta">Début ${String(se).padStart(2,"0")}h00 · matchs ${D} min + ${je} min transition · pause ${j} min avant les quarts</span>
    </div>
    <section class="planning-section">
      <div class="planning-section__header">
        <div>
          <div class="planning-section__eyebrow">Bloc 1</div>
          <h3 class="planning-section__title">Phase de poules</h3>
        </div>
        <div class="planning-section__meta">${n.length} matchs · fin estimée ${C(s.poolEndMinutes)}</div>
      </div>
      ${we(s.poolCourts,t)}
    </section>

    <div class="planning-separator" role="separator" aria-label="Pause avant la phase finale">
      <div class="planning-separator__line"></div>
      <div class="planning-separator__badge">
        <span class="planning-separator__eyebrow">Transition</span>
        <strong>${C(s.poolEndMinutes)} · Pause ${j} min</strong>
        <span>Calcul des qualifiés puis lancement de la phase finale à ${C(s.knockoutStart)}</span>
      </div>
      <div class="planning-separator__line"></div>
    </div>

    <section class="planning-section planning-section--knockout">
      <div class="planning-section__header">
        <div>
          <div class="planning-section__eyebrow">Bloc 2</div>
          <h3 class="planning-section__title">Phase finale</h3>
        </div>
        <div class="planning-section__meta">8 matchs à élimination directe · fin estimée ${C(s.endMinutes)}</div>
      </div>
      ${we(s.knockoutCourts,t)}
    </section>`,e.dataset.scoreBound!=="true"&&(e.addEventListener("input",u=>{if(w())return;const r=u.target;if(!r.dataset.mid)return;const l=ye(r.value);r.value!==l&&(r.value=l),xe(r.dataset.mid,r.dataset.side,l)}),e.addEventListener("focusout",u=>{if(w())return;const r=u.target;if(!r.dataset.mid)return;const l=ye(r.value);r.value!==l&&(r.value=l),Re(r.dataset.mid,r.dataset.side,l)}),e.addEventListener("keydown",u=>{if(u.key!=="Enter")return;const r=u.target;r.dataset.mid&&r.blur()}),e.dataset.scoreBound="true")}function $t(e,t){const n=[[],[]],a=se*60;t.forEach((l,f)=>{const c=a+f*R;n[0].push(l[0]?Se(l[0],c):Fe(c)),n[1].push(l[1]?Se(l[1],c):Fe(c))});const s=a+t.length*R,i=s+j,{rounds:o}=Ge(e),d=Object.fromEntries([...o.quarterfinals,...o.semifinals,...o.finals].map(l=>[l.id,l])),u=[[],[]],r=[["QF1","QF2"],["QF3","QF4"],["SF1","SF2"],["TP","F"]];return r.forEach((l,f)=>{const c=i+f*R;u[0].push($e(d[l[0]],c,l[0])),u[1].push($e(d[l[1]],c,l[1]))}),{poolCourts:n,knockoutCourts:u,poolEndMinutes:s,knockoutStart:i,endMinutes:i+r.length*R}}function Se(e,t){return{type:"match",matchId:e.id,startMinutes:t,leftLabel:k(e.t1),rightLabel:k(e.t2),tag:e.pool,tagColor:e.color,detail:"Phase de poules",editable:!0,kind:"pool"}}function $e(e,t,n){const a=ht.find(s=>s.id===n);return{type:"match",matchId:e.id,startMinutes:t,leftLabel:Ee(e.sides[0],a.fallbacks[0]),rightLabel:Ee(e.sides[1],a.fallbacks[1]),tag:a.tag,tagColor:a.color,detail:a.round,editable:e.ready,kind:"knockout"}}function Fe(e){return{type:"empty",startMinutes:e}}function Ee(e,t){return e!=null&&e.team?k(e.team):t}function we(e,t){return`
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
        <span class="m-time">${C(e.startMinutes)}</span>
        <span>—</span>
      </div>`;const n=x(e.matchId),a=I(n),s=t||!e.editable;return`
    <div class="match-row ${e.kind==="knockout"?"match-row--knockout":""} ${a?"match-row--invalid":""}" data-mid="${e.matchId}">
      <span class="m-time">${C(e.startMinutes)}</span>
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
    </div>`}const Ft=[["QF1","SF1"],["QF2","SF1"],["QF3","SF2"],["QF4","SF2"],["SF1","F"],["SF2","F"],["SF1","TP"],["SF2","TP"],["F","CHAMPION"]];function Oe(e){return e.replace(/\D+/g,"").slice(0,2)}const Et=e=>e!=null&&e.team?`<span class="m-pool-tag" style="background:${e.color??"#888"}">${e.pool??"Phase finale"}${e.isWild?" ⭐":""}</span>`:'<span class="b-team-meta">À déterminer</span>',Ce=(e,t,n,a,s)=>{if(!(e!=null&&e.team))return'<div class="b-team b-team--tbd"><span>À déterminer</span></div>';const i=x(t);return`
    <div class="b-team">
      <div class="b-team-main">
        ${Et(e)}
        <span>${k(e.team)}</span>
      </div>
      <div class="b-score">
        <input class="b-score-input " type="text" inputmode="numeric" pattern="[0-9]*" maxlength="2"
          value="${i[n]??""}" placeholder="—"
          data-mid="${t}" data-side="${n}" ${a?"disabled":""}>
      </div>
    </div>`};function wt(e){const t=w(),n=J(),{qualifiers:a,rounds:s,champion:i}=Ge(n),[o,d,u,r,l,f,c,v]=a,A=ce(),y=A>1?"scores invalides":"score invalide",Y=kt(s),Ye=a.map((m,p)=>`
    <div class="qual-card" style="border-color:${(m==null?void 0:m.color)||"#aaa"}">
      <div class="qual-pool" style="color:${(m==null?void 0:m.color)||"#aaa"}">
        ${(m==null?void 0:m.pool)||"—"}${m!=null&&m.isWild?" ⭐ Wildcard":""}
      </div>
      <div class="qual-name">${m!=null&&m.team?k(m.team):"—"}</div>
      <div class="qual-meta">QF${p+1} · ${(m==null?void 0:m.pts)??0} pts</div>
    </div>`).join("");e.innerHTML=`
    <div class="banner info">
      ℹ️ Les quarts se remplissent selon les résultats des poules.
      Saisissez ensuite les scores de phase finale ici pour faire avancer automatiquement le bracket. Les matchs nuls sont interdits.
    </div>
    ${A?`
      <div class="banner error">
        ⚠️ <div><strong>${A} ${y}.</strong> En cas d'égalité, saisis le point decisif pour valider le match.</div>
      </div>
    `:""}
    ${Y}

    <div class="section-card">
      <div class="section-title" style="margin-bottom:1rem">Phase finale · 8 qualifiés</div>
      <div class="bracket-wrap">
        <div class="bracket-stage">
          <svg class="bracket-svg" aria-hidden="true"></svg>
          <div class="bracket">

            <div class="b-round b-round--quarters">
              <div class="b-round-title">Quarts de finale</div>
              <div class="b-round-body">
                ${F(s.quarterfinals[0],`${(o==null?void 0:o.pool)??"—"} vs ${(v==null?void 0:v.pool)??"—"}`,t)}
                ${F(s.quarterfinals[1],`${(d==null?void 0:d.pool)??"—"} vs ${(c==null?void 0:c.pool)??"—"}`,t)}
                ${F(s.quarterfinals[2],`${(u==null?void 0:u.pool)??"—"} vs ${(f==null?void 0:f.pool)??"—"}`,t)}
                ${F(s.quarterfinals[3],`${(r==null?void 0:r.pool)??"—"} vs ${(l==null?void 0:l.pool)??"—"}`,t)}
              </div>
            </div>

            <div class="b-round b-round--semis">
              <div class="b-round-title">Demi-finales</div>
              <div class="b-round-body">
                ${F(s.semifinals[0],"Vainqueurs QF1/QF2",t)}
                ${F(s.semifinals[1],"Vainqueurs QF3/QF4",t)}
              </div>
            </div>

            <div class="b-round b-round--finals">
              <div class="b-round-title">Finale</div>
              <div class="b-round-body">
                ${F(s.finals[0],"Vainqueurs SF",t)}
                <div class="b-label-3rd">3ème place</div>
                ${F(s.finals[1],"Perdants SF",t)}
              </div>
            </div>

            <div class="b-round b-round--champion">
              <div class="b-round-title">Champion</div>
              <div class="b-round-body">
                <div class="trophy-box" data-node-id="CHAMPION">
                  <div class="trophy-icon">🏆</div>
                  <div class="trophy-name">GO OUEST 2026</div>
                  <div class="trophy-sub">${i!=null&&i.team?k(i.team):"À déterminer"}</div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>

    <div class="section-card" style="margin-top:1.25rem">
      <div class="section-title" style="margin-bottom:1rem">Qualifiés provisoires</div>
      <div class="qual-grid">${Ye}</div>
    </div>`,Mt(e),oe(e),e.dataset.scoreBound!=="true"&&(e.addEventListener("input",m=>{if(w())return;const p=m.target;if(!p.dataset.mid)return;const O=Oe(p.value);p.value!==O&&(p.value=O),xe(p.dataset.mid,p.dataset.side,O)}),e.addEventListener("focusout",m=>{if(w())return;const p=m.target;if(!p.dataset.mid)return;const O=Oe(p.value);p.value!==O&&(p.value=O),Re(p.dataset.mid,p.dataset.side,O)}),e.addEventListener("keydown",m=>{if(m.key!=="Enter")return;const p=m.target;p.dataset.mid&&p.blur()}),e.dataset.scoreBound="true")}function kt(e){return`
    <div class="section-card finale-mobile-summary">
      <div class="section-title" style="margin-bottom:0.9rem">Scores de la phase finale</div>
      <div class="finale-mobile-summary__sections">
        ${[{title:"Quarts de finale",matches:e.quarterfinals},{title:"Demi-finales",matches:e.semifinals},{title:"Matchs finaux",matches:[e.finals[1],e.finals[0]]}].map(n=>`
          <div class="finale-mobile-summary__section">
            <div class="finale-mobile-summary__section-title">${n.title}</div>
            <div class="finale-mobile-summary__list">
              ${n.matches.map(Ot).join("")}
            </div>
          </div>
        `).join("")}
      </div>
    </div>`}function Ot(e){var n,a;const t=I(e.score);return`
    <div class="finale-mobile-summary__match ${t?"finale-mobile-summary__match--invalid":""}">
      <div class="finale-mobile-summary__match-head">
        <span>${e.label}</span>
        <span>${Ct(e)}</span>
      </div>
      ${Me(e.sides[0],(n=e.score)==null?void 0:n.s1)}
      ${Me(e.sides[1],(a=e.score)==null?void 0:a.s2)}
      ${t?'<div class="finale-mobile-summary__error">Pas de match nul : ajouter le point decisif.</div>':""}
    </div>`}function Me(e,t){return`
    <div class="finale-mobile-summary__row">
      <div class="finale-mobile-summary__team">${e!=null&&e.team?k(e.team):"À déterminer"}</div>
      <div class="finale-mobile-summary__score">${t??"—"}</div>
    </div>`}function Ct(e){return e.id==="TP"?"3e place":e.id==="F"?"Finale":e.id}function Mt(e){e._bracketResizeObserver||(e._bracketResizeObserver=new ResizeObserver(()=>oe(e)));const t=e.querySelector(".bracket-stage");e._observedBracketStage&&e._observedBracketStage!==t&&e._bracketResizeObserver.unobserve(e._observedBracketStage),t&&e._observedBracketStage!==t&&(e._bracketResizeObserver.observe(t),e._observedBracketStage=t),e._bracketWindowBound||(e._bracketWindowBound=!0,window.addEventListener("resize",()=>oe(e)))}function oe(e){e._bracketRaf&&cancelAnimationFrame(e._bracketRaf),e._bracketRaf=requestAnimationFrame(()=>{e._bracketRaf=null,Bt(e)})}function Bt(e){const t=e.querySelector(".bracket-stage");if(!t)return;const n={quarters:t.querySelector(".b-round--quarters .b-round-body"),semis:t.querySelector(".b-round--semis .b-round-body"),finals:t.querySelector(".b-round--finals .b-round-body"),champion:t.querySelector(".b-round--champion .b-round-body")},a={QF1:t.querySelector('[data-match-id="QF1"]'),QF2:t.querySelector('[data-match-id="QF2"]'),QF3:t.querySelector('[data-match-id="QF3"]'),QF4:t.querySelector('[data-match-id="QF4"]'),SF1:t.querySelector('[data-match-id="SF1"]'),SF2:t.querySelector('[data-match-id="SF2"]'),F:t.querySelector('[data-match-id="F"]'),TP:t.querySelector('[data-match-id="TP"]'),CHAMPION:t.querySelector('[data-node-id="CHAMPION"]')};if(Object.values(n).some(y=>!y)||Object.values(a).some(y=>!y))return;const s=t.querySelector(".b-label-3rd");if(!s)return;const i=a.QF1.getBoundingClientRect().height,o=a.CHAMPION.getBoundingClientRect().height,d=s.getBoundingClientRect().height,u=16,r=24,l=28,f=10,c={QF1:0,QF2:i+u};c.QF3=c.QF2+i+r,c.QF4=c.QF3+i+u,c.SF1=ee(c.QF1+i/2,c.QF2+i/2)-i/2,c.SF2=ee(c.QF3+i/2,c.QF4+i/2)-i/2,c.F=ee(c.SF1+i/2,c.SF2+i/2)-i/2;const v=c.F+i+l;c.TP=v+d+f,c.CHAMPION=c.F+(i-o)/2;const A=Math.max(c.QF4+i,c.SF2+i,c.TP+i,c.CHAMPION+o);Object.values(n).forEach(y=>{y.style.height=`${A}px`}),["QF1","QF2","QF3","QF4","SF1","SF2","F","TP"].forEach(y=>{const Y=a[y];Y.style.top=`${c[y]}px`}),s.style.top=`${v}px`,a.CHAMPION.style.top=`${c.CHAMPION}px`,It(t)}function ee(e,t){return(e+t)/2}function It(e){const t=e.querySelector(".bracket-svg");if(!t)return;const n=e.getBoundingClientRect(),a=Math.ceil(n.width),s=Math.ceil(n.height);t.setAttribute("viewBox",`0 0 ${a} ${s}`),t.setAttribute("width",a),t.setAttribute("height",s),t.innerHTML=Ft.map(([i,o])=>{const d=Be(e,i),u=Be(e,o);if(!d||!u)return"";const r=Ie(d,"right",n),l=Ie(u,"left",n),f=r.x+(l.x-r.x)/2;return`<path d="M ${r.x} ${r.y} L ${f} ${r.y} L ${f} ${l.y} L ${l.x} ${l.y}" />`}).join("")}function Be(e,t){return t==="CHAMPION"?e.querySelector('[data-node-id="CHAMPION"]'):e.querySelector(`[data-match-id="${t}"] .b-match`)}function Ie(e,t,n){const a=e.getBoundingClientRect();return{x:Math.round((t==="left"?a.left:a.right)-n.left),y:Math.round(a.top+a.height/2-n.top)}}function F(e,t,n){return`
    <div class="b-match-wrap" data-match-id="${e.id}">
      <div class="b-match">
        <div class="b-match-head">
          <span>${e.label}</span>
          ${e.isTie?'<span class="b-error">Pas de match nul</span>':`<span class="b-side-label">${t}</span>`}
        </div>
        ${Ce(e.sides[0],e.id,"s1",!e.ready||n)}
        ${Ce(e.sides[1],e.id,"s2",!e.ready||n)}
      </div>
    </div>`}const Pt=5e3,me="/api/tournament",re="/api/admin/session",fe={poules:()=>bt(document.getElementById("poules")),planning:()=>St(document.getElementById("planning")),finale:()=>wt(document.getElementById("finale"))};let Ve="poules",te=null,H=null,b=!1,B=!1,ze=null,N=null,Pe=null,_e=Promise.resolve(),_=null;document.querySelectorAll(".tab-btn").forEach(e=>{e.addEventListener("click",()=>Lt(e.dataset.tab))});Rt();Nt();Dt();qt();window.addEventListener("go-ouest:sync-error",e=>{var n,a;const t=((a=(n=e.detail)==null?void 0:n.error)==null?void 0:a.message)||"Synchronisation impossible.";$(t,"error")});nt(()=>{E(),fe[Ve]()});_t();async function _t(){await At(),E(),fe.poules()}function Lt(e){document.querySelectorAll(".tab-content").forEach(t=>t.classList.remove("active")),document.querySelectorAll(".tab-btn").forEach(t=>t.classList.remove("active")),document.getElementById(e).classList.add("active"),document.querySelector(`[data-tab="${e}"]`).classList.add("active"),Ve=e,fe[e]()}async function At(){const e=await Qt();await Tt(e)||xt(ze,e)}async function Tt(e){try{const t=await L(me);return M(t.state,{persist:!0,notify:!1}),S({source:"remote",remote:!0,admin:e.admin,readOnly:!e.admin,authConfigured:e.authConfigured,lastRemoteUpdate:t.updatedAt??null}),ge(n=>de(n)),jt(),!0}catch(t){return ze=t,Ue(),ge(null),!1}}async function Qt(){try{const e=await L(re);return{admin:!!e.admin,authConfigured:e.configured!==!1}}catch(e){return{admin:!1,authConfigured:e.status!==503}}}function xt(e,t){if(zt()){S({source:"local-dev",remote:!1,admin:!0,readOnly:!1,authConfigured:!0,lastRemoteUpdate:null}),$("API Vercel indisponible ici : mode local de developpement actif.","info");return}S({source:"remote-down",remote:!1,admin:!1,readOnly:!0,authConfigured:(t==null?void 0:t.authConfigured)??!1,lastRemoteUpdate:null}),$((e==null?void 0:e.message)||"Synchronisation indisponible : la page reste en lecture seule.","error")}function Rt(){const e=document.getElementById("admin-access-trigger"),t=document.getElementById("admin-modal"),n=t.querySelectorAll("[data-admin-close]"),a=document.getElementById("admin-login-form"),s=document.getElementById("admin-password"),i=document.getElementById("admin-logout");e.addEventListener("click",()=>Kt()),n.forEach(o=>{o.addEventListener("click",()=>T())}),a.addEventListener("submit",async o=>{if(o.preventDefault(),!b){le(),b=!0,E();try{await L(re,{method:"POST",body:{password:s.value}}),h().remote?(S({admin:!0,readOnly:!1}),await pe({silent:!0,forceRender:!0})):S({admin:!0,readOnly:!1,source:"local-admin"}),T(),$(h().remote?"Mode admin active sur cet appareil.":"Mode admin local actif sur cet appareil.",h().remote?"success":"warning")}catch(d){Te(d.message||"Connexion admin impossible.")}finally{b=!1,E()}}}),i.addEventListener("click",async()=>{if(!b){if(h().source==="local-dev"){T();return}b=!0,le(),E();try{await L(re,{method:"DELETE"}),S({admin:!1,readOnly:!0}),$("Mode admin desactive sur cet appareil.","success"),T()}catch(o){Te(o.message||"Deconnexion impossible.")}finally{b=!1,E()}}}),document.addEventListener("keydown",o=>{const d=document.getElementById("confirm-modal");if(o.key==="Escape"&&d&&!d.hidden){z(!1);return}o.key==="Escape"&&!t.hidden&&T()})}function Nt(){const e=document.getElementById("backup-mock"),t=document.getElementById("backup-reset");[e,t].forEach(n=>{n.addEventListener("pointerdown",a=>{a.preventDefault()})}),e.addEventListener("click",async()=>{!Ae()||B||!await Qe({title:"Generer des mock data ?",copy:"Tous les scores actuels seront remplaces par des resultats aleatoires pour tester le tournoi.",submitLabel:"Generer",submitVariant:"primary"})||await Le(async()=>{const a=pt();if(h().remote){const s=await de({type:"replaceState",state:a});s!=null&&s.state&&M(s.state,{persist:!0,notify:!0})}else M(a,{persist:!0,notify:!0});$("Mock data generee pour les tests.","success")},"Generation mock impossible.")}),t.addEventListener("click",async()=>{!Ae()||B||!await Qe({title:"Reinitialiser tous les scores ?",copy:"Tous les scores de poules et de phase finale seront effaces sur tous les appareils synchronises.",submitLabel:"Reinitialiser",submitVariant:"danger"})||await Le(async()=>{if(h().remote){const a=await de({type:"reset"});a!=null&&a.state&&M(a.state,{persist:!0,notify:!0})}else tt();$("Scores reinitialises.","success")},"Reinitialisation impossible.")})}function qt(){const t=document.getElementById("confirm-modal").querySelectorAll("[data-confirm-close]"),n=document.getElementById("confirm-modal-submit");t.forEach(a=>{a.addEventListener("click",()=>z(!1))}),n.addEventListener("click",()=>z(!0))}async function Le(e,t){B=!0,E();try{await e()}catch(n){$(n.message||t,"error")}finally{B=!1,E()}}function Dt(){const e=document.getElementById("admin-toolbar");e&&(window.addEventListener("resize",G),"ResizeObserver"in window&&(Pe=new ResizeObserver(()=>{G()}),Pe.observe(e)),G())}async function pe(e={}){const{silent:t=!1,forceRender:n=!1}=e;if(h().remote&&!Vt())try{const a=await L(me),{changed:s}=M(a.state,{persist:!0,notify:!0});S({lastRemoteUpdate:a.updatedAt??null},{forceNotify:n&&!s})}catch(a){a.status===401&&S({admin:!1,readOnly:!0}),t||$(a.message||"Synchronisation impossible.","error")}}function jt(){Ue(),H=window.setInterval(()=>{document.visibilityState!=="hidden"&&pe({silent:!0})},Pt),document.addEventListener("visibilitychange",Je)}function Ue(){H&&(window.clearInterval(H),H=null),document.removeEventListener("visibilitychange",Je)}function Je(){document.visibilityState==="visible"&&pe({silent:!0,forceRender:!0})}function E(){const e=h(),t=document.getElementById("admin-toolbar"),n=document.getElementById("admin-access-trigger"),a=document.getElementById("sync-badge"),s=document.getElementById("backup-mock"),i=document.getElementById("backup-reset");document.body.classList.toggle("is-admin",e.admin),document.body.classList.toggle("is-public",!e.admin),t.hidden=!e.admin,t.setAttribute("aria-hidden",String(!e.admin)),t.inert=!e.admin,a.textContent=Gt(e),n.textContent=e.admin?"Admin connecte":"Connexion admin",n.disabled=b||B,s.disabled=!e.admin||B,i.disabled=!e.admin||B,e.admin||z(!1),G(),We()}function G(){N&&window.cancelAnimationFrame(N),N=window.requestAnimationFrame(()=>{N=null,Ht()})}function Ht(){const e=document.getElementById("admin-toolbar"),t=document.documentElement.style;if(!e||e.hidden){t.setProperty("--admin-toolbar-offset","0px");return}const n=window.getComputedStyle(e);if(n.display==="none"||n.visibility==="hidden"){t.setProperty("--admin-toolbar-offset","0px");return}const a=Number.parseFloat(n.bottom)||0,s=Math.ceil(e.getBoundingClientRect().height+a+24);t.setProperty("--admin-toolbar-offset",`${s}px`)}function Ae(){return h().admin?!0:($("Connexion admin requise pour cette action.","error"),!1)}function Gt(e){return e.source==="local-dev"?"Mode local":e.source==="local-admin"?"Admin local":e.admin?"Mode admin":"Lecture seule"}function We(){const e=h(),t=document.getElementById("admin-modal"),n=document.getElementById("admin-modal-title"),a=document.getElementById("admin-modal-copy"),s=document.getElementById("admin-login-form"),i=document.getElementById("admin-logged-panel"),o=i.querySelector(".admin-logged-panel__text"),d=document.getElementById("admin-password"),u=document.getElementById("admin-login-submit"),r=document.getElementById("admin-logout"),l=Ut(e);u.disabled=b||!l,r.disabled=b,e.admin?(n.textContent=e.source==="local-dev"?"Mode local de developpement":e.source==="local-admin"?"Mode admin local":"Mode admin actif",a.textContent=e.source==="local-dev"?"Cette version locale reste editable sur cet appareil meme sans API admin.":e.source==="local-admin"?"Le mot de passe a ete accepte, mais la synchro distante est indisponible. Les changements resteront locaux a cet appareil.":"Cet appareil peut saisir les scores, generer des donnees de test et reinitialiser le tournoi.",s.hidden=!0,i.hidden=!1,o.textContent=e.source==="local-dev"?"Tu peux tester la saisie localement ici, mais rien n’est partage avec les autres appareils.":e.source==="local-admin"?"Tu peux saisir localement sur cet appareil en attendant le retour de la synchro.":"Tu peux maintenant saisir les scores et utiliser la barre d’actions admin en bas de page.",r.textContent=e.source==="local-dev"?"Fermer":"Se deconnecter"):(n.textContent="Connexion admin",a.textContent=e.authConfigured?e.remote?"Entrez le mot de passe organisateurs pour debloquer la saisie sur cet appareil.":"La synchro distante est indisponible, mais tu peux quand meme ouvrir un mode admin local sur cet appareil.":"La connexion admin n’est pas encore configuree sur ce deploiement.",s.hidden=!l,i.hidden=!0,d.disabled=b||!l,r.textContent="Se deconnecter"),!t.hidden&&!e.admin&&!b&&!d.disabled&&window.setTimeout(()=>d.focus(),0)}function Kt(){const e=document.getElementById("admin-modal");e.hidden=!1,W(),We()}function T(){const e=document.getElementById("admin-modal"),t=document.getElementById("admin-password");e.hidden=!0,W(),t.value="",le()}function le(){const e=document.getElementById("admin-error");e.textContent=""}function Te(e){const t=document.getElementById("admin-error");t.textContent=e}function $(e,t=""){const n=document.getElementById("backup-status");n.textContent=e,n.dataset.kind=t,te&&clearTimeout(te),te=window.setTimeout(()=>{n.textContent="",n.dataset.kind=""},3500)}function Qe(e){const t=document.getElementById("confirm-modal"),n=document.getElementById("confirm-modal-title"),a=document.getElementById("confirm-modal-copy"),s=document.getElementById("confirm-modal-submit");return _&&(_(!1),_=null),n.textContent=e.title,a.textContent=e.copy,s.textContent=e.submitLabel||"Confirmer",s.classList.remove("backup-btn--primary","backup-btn--danger"),s.classList.add(e.submitVariant==="danger"?"backup-btn--danger":"backup-btn--primary"),t.hidden=!1,W(),new Promise(i=>{_=i,window.setTimeout(()=>s.focus(),0)})}function z(e){const t=document.getElementById("confirm-modal"),n=_;t.hidden=!0,W(),_=null,n&&n(e)}function W(){const e=document.getElementById("admin-modal"),t=document.getElementById("confirm-modal"),n=e&&!e.hidden||t&&!t.hidden;document.body.classList.toggle("admin-modal-open",!!n)}function de(e){const t=async()=>{try{const a=await L(me,{method:"POST",body:e});return a!=null&&a.updatedAt&&S({lastRemoteUpdate:a.updatedAt}),a}catch(a){throw a.status===401&&S({admin:!1,readOnly:!0}),a}},n=_e.then(t,t);return _e=n.catch(()=>{}),n}function Vt(){return!!document.querySelector(".sc-input:focus, .b-score-input:focus")}function zt(){return["localhost","127.0.0.1"].includes(window.location.hostname)}function Ut(e){return e.source==="local-dev"?!0:e.authConfigured}async function L(e,t={}){const n={method:t.method||"GET",credentials:"same-origin",headers:{Accept:"application/json",...t.headers}};t.body!==void 0&&(n.body=JSON.stringify(t.body),n.headers["Content-Type"]="application/json");let a;try{a=await fetch(e,n)}catch{throw new Error("API Vercel indisponible sur cet environnement.")}const s=await Jt(a);if(!a.ok){const i=new Error((s==null?void 0:s.error)||(s==null?void 0:s.message)||`Erreur ${a.status}`);throw i.status=a.status,i.payload=s,i}return s}async function Jt(e){if((e.headers.get("content-type")||"").includes("application/json"))return e.json();const n=await e.text();if(!n)return{};try{return JSON.parse(n)}catch{return{message:n}}}
