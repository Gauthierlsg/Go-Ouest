(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const n of document.querySelectorAll('link[rel="modulepreload"]'))a(n);new MutationObserver(n=>{for(const r of n)if(r.type==="childList")for(const o of r.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&a(o)}).observe(document,{childList:!0,subtree:!0});function s(n){const r={};return n.integrity&&(r.integrity=n.integrity),n.referrerPolicy&&(r.referrerPolicy=n.referrerPolicy),n.crossOrigin==="use-credentials"?r.credentials="include":n.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function a(n){if(n.ep)return;n.ep=!0;const r=s(n);fetch(n.href,r)}})();const z="go-ouest-2026",$e=["go-ouest-2025"],Ee={source:"booting",admin:!1,readOnly:!0,remote:!1,authConfigured:!0,lastRemoteUpdate:null};let g=Ce(),O={...Ee},G=null;const P=[];function de(){return g}function Q(e){return g.scores[String(e)]||{}}function we(){return T(N(),{persist:!0,notify:!0}),g}function T(e,t={}){const{notify:s=!0,persist:a=!0}=t,n=fe(e),r=!Me(g,n);return g=n,a&&x(),s&&r&&R(),{changed:r,state:g}}function $(){return{...O}}function F(){return O.readOnly}function b(e,t={}){const{forceNotify:s=!1}=t,a={...O,...e},n=!Ae(O,a);return O=a,(n||s)&&R(),O}function te(e){G=e||null}function ue(e,t,s){return F()||(pe(g,e,t,s),x()),g}async function me(e,t,s){if(F())return g;const a=Le(g);if(pe(g,e,t,s),x(),R(),!G)return g;try{const n=await G({type:"setScore",matchId:String(e),side:t,value:X(s)});return n!=null&&n.state&&T(n.state,{persist:!0,notify:!0}),g}catch(n){throw g=a,x(),R(),Be(n),n}}function Oe(e){return P.push(e),()=>{const t=P.indexOf(e);t>=0&&P.splice(t,1)}}function Ce(){const e=localStorage.getItem(z);if(e)return ne(e);for(const t of $e){const s=localStorage.getItem(t);if(!s)continue;const a=ne(s);return localStorage.setItem(z,JSON.stringify(a)),a}return N()}function N(){return{scores:{}}}function ne(e){try{return fe(JSON.parse(e))}catch{return N()}}function fe(e){const t=e==null?void 0:e.scores;if(!t||typeof t!="object"||Array.isArray(t))return N();const s={};return Object.entries(t).forEach(([a,n])=>{if(!n||typeof n!="object"||Array.isArray(n))return;const r={};["s1","s2"].forEach(o=>{const i=X(n[o]);i!==void 0&&(r[o]=i)}),!(r.s1==null&&r.s2==null)&&(s[String(a)]=r)}),{scores:s}}function pe(e,t,s,a){if(s!=="s1"&&s!=="s2")return;const n=X(a);if(n===void 0)return;const r=String(t),o=e.scores[r]?{...e.scores[r]}:{};if(o[s]=n,o.s1==null&&o.s2==null){delete e.scores[r];return}e.scores[r]=o}function X(e){if(e===""||e==null)return null;const t=Number(e);if(!(!Number.isFinite(t)||t<0))return t}function Me(e,t){return JSON.stringify(e)===JSON.stringify(t)}function Ae(e,t){const s=Object.keys(e),a=Object.keys(t);return s.length!==a.length?!1:s.every(n=>e[n]===t[n])}function Le(e){return JSON.parse(JSON.stringify(e))}function Be(e){typeof window>"u"||window.dispatchEvent(new CustomEvent("go-ouest:sync-error",{detail:{error:e}}))}function x(){localStorage.setItem(z,JSON.stringify(g))}function R(){const e=de(),t=$();P.forEach(s=>s(e,t))}const ge=[{id:1,p1:"Colombe",p2:"Pierre"},{id:2,p1:"Castille",p2:"Léo D."},{id:3,p1:"Eugénie",p2:"Cyprien"},{id:4,p1:"Capucine",p2:"Henri"},{id:5,p1:"Valentine",p2:"Hugues"},{id:6,p1:"Candice",p2:"Alfred"},{id:7,p1:"Charlotte",p2:"Hippolyte"},{id:8,p1:"Clarisse",p2:"Alban R."},{id:9,p1:"Marion",p2:"Karol"},{id:10,p1:"Philippine",p2:"Xavier"},{id:11,p1:"Paola A.",p2:"Grégoire"},{id:12,p1:"Marie D.",p2:"Alban"},{id:13,p1:"Louise B.",p2:"Louis S."},{id:14,p1:"Charlotte G.",p2:"Amaury"},{id:15,p1:"Iklil",p2:"Jean"},{id:16,p1:"Margaux",p2:"Donatien"},{id:17,p1:"Paula",p2:"Paul"},{id:18,p1:"Théophile",p2:"Maylis"},{id:19,p1:"Eléonore",p2:"Stan"},{id:20,p1:"Mathilde",p2:"Victor"},{id:25,p1:"Sixtine",p2:"Gaspard"},{id:26,p1:"Anne-Thaïs",p2:"Brieuc"},{id:27,p1:"Aglaé",p2:"Gauthier"}],A=[{name:"Poule A",color:"#1a5c38",teams:[1,8,15,26]},{name:"Poule B",color:"#1a4a7c",teams:[2,9,16,27]},{name:"Poule C",color:"#7c1a1a",teams:[3,10,17]},{name:"Poule D",color:"#6b21a8",teams:[4,11,18]},{name:"Poule E",color:"#92400e",teams:[5,12,19]},{name:"Poule F",color:"#0e6b5e",teams:[6,13,20]},{name:"Poule G",color:"#155e75",teams:[7,14,25]}],Te=15,Ie=5,he=Te+Ie,Pe=10,ke=e=>ge.find(t=>t.id===e),M=e=>{const t=ke(e);return`${t.p1} & ${t.p2}`},D={quarterfinals:[{id:"QF1",label:"QF1",sides:[{qualifier:0},{qualifier:7}]},{id:"QF2",label:"QF2",sides:[{qualifier:1},{qualifier:6}]},{id:"QF3",label:"QF3",sides:[{qualifier:2},{qualifier:5}]},{id:"QF4",label:"QF4",sides:[{qualifier:3},{qualifier:4}]}],semifinals:[{id:"SF1",label:"SF1",sides:[{winnerOf:"QF1"},{winnerOf:"QF2"}]},{id:"SF2",label:"SF2",sides:[{winnerOf:"QF3"},{winnerOf:"QF4"}]}],finals:[{id:"F",label:"Finale",sides:[{winnerOf:"SF1"},{winnerOf:"SF2"}]},{id:"TP",label:"3e place",sides:[{loserOf:"SF1"},{loserOf:"SF2"}]}]};function _(){const e=[];let t=1;return A.forEach(s=>{const a=s.teams;for(let n=0;n<a.length;n++)for(let r=n+1;r<a.length;r++)e.push({id:t++,pool:s.name,color:s.color,t1:a[n],t2:a[r]})}),e}function xe(e){const t={};e.forEach(r=>{var o;(t[o=r.pool]??(t[o]=[])).push(r)});const s=Object.values(t),a=e.length,n=[];return s.forEach((r,o)=>{const i=a/r.length,f=o*(i/s.length);r.forEach((m,l)=>n.push({m,pos:f+l*i}))}),n.sort((r,o)=>r.pos-o.pos),n.map(r=>r.m)}function Re(e){const t=xe(e),s=[];for(;t.length;){const a=new Set([...(s[s.length-1]||[]).flatMap(i=>[i.t1,i.t2]),...(s[s.length-2]||[]).flatMap(i=>[i.t1,i.t2])]),n=new Set((s[s.length-1]||[]).flatMap(i=>[i.t1,i.t2])),r=new Set,o=[];for(let i=0;i<3&&o.length<2;i++){const f=i===0?a:i===1?n:new Set;for(let m=0;m<t.length&&o.length<2;m++){const l=t[m];!r.has(l.t1)&&!r.has(l.t2)&&!f.has(l.t1)&&!f.has(l.t2)&&(o.push(l),r.add(l.t1),r.add(l.t2),t.splice(m--,1))}}s.push(o)}return s}function Qe(e,t,s){let a=0,n=0,r=0,o=0,i=0,f=0,m=0;return s.filter(l=>l.pool===t&&(l.t1===e||l.t2===e)).forEach(l=>{const d=Q(l.id);if(d.s1==null||d.s2==null)return;const c=l.t1===e?d.s1:d.s2,y=l.t1===e?d.s2:d.s1;a++,f+=c,m+=y,c>y?(n++,i+=3):c===y?(o++,i+=1):r++}),{j:a,v:n,d:r,n:o,pts:i,gf:f,ga:m}}function K(e,t){return e.teams.map(s=>({id:s,...Qe(s,e.name,t)})).sort((s,a)=>a.pts-s.pts||a.gf-a.ga-(s.gf-s.ga)||a.gf-s.gf)}function Ne(e){const t=A.map(a=>{var r,o;const n=K(a,e);return{team:(r=n[0])==null?void 0:r.id,pool:a.name,color:a.color,pts:((o=n[0])==null?void 0:o.pts)??0}}),s=A.filter(a=>a.teams.length>=4).map(a=>{var r,o,i,f;const n=K(a,e);return{team:(r=n[1])==null?void 0:r.id,pool:a.name,color:a.color,pts:((o=n[1])==null?void 0:o.pts)??0,gf:((i=n[1])==null?void 0:i.gf)??0,ga:((f=n[1])==null?void 0:f.ga)??0,isWild:!0}}).sort((a,n)=>n.pts-a.pts||n.gf-n.ga-(a.gf-a.ga)||n.gf-a.gf)[0];return[...t,s]}function _e(e){var r;const t=Ne(e),s=new Map(t.filter(o=>o==null?void 0:o.team).map(o=>[o.team,o])),a={},n={quarterfinals:H(D.quarterfinals,t,s,a),semifinals:H(D.semifinals,t,s,a),finals:H(D.finals,t,s,a)};return{qualifiers:t,rounds:n,champion:((r=n.finals[0])==null?void 0:r.winner)??null}}function H(e,t,s,a){return e.map(n=>{const r=n.sides.map(m=>qe(m,t,a)),o=Q(n.id),i=De(r,o,s),f={id:n.id,label:n.label,sides:r,score:o,ready:r.every(m=>m==null?void 0:m.team),...i};return a[n.id]=f,f})}function qe(e,t,s){var a,n;return e.qualifier!=null?t[e.qualifier]??null:e.winnerOf?((a=s[e.winnerOf])==null?void 0:a.winner)??null:e.loserOf?((n=s[e.loserOf])==null?void 0:n.loser)??null:null}function De(e,t,s){const[a,n]=e;if(!(a!=null&&a.team)||!(n!=null&&n.team)||t.s1==null||t.s2==null||t.s1===t.s2)return{winner:null,loser:null,isTie:t.s1!=null&&t.s1===t.s2};const r=t.s1>t.s2?a.team:n.team,o=r===a.team?n.team:a.team;return{winner:s.get(r)??{team:r},loser:s.get(o)??{team:o},isTie:!1}}const He=["QF1","QF2","QF3","QF4","SF1","SF2","F","TP"];function je(){const e={};return _().forEach(t=>{e[String(t.id)]=Ue()}),He.forEach(t=>{e[t]=ze()}),{scores:e}}function Ue(){if(Math.random()<.18){const e=J(4,9);return{s1:e,s2:e}}return ve(4,9)}function ze(){return ve(4,9)}function ve(e,t){const s=J(e,t),a=J(0,Math.max(0,s-1));return Math.random()<.5?{s1:s,s2:a}:{s1:a,s2:s}}function J(e,t){return Math.floor(Math.random()*(t-e+1))+e}function Ge(e){const t=_(),s=n=>["r1","r2","r3","rn"][Math.min(n,3)],a=n=>{const o=K(n,t).map((i,f)=>`
      <tr class="${f===0?"q":""}">
        <td><span class="rnk ${s(f)}">${f+1}</span></td>
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
    <div class="pools-grid">${A.map(a).join("")}</div>`}function se(e){return e.replace(/\D+/g,"").slice(0,2)}function ae(e){const t=Pe*60+e*he,s=Math.floor(t/60),a=t%60;return`${String(s).padStart(2,"0")}:${String(a).padStart(2,"0")}`}function Ke(e){const t=F(),s=_(),a=Re(s),n=a.length*he,r=Math.floor(n/60),o=n%60,i=(l,d)=>{if(!l)return`<div class="empty-slot"><span class="m-time">${ae(d)}</span><span>—</span></div>`;const c=Q(l.id);return`
      <div class="match-row" data-mid="${l.id}">
        <span class="m-time">${ae(d)}</span>
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
      </div>`};let f="",m="";a.forEach((l,d)=>{f+=i(l[0]||null,d),m+=i(l[1]||null,d)}),e.innerHTML=`
    <div class="banner">
      ⚠️ <strong>${s.length} matchs · ${a.length} créneaux · ~${r}h${o>0?o:""}.</strong>
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
    </div>`,e.dataset.scoreBound!=="true"&&(e.addEventListener("input",l=>{if(F())return;const d=l.target;if(!d.dataset.mid)return;const c=se(d.value);d.value!==c&&(d.value=c),ue(d.dataset.mid,d.dataset.side,c)}),e.addEventListener("focusout",l=>{if(F())return;const d=l.target;if(!d.dataset.mid)return;const c=se(d.value);d.value!==c&&(d.value=c),me(d.dataset.mid,d.dataset.side,c)}),e.addEventListener("keydown",l=>{if(l.key!=="Enter")return;const d=l.target;d.dataset.mid&&d.blur()}),e.dataset.scoreBound="true")}const Je=[["QF1","SF1"],["QF2","SF1"],["QF3","SF2"],["QF4","SF2"],["SF1","F"],["SF2","F"],["SF1","TP"],["SF2","TP"],["F","CHAMPION"]];function re(e){return e.replace(/\D+/g,"").slice(0,2)}const Ve=e=>e!=null&&e.team?`<span class="m-pool-tag" style="background:${e.color??"#888"}">${e.pool??"Phase finale"}${e.isWild?" ⭐":""}</span>`:'<span class="b-team-meta">À déterminer</span>',oe=(e,t,s,a)=>{if(!(e!=null&&e.team))return'<div class="b-team b-team--tbd"><span>À déterminer</span></div>';const n=Q(t);return`
    <div class="b-team">
      <div class="b-team-main">
        ${Ve(e)}
        <span>${M(e.team)}</span>
      </div>
      <div class="b-score">
        <input class="b-score-input" type="text" inputmode="numeric" pattern="[0-9]*" maxlength="2"
          value="${n[s]??""}" placeholder="—"
          data-mid="${t}" data-side="${s}" ${a?"disabled":""}>
      </div>
    </div>`};function We(e){const t=F(),s=_(),{qualifiers:a,rounds:n,champion:r}=_e(s),[o,i,f,m,l,d,c,y]=a,q=a.map((u,p)=>`
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
                ${S(n.quarterfinals[0],`${(o==null?void 0:o.pool)??"—"} vs ${(y==null?void 0:y.pool)??"—"}`,t)}
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
                  <div class="trophy-sub">${r!=null&&r.team?M(r.team):"À déterminer"}</div>
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
    </div>`,Ye(e),V(e),e.dataset.scoreBound!=="true"&&(e.addEventListener("input",u=>{if(F())return;const p=u.target;if(!p.dataset.mid)return;const w=re(p.value);p.value!==w&&(p.value=w),ue(p.dataset.mid,p.dataset.side,w)}),e.addEventListener("focusout",u=>{if(F())return;const p=u.target;if(!p.dataset.mid)return;const w=re(p.value);p.value!==w&&(p.value=w),me(p.dataset.mid,p.dataset.side,w)}),e.addEventListener("keydown",u=>{if(u.key!=="Enter")return;const p=u.target;p.dataset.mid&&p.blur()}),e.dataset.scoreBound="true")}function Ye(e){e._bracketResizeObserver||(e._bracketResizeObserver=new ResizeObserver(()=>V(e)));const t=e.querySelector(".bracket-stage");e._observedBracketStage&&e._observedBracketStage!==t&&e._bracketResizeObserver.unobserve(e._observedBracketStage),t&&e._observedBracketStage!==t&&(e._bracketResizeObserver.observe(t),e._observedBracketStage=t),e._bracketWindowBound||(e._bracketWindowBound=!0,window.addEventListener("resize",()=>V(e)))}function V(e){e._bracketRaf&&cancelAnimationFrame(e._bracketRaf),e._bracketRaf=requestAnimationFrame(()=>{e._bracketRaf=null,Xe(e)})}function Xe(e){const t=e.querySelector(".bracket-stage");if(!t)return;const s={quarters:t.querySelector(".b-round--quarters .b-round-body"),semis:t.querySelector(".b-round--semis .b-round-body"),finals:t.querySelector(".b-round--finals .b-round-body"),champion:t.querySelector(".b-round--champion .b-round-body")},a={QF1:t.querySelector('[data-match-id="QF1"]'),QF2:t.querySelector('[data-match-id="QF2"]'),QF3:t.querySelector('[data-match-id="QF3"]'),QF4:t.querySelector('[data-match-id="QF4"]'),SF1:t.querySelector('[data-match-id="SF1"]'),SF2:t.querySelector('[data-match-id="SF2"]'),F:t.querySelector('[data-match-id="F"]'),TP:t.querySelector('[data-match-id="TP"]'),CHAMPION:t.querySelector('[data-node-id="CHAMPION"]')};if(Object.values(s).some(u=>!u)||Object.values(a).some(u=>!u))return;const n=t.querySelector(".b-label-3rd");if(!n)return;const r=a.QF1.getBoundingClientRect().height,o=a.CHAMPION.getBoundingClientRect().height,i=n.getBoundingClientRect().height,f=16,m=24,l=28,d=10,c={QF1:0,QF2:r+f};c.QF3=c.QF2+r+m,c.QF4=c.QF3+r+f,c.SF1=j(c.QF1+r/2,c.QF2+r/2)-r/2,c.SF2=j(c.QF3+r/2,c.QF4+r/2)-r/2,c.F=j(c.SF1+r/2,c.SF2+r/2)-r/2;const y=c.F+r+l;c.TP=y+i+d,c.CHAMPION=c.F+(r-o)/2;const q=Math.max(c.QF4+r,c.SF2+r,c.TP+r,c.CHAMPION+o);Object.values(s).forEach(u=>{u.style.height=`${q}px`}),["QF1","QF2","QF3","QF4","SF1","SF2","F","TP"].forEach(u=>{const p=a[u];p.style.top=`${c[u]}px`}),n.style.top=`${y}px`,a.CHAMPION.style.top=`${c.CHAMPION}px`,Ze(t)}function j(e,t){return(e+t)/2}function Ze(e){const t=e.querySelector(".bracket-svg");if(!t)return;const s=e.getBoundingClientRect(),a=Math.ceil(s.width),n=Math.ceil(s.height);t.setAttribute("viewBox",`0 0 ${a} ${n}`),t.setAttribute("width",a),t.setAttribute("height",n),t.innerHTML=Je.map(([r,o])=>{const i=ie(e,r),f=ie(e,o);if(!i||!f)return"";const m=le(i,"right",s),l=le(f,"left",s),d=m.x+(l.x-m.x)/2;return`<path d="M ${m.x} ${m.y} L ${d} ${m.y} L ${d} ${l.y} L ${l.x} ${l.y}" />`}).join("")}function ie(e,t){return t==="CHAMPION"?e.querySelector('[data-node-id="CHAMPION"]'):e.querySelector(`[data-match-id="${t}"] .b-match`)}function le(e,t,s){const a=e.getBoundingClientRect();return{x:Math.round((t==="left"?a.left:a.right)-s.left),y:Math.round(a.top+a.height/2-s.top)}}function S(e,t,s){return`
    <div class="b-match-wrap" data-match-id="${e.id}">
      <div class="b-match">
        <div class="b-match-head">
          <span>${e.label}</span>
          ${e.isTie?'<span class="b-error">Pas de match nul</span>':`<span class="b-side-label">${t}</span>`}
        </div>
        ${oe(e.sides[0],e.id,"s1",!e.ready||s)}
        ${oe(e.sides[1],e.id,"s2",!e.ready||s)}
      </div>
    </div>`}const et=5e3,L="/api/tournament",W="/api/admin/session",Z={poules:()=>Ge(document.getElementById("poules")),planning:()=>Ke(document.getElementById("planning")),finale:()=>We(document.getElementById("finale"))};let ye="poules",U=null,k=null,h=!1,be=null;document.querySelectorAll(".tab-btn").forEach(e=>{e.addEventListener("click",()=>nt(e.dataset.tab))});it();lt();window.addEventListener("go-ouest:sync-error",e=>{var s,a;const t=((a=(s=e.detail)==null?void 0:s.error)==null?void 0:a.message)||"Synchronisation impossible.";v(t,"error")});Oe(()=>{C(),Z[ye]()});tt();async function tt(){await st(),C(),Z.poules()}function nt(e){document.querySelectorAll(".tab-content").forEach(t=>t.classList.remove("active")),document.querySelectorAll(".tab-btn").forEach(t=>t.classList.remove("active")),document.getElementById(e).classList.add("active"),document.querySelector(`[data-tab="${e}"]`).classList.add("active"),ye=e,Z[e]()}async function st(){const e=await rt();await at(e)||ot(be,e)}async function at(e){try{const t=await E(L);return T(t.state,{persist:!0,notify:!1}),b({source:"remote",remote:!0,admin:e.admin,readOnly:!e.admin,authConfigured:e.authConfigured,lastRemoteUpdate:t.updatedAt??null}),te(async s=>{try{const a=await E(L,{method:"POST",body:s});return a!=null&&a.updatedAt&&b({lastRemoteUpdate:a.updatedAt}),a}catch(a){throw a.status===401&&b({admin:!1,readOnly:!0}),a}}),ct(),!0}catch(t){return be=t,Se(),te(null),!1}}async function rt(){try{const e=await E(W);return{admin:!!e.admin,authConfigured:e.configured!==!1}}catch(e){return{admin:!1,authConfigured:e.status!==503}}}function ot(e,t){if(ht()){b({source:"local-dev",remote:!1,admin:!0,readOnly:!1,authConfigured:!0,lastRemoteUpdate:null}),v("API Vercel indisponible ici : mode local de developpement actif.","info");return}b({source:"remote-down",remote:!1,admin:!1,readOnly:!0,authConfigured:(t==null?void 0:t.authConfigured)??!1,lastRemoteUpdate:null}),v((e==null?void 0:e.message)||"Synchronisation indisponible : la page reste en lecture seule.","error")}function it(){const e=document.getElementById("admin-access-trigger"),t=document.getElementById("admin-modal"),s=t.querySelectorAll("[data-admin-close]"),a=document.getElementById("admin-login-form"),n=document.getElementById("admin-password"),r=document.getElementById("admin-logout");e.addEventListener("click",()=>mt()),s.forEach(o=>{o.addEventListener("click",()=>I())}),a.addEventListener("submit",async o=>{if(o.preventDefault(),!h){Y(),h=!0,C();try{await E(W,{method:"POST",body:{password:n.value}}),n.value="",$().remote?(b({admin:!0,readOnly:!1}),await B({silent:!0,forceRender:!0}),v("Mode admin active sur cet appareil.","success")):(b({admin:!0,readOnly:!1,source:"local-admin"}),v("Mode admin local actif sur cet appareil.","warning")),ee()}catch(i){ce(i.message||"Connexion admin impossible.")}finally{h=!1,C()}}}),r.addEventListener("click",async()=>{if(!h){if($().source==="local-dev"){I();return}h=!0,Y(),C();try{await E(W,{method:"DELETE"}),b({admin:!1,readOnly:!0}),v("Mode admin desactive sur cet appareil.","success"),I()}catch(o){ce(o.message||"Deconnexion impossible.")}finally{h=!1,C()}}}),document.addEventListener("keydown",o=>{o.key==="Escape"&&!t.hidden&&I()})}function lt(){const e=document.getElementById("backup-mock"),t=document.getElementById("backup-reset");e.addEventListener("click",async()=>{if(!window.confirm("Generer des scores aleatoires pour tout le tournoi ? Cela remplacera les scores actuels."))return;const a=je();try{$().remote?(await E(L,{method:"POST",body:{type:"replaceState",state:a}}),await B({silent:!0,forceRender:!0})):T(a,{persist:!0,notify:!0}),v("Mock data generee pour les tests.","success")}catch(n){v(n.message||"Generation mock impossible.","error")}}),t.addEventListener("click",async()=>{if(window.confirm("Reinitialiser tous les scores du tournoi ?"))try{$().remote?(await E(L,{method:"POST",body:{type:"reset"}}),await B({silent:!0,forceRender:!0})):we(),v("Scores reinitialises.","success")}catch(a){v(a.message||"Reinitialisation impossible.","error")}})}async function B(e={}){const{silent:t=!1,forceRender:s=!1}=e;if($().remote&&!gt())try{const a=await E(L),{changed:n}=T(a.state,{persist:!0,notify:!0});b({lastRemoteUpdate:a.updatedAt??null},{forceNotify:s&&!n})}catch(a){a.status===401&&b({admin:!1,readOnly:!0}),t||v(a.message||"Synchronisation impossible.","error")}}function ct(){Se(),k=window.setInterval(()=>{document.visibilityState!=="hidden"&&B({silent:!0})},et),document.addEventListener("visibilitychange",Fe)}function Se(){k&&(window.clearInterval(k),k=null),document.removeEventListener("visibilitychange",Fe)}function Fe(){document.visibilityState==="visible"&&B({silent:!0,forceRender:!0})}function C(){const e=$(),t=document.getElementById("admin-toolbar"),s=document.getElementById("control-title"),a=document.getElementById("backup-meta"),n=document.getElementById("admin-access-trigger"),r=document.getElementById("sync-badge");document.body.classList.toggle("is-admin",e.admin),document.body.classList.toggle("is-public",!e.admin),t.hidden=!e.admin,e.source==="local-dev"?s.textContent="Mode local de developpement":e.source==="local-admin"?s.textContent="Console organisateurs locale":e.admin?s.textContent="Console organisateurs":s.textContent="Consultation publique",a.textContent=dt(e),r.textContent=ut(e),n.textContent=e.admin?"Admin connecte":"Connexion admin",n.disabled=h,ee()}function dt(e){const t=[],s=ft();return e.remote?t.push(e.admin?"Synchro cloud active":"Scores visibles en direct pour tous"):e.source==="local-dev"?t.push("Aucune synchro cloud sur ce poste local"):e.source==="local-admin"?t.push("Mode admin local actif uniquement sur cet appareil"):e.source==="remote-down"?t.push("Service de synchro temporairement indisponible"):t.push("Lecture seule tant que le service admin est indisponible"),e.lastRemoteUpdate&&t.push(`Maj ${pt(e.lastRemoteUpdate)}`),t.push(s>0?`${s} match${s>1?"s":""} saisi${s>1?"s":""}`:"Aucun score saisi pour l’instant"),!e.admin&&e.remote&&t.push("Seuls les organisateurs connectes peuvent modifier les scores"),!e.authConfigured&&e.remote&&t.push("Connexion admin non configuree sur ce deploiement"),t.join(" · ")}function ut(e){return e.source==="local-dev"?"Mode local":e.source==="local-admin"?"Admin local":e.admin?"Mode admin":"Lecture seule"}function ee(){const e=$(),t=document.getElementById("admin-modal"),s=document.getElementById("admin-modal-title"),a=document.getElementById("admin-modal-copy"),n=document.getElementById("admin-login-form"),r=document.getElementById("admin-logged-panel"),o=r.querySelector(".admin-logged-panel__text"),i=document.getElementById("admin-password"),f=document.getElementById("admin-login-submit"),m=document.getElementById("admin-logout"),l=vt(e);f.disabled=h||!l,m.disabled=h,e.admin?(s.textContent=e.source==="local-dev"?"Mode local de developpement":e.source==="local-admin"?"Mode admin local":"Mode admin actif",a.textContent=e.source==="local-dev"?"Cette version locale reste editable sur cet appareil meme sans API admin.":e.source==="local-admin"?"Le mot de passe a ete accepte, mais la synchro distante est indisponible. Les changements resteront locaux a cet appareil.":"Cet appareil peut saisir les scores, generer des donnees de test et reinitialiser le tournoi.",n.hidden=!0,r.hidden=!1,o.textContent=e.source==="local-dev"?"Tu peux tester la saisie localement ici, mais rien n’est partage avec les autres appareils.":e.source==="local-admin"?"Tu peux saisir localement sur cet appareil en attendant le retour de la synchro.":"Tu peux maintenant saisir les scores et utiliser la barre d’actions admin en bas de page.",m.textContent=e.source==="local-dev"?"Fermer":"Se deconnecter"):(s.textContent="Connexion admin",a.textContent=e.authConfigured?e.remote?"Entrez le mot de passe organisateurs pour debloquer la saisie sur cet appareil.":"La synchro distante est indisponible, mais tu peux quand meme ouvrir un mode admin local sur cet appareil.":"La connexion admin n’est pas encore configuree sur ce deploiement.",n.hidden=!l,r.hidden=!0,i.disabled=h||!l,m.textContent="Se deconnecter"),!t.hidden&&!e.admin&&!h&&!i.disabled&&window.setTimeout(()=>i.focus(),0)}function mt(){const e=document.getElementById("admin-modal");e.hidden=!1,document.body.classList.add("admin-modal-open"),ee()}function I(){const e=document.getElementById("admin-modal"),t=document.getElementById("admin-password");e.hidden=!0,document.body.classList.remove("admin-modal-open"),t.value="",Y()}function Y(){const e=document.getElementById("admin-error");e.textContent=""}function ce(e){const t=document.getElementById("admin-error");t.textContent=e}function v(e,t=""){const s=document.getElementById("backup-status");s.textContent=e,s.dataset.kind=t,U&&clearTimeout(U),U=window.setTimeout(()=>{s.textContent="",s.dataset.kind=""},3500)}function ft(){return Object.values(de().scores).filter(e=>(e==null?void 0:e.s1)!=null&&(e==null?void 0:e.s2)!=null).length}function pt(e){return new Date(e).toLocaleTimeString("fr-FR",{hour:"2-digit",minute:"2-digit",second:"2-digit"})}function gt(){return!!document.querySelector(".sc-input:focus, .b-score-input:focus")}function ht(){return["localhost","127.0.0.1"].includes(window.location.hostname)}function vt(e){return e.source==="local-dev"?!0:e.authConfigured}async function E(e,t={}){const s={method:t.method||"GET",credentials:"same-origin",headers:{Accept:"application/json",...t.headers}};t.body!==void 0&&(s.body=JSON.stringify(t.body),s.headers["Content-Type"]="application/json");let a;try{a=await fetch(e,s)}catch{throw new Error("API Vercel indisponible sur cet environnement.")}const n=await yt(a);if(!a.ok){const r=new Error((n==null?void 0:n.error)||(n==null?void 0:n.message)||`Erreur ${a.status}`);throw r.status=a.status,r.payload=n,r}return n}async function yt(e){if((e.headers.get("content-type")||"").includes("application/json"))return e.json();const s=await e.text();if(!s)return{};try{return JSON.parse(s)}catch{return{message:s}}}
