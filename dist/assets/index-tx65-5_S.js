(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const n of document.querySelectorAll('link[rel="modulepreload"]'))s(n);new MutationObserver(n=>{for(const a of n)if(a.type==="childList")for(const o of a.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&s(o)}).observe(document,{childList:!0,subtree:!0});function r(n){const a={};return n.integrity&&(a.integrity=n.integrity),n.referrerPolicy&&(a.referrerPolicy=n.referrerPolicy),n.crossOrigin==="use-credentials"?a.credentials="include":n.crossOrigin==="anonymous"?a.credentials="omit":a.credentials="same-origin",a}function s(n){if(n.ep)return;n.ep=!0;const a=r(n);fetch(n.href,a)}})();const z="go-ouest-2026",$e=["go-ouest-2025"],Ee={source:"booting",admin:!1,readOnly:!0,remote:!1,authConfigured:!0,lastRemoteUpdate:null};let g=Ce(),O={...Ee},G=null;const P=[];function de(){return g}function Q(e){return g.scores[String(e)]||{}}function we(){return T(N(),{persist:!0,notify:!0}),g}function T(e,t={}){const{notify:r=!0,persist:s=!0}=t,n=fe(e),a=!Me(g,n);return g=n,s&&x(),r&&a&&R(),{changed:a,state:g}}function w(){return{...O}}function F(){return O.readOnly}function b(e,t={}){const{forceNotify:r=!1}=t,s={...O,...e},n=!Ae(O,s);return O=s,(n||r)&&R(),O}function te(e){G=e||null}function ue(e,t,r){return F()||(pe(g,e,t,r),x()),g}async function me(e,t,r){if(F())return g;const s=Be(g);if(pe(g,e,t,r),x(),R(),!G)return g;try{const n=await G({type:"setScore",matchId:String(e),side:t,value:X(r)});return n!=null&&n.state&&T(n.state,{persist:!0,notify:!0}),g}catch(n){throw g=s,x(),R(),Le(n),n}}function Oe(e){return P.push(e),()=>{const t=P.indexOf(e);t>=0&&P.splice(t,1)}}function Ce(){const e=localStorage.getItem(z);if(e)return ne(e);for(const t of $e){const r=localStorage.getItem(t);if(!r)continue;const s=ne(r);return localStorage.setItem(z,JSON.stringify(s)),s}return N()}function N(){return{scores:{}}}function ne(e){try{return fe(JSON.parse(e))}catch{return N()}}function fe(e){const t=e==null?void 0:e.scores;if(!t||typeof t!="object"||Array.isArray(t))return N();const r={};return Object.entries(t).forEach(([s,n])=>{if(!n||typeof n!="object"||Array.isArray(n))return;const a={};["s1","s2"].forEach(o=>{const i=X(n[o]);i!==void 0&&(a[o]=i)}),!(a.s1==null&&a.s2==null)&&(r[String(s)]=a)}),{scores:r}}function pe(e,t,r,s){if(r!=="s1"&&r!=="s2")return;const n=X(s);if(n===void 0)return;const a=String(t),o=e.scores[a]?{...e.scores[a]}:{};if(o[r]=n,o.s1==null&&o.s2==null){delete e.scores[a];return}e.scores[a]=o}function X(e){if(e===""||e==null)return null;const t=Number(e);if(!(!Number.isFinite(t)||t<0))return t}function Me(e,t){return JSON.stringify(e)===JSON.stringify(t)}function Ae(e,t){const r=Object.keys(e),s=Object.keys(t);return r.length!==s.length?!1:r.every(n=>e[n]===t[n])}function Be(e){return JSON.parse(JSON.stringify(e))}function Le(e){typeof window>"u"||window.dispatchEvent(new CustomEvent("go-ouest:sync-error",{detail:{error:e}}))}function x(){localStorage.setItem(z,JSON.stringify(g))}function R(){const e=de(),t=w();P.forEach(r=>r(e,t))}const ge=[{id:1,p1:"Colombe",p2:"Pierre"},{id:2,p1:"Castille",p2:"Léo D."},{id:3,p1:"Eugénie",p2:"Cyprien"},{id:4,p1:"Capucine",p2:"Henri"},{id:5,p1:"Valentine",p2:"Hugues"},{id:6,p1:"Candice",p2:"Alfred"},{id:7,p1:"Charlotte",p2:"Hippolyte"},{id:8,p1:"Clarisse",p2:"Alban R."},{id:9,p1:"Marion",p2:"Karol"},{id:10,p1:"Philippine",p2:"Xavier"},{id:11,p1:"Paola A.",p2:"Grégoire"},{id:12,p1:"Marie D.",p2:"Alban"},{id:13,p1:"Louise B.",p2:"Louis S."},{id:14,p1:"Charlotte G.",p2:"Amaury"},{id:15,p1:"Iklil",p2:"Jean"},{id:16,p1:"Margaux",p2:"Donatien"},{id:17,p1:"Paula",p2:"Paul"},{id:18,p1:"Théophile",p2:"Maylis"},{id:19,p1:"Eléonore",p2:"Stan"},{id:20,p1:"Mathilde",p2:"Victor"},{id:25,p1:"Sixtine",p2:"Gaspard"},{id:26,p1:"Anne-Thaïs",p2:"Brieuc"},{id:27,p1:"Aglaé",p2:"Gauthier"}],A=[{name:"Poule A",color:"#1a5c38",teams:[1,8,15,26]},{name:"Poule B",color:"#1a4a7c",teams:[2,9,16,27]},{name:"Poule C",color:"#7c1a1a",teams:[3,10,17]},{name:"Poule D",color:"#6b21a8",teams:[4,11,18]},{name:"Poule E",color:"#92400e",teams:[5,12,19]},{name:"Poule F",color:"#0e6b5e",teams:[6,13,20]},{name:"Poule G",color:"#155e75",teams:[7,14,25]}],Te=15,Ie=5,he=Te+Ie,Pe=10,ke=e=>ge.find(t=>t.id===e),M=e=>{const t=ke(e);return`${t.p1} & ${t.p2}`},D={quarterfinals:[{id:"QF1",label:"QF1",sides:[{qualifier:0},{qualifier:7}]},{id:"QF2",label:"QF2",sides:[{qualifier:1},{qualifier:6}]},{id:"QF3",label:"QF3",sides:[{qualifier:2},{qualifier:5}]},{id:"QF4",label:"QF4",sides:[{qualifier:3},{qualifier:4}]}],semifinals:[{id:"SF1",label:"SF1",sides:[{winnerOf:"QF1"},{winnerOf:"QF2"}]},{id:"SF2",label:"SF2",sides:[{winnerOf:"QF3"},{winnerOf:"QF4"}]}],finals:[{id:"F",label:"Finale",sides:[{winnerOf:"SF1"},{winnerOf:"SF2"}]},{id:"TP",label:"3e place",sides:[{loserOf:"SF1"},{loserOf:"SF2"}]}]};function _(){const e=[];let t=1;return A.forEach(r=>{const s=r.teams;for(let n=0;n<s.length;n++)for(let a=n+1;a<s.length;a++)e.push({id:t++,pool:r.name,color:r.color,t1:s[n],t2:s[a]})}),e}function xe(e){const t={};e.forEach(a=>{var o;(t[o=a.pool]??(t[o]=[])).push(a)});const r=Object.values(t),s=e.length,n=[];return r.forEach((a,o)=>{const i=s/a.length,f=o*(i/r.length);a.forEach((m,l)=>n.push({m,pos:f+l*i}))}),n.sort((a,o)=>a.pos-o.pos),n.map(a=>a.m)}function Re(e){const t=xe(e),r=[];for(;t.length;){const s=new Set([...(r[r.length-1]||[]).flatMap(i=>[i.t1,i.t2]),...(r[r.length-2]||[]).flatMap(i=>[i.t1,i.t2])]),n=new Set((r[r.length-1]||[]).flatMap(i=>[i.t1,i.t2])),a=new Set,o=[];for(let i=0;i<3&&o.length<2;i++){const f=i===0?s:i===1?n:new Set;for(let m=0;m<t.length&&o.length<2;m++){const l=t[m];!a.has(l.t1)&&!a.has(l.t2)&&!f.has(l.t1)&&!f.has(l.t2)&&(o.push(l),a.add(l.t1),a.add(l.t2),t.splice(m--,1))}}r.push(o)}return r}function Qe(e,t,r){let s=0,n=0,a=0,o=0,i=0,f=0,m=0;return r.filter(l=>l.pool===t&&(l.t1===e||l.t2===e)).forEach(l=>{const d=Q(l.id);if(d.s1==null||d.s2==null)return;const c=l.t1===e?d.s1:d.s2,v=l.t1===e?d.s2:d.s1;s++,f+=c,m+=v,c>v?(n++,i+=3):c===v?(o++,i+=1):a++}),{j:s,v:n,d:a,n:o,pts:i,gf:f,ga:m}}function K(e,t){return e.teams.map(r=>({id:r,...Qe(r,e.name,t)})).sort((r,s)=>s.pts-r.pts||s.gf-s.ga-(r.gf-r.ga)||s.gf-r.gf)}function Ne(e){const t=A.map(s=>{var a,o;const n=K(s,e);return{team:(a=n[0])==null?void 0:a.id,pool:s.name,color:s.color,pts:((o=n[0])==null?void 0:o.pts)??0}}),r=A.filter(s=>s.teams.length>=4).map(s=>{var a,o,i,f;const n=K(s,e);return{team:(a=n[1])==null?void 0:a.id,pool:s.name,color:s.color,pts:((o=n[1])==null?void 0:o.pts)??0,gf:((i=n[1])==null?void 0:i.gf)??0,ga:((f=n[1])==null?void 0:f.ga)??0,isWild:!0}}).sort((s,n)=>n.pts-s.pts||n.gf-n.ga-(s.gf-s.ga)||n.gf-s.gf)[0];return[...t,r]}function _e(e){var a;const t=Ne(e),r=new Map(t.filter(o=>o==null?void 0:o.team).map(o=>[o.team,o])),s={},n={quarterfinals:H(D.quarterfinals,t,r,s),semifinals:H(D.semifinals,t,r,s),finals:H(D.finals,t,r,s)};return{qualifiers:t,rounds:n,champion:((a=n.finals[0])==null?void 0:a.winner)??null}}function H(e,t,r,s){return e.map(n=>{const a=n.sides.map(m=>qe(m,t,s)),o=Q(n.id),i=De(a,o,r),f={id:n.id,label:n.label,sides:a,score:o,ready:a.every(m=>m==null?void 0:m.team),...i};return s[n.id]=f,f})}function qe(e,t,r){var s,n;return e.qualifier!=null?t[e.qualifier]??null:e.winnerOf?((s=r[e.winnerOf])==null?void 0:s.winner)??null:e.loserOf?((n=r[e.loserOf])==null?void 0:n.loser)??null:null}function De(e,t,r){const[s,n]=e;if(!(s!=null&&s.team)||!(n!=null&&n.team)||t.s1==null||t.s2==null||t.s1===t.s2)return{winner:null,loser:null,isTie:t.s1!=null&&t.s1===t.s2};const a=t.s1>t.s2?s.team:n.team,o=a===s.team?n.team:s.team;return{winner:r.get(a)??{team:a},loser:r.get(o)??{team:o},isTie:!1}}const He=["QF1","QF2","QF3","QF4","SF1","SF2","F","TP"];function je(){const e={};return _().forEach(t=>{e[String(t.id)]=Ue()}),He.forEach(t=>{e[t]=ze()}),{scores:e}}function Ue(){if(Math.random()<.18){const e=J(4,9);return{s1:e,s2:e}}return ve(4,9)}function ze(){return ve(4,9)}function ve(e,t){const r=J(e,t),s=J(0,Math.max(0,r-1));return Math.random()<.5?{s1:r,s2:s}:{s1:s,s2:r}}function J(e,t){return Math.floor(Math.random()*(t-e+1))+e}function Ge(e){const t=_(),r=n=>["r1","r2","r3","rn"][Math.min(n,3)],s=n=>{const o=K(n,t).map((i,f)=>`
      <tr class="${f===0?"q":""}">
        <td><span class="rnk ${r(f)}">${f+1}</span></td>
        <td><span class="duo-name">${M(i.id)}</span></td>
        <td>${i.j}</td>
        <td>${i.v}</td>
        <td>${i.d}</td>
        <td><span class="pts-badge">${i.pts}</span></td>
      </tr>`).join("");return`
      <div class="pool-card">
        <div class="pool-hdr" style="background:${n.color}">
          <h3>${n.name}</h3>
          <span class="badge">${n.teams.length} duos</span>
        </div>
        <table class="stand-table">
          <thead><tr><th>#</th><th>Duo</th><th>J</th><th>V</th><th>D</th><th>Pts</th></tr></thead>
          <tbody>${o}</tbody>
        </table>
      </div>`};e.innerHTML=`
    <div class="tourney-meta">${ge.length} duos · ${A.length} poules · ${t.length} matchs · 2 terrains · 6h</div>
    <div class="banner info">
      ℹ️ <div>
        <strong>Format :</strong> 7 poules → top 1 de chaque poule + meilleur 2ème = <strong>8 qualifiés</strong>.
        Ligne <span class="q-sample">orange</span> = qualifié provisoire.
      </div>
    </div>
    <div class="pools-grid">${A.map(s).join("")}</div>`}function se(e){return e.replace(/\D+/g,"").slice(0,2)}function re(e){const t=Pe*60+e*he,r=Math.floor(t/60),s=t%60;return`${String(r).padStart(2,"0")}:${String(s).padStart(2,"0")}`}function Ke(e){const t=F(),r=_(),s=Re(r),n=s.length*he,a=Math.floor(n/60),o=n%60,i=(l,d)=>{if(!l)return`<div class="empty-slot"><span class="m-time">${re(d)}</span><span>—</span></div>`;const c=Q(l.id);return`
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
      </div>`};let f="",m="";s.forEach((l,d)=>{f+=i(l[0]||null,d),m+=i(l[1]||null,d)}),e.innerHTML=`
    <div class="banner">
      ⚠️ <strong>${r.length} matchs · ${s.length} créneaux · ~${a}h${o>0?o:""}.</strong>
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
    </div>`,e.dataset.scoreBound!=="true"&&(e.addEventListener("input",l=>{if(F())return;const d=l.target;if(!d.dataset.mid)return;const c=se(d.value);d.value!==c&&(d.value=c),ue(d.dataset.mid,d.dataset.side,c)}),e.addEventListener("focusout",l=>{if(F())return;const d=l.target;if(!d.dataset.mid)return;const c=se(d.value);d.value!==c&&(d.value=c),me(d.dataset.mid,d.dataset.side,c)}),e.addEventListener("keydown",l=>{if(l.key!=="Enter")return;const d=l.target;d.dataset.mid&&d.blur()}),e.dataset.scoreBound="true")}const Je=[["QF1","SF1"],["QF2","SF1"],["QF3","SF2"],["QF4","SF2"],["SF1","F"],["SF2","F"],["SF1","TP"],["SF2","TP"],["F","CHAMPION"]];function ae(e){return e.replace(/\D+/g,"").slice(0,2)}const Ve=e=>e!=null&&e.team?`<span class="m-pool-tag" style="background:${e.color??"#888"}">${e.pool??"Phase finale"}${e.isWild?" ⭐":""}</span>`:'<span class="b-team-meta">À déterminer</span>',oe=(e,t,r,s)=>{if(!(e!=null&&e.team))return'<div class="b-team b-team--tbd"><span>À déterminer</span></div>';const n=Q(t);return`
    <div class="b-team">
      <div class="b-team-main">
        ${Ve(e)}
        <span>${M(e.team)}</span>
      </div>
      <div class="b-score">
        <input class="b-score-input" type="text" inputmode="numeric" pattern="[0-9]*" maxlength="2"
          value="${n[r]??""}" placeholder="—"
          data-mid="${t}" data-side="${r}" ${s?"disabled":""}>
      </div>
    </div>`};function We(e){const t=F(),r=_(),{qualifiers:s,rounds:n,champion:a}=_e(r),[o,i,f,m,l,d,c,v]=s,q=s.map((u,p)=>`
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
                ${S(n.quarterfinals[0],`${(o==null?void 0:o.pool)??"—"} vs ${(v==null?void 0:v.pool)??"—"}`,t)}
                ${S(n.quarterfinals[1],`${(i==null?void 0:i.pool)??"—"} vs ${(c==null?void 0:c.pool)??"—"}`,t)}
                ${S(n.quarterfinals[2],`${(f==null?void 0:f.pool)??"—"} vs ${(d==null?void 0:d.pool)??"—"}`,t)}
                ${S(n.quarterfinals[3],`${(m==null?void 0:m.pool)??"—"} vs ${(l==null?void 0:l.pool)??"—"}`,t)}
              </div>
            </div>

            <div class="b-round b-round--semis">
              <div class="b-round-title">Demi-finales</div>
              <div class="b-round-body">
                ${S(n.semifinals[0],"Vainqueurs QF1/QF2",t)}
                ${S(n.semifinals[1],"Vainqueurs QF3/QF4",t)}
              </div>
            </div>

            <div class="b-round b-round--finals">
              <div class="b-round-title">Finale</div>
              <div class="b-round-body">
                ${S(n.finals[0],"Vainqueurs SF",t)}
                <div class="b-label-3rd">3ème place</div>
                ${S(n.finals[1],"Perdants SF",t)}
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
    </div>`,Ye(e),V(e),e.dataset.scoreBound!=="true"&&(e.addEventListener("input",u=>{if(F())return;const p=u.target;if(!p.dataset.mid)return;const E=ae(p.value);p.value!==E&&(p.value=E),ue(p.dataset.mid,p.dataset.side,E)}),e.addEventListener("focusout",u=>{if(F())return;const p=u.target;if(!p.dataset.mid)return;const E=ae(p.value);p.value!==E&&(p.value=E),me(p.dataset.mid,p.dataset.side,E)}),e.addEventListener("keydown",u=>{if(u.key!=="Enter")return;const p=u.target;p.dataset.mid&&p.blur()}),e.dataset.scoreBound="true")}function Ye(e){e._bracketResizeObserver||(e._bracketResizeObserver=new ResizeObserver(()=>V(e)));const t=e.querySelector(".bracket-stage");e._observedBracketStage&&e._observedBracketStage!==t&&e._bracketResizeObserver.unobserve(e._observedBracketStage),t&&e._observedBracketStage!==t&&(e._bracketResizeObserver.observe(t),e._observedBracketStage=t),e._bracketWindowBound||(e._bracketWindowBound=!0,window.addEventListener("resize",()=>V(e)))}function V(e){e._bracketRaf&&cancelAnimationFrame(e._bracketRaf),e._bracketRaf=requestAnimationFrame(()=>{e._bracketRaf=null,Xe(e)})}function Xe(e){const t=e.querySelector(".bracket-stage");if(!t)return;const r={quarters:t.querySelector(".b-round--quarters .b-round-body"),semis:t.querySelector(".b-round--semis .b-round-body"),finals:t.querySelector(".b-round--finals .b-round-body"),champion:t.querySelector(".b-round--champion .b-round-body")},s={QF1:t.querySelector('[data-match-id="QF1"]'),QF2:t.querySelector('[data-match-id="QF2"]'),QF3:t.querySelector('[data-match-id="QF3"]'),QF4:t.querySelector('[data-match-id="QF4"]'),SF1:t.querySelector('[data-match-id="SF1"]'),SF2:t.querySelector('[data-match-id="SF2"]'),F:t.querySelector('[data-match-id="F"]'),TP:t.querySelector('[data-match-id="TP"]'),CHAMPION:t.querySelector('[data-node-id="CHAMPION"]')};if(Object.values(r).some(u=>!u)||Object.values(s).some(u=>!u))return;const n=t.querySelector(".b-label-3rd");if(!n)return;const a=s.QF1.getBoundingClientRect().height,o=s.CHAMPION.getBoundingClientRect().height,i=n.getBoundingClientRect().height,f=16,m=24,l=28,d=10,c={QF1:0,QF2:a+f};c.QF3=c.QF2+a+m,c.QF4=c.QF3+a+f,c.SF1=j(c.QF1+a/2,c.QF2+a/2)-a/2,c.SF2=j(c.QF3+a/2,c.QF4+a/2)-a/2,c.F=j(c.SF1+a/2,c.SF2+a/2)-a/2;const v=c.F+a+l;c.TP=v+i+d,c.CHAMPION=c.F+(a-o)/2;const q=Math.max(c.QF4+a,c.SF2+a,c.TP+a,c.CHAMPION+o);Object.values(r).forEach(u=>{u.style.height=`${q}px`}),["QF1","QF2","QF3","QF4","SF1","SF2","F","TP"].forEach(u=>{const p=s[u];p.style.top=`${c[u]}px`}),n.style.top=`${v}px`,s.CHAMPION.style.top=`${c.CHAMPION}px`,Ze(t)}function j(e,t){return(e+t)/2}function Ze(e){const t=e.querySelector(".bracket-svg");if(!t)return;const r=e.getBoundingClientRect(),s=Math.ceil(r.width),n=Math.ceil(r.height);t.setAttribute("viewBox",`0 0 ${s} ${n}`),t.setAttribute("width",s),t.setAttribute("height",n),t.innerHTML=Je.map(([a,o])=>{const i=ie(e,a),f=ie(e,o);if(!i||!f)return"";const m=le(i,"right",r),l=le(f,"left",r),d=m.x+(l.x-m.x)/2;return`<path d="M ${m.x} ${m.y} L ${d} ${m.y} L ${d} ${l.y} L ${l.x} ${l.y}" />`}).join("")}function ie(e,t){return t==="CHAMPION"?e.querySelector('[data-node-id="CHAMPION"]'):e.querySelector(`[data-match-id="${t}"] .b-match`)}function le(e,t,r){const s=e.getBoundingClientRect();return{x:Math.round((t==="left"?s.left:s.right)-r.left),y:Math.round(s.top+s.height/2-r.top)}}function S(e,t,r){return`
    <div class="b-match-wrap" data-match-id="${e.id}">
      <div class="b-match">
        <div class="b-match-head">
          <span>${e.label}</span>
          ${e.isTie?'<span class="b-error">Pas de match nul</span>':`<span class="b-side-label">${t}</span>`}
        </div>
        ${oe(e.sides[0],e.id,"s1",!e.ready||r)}
        ${oe(e.sides[1],e.id,"s2",!e.ready||r)}
      </div>
    </div>`}const et=5e3,B="/api/tournament",W="/api/admin/session",Z={poules:()=>Ge(document.getElementById("poules")),planning:()=>Ke(document.getElementById("planning")),finale:()=>We(document.getElementById("finale"))};let ye="poules",U=null,k=null,h=!1,be=null;document.querySelectorAll(".tab-btn").forEach(e=>{e.addEventListener("click",()=>nt(e.dataset.tab))});it();lt();window.addEventListener("go-ouest:sync-error",e=>{var r,s;const t=((s=(r=e.detail)==null?void 0:r.error)==null?void 0:s.message)||"Synchronisation impossible.";y(t,"error")});Oe(()=>{C(),Z[ye]()});tt();async function tt(){await st(),C(),Z.poules()}function nt(e){document.querySelectorAll(".tab-content").forEach(t=>t.classList.remove("active")),document.querySelectorAll(".tab-btn").forEach(t=>t.classList.remove("active")),document.getElementById(e).classList.add("active"),document.querySelector(`[data-tab="${e}"]`).classList.add("active"),ye=e,Z[e]()}async function st(){const e=await at();await rt(e)||ot(be,e)}async function rt(e){try{const t=await $(B);return T(t.state,{persist:!0,notify:!1}),b({source:"remote",remote:!0,admin:e.admin,readOnly:!e.admin,authConfigured:e.authConfigured,lastRemoteUpdate:t.updatedAt??null}),te(async r=>{try{const s=await $(B,{method:"POST",body:r});return s!=null&&s.updatedAt&&b({lastRemoteUpdate:s.updatedAt}),s}catch(s){throw s.status===401&&b({admin:!1,readOnly:!0}),s}}),ct(),!0}catch(t){return be=t,Se(),te(null),!1}}async function at(){try{const e=await $(W);return{admin:!!e.admin,authConfigured:e.configured!==!1}}catch(e){return{admin:!1,authConfigured:e.status!==503}}}function ot(e,t){if(ht()){b({source:"local-dev",remote:!1,admin:!0,readOnly:!1,authConfigured:!0,lastRemoteUpdate:null}),y("API Vercel indisponible ici : mode local de developpement actif.","info");return}b({source:"remote-down",remote:!1,admin:!1,readOnly:!0,authConfigured:(t==null?void 0:t.authConfigured)??!1,lastRemoteUpdate:null}),y((e==null?void 0:e.message)||"Synchronisation indisponible : la page reste en lecture seule.","error")}function it(){const e=document.getElementById("admin-access-trigger"),t=document.getElementById("admin-modal"),r=t.querySelectorAll("[data-admin-close]"),s=document.getElementById("admin-login-form"),n=document.getElementById("admin-password"),a=document.getElementById("admin-logout");e.addEventListener("click",()=>mt()),r.forEach(o=>{o.addEventListener("click",()=>I())}),s.addEventListener("submit",async o=>{if(o.preventDefault(),!h){Y(),h=!0,C();try{await $(W,{method:"POST",body:{password:n.value}}),n.value="",b({admin:!0,readOnly:!1}),await L({silent:!0,forceRender:!0}),y("Mode admin active sur cet appareil.","success"),ee()}catch(i){ce(i.message||"Connexion admin impossible.")}finally{h=!1,C()}}}),a.addEventListener("click",async()=>{if(!h){if(w().source==="local-dev"){I();return}h=!0,Y(),C();try{await $(W,{method:"DELETE"}),b({admin:!1,readOnly:!0}),y("Mode admin desactive sur cet appareil.","success"),I()}catch(o){ce(o.message||"Deconnexion impossible.")}finally{h=!1,C()}}}),document.addEventListener("keydown",o=>{o.key==="Escape"&&!t.hidden&&I()})}function lt(){const e=document.getElementById("backup-mock"),t=document.getElementById("backup-reset");e.addEventListener("click",async()=>{if(!window.confirm("Generer des scores aleatoires pour tout le tournoi ? Cela remplacera les scores actuels."))return;const s=je();try{w().remote?(await $(B,{method:"POST",body:{type:"replaceState",state:s}}),await L({silent:!0,forceRender:!0})):T(s,{persist:!0,notify:!0}),y("Mock data generee pour les tests.","success")}catch(n){y(n.message||"Generation mock impossible.","error")}}),t.addEventListener("click",async()=>{if(window.confirm("Reinitialiser tous les scores du tournoi ?"))try{w().remote?(await $(B,{method:"POST",body:{type:"reset"}}),await L({silent:!0,forceRender:!0})):we(),y("Scores reinitialises.","success")}catch(s){y(s.message||"Reinitialisation impossible.","error")}})}async function L(e={}){const{silent:t=!1,forceRender:r=!1}=e;if(w().remote&&!gt())try{const s=await $(B),{changed:n}=T(s.state,{persist:!0,notify:!0});b({lastRemoteUpdate:s.updatedAt??null},{forceNotify:r&&!n})}catch(s){s.status===401&&b({admin:!1,readOnly:!0}),t||y(s.message||"Synchronisation impossible.","error")}}function ct(){Se(),k=window.setInterval(()=>{document.visibilityState!=="hidden"&&L({silent:!0})},et),document.addEventListener("visibilitychange",Fe)}function Se(){k&&(window.clearInterval(k),k=null),document.removeEventListener("visibilitychange",Fe)}function Fe(){document.visibilityState==="visible"&&L({silent:!0,forceRender:!0})}function C(){const e=w(),t=document.getElementById("admin-toolbar"),r=document.getElementById("control-title"),s=document.getElementById("backup-meta"),n=document.getElementById("admin-access-trigger"),a=document.getElementById("sync-badge");document.body.classList.toggle("is-admin",e.admin),document.body.classList.toggle("is-public",!e.admin),t.hidden=!e.admin,e.source==="local-dev"?r.textContent="Mode local de developpement":e.admin?r.textContent="Console organisateurs":r.textContent="Consultation publique",s.textContent=dt(e),a.textContent=ut(e),n.textContent=e.admin?"Admin connecte":"Connexion admin",n.disabled=h,ee()}function dt(e){const t=[],r=ft();return e.remote?t.push(e.admin?"Synchro cloud active":"Scores visibles en direct pour tous"):e.source==="local-dev"?t.push("Aucune synchro cloud sur ce poste local"):e.source==="remote-down"?t.push("Service de synchro temporairement indisponible"):t.push("Lecture seule tant que le service admin est indisponible"),e.lastRemoteUpdate&&t.push(`Maj ${pt(e.lastRemoteUpdate)}`),t.push(r>0?`${r} match${r>1?"s":""} saisi${r>1?"s":""}`:"Aucun score saisi pour l’instant"),!e.admin&&e.remote&&t.push("Seuls les organisateurs connectes peuvent modifier les scores"),!e.authConfigured&&e.remote&&t.push("Connexion admin non configuree sur ce deploiement"),t.join(" · ")}function ut(e){return e.source==="local-dev"?"Mode local":e.admin?"Mode admin":"Lecture seule"}function ee(){const e=w(),t=document.getElementById("admin-modal"),r=document.getElementById("admin-modal-title"),s=document.getElementById("admin-modal-copy"),n=document.getElementById("admin-login-form"),a=document.getElementById("admin-logged-panel"),o=a.querySelector(".admin-logged-panel__text"),i=document.getElementById("admin-password"),f=document.getElementById("admin-login-submit"),m=document.getElementById("admin-logout"),l=vt(e);f.disabled=h||!l,m.disabled=h,e.admin?(r.textContent=e.source==="local-dev"?"Mode local de developpement":"Mode admin actif",s.textContent=e.source==="local-dev"?"Cette version locale reste editable sur cet appareil meme sans API admin.":"Cet appareil peut saisir les scores, generer des donnees de test et reinitialiser le tournoi.",n.hidden=!0,a.hidden=!1,o.textContent=e.source==="local-dev"?"Tu peux tester la saisie localement ici, mais rien n’est partage avec les autres appareils.":"Tu peux maintenant saisir les scores et utiliser la barre d’actions admin en bas de page.",m.textContent=e.source==="local-dev"?"Fermer":"Se deconnecter"):(r.textContent="Connexion admin",s.textContent=e.authConfigured?e.remote?"Entrez le mot de passe organisateurs pour debloquer la saisie sur cet appareil.":"Le service de synchronisation est indisponible pour le moment. La connexion admin redevient possible des que ce service revient.":"La connexion admin n’est pas encore configuree sur ce deploiement.",n.hidden=!l,a.hidden=!0,i.disabled=h||!l,m.textContent="Se deconnecter"),!t.hidden&&!e.admin&&!h&&!i.disabled&&window.setTimeout(()=>i.focus(),0)}function mt(){const e=document.getElementById("admin-modal");e.hidden=!1,document.body.classList.add("admin-modal-open"),ee()}function I(){const e=document.getElementById("admin-modal"),t=document.getElementById("admin-password");e.hidden=!0,document.body.classList.remove("admin-modal-open"),t.value="",Y()}function Y(){const e=document.getElementById("admin-error");e.textContent=""}function ce(e){const t=document.getElementById("admin-error");t.textContent=e}function y(e,t=""){const r=document.getElementById("backup-status");r.textContent=e,r.dataset.kind=t,U&&clearTimeout(U),U=window.setTimeout(()=>{r.textContent="",r.dataset.kind=""},3500)}function ft(){return Object.values(de().scores).filter(e=>(e==null?void 0:e.s1)!=null&&(e==null?void 0:e.s2)!=null).length}function pt(e){return new Date(e).toLocaleTimeString("fr-FR",{hour:"2-digit",minute:"2-digit",second:"2-digit"})}function gt(){return!!document.querySelector(".sc-input:focus, .b-score-input:focus")}function ht(){return["localhost","127.0.0.1"].includes(window.location.hostname)}function vt(e){return e.source==="local-dev"?!0:e.remote&&e.authConfigured}async function $(e,t={}){const r={method:t.method||"GET",credentials:"same-origin",headers:{Accept:"application/json",...t.headers}};t.body!==void 0&&(r.body=JSON.stringify(t.body),r.headers["Content-Type"]="application/json");let s;try{s=await fetch(e,r)}catch{throw new Error("API Vercel indisponible sur cet environnement.")}const n=await yt(s);if(!s.ok){const a=new Error((n==null?void 0:n.error)||(n==null?void 0:n.message)||`Erreur ${s.status}`);throw a.status=s.status,a.payload=n,a}return n}async function yt(e){if((e.headers.get("content-type")||"").includes("application/json"))return e.json();const r=await e.text();if(!r)return{};try{return JSON.parse(r)}catch{return{message:r}}}
