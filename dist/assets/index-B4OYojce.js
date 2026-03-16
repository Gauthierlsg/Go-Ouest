(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const a of document.querySelectorAll('link[rel="modulepreload"]'))s(a);new MutationObserver(a=>{for(const o of a)if(o.type==="childList")for(const i of o.addedNodes)i.tagName==="LINK"&&i.rel==="modulepreload"&&s(i)}).observe(document,{childList:!0,subtree:!0});function n(a){const o={};return a.integrity&&(o.integrity=a.integrity),a.referrerPolicy&&(o.referrerPolicy=a.referrerPolicy),a.crossOrigin==="use-credentials"?o.credentials="include":a.crossOrigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function s(a){if(a.ep)return;a.ep=!0;const o=n(a);fetch(a.href,o)}})();const Z="go-ouest-2026",Ke=["go-ouest-2025"],Ve={source:"booting",admin:!1,readOnly:!0,remote:!1,authConfigured:!0,lastRemoteUpdate:null};let g=Je(),M={...Ve},ee=null;const _=[];function ze(){return g}function K(e){return g.scores[String(e)]||{}}function Ge(){return O(V(),{persist:!0,notify:!0}),g}function O(e,t={}){const{notify:n=!0,persist:s=!0}=t,a=Le(e),o=!We(g,a);return g=a,s&&D(),n&&o&&H(),{changed:o,state:g}}function y(){return{...M}}function $(){return M.readOnly}function v(e,t={}){const{forceNotify:n=!1}=t,s={...M,...e},a=!Ye(M,s);return M=s,(a||n)&&H(),M}function me(e){ee=e||null}function Pe(e,t,n){return $()||(Te(g,e,t,n),D()),g}async function Ae(e,t,n){if($())return g;const s=Xe(g);if(Te(g,e,t,n),D(),H(),!ee)return g;try{const a=await ee({type:"setScore",matchId:String(e),side:t,value:le(n)});return a!=null&&a.state&&O(a.state,{persist:!0,notify:!0}),g}catch(a){throw g=s,D(),H(),Ze(a),a}}function Ue(e){return _.push(e),()=>{const t=_.indexOf(e);t>=0&&_.splice(t,1)}}function Je(){const e=localStorage.getItem(Z);if(e)return fe(e);for(const t of Ke){const n=localStorage.getItem(t);if(!n)continue;const s=fe(n);return localStorage.setItem(Z,JSON.stringify(s)),s}return V()}function V(){return{scores:{}}}function fe(e){try{return Le(JSON.parse(e))}catch{return V()}}function Le(e){const t=e==null?void 0:e.scores;if(!t||typeof t!="object"||Array.isArray(t))return V();const n={};return Object.entries(t).forEach(([s,a])=>{if(!a||typeof a!="object"||Array.isArray(a))return;const o={};["s1","s2"].forEach(i=>{const r=le(a[i]);r!==void 0&&(o[i]=r)}),!(o.s1==null&&o.s2==null)&&(n[String(s)]=o)}),{scores:n}}function Te(e,t,n,s){if(n!=="s1"&&n!=="s2")return;const a=le(s);if(a===void 0)return;const o=String(t),i=e.scores[o]?{...e.scores[o]}:{};if(i[n]=a,i.s1==null&&i.s2==null){delete e.scores[o];return}e.scores[o]=i}function le(e){if(e===""||e==null)return null;const t=Number(e);if(!(!Number.isFinite(t)||t<0))return t}function We(e,t){return JSON.stringify(e)===JSON.stringify(t)}function Ye(e,t){const n=Object.keys(e),s=Object.keys(t);return n.length!==s.length?!1:n.every(a=>e[a]===t[a])}function Xe(e){return JSON.parse(JSON.stringify(e))}function Ze(e){typeof window>"u"||window.dispatchEvent(new CustomEvent("go-ouest:sync-error",{detail:{error:e}}))}function D(){localStorage.setItem(Z,JSON.stringify(g))}function H(){const e=ze(),t=y();_.forEach(n=>n(e,t))}const Qe=[{id:1,p1:"Colombe",p2:"Pierre"},{id:2,p1:"Castille",p2:"Léo D."},{id:3,p1:"Eugénie",p2:"Cyprien"},{id:4,p1:"Capucine",p2:"Henri"},{id:5,p1:"Valentine",p2:"Hugues"},{id:6,p1:"Candice",p2:"Alfred"},{id:7,p1:"Charlotte",p2:"Hippolyte"},{id:8,p1:"Clarisse",p2:"Alban R."},{id:9,p1:"Marion",p2:"Karol"},{id:10,p1:"Philippine",p2:"Xavier"},{id:11,p1:"Paola A.",p2:"Grégoire"},{id:12,p1:"Marie D.",p2:"Alban"},{id:13,p1:"Louise B.",p2:"Louis S."},{id:14,p1:"Charlotte G.",p2:"Amaury"},{id:15,p1:"Iklil",p2:"Jean"},{id:16,p1:"Margaux",p2:"Donatien"},{id:17,p1:"Paula",p2:"Paul"},{id:18,p1:"Théophile",p2:"Maylis"},{id:19,p1:"Eléonore",p2:"Stan"},{id:20,p1:"Mathilde",p2:"Victor"},{id:25,p1:"Sixtine",p2:"Gaspard"},{id:26,p1:"Anne-Thaïs",p2:"Brieuc"},{id:27,p1:"Aglaé",p2:"Gauthier"}],L=[{name:"Poule A",color:"#1a5c38",teams:[1,8,15,26]},{name:"Poule B",color:"#1a4a7c",teams:[2,9,16,27]},{name:"Poule C",color:"#7c1a1a",teams:[3,10,17]},{name:"Poule D",color:"#6b21a8",teams:[4,11,18]},{name:"Poule E",color:"#92400e",teams:[5,12,19]},{name:"Poule F",color:"#0e6b5e",teams:[6,13,20]},{name:"Poule G",color:"#155e75",teams:[7,14,25]}],R=15,_e=5,T=R+_e,te=10,x=15,et=e=>Qe.find(t=>t.id===e),B=e=>{const t=et(e);return`${t.p1} & ${t.p2}`},J={quarterfinals:[{id:"QF1",label:"QF1",sides:[{qualifier:0},{qualifier:7}]},{id:"QF2",label:"QF2",sides:[{qualifier:1},{qualifier:6}]},{id:"QF3",label:"QF3",sides:[{qualifier:2},{qualifier:5}]},{id:"QF4",label:"QF4",sides:[{qualifier:3},{qualifier:4}]}],semifinals:[{id:"SF1",label:"SF1",sides:[{winnerOf:"QF1"},{winnerOf:"QF2"}]},{id:"SF2",label:"SF2",sides:[{winnerOf:"QF3"},{winnerOf:"QF4"}]}],finals:[{id:"F",label:"Finale",sides:[{winnerOf:"SF1"},{winnerOf:"SF2"}]},{id:"TP",label:"3e place",sides:[{loserOf:"SF1"},{loserOf:"SF2"}]}]};function z(){const e=[];let t=1;return L.forEach(n=>{const s=n.teams;for(let a=0;a<s.length;a++)for(let o=a+1;o<s.length;o++)e.push({id:t++,pool:n.name,color:n.color,t1:s[a],t2:s[o]})}),e}function tt(e){const t={};e.forEach(o=>{var i;(t[i=o.pool]??(t[i]=[])).push(o)});const n=Object.values(t),s=e.length,a=[];return n.forEach((o,i)=>{const r=s/o.length,c=i*(r/n.length);o.forEach((m,l)=>a.push({m,pos:c+l*r}))}),a.sort((o,i)=>o.pos-i.pos),a.map(o=>o.m)}function nt(e){const t=tt(e),n=[];for(;t.length;){const s=new Set([...(n[n.length-1]||[]).flatMap(r=>[r.t1,r.t2]),...(n[n.length-2]||[]).flatMap(r=>[r.t1,r.t2])]),a=new Set((n[n.length-1]||[]).flatMap(r=>[r.t1,r.t2])),o=new Set,i=[];for(let r=0;r<3&&i.length<2;r++){const c=r===0?s:r===1?a:new Set;for(let m=0;m<t.length&&i.length<2;m++){const l=t[m];!o.has(l.t1)&&!o.has(l.t2)&&!c.has(l.t1)&&!c.has(l.t2)&&(i.push(l),o.add(l.t1),o.add(l.t2),t.splice(m--,1))}}n.push(i)}return n}function at(e,t,n){let s=0,a=0,o=0,i=0,r=0,c=0,m=0;return n.filter(l=>l.pool===t&&(l.t1===e||l.t2===e)).forEach(l=>{const p=K(l.id);if(p.s1==null||p.s2==null)return;const d=l.t1===e?p.s1:p.s2,b=l.t1===e?p.s2:p.s1;s++,c+=d,m+=b,d>b?(a++,r+=3):d===b?(i++,r+=1):o++}),{j:s,v:a,d:o,n:i,pts:r,gf:c,ga:m}}function ne(e,t){return e.teams.map(n=>({id:n,...at(n,e.name,t)})).sort((n,s)=>s.pts-n.pts||s.gf-s.ga-(n.gf-n.ga)||s.gf-n.gf)}function st(e){const t=L.map(s=>{var o,i;const a=ne(s,e);return{team:(o=a[0])==null?void 0:o.id,pool:s.name,color:s.color,pts:((i=a[0])==null?void 0:i.pts)??0}}),n=L.filter(s=>s.teams.length>=4).map(s=>{var o,i,r,c;const a=ne(s,e);return{team:(o=a[1])==null?void 0:o.id,pool:s.name,color:s.color,pts:((i=a[1])==null?void 0:i.pts)??0,gf:((r=a[1])==null?void 0:r.gf)??0,ga:((c=a[1])==null?void 0:c.ga)??0,isWild:!0}}).sort((s,a)=>a.pts-s.pts||a.gf-a.ga-(s.gf-s.ga)||a.gf-s.gf)[0];return[...t,n]}function Re(e){var o;const t=st(e),n=new Map(t.filter(i=>i==null?void 0:i.team).map(i=>[i.team,i])),s={},a={quarterfinals:W(J.quarterfinals,t,n,s),semifinals:W(J.semifinals,t,n,s),finals:W(J.finals,t,n,s)};return{qualifiers:t,rounds:a,champion:((o=a.finals[0])==null?void 0:o.winner)??null}}function W(e,t,n,s){return e.map(a=>{const o=a.sides.map(m=>ot(m,t,s)),i=K(a.id),r=it(o,i,n),c={id:a.id,label:a.label,sides:o,score:i,ready:o.every(m=>m==null?void 0:m.team),...r};return s[a.id]=c,c})}function ot(e,t,n){var s,a;return e.qualifier!=null?t[e.qualifier]??null:e.winnerOf?((s=n[e.winnerOf])==null?void 0:s.winner)??null:e.loserOf?((a=n[e.loserOf])==null?void 0:a.loser)??null:null}function it(e,t,n){const[s,a]=e;if(!(s!=null&&s.team)||!(a!=null&&a.team)||t.s1==null||t.s2==null||t.s1===t.s2)return{winner:null,loser:null,isTie:t.s1!=null&&t.s1===t.s2};const o=t.s1>t.s2?s.team:a.team,i=o===s.team?a.team:s.team;return{winner:n.get(o)??{team:o},loser:n.get(i)??{team:i},isTie:!1}}const rt=["QF1","QF2","QF3","QF4","SF1","SF2","F","TP"];function lt(){const e={};return z().forEach(t=>{e[String(t.id)]=ct()}),rt.forEach(t=>{e[t]=dt()}),{scores:e}}function ct(){if(Math.random()<.18){const e=ae(4,9);return{s1:e,s2:e}}return xe(4,9)}function dt(){return xe(4,9)}function xe(e,t){const n=ae(e,t),s=ae(0,Math.max(0,n-1));return Math.random()<.5?{s1:n,s2:s}:{s1:s,s2:n}}function ae(e,t){return Math.floor(Math.random()*(t-e+1))+e}function ut(e){const t=z(),n=a=>["r1","r2","r3","rn"][Math.min(a,3)],s=a=>{const i=ne(a,t).map((r,c)=>`
      <tr class="${c===0?"q":""}">
        <td><span class="rnk ${n(c)}">${c+1}</span></td>
        <td><span class="duo-name">${B(r.id)}</span></td>
        <td>${r.j}</td>
        <td>${r.v}</td>
        <td>${r.d}</td>
        <td><span class="pts-badge">${r.pts}</span></td>
      </tr>`).join("");return`
      <div class="pool-card">
        <div class="pool-hdr" style="background:${a.color}">
          <h3>${a.name}</h3>
          <span class="badge">${a.teams.length} duos</span>
        </div>
        <table class="stand-table">
          <thead><tr><th>#</th><th>Duo</th><th>J</th><th>V</th><th>D</th><th>Pts</th></tr></thead>
          <tbody>${i}</tbody>
        </table>
      </div>`};e.innerHTML=`
    <div class="tourney-meta">${Qe.length} duos · ${L.length} poules · ${t.length} matchs · 2 terrains · 6h</div>
    <div class="banner info">
      ℹ️ <div>
        <strong>Format :</strong> 7 poules → top 1 de chaque poule + meilleur 2ème = <strong>8 qualifiés</strong>.
        Ligne <span class="q-sample">orange</span> = qualifié provisoire.
      </div>
    </div>
    <div class="pools-grid">${L.map(s).join("")}</div>`}const mt=[{id:"QF1",round:"Quart de finale",tag:"QF1",color:"#a34710",fallbacks:["1er Poule A","Meilleur 2e"]},{id:"QF2",round:"Quart de finale",tag:"QF2",color:"#a34710",fallbacks:["1er Poule B","1er Poule G"]},{id:"QF3",round:"Quart de finale",tag:"QF3",color:"#a34710",fallbacks:["1er Poule C","1er Poule F"]},{id:"QF4",round:"Quart de finale",tag:"QF4",color:"#a34710",fallbacks:["1er Poule D","1er Poule E"]},{id:"SF1",round:"Demi-finale",tag:"SF1",color:"#7c3aed",fallbacks:["Vainqueur QF1","Vainqueur QF2"]},{id:"SF2",round:"Demi-finale",tag:"SF2",color:"#7c3aed",fallbacks:["Vainqueur QF3","Vainqueur QF4"]},{id:"TP",round:"3e place",tag:"3e place",color:"#0f766e",fallbacks:["Perdant SF1","Perdant SF2"]},{id:"F",round:"Finale",tag:"Finale",color:"#c2450a",fallbacks:["Vainqueur SF1","Vainqueur SF2"]}];function pe(e){return e.replace(/\D+/g,"").slice(0,2)}function k(e){const t=Math.floor(e/60),n=e%60;return`${String(t).padStart(2,"0")}:${String(n).padStart(2,"0")}`}function ft(e){const t=Math.floor(e/60),n=e%60;return`${t}h${n>0?String(n).padStart(2,"0"):""}`}function pt(e){const t=$(),n=z(),s=nt(n),a=gt(n,s),o=a.endMinutes-te*60;e.innerHTML=`
    <div class="banner">
      ⚠️ <strong>${n.length} matchs de poule + 8 matchs de phase finale · pause ${x} min · fin estimée ${k(a.endMinutes)} (~${ft(o)}).</strong>
      Si ça dépasse : réduire les matchs à <strong>${R-2}-${R-1} min</strong> et garder la transition fluide.
    </div>
    <div class="planning-header">
      <span class="section-title">Planning</span>
      <span class="planning-meta">Début ${String(te).padStart(2,"0")}h00 · matchs ${R} min + ${_e} min transition · pause ${x} min avant les quarts</span>
    </div>
    <section class="planning-section">
      <div class="planning-section__header">
        <div>
          <div class="planning-section__eyebrow">Bloc 1</div>
          <h3 class="planning-section__title">Phase de poules</h3>
        </div>
        <div class="planning-section__meta">${n.length} matchs · fin estimée ${k(a.poolEndMinutes)}</div>
      </div>
      ${ve(a.poolCourts,t)}
    </section>

    <div class="planning-separator" role="separator" aria-label="Pause avant la phase finale">
      <div class="planning-separator__line"></div>
      <div class="planning-separator__badge">
        <span class="planning-separator__eyebrow">Transition</span>
        <strong>${k(a.poolEndMinutes)} · Pause ${x} min</strong>
        <span>Calcul des qualifiés puis lancement de la phase finale à ${k(a.knockoutStart)}</span>
      </div>
      <div class="planning-separator__line"></div>
    </div>

    <section class="planning-section planning-section--knockout">
      <div class="planning-section__header">
        <div>
          <div class="planning-section__eyebrow">Bloc 2</div>
          <h3 class="planning-section__title">Phase finale</h3>
        </div>
        <div class="planning-section__meta">8 matchs à élimination directe · fin estimée ${k(a.endMinutes)}</div>
      </div>
      ${ve(a.knockoutCourts,t)}
    </section>`,e.dataset.scoreBound!=="true"&&(e.addEventListener("input",i=>{if($())return;const r=i.target;if(!r.dataset.mid)return;const c=pe(r.value);r.value!==c&&(r.value=c),Pe(r.dataset.mid,r.dataset.side,c)}),e.addEventListener("focusout",i=>{if($())return;const r=i.target;if(!r.dataset.mid)return;const c=pe(r.value);r.value!==c&&(r.value=c),Ae(r.dataset.mid,r.dataset.side,c)}),e.addEventListener("keydown",i=>{if(i.key!=="Enter")return;const r=i.target;r.dataset.mid&&r.blur()}),e.dataset.scoreBound="true")}function gt(e,t){const n=[[],[]],s=te*60;t.forEach((l,p)=>{const d=s+p*T;n[0].push(l[0]?ge(l[0],d):ye(d)),n[1].push(l[1]?ge(l[1],d):ye(d))});const a=s+t.length*T,o=a+x,{rounds:i}=Re(e),r=Object.fromEntries([...i.quarterfinals,...i.semifinals,...i.finals].map(l=>[l.id,l])),c=[[],[]],m=[["QF1","QF2"],["QF3","QF4"],["SF1","SF2"],["TP","F"]];return m.forEach((l,p)=>{const d=o+p*T;c[0].push(he(r[l[0]],d,l[0])),c[1].push(he(r[l[1]],d,l[1]))}),{poolCourts:n,knockoutCourts:c,poolEndMinutes:a,knockoutStart:o,endMinutes:o+m.length*T}}function ge(e,t){return{type:"match",matchId:e.id,startMinutes:t,leftLabel:B(e.t1),rightLabel:B(e.t2),tag:e.pool,tagColor:e.color,detail:"Phase de poules",editable:!0,kind:"pool"}}function he(e,t,n){const s=mt.find(a=>a.id===n);return{type:"match",matchId:e.id,startMinutes:t,leftLabel:be(e.sides[0],s.fallbacks[0]),rightLabel:be(e.sides[1],s.fallbacks[1]),tag:s.tag,tagColor:s.color,detail:s.round,editable:e.ready,kind:"knockout"}}function ye(e){return{type:"empty",startMinutes:e}}function be(e,t){return e!=null&&e.team?B(e.team):t}function ve(e,t){return`
    <div class="courts-grid">
      <div class="court-card">
        <div class="court-hdr c1-hdr">🎾 Terrain 1</div>
        ${e[0].map(n=>Se(n,t)).join("")}
      </div>
      <div class="court-card">
        <div class="court-hdr c2-hdr">🎾 Terrain 2</div>
        ${e[1].map(n=>Se(n,t)).join("")}
      </div>
    </div>`}function Se(e,t){if(e.type==="empty")return`
      <div class="empty-slot">
        <span class="m-time">${k(e.startMinutes)}</span>
        <span>—</span>
      </div>`;const n=K(e.matchId),s=t||!e.editable;return`
    <div class="match-row ${e.kind==="knockout"?"match-row--knockout":""}" data-mid="${e.matchId}">
      <span class="m-time">${k(e.startMinutes)}</span>
      <div class="m-body">
        <div class="m-teams">${e.leftLabel} <span class="vs">vs</span> ${e.rightLabel}</div>
        <div class="m-subline">
          <span class="m-pool-tag" style="background:${e.tagColor}">${e.tag}</span>
          <span class="m-stage-copy">${e.detail}</span>
        </div>
      </div>
      <div class="m-score">
        <input class="sc-input" type="text" inputmode="numeric" pattern="[0-9]*" maxlength="2"
          value="${n.s1??""}" placeholder="—"
          data-mid="${e.matchId}" data-side="s1" ${s?"disabled":""}>
        <span class="sc-sep">:</span>
        <input class="sc-input" type="text" inputmode="numeric" pattern="[0-9]*" maxlength="2"
          value="${n.s2??""}" placeholder="—"
          data-mid="${e.matchId}" data-side="s2" ${s?"disabled":""}>
      </div>
    </div>`}const ht=[["QF1","SF1"],["QF2","SF1"],["QF3","SF2"],["QF4","SF2"],["SF1","F"],["SF2","F"],["SF1","TP"],["SF2","TP"],["F","CHAMPION"]];function Fe(e){return e.replace(/\D+/g,"").slice(0,2)}const yt=e=>e!=null&&e.team?`<span class="m-pool-tag" style="background:${e.color??"#888"}">${e.pool??"Phase finale"}${e.isWild?" ⭐":""}</span>`:'<span class="b-team-meta">À déterminer</span>',Ee=(e,t,n,s)=>{if(!(e!=null&&e.team))return'<div class="b-team b-team--tbd"><span>À déterminer</span></div>';const a=K(t);return`
    <div class="b-team">
      <div class="b-team-main">
        ${yt(e)}
        <span>${B(e.team)}</span>
      </div>
      <div class="b-score">
        <input class="b-score-input" type="text" inputmode="numeric" pattern="[0-9]*" maxlength="2"
          value="${a[n]??""}" placeholder="—"
          data-mid="${t}" data-side="${n}" ${s?"disabled":""}>
      </div>
    </div>`};function bt(e){const t=$(),n=z(),{qualifiers:s,rounds:a,champion:o}=Re(n),[i,r,c,m,l,p,d,b]=s,U=s.map((u,f)=>`
    <div class="qual-card" style="border-color:${(u==null?void 0:u.color)||"#aaa"}">
      <div class="qual-pool" style="color:${(u==null?void 0:u.color)||"#aaa"}">
        ${(u==null?void 0:u.pool)||"—"}${u!=null&&u.isWild?" ⭐ Wildcard":""}
      </div>
      <div class="qual-name">${u!=null&&u.team?B(u.team):"—"}</div>
      <div class="qual-meta">QF${f+1} · ${(u==null?void 0:u.pts)??0} pts</div>
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
                ${F(a.quarterfinals[0],`${(i==null?void 0:i.pool)??"—"} vs ${(b==null?void 0:b.pool)??"—"}`,t)}
                ${F(a.quarterfinals[1],`${(r==null?void 0:r.pool)??"—"} vs ${(d==null?void 0:d.pool)??"—"}`,t)}
                ${F(a.quarterfinals[2],`${(c==null?void 0:c.pool)??"—"} vs ${(p==null?void 0:p.pool)??"—"}`,t)}
                ${F(a.quarterfinals[3],`${(m==null?void 0:m.pool)??"—"} vs ${(l==null?void 0:l.pool)??"—"}`,t)}
              </div>
            </div>

            <div class="b-round b-round--semis">
              <div class="b-round-title">Demi-finales</div>
              <div class="b-round-body">
                ${F(a.semifinals[0],"Vainqueurs QF1/QF2",t)}
                ${F(a.semifinals[1],"Vainqueurs QF3/QF4",t)}
              </div>
            </div>

            <div class="b-round b-round--finals">
              <div class="b-round-title">Finale</div>
              <div class="b-round-body">
                ${F(a.finals[0],"Vainqueurs SF",t)}
                <div class="b-label-3rd">3ème place</div>
                ${F(a.finals[1],"Perdants SF",t)}
              </div>
            </div>

            <div class="b-round b-round--champion">
              <div class="b-round-title">Champion</div>
              <div class="b-round-body">
                <div class="trophy-box" data-node-id="CHAMPION">
                  <div class="trophy-icon">🏆</div>
                  <div class="trophy-name">GO OUEST 2026</div>
                  <div class="trophy-sub">${o!=null&&o.team?B(o.team):"À déterminer"}</div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>

    <div class="section-card" style="margin-top:1.25rem">
      <div class="section-title" style="margin-bottom:1rem">Qualifiés provisoires</div>
      <div class="qual-grid">${U}</div>
    </div>`,vt(e),se(e),e.dataset.scoreBound!=="true"&&(e.addEventListener("input",u=>{if($())return;const f=u.target;if(!f.dataset.mid)return;const w=Fe(f.value);f.value!==w&&(f.value=w),Pe(f.dataset.mid,f.dataset.side,w)}),e.addEventListener("focusout",u=>{if($())return;const f=u.target;if(!f.dataset.mid)return;const w=Fe(f.value);f.value!==w&&(f.value=w),Ae(f.dataset.mid,f.dataset.side,w)}),e.addEventListener("keydown",u=>{if(u.key!=="Enter")return;const f=u.target;f.dataset.mid&&f.blur()}),e.dataset.scoreBound="true")}function vt(e){e._bracketResizeObserver||(e._bracketResizeObserver=new ResizeObserver(()=>se(e)));const t=e.querySelector(".bracket-stage");e._observedBracketStage&&e._observedBracketStage!==t&&e._bracketResizeObserver.unobserve(e._observedBracketStage),t&&e._observedBracketStage!==t&&(e._bracketResizeObserver.observe(t),e._observedBracketStage=t),e._bracketWindowBound||(e._bracketWindowBound=!0,window.addEventListener("resize",()=>se(e)))}function se(e){e._bracketRaf&&cancelAnimationFrame(e._bracketRaf),e._bracketRaf=requestAnimationFrame(()=>{e._bracketRaf=null,St(e)})}function St(e){const t=e.querySelector(".bracket-stage");if(!t)return;const n={quarters:t.querySelector(".b-round--quarters .b-round-body"),semis:t.querySelector(".b-round--semis .b-round-body"),finals:t.querySelector(".b-round--finals .b-round-body"),champion:t.querySelector(".b-round--champion .b-round-body")},s={QF1:t.querySelector('[data-match-id="QF1"]'),QF2:t.querySelector('[data-match-id="QF2"]'),QF3:t.querySelector('[data-match-id="QF3"]'),QF4:t.querySelector('[data-match-id="QF4"]'),SF1:t.querySelector('[data-match-id="SF1"]'),SF2:t.querySelector('[data-match-id="SF2"]'),F:t.querySelector('[data-match-id="F"]'),TP:t.querySelector('[data-match-id="TP"]'),CHAMPION:t.querySelector('[data-node-id="CHAMPION"]')};if(Object.values(n).some(u=>!u)||Object.values(s).some(u=>!u))return;const a=t.querySelector(".b-label-3rd");if(!a)return;const o=s.QF1.getBoundingClientRect().height,i=s.CHAMPION.getBoundingClientRect().height,r=a.getBoundingClientRect().height,c=16,m=24,l=28,p=10,d={QF1:0,QF2:o+c};d.QF3=d.QF2+o+m,d.QF4=d.QF3+o+c,d.SF1=Y(d.QF1+o/2,d.QF2+o/2)-o/2,d.SF2=Y(d.QF3+o/2,d.QF4+o/2)-o/2,d.F=Y(d.SF1+o/2,d.SF2+o/2)-o/2;const b=d.F+o+l;d.TP=b+r+p,d.CHAMPION=d.F+(o-i)/2;const U=Math.max(d.QF4+o,d.SF2+o,d.TP+o,d.CHAMPION+i);Object.values(n).forEach(u=>{u.style.height=`${U}px`}),["QF1","QF2","QF3","QF4","SF1","SF2","F","TP"].forEach(u=>{const f=s[u];f.style.top=`${d[u]}px`}),a.style.top=`${b}px`,s.CHAMPION.style.top=`${d.CHAMPION}px`,Ft(t)}function Y(e,t){return(e+t)/2}function Ft(e){const t=e.querySelector(".bracket-svg");if(!t)return;const n=e.getBoundingClientRect(),s=Math.ceil(n.width),a=Math.ceil(n.height);t.setAttribute("viewBox",`0 0 ${s} ${a}`),t.setAttribute("width",s),t.setAttribute("height",a),t.innerHTML=ht.map(([o,i])=>{const r=$e(e,o),c=$e(e,i);if(!r||!c)return"";const m=we(r,"right",n),l=we(c,"left",n),p=m.x+(l.x-m.x)/2;return`<path d="M ${m.x} ${m.y} L ${p} ${m.y} L ${p} ${l.y} L ${l.x} ${l.y}" />`}).join("")}function $e(e,t){return t==="CHAMPION"?e.querySelector('[data-node-id="CHAMPION"]'):e.querySelector(`[data-match-id="${t}"] .b-match`)}function we(e,t,n){const s=e.getBoundingClientRect();return{x:Math.round((t==="left"?s.left:s.right)-n.left),y:Math.round(s.top+s.height/2-n.top)}}function F(e,t,n){return`
    <div class="b-match-wrap" data-match-id="${e.id}">
      <div class="b-match">
        <div class="b-match-head">
          <span>${e.label}</span>
          ${e.isTie?'<span class="b-error">Pas de match nul</span>':`<span class="b-side-label">${t}</span>`}
        </div>
        ${Ee(e.sides[0],e.id,"s1",!e.ready||n)}
        ${Ee(e.sides[1],e.id,"s2",!e.ready||n)}
      </div>
    </div>`}const Et=5e3,ce="/api/tournament",oe="/api/admin/session",de={poules:()=>ut(document.getElementById("poules")),planning:()=>pt(document.getElementById("planning")),finale:()=>bt(document.getElementById("finale"))};let Ne="poules",X=null,N=null,h=!1,C=!1,qe=null,Q=null,ke=null,Oe=Promise.resolve(),I=null;document.querySelectorAll(".tab-btn").forEach(e=>{e.addEventListener("click",()=>wt(e.dataset.tab))});Mt();It();At();Pt();window.addEventListener("go-ouest:sync-error",e=>{var n,s;const t=((s=(n=e.detail)==null?void 0:n.error)==null?void 0:s.message)||"Synchronisation impossible.";S(t,"error")});Ue(()=>{E(),de[Ne]()});$t();async function $t(){await kt(),E(),de.poules()}function wt(e){document.querySelectorAll(".tab-content").forEach(t=>t.classList.remove("active")),document.querySelectorAll(".tab-btn").forEach(t=>t.classList.remove("active")),document.getElementById(e).classList.add("active"),document.querySelector(`[data-tab="${e}"]`).classList.add("active"),Ne=e,de[e]()}async function kt(){const e=await Ct();await Ot(e)||Bt(qe,e)}async function Ot(e){try{const t=await P(ce);return O(t.state,{persist:!0,notify:!1}),v({source:"remote",remote:!0,admin:e.admin,readOnly:!e.admin,authConfigured:e.authConfigured,lastRemoteUpdate:t.updatedAt??null}),me(n=>re(n)),Lt(),!0}catch(t){return qe=t,De(),me(null),!1}}async function Ct(){try{const e=await P(oe);return{admin:!!e.admin,authConfigured:e.configured!==!1}}catch(e){return{admin:!1,authConfigured:e.status!==503}}}function Bt(e,t){if(xt()){v({source:"local-dev",remote:!1,admin:!0,readOnly:!1,authConfigured:!0,lastRemoteUpdate:null}),S("API Vercel indisponible ici : mode local de developpement actif.","info");return}v({source:"remote-down",remote:!1,admin:!1,readOnly:!0,authConfigured:(t==null?void 0:t.authConfigured)??!1,lastRemoteUpdate:null}),S((e==null?void 0:e.message)||"Synchronisation indisponible : la page reste en lecture seule.","error")}function Mt(){const e=document.getElementById("admin-access-trigger"),t=document.getElementById("admin-modal"),n=t.querySelectorAll("[data-admin-close]"),s=document.getElementById("admin-login-form"),a=document.getElementById("admin-password"),o=document.getElementById("admin-logout");e.addEventListener("click",()=>_t()),n.forEach(i=>{i.addEventListener("click",()=>A())}),s.addEventListener("submit",async i=>{if(i.preventDefault(),!h){ie(),h=!0,E();try{await P(oe,{method:"POST",body:{password:a.value}}),y().remote?(v({admin:!0,readOnly:!1}),await ue({silent:!0,forceRender:!0})):v({admin:!0,readOnly:!1,source:"local-admin"}),A(),S(y().remote?"Mode admin active sur cet appareil.":"Mode admin local actif sur cet appareil.",y().remote?"success":"warning")}catch(r){Me(r.message||"Connexion admin impossible.")}finally{h=!1,E()}}}),o.addEventListener("click",async()=>{if(!h){if(y().source==="local-dev"){A();return}h=!0,ie(),E();try{await P(oe,{method:"DELETE"}),v({admin:!1,readOnly:!0}),S("Mode admin desactive sur cet appareil.","success"),A()}catch(i){Me(i.message||"Deconnexion impossible.")}finally{h=!1,E()}}}),document.addEventListener("keydown",i=>{const r=document.getElementById("confirm-modal");if(i.key==="Escape"&&r&&!r.hidden){j(!1);return}i.key==="Escape"&&!t.hidden&&A()})}function It(){const e=document.getElementById("backup-mock"),t=document.getElementById("backup-reset");[e,t].forEach(n=>{n.addEventListener("pointerdown",s=>{s.preventDefault()})}),e.addEventListener("click",async()=>{!Be()||C||!await Ie({title:"Generer des mock data ?",copy:"Tous les scores actuels seront remplaces par des resultats aleatoires pour tester le tournoi.",submitLabel:"Generer",submitVariant:"primary"})||await Ce(async()=>{const s=lt();if(y().remote){const a=await re({type:"replaceState",state:s});a!=null&&a.state&&O(a.state,{persist:!0,notify:!0})}else O(s,{persist:!0,notify:!0});S("Mock data generee pour les tests.","success")},"Generation mock impossible.")}),t.addEventListener("click",async()=>{!Be()||C||!await Ie({title:"Reinitialiser tous les scores ?",copy:"Tous les scores de poules et de phase finale seront effaces sur tous les appareils synchronises.",submitLabel:"Reinitialiser",submitVariant:"danger"})||await Ce(async()=>{if(y().remote){const s=await re({type:"reset"});s!=null&&s.state&&O(s.state,{persist:!0,notify:!0})}else Ge();S("Scores reinitialises.","success")},"Reinitialisation impossible.")})}function Pt(){const t=document.getElementById("confirm-modal").querySelectorAll("[data-confirm-close]"),n=document.getElementById("confirm-modal-submit");t.forEach(s=>{s.addEventListener("click",()=>j(!1))}),n.addEventListener("click",()=>j(!0))}async function Ce(e,t){C=!0,E();try{await e()}catch(n){S(n.message||t,"error")}finally{C=!1,E()}}function At(){const e=document.getElementById("admin-toolbar");e&&(window.addEventListener("resize",q),"ResizeObserver"in window&&(ke=new ResizeObserver(()=>{q()}),ke.observe(e)),q())}async function ue(e={}){const{silent:t=!1,forceRender:n=!1}=e;if(y().remote&&!Rt())try{const s=await P(ce),{changed:a}=O(s.state,{persist:!0,notify:!0});v({lastRemoteUpdate:s.updatedAt??null},{forceNotify:n&&!a})}catch(s){s.status===401&&v({admin:!1,readOnly:!0}),t||S(s.message||"Synchronisation impossible.","error")}}function Lt(){De(),N=window.setInterval(()=>{document.visibilityState!=="hidden"&&ue({silent:!0})},Et),document.addEventListener("visibilitychange",He)}function De(){N&&(window.clearInterval(N),N=null),document.removeEventListener("visibilitychange",He)}function He(){document.visibilityState==="visible"&&ue({silent:!0,forceRender:!0})}function E(){const e=y(),t=document.getElementById("admin-toolbar"),n=document.getElementById("admin-access-trigger"),s=document.getElementById("sync-badge"),a=document.getElementById("backup-mock"),o=document.getElementById("backup-reset");document.body.classList.toggle("is-admin",e.admin),document.body.classList.toggle("is-public",!e.admin),t.hidden=!e.admin,t.setAttribute("aria-hidden",String(!e.admin)),t.inert=!e.admin,s.textContent=Qt(e),n.textContent=e.admin?"Admin connecte":"Connexion admin",n.disabled=h||C,a.disabled=!e.admin||C,o.disabled=!e.admin||C,e.admin||j(!1),q(),je()}function q(){Q&&window.cancelAnimationFrame(Q),Q=window.requestAnimationFrame(()=>{Q=null,Tt()})}function Tt(){const e=document.getElementById("admin-toolbar"),t=document.documentElement.style;if(!e||e.hidden){t.setProperty("--admin-toolbar-offset","0px");return}const n=window.getComputedStyle(e);if(n.display==="none"||n.visibility==="hidden"){t.setProperty("--admin-toolbar-offset","0px");return}const s=Number.parseFloat(n.bottom)||0,a=Math.ceil(e.getBoundingClientRect().height+s+24);t.setProperty("--admin-toolbar-offset",`${a}px`)}function Be(){return y().admin?!0:(S("Connexion admin requise pour cette action.","error"),!1)}function Qt(e){return e.source==="local-dev"?"Mode local":e.source==="local-admin"?"Admin local":e.admin?"Mode admin":"Lecture seule"}function je(){const e=y(),t=document.getElementById("admin-modal"),n=document.getElementById("admin-modal-title"),s=document.getElementById("admin-modal-copy"),a=document.getElementById("admin-login-form"),o=document.getElementById("admin-logged-panel"),i=o.querySelector(".admin-logged-panel__text"),r=document.getElementById("admin-password"),c=document.getElementById("admin-login-submit"),m=document.getElementById("admin-logout"),l=Nt(e);c.disabled=h||!l,m.disabled=h,e.admin?(n.textContent=e.source==="local-dev"?"Mode local de developpement":e.source==="local-admin"?"Mode admin local":"Mode admin actif",s.textContent=e.source==="local-dev"?"Cette version locale reste editable sur cet appareil meme sans API admin.":e.source==="local-admin"?"Le mot de passe a ete accepte, mais la synchro distante est indisponible. Les changements resteront locaux a cet appareil.":"Cet appareil peut saisir les scores, generer des donnees de test et reinitialiser le tournoi.",a.hidden=!0,o.hidden=!1,i.textContent=e.source==="local-dev"?"Tu peux tester la saisie localement ici, mais rien n’est partage avec les autres appareils.":e.source==="local-admin"?"Tu peux saisir localement sur cet appareil en attendant le retour de la synchro.":"Tu peux maintenant saisir les scores et utiliser la barre d’actions admin en bas de page.",m.textContent=e.source==="local-dev"?"Fermer":"Se deconnecter"):(n.textContent="Connexion admin",s.textContent=e.authConfigured?e.remote?"Entrez le mot de passe organisateurs pour debloquer la saisie sur cet appareil.":"La synchro distante est indisponible, mais tu peux quand meme ouvrir un mode admin local sur cet appareil.":"La connexion admin n’est pas encore configuree sur ce deploiement.",a.hidden=!l,o.hidden=!0,r.disabled=h||!l,m.textContent="Se deconnecter"),!t.hidden&&!e.admin&&!h&&!r.disabled&&window.setTimeout(()=>r.focus(),0)}function _t(){const e=document.getElementById("admin-modal");e.hidden=!1,G(),je()}function A(){const e=document.getElementById("admin-modal"),t=document.getElementById("admin-password");e.hidden=!0,G(),t.value="",ie()}function ie(){const e=document.getElementById("admin-error");e.textContent=""}function Me(e){const t=document.getElementById("admin-error");t.textContent=e}function S(e,t=""){const n=document.getElementById("backup-status");n.textContent=e,n.dataset.kind=t,X&&clearTimeout(X),X=window.setTimeout(()=>{n.textContent="",n.dataset.kind=""},3500)}function Ie(e){const t=document.getElementById("confirm-modal"),n=document.getElementById("confirm-modal-title"),s=document.getElementById("confirm-modal-copy"),a=document.getElementById("confirm-modal-submit");return I&&(I(!1),I=null),n.textContent=e.title,s.textContent=e.copy,a.textContent=e.submitLabel||"Confirmer",a.classList.remove("backup-btn--primary","backup-btn--danger"),a.classList.add(e.submitVariant==="danger"?"backup-btn--danger":"backup-btn--primary"),t.hidden=!1,G(),new Promise(o=>{I=o,window.setTimeout(()=>a.focus(),0)})}function j(e){const t=document.getElementById("confirm-modal"),n=I;t.hidden=!0,G(),I=null,n&&n(e)}function G(){const e=document.getElementById("admin-modal"),t=document.getElementById("confirm-modal"),n=e&&!e.hidden||t&&!t.hidden;document.body.classList.toggle("admin-modal-open",!!n)}function re(e){const t=async()=>{try{const s=await P(ce,{method:"POST",body:e});return s!=null&&s.updatedAt&&v({lastRemoteUpdate:s.updatedAt}),s}catch(s){throw s.status===401&&v({admin:!1,readOnly:!0}),s}},n=Oe.then(t,t);return Oe=n.catch(()=>{}),n}function Rt(){return!!document.querySelector(".sc-input:focus, .b-score-input:focus")}function xt(){return["localhost","127.0.0.1"].includes(window.location.hostname)}function Nt(e){return e.source==="local-dev"?!0:e.authConfigured}async function P(e,t={}){const n={method:t.method||"GET",credentials:"same-origin",headers:{Accept:"application/json",...t.headers}};t.body!==void 0&&(n.body=JSON.stringify(t.body),n.headers["Content-Type"]="application/json");let s;try{s=await fetch(e,n)}catch{throw new Error("API Vercel indisponible sur cet environnement.")}const a=await qt(s);if(!s.ok){const o=new Error((a==null?void 0:a.error)||(a==null?void 0:a.message)||`Erreur ${s.status}`);throw o.status=s.status,o.payload=a,o}return a}async function qt(e){if((e.headers.get("content-type")||"").includes("application/json"))return e.json();const n=await e.text();if(!n)return{};try{return JSON.parse(n)}catch{return{message:n}}}
