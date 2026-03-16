(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))n(s);new MutationObserver(s=>{for(const a of s)if(a.type==="childList")for(const o of a.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&n(o)}).observe(document,{childList:!0,subtree:!0});function r(s){const a={};return s.integrity&&(a.integrity=s.integrity),s.referrerPolicy&&(a.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?a.credentials="include":s.crossOrigin==="anonymous"?a.credentials="omit":a.credentials="same-origin",a}function n(s){if(s.ep)return;s.ep=!0;const a=r(s);fetch(s.href,a)}})();const z="go-ouest-2026",Ee=["go-ouest-2025"],we={source:"booting",admin:!1,readOnly:!0,remote:!1,authConfigured:!0,lastRemoteUpdate:null};let g=Me(),O={...we},G=null;const I=[];function $e(){return g}function R(e){return g.scores[String(e)]||{}}function Oe(){return T(N(),{persist:!0,notify:!0}),g}function T(e,t={}){const{notify:r=!0,persist:n=!0}=t,s=fe(e),a=!Ce(g,s);return g=s,n&&x(),r&&a&&Q(),{changed:a,state:g}}function S(){return{...O}}function E(){return O.readOnly}function b(e,t={}){const{forceNotify:r=!1}=t,n={...O,...e},s=!Be(O,n);return O=n,(s||r)&&Q(),O}function te(e){G=e||null}function ue(e,t,r){return E()||(pe(g,e,t,r),x()),g}async function me(e,t,r){if(E())return g;const n=Le(g);if(pe(g,e,t,r),x(),Q(),!G)return g;try{const s=await G({type:"setScore",matchId:String(e),side:t,value:X(r)});return s!=null&&s.state&&T(s.state,{persist:!0,notify:!0}),g}catch(s){throw g=n,x(),Q(),Te(s),s}}function Ae(e){return I.push(e),()=>{const t=I.indexOf(e);t>=0&&I.splice(t,1)}}function Me(){const e=localStorage.getItem(z);if(e)return ne(e);for(const t of Ee){const r=localStorage.getItem(t);if(!r)continue;const n=ne(r);return localStorage.setItem(z,JSON.stringify(n)),n}return N()}function N(){return{scores:{}}}function ne(e){try{return fe(JSON.parse(e))}catch{return N()}}function fe(e){const t=e==null?void 0:e.scores;if(!t||typeof t!="object"||Array.isArray(t))return N();const r={};return Object.entries(t).forEach(([n,s])=>{if(!s||typeof s!="object"||Array.isArray(s))return;const a={};["s1","s2"].forEach(o=>{const i=X(s[o]);i!==void 0&&(a[o]=i)}),!(a.s1==null&&a.s2==null)&&(r[String(n)]=a)}),{scores:r}}function pe(e,t,r,n){if(r!=="s1"&&r!=="s2")return;const s=X(n);if(s===void 0)return;const a=String(t),o=e.scores[a]?{...e.scores[a]}:{};if(o[r]=s,o.s1==null&&o.s2==null){delete e.scores[a];return}e.scores[a]=o}function X(e){if(e===""||e==null)return null;const t=Number(e);if(!(!Number.isFinite(t)||t<0))return t}function Ce(e,t){return JSON.stringify(e)===JSON.stringify(t)}function Be(e,t){const r=Object.keys(e),n=Object.keys(t);return r.length!==n.length?!1:r.every(s=>e[s]===t[s])}function Le(e){return JSON.parse(JSON.stringify(e))}function Te(e){typeof window>"u"||window.dispatchEvent(new CustomEvent("go-ouest:sync-error",{detail:{error:e}}))}function x(){localStorage.setItem(z,JSON.stringify(g))}function Q(){const e=$e(),t=S();I.forEach(r=>r(e,t))}const ge=[{id:1,p1:"Colombe",p2:"Pierre"},{id:2,p1:"Castille",p2:"Léo D."},{id:3,p1:"Eugénie",p2:"Cyprien"},{id:4,p1:"Capucine",p2:"Henri"},{id:5,p1:"Valentine",p2:"Hugues"},{id:6,p1:"Candice",p2:"Alfred"},{id:7,p1:"Charlotte",p2:"Hippolyte"},{id:8,p1:"Clarisse",p2:"Alban R."},{id:9,p1:"Marion",p2:"Karol"},{id:10,p1:"Philippine",p2:"Xavier"},{id:11,p1:"Paola A.",p2:"Grégoire"},{id:12,p1:"Marie D.",p2:"Alban"},{id:13,p1:"Louise B.",p2:"Louis S."},{id:14,p1:"Charlotte G.",p2:"Amaury"},{id:15,p1:"Iklil",p2:"Jean"},{id:16,p1:"Margaux",p2:"Donatien"},{id:17,p1:"Paula",p2:"Paul"},{id:18,p1:"Théophile",p2:"Maylis"},{id:19,p1:"Eléonore",p2:"Stan"},{id:20,p1:"Mathilde",p2:"Victor"},{id:25,p1:"Sixtine",p2:"Gaspard"},{id:26,p1:"Anne-Thaïs",p2:"Brieuc"},{id:27,p1:"Aglaé",p2:"Gauthier"}],C=[{name:"Poule A",color:"#1a5c38",teams:[1,8,15,26]},{name:"Poule B",color:"#1a4a7c",teams:[2,9,16,27]},{name:"Poule C",color:"#7c1a1a",teams:[3,10,17]},{name:"Poule D",color:"#6b21a8",teams:[4,11,18]},{name:"Poule E",color:"#92400e",teams:[5,12,19]},{name:"Poule F",color:"#0e6b5e",teams:[6,13,20]},{name:"Poule G",color:"#155e75",teams:[7,14,25]}],Pe=15,Ie=5,he=Pe+Ie,ke=10,xe=e=>ge.find(t=>t.id===e),M=e=>{const t=xe(e);return`${t.p1} & ${t.p2}`},H={quarterfinals:[{id:"QF1",label:"QF1",sides:[{qualifier:0},{qualifier:7}]},{id:"QF2",label:"QF2",sides:[{qualifier:1},{qualifier:6}]},{id:"QF3",label:"QF3",sides:[{qualifier:2},{qualifier:5}]},{id:"QF4",label:"QF4",sides:[{qualifier:3},{qualifier:4}]}],semifinals:[{id:"SF1",label:"SF1",sides:[{winnerOf:"QF1"},{winnerOf:"QF2"}]},{id:"SF2",label:"SF2",sides:[{winnerOf:"QF3"},{winnerOf:"QF4"}]}],finals:[{id:"F",label:"Finale",sides:[{winnerOf:"SF1"},{winnerOf:"SF2"}]},{id:"TP",label:"3e place",sides:[{loserOf:"SF1"},{loserOf:"SF2"}]}]};function _(){const e=[];let t=1;return C.forEach(r=>{const n=r.teams;for(let s=0;s<n.length;s++)for(let a=s+1;a<n.length;a++)e.push({id:t++,pool:r.name,color:r.color,t1:n[s],t2:n[a]})}),e}function Qe(e){const t={};e.forEach(a=>{var o;(t[o=a.pool]??(t[o]=[])).push(a)});const r=Object.values(t),n=e.length,s=[];return r.forEach((a,o)=>{const i=n/a.length,f=o*(i/r.length);a.forEach((m,l)=>s.push({m,pos:f+l*i}))}),s.sort((a,o)=>a.pos-o.pos),s.map(a=>a.m)}function Re(e){const t=Qe(e),r=[];for(;t.length;){const n=new Set([...(r[r.length-1]||[]).flatMap(i=>[i.t1,i.t2]),...(r[r.length-2]||[]).flatMap(i=>[i.t1,i.t2])]),s=new Set((r[r.length-1]||[]).flatMap(i=>[i.t1,i.t2])),a=new Set,o=[];for(let i=0;i<3&&o.length<2;i++){const f=i===0?n:i===1?s:new Set;for(let m=0;m<t.length&&o.length<2;m++){const l=t[m];!a.has(l.t1)&&!a.has(l.t2)&&!f.has(l.t1)&&!f.has(l.t2)&&(o.push(l),a.add(l.t1),a.add(l.t2),t.splice(m--,1))}}r.push(o)}return r}function Ne(e,t,r){let n=0,s=0,a=0,o=0,i=0,f=0,m=0;return r.filter(l=>l.pool===t&&(l.t1===e||l.t2===e)).forEach(l=>{const d=R(l.id);if(d.s1==null||d.s2==null)return;const c=l.t1===e?d.s1:d.s2,y=l.t1===e?d.s2:d.s1;n++,f+=c,m+=y,c>y?(s++,i+=3):c===y?(o++,i+=1):a++}),{j:n,v:s,d:a,n:o,pts:i,gf:f,ga:m}}function K(e,t){return e.teams.map(r=>({id:r,...Ne(r,e.name,t)})).sort((r,n)=>n.pts-r.pts||n.gf-n.ga-(r.gf-r.ga)||n.gf-r.gf)}function _e(e){const t=C.map(n=>{var a,o;const s=K(n,e);return{team:(a=s[0])==null?void 0:a.id,pool:n.name,color:n.color,pts:((o=s[0])==null?void 0:o.pts)??0}}),r=C.filter(n=>n.teams.length>=4).map(n=>{var a,o,i,f;const s=K(n,e);return{team:(a=s[1])==null?void 0:a.id,pool:n.name,color:n.color,pts:((o=s[1])==null?void 0:o.pts)??0,gf:((i=s[1])==null?void 0:i.gf)??0,ga:((f=s[1])==null?void 0:f.ga)??0,isWild:!0}}).sort((n,s)=>s.pts-n.pts||s.gf-s.ga-(n.gf-n.ga)||s.gf-n.gf)[0];return[...t,r]}function qe(e){var a;const t=_e(e),r=new Map(t.filter(o=>o==null?void 0:o.team).map(o=>[o.team,o])),n={},s={quarterfinals:D(H.quarterfinals,t,r,n),semifinals:D(H.semifinals,t,r,n),finals:D(H.finals,t,r,n)};return{qualifiers:t,rounds:s,champion:((a=s.finals[0])==null?void 0:a.winner)??null}}function D(e,t,r,n){return e.map(s=>{const a=s.sides.map(m=>He(m,t,n)),o=R(s.id),i=De(a,o,r),f={id:s.id,label:s.label,sides:a,score:o,ready:a.every(m=>m==null?void 0:m.team),...i};return n[s.id]=f,f})}function He(e,t,r){var n,s;return e.qualifier!=null?t[e.qualifier]??null:e.winnerOf?((n=r[e.winnerOf])==null?void 0:n.winner)??null:e.loserOf?((s=r[e.loserOf])==null?void 0:s.loser)??null:null}function De(e,t,r){const[n,s]=e;if(!(n!=null&&n.team)||!(s!=null&&s.team)||t.s1==null||t.s2==null||t.s1===t.s2)return{winner:null,loser:null,isTie:t.s1!=null&&t.s1===t.s2};const a=t.s1>t.s2?n.team:s.team,o=a===n.team?s.team:n.team;return{winner:r.get(a)??{team:a},loser:r.get(o)??{team:o},isTie:!1}}const je=["QF1","QF2","QF3","QF4","SF1","SF2","F","TP"];function Ue(){const e={};return _().forEach(t=>{e[String(t.id)]=ze()}),je.forEach(t=>{e[t]=Ge()}),{scores:e}}function ze(){if(Math.random()<.18){const e=J(4,9);return{s1:e,s2:e}}return ve(4,9)}function Ge(){return ve(4,9)}function ve(e,t){const r=J(e,t),n=J(0,Math.max(0,r-1));return Math.random()<.5?{s1:r,s2:n}:{s1:n,s2:r}}function J(e,t){return Math.floor(Math.random()*(t-e+1))+e}function Ke(e){const t=_(),r=s=>["r1","r2","r3","rn"][Math.min(s,3)],n=s=>{const o=K(s,t).map((i,f)=>`
      <tr class="${f===0?"q":""}">
        <td><span class="rnk ${r(f)}">${f+1}</span></td>
        <td><span class="duo-name">${M(i.id)}</span></td>
        <td>${i.j}</td>
        <td>${i.v}</td>
        <td>${i.d}</td>
        <td><span class="pts-badge">${i.pts}</span></td>
      </tr>`).join("");return`
      <div class="pool-card">
        <div class="pool-hdr" style="background:${s.color}">
          <h3>${s.name}</h3>
          <span class="badge">${s.teams.length} duos</span>
        </div>
        <table class="stand-table">
          <thead><tr><th>#</th><th>Duo</th><th>J</th><th>V</th><th>D</th><th>Pts</th></tr></thead>
          <tbody>${o}</tbody>
        </table>
      </div>`};e.innerHTML=`
    <div class="tourney-meta">${ge.length} duos · ${C.length} poules · ${t.length} matchs · 2 terrains · 6h</div>
    <div class="banner info">
      ℹ️ <div>
        <strong>Format :</strong> 7 poules → top 1 de chaque poule + meilleur 2ème = <strong>8 qualifiés</strong>.
        Ligne <span class="q-sample">orange</span> = qualifié provisoire.
      </div>
    </div>
    <div class="pools-grid">${C.map(n).join("")}</div>`}function se(e){return e.replace(/\D+/g,"").slice(0,2)}function re(e){const t=ke*60+e*he,r=Math.floor(t/60),n=t%60;return`${String(r).padStart(2,"0")}:${String(n).padStart(2,"0")}`}function Je(e){const t=E(),r=_(),n=Re(r),s=n.length*he,a=Math.floor(s/60),o=s%60,i=(l,d)=>{if(!l)return`<div class="empty-slot"><span class="m-time">${re(d)}</span><span>—</span></div>`;const c=R(l.id);return`
      <div class="match-row" data-mid="${l.id}">
        <span class="m-time">${re(d)}</span>
        <div class="m-body">
          <div class="m-teams">${M(l.t1)} <span class="vs">vs</span> ${M(l.t2)}</div>
          <span class="m-pool-tag" style="background:${l.color}">${l.pool}</span>
        </div>
        <div class="m-score">
          <input class="sc-input" type="text" inputmode="numeric" pattern="[0-9]*" maxlength="2"
            value="${c.s1??""}" placeholder="—"
            data-mid="${l.id}" data-side="s1" ${t?"disabled":""}>
          <span class="sc-sep">:</span>
          <input class="sc-input" type="text" inputmode="numeric" pattern="[0-9]*" maxlength="2"
            value="${c.s2??""}" placeholder="—"
            data-mid="${l.id}" data-side="s2" ${t?"disabled":""}>
        </div>
      </div>`};let f="",m="";n.forEach((l,d)=>{f+=i(l[0]||null,d),m+=i(l[1]||null,d)}),e.innerHTML=`
    <div class="banner">
      ⚠️ <strong>${r.length} matchs · ${n.length} créneaux · ~${a}h${o>0?o:""}.</strong>
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
        ${m}
      </div>
    </div>`,e.dataset.scoreBound!=="true"&&(e.addEventListener("input",l=>{if(E())return;const d=l.target;if(!d.dataset.mid)return;const c=se(d.value);d.value!==c&&(d.value=c),ue(d.dataset.mid,d.dataset.side,c)}),e.addEventListener("focusout",l=>{if(E())return;const d=l.target;if(!d.dataset.mid)return;const c=se(d.value);d.value!==c&&(d.value=c),me(d.dataset.mid,d.dataset.side,c)}),e.addEventListener("keydown",l=>{if(l.key!=="Enter")return;const d=l.target;d.dataset.mid&&d.blur()}),e.dataset.scoreBound="true")}const Ve=[["QF1","SF1"],["QF2","SF1"],["QF3","SF2"],["QF4","SF2"],["SF1","F"],["SF2","F"],["SF1","TP"],["SF2","TP"],["F","CHAMPION"]];function ae(e){return e.replace(/\D+/g,"").slice(0,2)}const We=e=>e!=null&&e.team?`<span class="m-pool-tag" style="background:${e.color??"#888"}">${e.pool??"Phase finale"}${e.isWild?" ⭐":""}</span>`:'<span class="b-team-meta">À déterminer</span>',oe=(e,t,r,n)=>{if(!(e!=null&&e.team))return'<div class="b-team b-team--tbd"><span>À déterminer</span></div>';const s=R(t);return`
    <div class="b-team">
      <div class="b-team-main">
        ${We(e)}
        <span>${M(e.team)}</span>
      </div>
      <div class="b-score">
        <input class="b-score-input" type="text" inputmode="numeric" pattern="[0-9]*" maxlength="2"
          value="${s[r]??""}" placeholder="—"
          data-mid="${t}" data-side="${r}" ${n?"disabled":""}>
      </div>
    </div>`};function Ye(e){const t=E(),r=_(),{qualifiers:n,rounds:s,champion:a}=qe(r),[o,i,f,m,l,d,c,y]=n,q=n.map((u,p)=>`
    <div class="qual-card" style="border-color:${(u==null?void 0:u.color)||"#aaa"}">
      <div class="qual-pool" style="color:${(u==null?void 0:u.color)||"#aaa"}">
        ${(u==null?void 0:u.pool)||"—"}${u!=null&&u.isWild?" ⭐ Wildcard":""}
      </div>
      <div class="qual-name">${u!=null&&u.team?M(u.team):"—"}</div>
      <div class="qual-meta">QF${p+1} · ${(u==null?void 0:u.pts)??0} pts</div>
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
                ${F(s.quarterfinals[0],`${(o==null?void 0:o.pool)??"—"} vs ${(y==null?void 0:y.pool)??"—"}`,t)}
                ${F(s.quarterfinals[1],`${(i==null?void 0:i.pool)??"—"} vs ${(c==null?void 0:c.pool)??"—"}`,t)}
                ${F(s.quarterfinals[2],`${(f==null?void 0:f.pool)??"—"} vs ${(d==null?void 0:d.pool)??"—"}`,t)}
                ${F(s.quarterfinals[3],`${(m==null?void 0:m.pool)??"—"} vs ${(l==null?void 0:l.pool)??"—"}`,t)}
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
                  <div class="trophy-sub">${a!=null&&a.team?M(a.team):"À déterminer"}</div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>

    <div class="section-card" style="margin-top:1.25rem">
      <div class="section-title" style="margin-bottom:1rem">Qualifiés provisoires</div>
      <div class="qual-grid">${q}</div>
    </div>`,Xe(e),V(e),e.dataset.scoreBound!=="true"&&(e.addEventListener("input",u=>{if(E())return;const p=u.target;if(!p.dataset.mid)return;const $=ae(p.value);p.value!==$&&(p.value=$),ue(p.dataset.mid,p.dataset.side,$)}),e.addEventListener("focusout",u=>{if(E())return;const p=u.target;if(!p.dataset.mid)return;const $=ae(p.value);p.value!==$&&(p.value=$),me(p.dataset.mid,p.dataset.side,$)}),e.addEventListener("keydown",u=>{if(u.key!=="Enter")return;const p=u.target;p.dataset.mid&&p.blur()}),e.dataset.scoreBound="true")}function Xe(e){e._bracketResizeObserver||(e._bracketResizeObserver=new ResizeObserver(()=>V(e)));const t=e.querySelector(".bracket-stage");e._observedBracketStage&&e._observedBracketStage!==t&&e._bracketResizeObserver.unobserve(e._observedBracketStage),t&&e._observedBracketStage!==t&&(e._bracketResizeObserver.observe(t),e._observedBracketStage=t),e._bracketWindowBound||(e._bracketWindowBound=!0,window.addEventListener("resize",()=>V(e)))}function V(e){e._bracketRaf&&cancelAnimationFrame(e._bracketRaf),e._bracketRaf=requestAnimationFrame(()=>{e._bracketRaf=null,Ze(e)})}function Ze(e){const t=e.querySelector(".bracket-stage");if(!t)return;const r={quarters:t.querySelector(".b-round--quarters .b-round-body"),semis:t.querySelector(".b-round--semis .b-round-body"),finals:t.querySelector(".b-round--finals .b-round-body"),champion:t.querySelector(".b-round--champion .b-round-body")},n={QF1:t.querySelector('[data-match-id="QF1"]'),QF2:t.querySelector('[data-match-id="QF2"]'),QF3:t.querySelector('[data-match-id="QF3"]'),QF4:t.querySelector('[data-match-id="QF4"]'),SF1:t.querySelector('[data-match-id="SF1"]'),SF2:t.querySelector('[data-match-id="SF2"]'),F:t.querySelector('[data-match-id="F"]'),TP:t.querySelector('[data-match-id="TP"]'),CHAMPION:t.querySelector('[data-node-id="CHAMPION"]')};if(Object.values(r).some(u=>!u)||Object.values(n).some(u=>!u))return;const s=t.querySelector(".b-label-3rd");if(!s)return;const a=n.QF1.getBoundingClientRect().height,o=n.CHAMPION.getBoundingClientRect().height,i=s.getBoundingClientRect().height,f=16,m=24,l=28,d=10,c={QF1:0,QF2:a+f};c.QF3=c.QF2+a+m,c.QF4=c.QF3+a+f,c.SF1=j(c.QF1+a/2,c.QF2+a/2)-a/2,c.SF2=j(c.QF3+a/2,c.QF4+a/2)-a/2,c.F=j(c.SF1+a/2,c.SF2+a/2)-a/2;const y=c.F+a+l;c.TP=y+i+d,c.CHAMPION=c.F+(a-o)/2;const q=Math.max(c.QF4+a,c.SF2+a,c.TP+a,c.CHAMPION+o);Object.values(r).forEach(u=>{u.style.height=`${q}px`}),["QF1","QF2","QF3","QF4","SF1","SF2","F","TP"].forEach(u=>{const p=n[u];p.style.top=`${c[u]}px`}),s.style.top=`${y}px`,n.CHAMPION.style.top=`${c.CHAMPION}px`,et(t)}function j(e,t){return(e+t)/2}function et(e){const t=e.querySelector(".bracket-svg");if(!t)return;const r=e.getBoundingClientRect(),n=Math.ceil(r.width),s=Math.ceil(r.height);t.setAttribute("viewBox",`0 0 ${n} ${s}`),t.setAttribute("width",n),t.setAttribute("height",s),t.innerHTML=Ve.map(([a,o])=>{const i=ie(e,a),f=ie(e,o);if(!i||!f)return"";const m=le(i,"right",r),l=le(f,"left",r),d=m.x+(l.x-m.x)/2;return`<path d="M ${m.x} ${m.y} L ${d} ${m.y} L ${d} ${l.y} L ${l.x} ${l.y}" />`}).join("")}function ie(e,t){return t==="CHAMPION"?e.querySelector('[data-node-id="CHAMPION"]'):e.querySelector(`[data-match-id="${t}"] .b-match`)}function le(e,t,r){const n=e.getBoundingClientRect();return{x:Math.round((t==="left"?n.left:n.right)-r.left),y:Math.round(n.top+n.height/2-r.top)}}function F(e,t,r){return`
    <div class="b-match-wrap" data-match-id="${e.id}">
      <div class="b-match">
        <div class="b-match-head">
          <span>${e.label}</span>
          ${e.isTie?'<span class="b-error">Pas de match nul</span>':`<span class="b-side-label">${t}</span>`}
        </div>
        ${oe(e.sides[0],e.id,"s1",!e.ready||r)}
        ${oe(e.sides[1],e.id,"s2",!e.ready||r)}
      </div>
    </div>`}const tt=5e3,B="/api/tournament",W="/api/admin/session",Z={poules:()=>Ke(document.getElementById("poules")),planning:()=>Je(document.getElementById("planning")),finale:()=>Ye(document.getElementById("finale"))};let ye="poules",U=null,k=null,v=!1,be=null;document.querySelectorAll(".tab-btn").forEach(e=>{e.addEventListener("click",()=>st(e.dataset.tab))});lt();ct();window.addEventListener("go-ouest:sync-error",e=>{var r,n;const t=((n=(r=e.detail)==null?void 0:r.error)==null?void 0:n.message)||"Synchronisation impossible.";h(t,"error")});Ae(()=>{A(),Z[ye]()});nt();async function nt(){await rt(),A(),Z.poules()}function st(e){document.querySelectorAll(".tab-content").forEach(t=>t.classList.remove("active")),document.querySelectorAll(".tab-btn").forEach(t=>t.classList.remove("active")),document.getElementById(e).classList.add("active"),document.querySelector(`[data-tab="${e}"]`).classList.add("active"),ye=e,Z[e]()}async function rt(){const e=await ot();await at(e)||it(be,e)}async function at(e){try{const t=await w(B);return T(t.state,{persist:!0,notify:!1}),b({source:"remote",remote:!0,admin:e.admin,readOnly:!e.admin,authConfigured:e.authConfigured,lastRemoteUpdate:t.updatedAt??null}),te(async r=>{try{const n=await w(B,{method:"POST",body:r});return n!=null&&n.updatedAt&&b({lastRemoteUpdate:n.updatedAt}),n}catch(n){throw n.status===401&&b({admin:!1,readOnly:!0}),n}}),dt(),!0}catch(t){return be=t,Se(),te(null),!1}}async function ot(){try{const e=await w(W);return{admin:!!e.admin,authConfigured:e.configured!==!1}}catch(e){return{admin:!1,authConfigured:e.status!==503}}}function it(e,t){if(pt()){b({source:"local-dev",remote:!1,admin:!0,readOnly:!1,authConfigured:!0,lastRemoteUpdate:null}),h("API Vercel indisponible ici : mode local de developpement actif.","info");return}b({source:"remote-down",remote:!1,admin:!1,readOnly:!0,authConfigured:(t==null?void 0:t.authConfigured)??!1,lastRemoteUpdate:null}),h((e==null?void 0:e.message)||"Synchronisation indisponible : la page reste en lecture seule.","error")}function lt(){const e=document.getElementById("admin-access-trigger"),t=document.getElementById("admin-modal"),r=t.querySelectorAll("[data-admin-close]"),n=document.getElementById("admin-login-form"),s=document.getElementById("admin-password"),a=document.getElementById("admin-logout");e.addEventListener("click",()=>mt()),r.forEach(o=>{o.addEventListener("click",()=>P())}),n.addEventListener("submit",async o=>{if(o.preventDefault(),!v){Y(),v=!0,A();try{await w(W,{method:"POST",body:{password:s.value}}),s.value="",S().remote?(b({admin:!0,readOnly:!1}),await L({silent:!0,forceRender:!0}),h("Mode admin active sur cet appareil.","success")):(b({admin:!0,readOnly:!1,source:"local-admin"}),h("Mode admin local actif sur cet appareil.","warning")),ee()}catch(i){de(i.message||"Connexion admin impossible.")}finally{v=!1,A()}}}),a.addEventListener("click",async()=>{if(!v){if(S().source==="local-dev"){P();return}v=!0,Y(),A();try{await w(W,{method:"DELETE"}),b({admin:!1,readOnly:!0}),h("Mode admin desactive sur cet appareil.","success"),P()}catch(o){de(o.message||"Deconnexion impossible.")}finally{v=!1,A()}}}),document.addEventListener("keydown",o=>{o.key==="Escape"&&!t.hidden&&P()})}function ct(){const e=document.getElementById("backup-mock"),t=document.getElementById("backup-reset");e.addEventListener("click",async()=>{if(!ce()||!window.confirm("Generer des scores aleatoires pour tout le tournoi ? Cela remplacera les scores actuels."))return;const n=Ue();try{S().remote?(await w(B,{method:"POST",body:{type:"replaceState",state:n}}),await L({silent:!0,forceRender:!0})):T(n,{persist:!0,notify:!0}),h("Mock data generee pour les tests.","success")}catch(s){h(s.message||"Generation mock impossible.","error")}}),t.addEventListener("click",async()=>{if(!(!ce()||!window.confirm("Reinitialiser tous les scores du tournoi ?")))try{S().remote?(await w(B,{method:"POST",body:{type:"reset"}}),await L({silent:!0,forceRender:!0})):Oe(),h("Scores reinitialises.","success")}catch(n){h(n.message||"Reinitialisation impossible.","error")}})}async function L(e={}){const{silent:t=!1,forceRender:r=!1}=e;if(S().remote&&!ft())try{const n=await w(B),{changed:s}=T(n.state,{persist:!0,notify:!0});b({lastRemoteUpdate:n.updatedAt??null},{forceNotify:r&&!s})}catch(n){n.status===401&&b({admin:!1,readOnly:!0}),t||h(n.message||"Synchronisation impossible.","error")}}function dt(){Se(),k=window.setInterval(()=>{document.visibilityState!=="hidden"&&L({silent:!0})},tt),document.addEventListener("visibilitychange",Fe)}function Se(){k&&(window.clearInterval(k),k=null),document.removeEventListener("visibilitychange",Fe)}function Fe(){document.visibilityState==="visible"&&L({silent:!0,forceRender:!0})}function A(){const e=S(),t=document.getElementById("admin-toolbar"),r=document.getElementById("admin-access-trigger"),n=document.getElementById("sync-badge");document.body.classList.toggle("is-admin",e.admin),document.body.classList.toggle("is-public",!e.admin),t.hidden=!e.admin,n.textContent=ut(e),r.textContent=e.admin?"Admin connecte":"Connexion admin",r.disabled=v,ee()}function ce(){return S().admin?!0:(h("Connexion admin requise pour cette action.","error"),!1)}function ut(e){return e.source==="local-dev"?"Mode local":e.source==="local-admin"?"Admin local":e.admin?"Mode admin":"Lecture seule"}function ee(){const e=S(),t=document.getElementById("admin-modal"),r=document.getElementById("admin-modal-title"),n=document.getElementById("admin-modal-copy"),s=document.getElementById("admin-login-form"),a=document.getElementById("admin-logged-panel"),o=a.querySelector(".admin-logged-panel__text"),i=document.getElementById("admin-password"),f=document.getElementById("admin-login-submit"),m=document.getElementById("admin-logout"),l=gt(e);f.disabled=v||!l,m.disabled=v,e.admin?(r.textContent=e.source==="local-dev"?"Mode local de developpement":e.source==="local-admin"?"Mode admin local":"Mode admin actif",n.textContent=e.source==="local-dev"?"Cette version locale reste editable sur cet appareil meme sans API admin.":e.source==="local-admin"?"Le mot de passe a ete accepte, mais la synchro distante est indisponible. Les changements resteront locaux a cet appareil.":"Cet appareil peut saisir les scores, generer des donnees de test et reinitialiser le tournoi.",s.hidden=!0,a.hidden=!1,o.textContent=e.source==="local-dev"?"Tu peux tester la saisie localement ici, mais rien n’est partage avec les autres appareils.":e.source==="local-admin"?"Tu peux saisir localement sur cet appareil en attendant le retour de la synchro.":"Tu peux maintenant saisir les scores et utiliser la barre d’actions admin en bas de page.",m.textContent=e.source==="local-dev"?"Fermer":"Se deconnecter"):(r.textContent="Connexion admin",n.textContent=e.authConfigured?e.remote?"Entrez le mot de passe organisateurs pour debloquer la saisie sur cet appareil.":"La synchro distante est indisponible, mais tu peux quand meme ouvrir un mode admin local sur cet appareil.":"La connexion admin n’est pas encore configuree sur ce deploiement.",s.hidden=!l,a.hidden=!0,i.disabled=v||!l,m.textContent="Se deconnecter"),!t.hidden&&!e.admin&&!v&&!i.disabled&&window.setTimeout(()=>i.focus(),0)}function mt(){const e=document.getElementById("admin-modal");e.hidden=!1,document.body.classList.add("admin-modal-open"),ee()}function P(){const e=document.getElementById("admin-modal"),t=document.getElementById("admin-password");e.hidden=!0,document.body.classList.remove("admin-modal-open"),t.value="",Y()}function Y(){const e=document.getElementById("admin-error");e.textContent=""}function de(e){const t=document.getElementById("admin-error");t.textContent=e}function h(e,t=""){const r=document.getElementById("backup-status");r.textContent=e,r.dataset.kind=t,U&&clearTimeout(U),U=window.setTimeout(()=>{r.textContent="",r.dataset.kind=""},3500)}function ft(){return!!document.querySelector(".sc-input:focus, .b-score-input:focus")}function pt(){return["localhost","127.0.0.1"].includes(window.location.hostname)}function gt(e){return e.source==="local-dev"?!0:e.authConfigured}async function w(e,t={}){const r={method:t.method||"GET",credentials:"same-origin",headers:{Accept:"application/json",...t.headers}};t.body!==void 0&&(r.body=JSON.stringify(t.body),r.headers["Content-Type"]="application/json");let n;try{n=await fetch(e,r)}catch{throw new Error("API Vercel indisponible sur cet environnement.")}const s=await ht(n);if(!n.ok){const a=new Error((s==null?void 0:s.error)||(s==null?void 0:s.message)||`Erreur ${n.status}`);throw a.status=n.status,a.payload=s,a}return s}async function ht(e){if((e.headers.get("content-type")||"").includes("application/json"))return e.json();const r=await e.text();if(!r)return{};try{return JSON.parse(r)}catch{return{message:r}}}
