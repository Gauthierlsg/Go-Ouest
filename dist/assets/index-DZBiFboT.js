(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const n of document.querySelectorAll('link[rel="modulepreload"]'))r(n);new MutationObserver(n=>{for(const i of n)if(i.type==="childList")for(const o of i.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&r(o)}).observe(document,{childList:!0,subtree:!0});function s(n){const i={};return n.integrity&&(i.integrity=n.integrity),n.referrerPolicy&&(i.referrerPolicy=n.referrerPolicy),n.crossOrigin==="use-credentials"?i.credentials="include":n.crossOrigin==="anonymous"?i.credentials="omit":i.credentials="same-origin",i}function r(n){if(n.ep)return;n.ep=!0;const i=s(n);fetch(n.href,i)}})();const U="go-ouest-2026",Fe=["go-ouest-2025"],$e="go-ouest-backup",Oe=1,Ae={source:"booting",admin:!1,readOnly:!0,remote:!1,authConfigured:!0,lastRemoteUpdate:null};let g=ke(),O={...Ae},z=null;const P=[];function de(){return g}function N(e){return g.scores[String(e)]||{}}function Be(){return{format:$e,version:Oe,exportedAt:new Date().toISOString(),state:ge(g)}}function Ie(e){const t=pe(e);return M(t,{persist:!0,notify:!0}),g}function Ce(){return M(Q(),{persist:!0,notify:!0}),g}function M(e,t={}){const{notify:s=!0,persist:r=!0}=t,n=W(e),i=!Pe(g,n);return g=n,r&&T(),s&&i&&R(),{changed:i,state:g}}function $(){return{...O}}function w(){return O.readOnly}function b(e,t={}){const{forceNotify:s=!1}=t,r={...O,...e},n=!xe(O,r);return O=r,(n||s)&&R(),O}function te(e){z=e||null}function ue(e,t,s){return w()||(fe(g,e,t,s),T()),g}async function me(e,t,s){if(w())return g;const r=ge(g);if(fe(g,e,t,s),T(),R(),!z)return g;try{const n=await z({type:"setScore",matchId:String(e),side:t,value:Y(s)});return n!=null&&n.state&&M(n.state,{persist:!0,notify:!0}),g}catch(n){throw g=r,T(),R(),Te(n),n}}function Le(e){return P.push(e),()=>{const t=P.indexOf(e);t>=0&&P.splice(t,1)}}function Me(e){return pe(e)}function ke(){const e=localStorage.getItem(U);if(e)return ne(e);for(const t of Fe){const s=localStorage.getItem(t);if(!s)continue;const r=ne(s);return localStorage.setItem(U,JSON.stringify(r)),r}return Q()}function Q(){return{scores:{}}}function ne(e){try{return W(JSON.parse(e))}catch{return Q()}}function pe(e){if(typeof e=="string")try{e=JSON.parse(e)}catch{throw new Error("Le fichier importe n’est pas un JSON valide.")}const t=(e==null?void 0:e.state)??e;if(!t||typeof t!="object")throw new Error("Le fichier importe ne contient pas d’état de tournoi.");if(!("scores"in t))throw new Error("Le fichier importe ne contient pas de scores de tournoi.");return W(t)}function W(e){const t=e==null?void 0:e.scores;if(!t||typeof t!="object"||Array.isArray(t))return Q();const s={};return Object.entries(t).forEach(([r,n])=>{if(!n||typeof n!="object"||Array.isArray(n))return;const i={};["s1","s2"].forEach(o=>{const a=Y(n[o]);a!==void 0&&(i[o]=a)}),!(i.s1==null&&i.s2==null)&&(s[String(r)]=i)}),{scores:s}}function fe(e,t,s,r){if(s!=="s1"&&s!=="s2")return;const n=Y(r);if(n===void 0)return;const i=String(t),o=e.scores[i]?{...e.scores[i]}:{};if(o[s]=n,o.s1==null&&o.s2==null){delete e.scores[i];return}e.scores[i]=o}function Y(e){if(e===""||e==null)return null;const t=Number(e);if(!(!Number.isFinite(t)||t<0))return t}function Pe(e,t){return JSON.stringify(e)===JSON.stringify(t)}function xe(e,t){const s=Object.keys(e),r=Object.keys(t);return s.length!==r.length?!1:s.every(n=>e[n]===t[n])}function ge(e){return JSON.parse(JSON.stringify(e))}function Te(e){typeof window>"u"||window.dispatchEvent(new CustomEvent("go-ouest:sync-error",{detail:{error:e}}))}function T(){localStorage.setItem(U,JSON.stringify(g))}function R(){const e=de(),t=$();P.forEach(s=>s(e,t))}const he=[{id:1,p1:"Colombe",p2:"Pierre"},{id:2,p1:"Castille",p2:"Léo D."},{id:3,p1:"Eugénie",p2:"Cyprien"},{id:4,p1:"Capucine",p2:"Henri"},{id:5,p1:"Valentine",p2:"Hugues"},{id:6,p1:"Candice",p2:"Alfred"},{id:7,p1:"Charlotte",p2:"Hippolyte"},{id:8,p1:"Clarisse",p2:"Alban R."},{id:9,p1:"Marion",p2:"Karol"},{id:10,p1:"Philippine",p2:"Xavier"},{id:11,p1:"Paola A.",p2:"Grégoire"},{id:12,p1:"Marie D.",p2:"Alban"},{id:13,p1:"Louise B.",p2:"Louis S."},{id:14,p1:"Charlotte G.",p2:"Amaury"},{id:15,p1:"Iklil",p2:"Jean"},{id:16,p1:"Margaux",p2:"Donatien"},{id:17,p1:"Paula",p2:"Paul"},{id:18,p1:"Théophile",p2:"Maylis"},{id:19,p1:"Eléonore",p2:"Stan"},{id:20,p1:"Mathilde",p2:"Victor"},{id:25,p1:"Sixtine",p2:"Gaspard"},{id:26,p1:"Anne-Thaïs",p2:"Brieuc"},{id:27,p1:"Aglaé",p2:"Gauthier"}],I=[{name:"Poule A",color:"#1a5c38",teams:[1,8,15,26]},{name:"Poule B",color:"#1a4a7c",teams:[2,9,16,27]},{name:"Poule C",color:"#7c1a1a",teams:[3,10,17]},{name:"Poule D",color:"#6b21a8",teams:[4,11,18]},{name:"Poule E",color:"#92400e",teams:[5,12,19]},{name:"Poule F",color:"#0e6b5e",teams:[6,13,20]},{name:"Poule G",color:"#155e75",teams:[7,14,25]}],Re=15,Ne=5,ve=Re+Ne,Qe=10,_e=e=>he.find(t=>t.id===e),B=e=>{const t=_e(e);return`${t.p1} & ${t.p2}`},q={quarterfinals:[{id:"QF1",label:"QF1",sides:[{qualifier:0},{qualifier:7}]},{id:"QF2",label:"QF2",sides:[{qualifier:1},{qualifier:6}]},{id:"QF3",label:"QF3",sides:[{qualifier:2},{qualifier:5}]},{id:"QF4",label:"QF4",sides:[{qualifier:3},{qualifier:4}]}],semifinals:[{id:"SF1",label:"SF1",sides:[{winnerOf:"QF1"},{winnerOf:"QF2"}]},{id:"SF2",label:"SF2",sides:[{winnerOf:"QF3"},{winnerOf:"QF4"}]}],finals:[{id:"F",label:"Finale",sides:[{winnerOf:"SF1"},{winnerOf:"SF2"}]},{id:"TP",label:"3e place",sides:[{loserOf:"SF1"},{loserOf:"SF2"}]}]};function X(){const e=[];let t=1;return I.forEach(s=>{const r=s.teams;for(let n=0;n<r.length;n++)for(let i=n+1;i<r.length;i++)e.push({id:t++,pool:s.name,color:s.color,t1:r[n],t2:r[i]})}),e}function qe(e){const t={};e.forEach(i=>{var o;(t[o=i.pool]??(t[o]=[])).push(i)});const s=Object.values(t),r=e.length,n=[];return s.forEach((i,o)=>{const a=r/i.length,u=o*(a/s.length);i.forEach((m,l)=>n.push({m,pos:u+l*a}))}),n.sort((i,o)=>i.pos-o.pos),n.map(i=>i.m)}function je(e){const t=qe(e),s=[];for(;t.length;){const r=new Set([...(s[s.length-1]||[]).flatMap(a=>[a.t1,a.t2]),...(s[s.length-2]||[]).flatMap(a=>[a.t1,a.t2])]),n=new Set((s[s.length-1]||[]).flatMap(a=>[a.t1,a.t2])),i=new Set,o=[];for(let a=0;a<3&&o.length<2;a++){const u=a===0?r:a===1?n:new Set;for(let m=0;m<t.length&&o.length<2;m++){const l=t[m];!i.has(l.t1)&&!i.has(l.t2)&&!u.has(l.t1)&&!u.has(l.t2)&&(o.push(l),i.add(l.t1),i.add(l.t2),t.splice(m--,1))}}s.push(o)}return s}function De(e,t,s){let r=0,n=0,i=0,o=0,a=0,u=0,m=0;return s.filter(l=>l.pool===t&&(l.t1===e||l.t2===e)).forEach(l=>{const d=N(l.id);if(d.s1==null||d.s2==null)return;const c=l.t1===e?d.s1:d.s2,y=l.t1===e?d.s2:d.s1;r++,u+=c,m+=y,c>y?(n++,a+=3):c===y?(o++,a+=1):i++}),{j:r,v:n,d:i,n:o,pts:a,gf:u,ga:m}}function J(e,t){return e.teams.map(s=>({id:s,...De(s,e.name,t)})).sort((s,r)=>r.pts-s.pts||r.gf-r.ga-(s.gf-s.ga)||r.gf-s.gf)}function He(e){const t=I.map(r=>{var i,o;const n=J(r,e);return{team:(i=n[0])==null?void 0:i.id,pool:r.name,color:r.color,pts:((o=n[0])==null?void 0:o.pts)??0}}),s=I.filter(r=>r.teams.length>=4).map(r=>{var i,o,a,u;const n=J(r,e);return{team:(i=n[1])==null?void 0:i.id,pool:r.name,color:r.color,pts:((o=n[1])==null?void 0:o.pts)??0,gf:((a=n[1])==null?void 0:a.gf)??0,ga:((u=n[1])==null?void 0:u.ga)??0,isWild:!0}}).sort((r,n)=>n.pts-r.pts||n.gf-n.ga-(r.gf-r.ga)||n.gf-r.gf)[0];return[...t,s]}function Ue(e){var i;const t=He(e),s=new Map(t.filter(o=>o==null?void 0:o.team).map(o=>[o.team,o])),r={},n={quarterfinals:j(q.quarterfinals,t,s,r),semifinals:j(q.semifinals,t,s,r),finals:j(q.finals,t,s,r)};return{qualifiers:t,rounds:n,champion:((i=n.finals[0])==null?void 0:i.winner)??null}}function j(e,t,s,r){return e.map(n=>{const i=n.sides.map(m=>ze(m,t,r)),o=N(n.id),a=Je(i,o,s),u={id:n.id,label:n.label,sides:i,score:o,ready:i.every(m=>m==null?void 0:m.team),...a};return r[n.id]=u,u})}function ze(e,t,s){var r,n;return e.qualifier!=null?t[e.qualifier]??null:e.winnerOf?((r=s[e.winnerOf])==null?void 0:r.winner)??null:e.loserOf?((n=s[e.loserOf])==null?void 0:n.loser)??null:null}function Je(e,t,s){const[r,n]=e;if(!(r!=null&&r.team)||!(n!=null&&n.team)||t.s1==null||t.s2==null||t.s1===t.s2)return{winner:null,loser:null,isTie:t.s1!=null&&t.s1===t.s2};const i=t.s1>t.s2?r.team:n.team,o=i===r.team?n.team:r.team;return{winner:s.get(i)??{team:i},loser:s.get(o)??{team:o},isTie:!1}}function Ke(e){const t=X(),s=n=>["r1","r2","r3","rn"][Math.min(n,3)],r=n=>{const o=J(n,t).map((a,u)=>`
      <tr class="${u===0?"q":""}">
        <td><span class="rnk ${s(u)}">${u+1}</span></td>
        <td><span class="duo-name">${B(a.id)}</span></td>
        <td>${a.j}</td>
        <td>${a.v}</td>
        <td>${a.d}</td>
        <td><span class="pts-badge">${a.pts}</span></td>
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
    <div class="tourney-meta">${he.length} duos · ${I.length} poules · ${t.length} matchs · 2 terrains · 6h</div>
    <div class="banner info">
      ℹ️ <div>
        <strong>Format :</strong> 7 poules → top 1 de chaque poule + meilleur 2ème = <strong>8 qualifiés</strong>.
        Ligne <span class="q-sample">orange</span> = qualifié provisoire.
      </div>
    </div>
    <div class="pools-grid">${I.map(r).join("")}</div>`}function se(e){return e.replace(/\D+/g,"").slice(0,2)}function re(e){const t=Qe*60+e*ve,s=Math.floor(t/60),r=t%60;return`${String(s).padStart(2,"0")}:${String(r).padStart(2,"0")}`}function Ve(e){const t=w(),s=X(),r=je(s),n=r.length*ve,i=Math.floor(n/60),o=n%60,a=(l,d)=>{if(!l)return`<div class="empty-slot"><span class="m-time">${re(d)}</span><span>—</span></div>`;const c=N(l.id);return`
      <div class="match-row" data-mid="${l.id}">
        <span class="m-time">${re(d)}</span>
        <div class="m-body">
          <div class="m-teams">${B(l.t1)} <span class="vs">vs</span> ${B(l.t2)}</div>
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
      </div>`};let u="",m="";r.forEach((l,d)=>{u+=a(l[0]||null,d),m+=a(l[1]||null,d)}),e.innerHTML=`
    <div class="banner">
      ⚠️ <strong>${s.length} matchs · ${r.length} créneaux · ~${i}h${o>0?o:""}.</strong>
      Si ça dépasse 6h : réduire les matchs à <strong>12-13 min</strong> (transition incluse).
    </div>
    <div class="planning-header">
      <span class="section-title">Planning</span>
      <span class="planning-meta">Début 10h00 · matchs de 15 min</span>
    </div>
    <div class="courts-grid">
      <div class="court-card">
        <div class="court-hdr c1-hdr">🎾 Terrain 1</div>
        ${u}
      </div>
      <div class="court-card">
        <div class="court-hdr c2-hdr">🎾 Terrain 2</div>
        ${m}
      </div>
    </div>`,e.dataset.scoreBound!=="true"&&(e.addEventListener("input",l=>{if(w())return;const d=l.target;if(!d.dataset.mid)return;const c=se(d.value);d.value!==c&&(d.value=c),ue(d.dataset.mid,d.dataset.side,c)}),e.addEventListener("focusout",l=>{if(w())return;const d=l.target;if(!d.dataset.mid)return;const c=se(d.value);d.value!==c&&(d.value=c),me(d.dataset.mid,d.dataset.side,c)}),e.addEventListener("keydown",l=>{if(l.key!=="Enter")return;const d=l.target;d.dataset.mid&&d.blur()}),e.dataset.scoreBound="true")}const Ge=[["QF1","SF1"],["QF2","SF1"],["QF3","SF2"],["QF4","SF2"],["SF1","F"],["SF2","F"],["SF1","TP"],["SF2","TP"],["F","CHAMPION"]];function ie(e){return e.replace(/\D+/g,"").slice(0,2)}const We=e=>e!=null&&e.team?`<span class="m-pool-tag" style="background:${e.color??"#888"}">${e.pool??"Phase finale"}${e.isWild?" ⭐":""}</span>`:'<span class="b-team-meta">À déterminer</span>',oe=(e,t,s,r)=>{if(!(e!=null&&e.team))return'<div class="b-team b-team--tbd"><span>À déterminer</span></div>';const n=N(t);return`
    <div class="b-team">
      <div class="b-team-main">
        ${We(e)}
        <span>${B(e.team)}</span>
      </div>
      <div class="b-score">
        <input class="b-score-input" type="text" inputmode="numeric" pattern="[0-9]*" maxlength="2"
          value="${n[s]??""}" placeholder="—"
          data-mid="${t}" data-side="${s}" ${r?"disabled":""}>
      </div>
    </div>`};function Ye(e){const t=w(),s=X(),{qualifiers:r,rounds:n,champion:i}=Ue(s),[o,a,u,m,l,d,c,y]=r,_=r.map((p,f)=>`
    <div class="qual-card" style="border-color:${(p==null?void 0:p.color)||"#aaa"}">
      <div class="qual-pool" style="color:${(p==null?void 0:p.color)||"#aaa"}">
        ${(p==null?void 0:p.pool)||"—"}${p!=null&&p.isWild?" ⭐ Wildcard":""}
      </div>
      <div class="qual-name">${p!=null&&p.team?B(p.team):"—"}</div>
      <div class="qual-meta">QF${f+1} · ${(p==null?void 0:p.pts)??0} pts</div>
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
                ${S(n.quarterfinals[1],`${(a==null?void 0:a.pool)??"—"} vs ${(c==null?void 0:c.pool)??"—"}`,t)}
                ${S(n.quarterfinals[2],`${(u==null?void 0:u.pool)??"—"} vs ${(d==null?void 0:d.pool)??"—"}`,t)}
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
                  <div class="trophy-sub">${i!=null&&i.team?B(i.team):"À déterminer"}</div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>

    <div class="section-card" style="margin-top:1.25rem">
      <div class="section-title" style="margin-bottom:1rem">Qualifiés provisoires</div>
      <div class="qual-grid">${_}</div>
    </div>`,Xe(e),K(e),e.dataset.scoreBound!=="true"&&(e.addEventListener("input",p=>{if(w())return;const f=p.target;if(!f.dataset.mid)return;const F=ie(f.value);f.value!==F&&(f.value=F),ue(f.dataset.mid,f.dataset.side,F)}),e.addEventListener("focusout",p=>{if(w())return;const f=p.target;if(!f.dataset.mid)return;const F=ie(f.value);f.value!==F&&(f.value=F),me(f.dataset.mid,f.dataset.side,F)}),e.addEventListener("keydown",p=>{if(p.key!=="Enter")return;const f=p.target;f.dataset.mid&&f.blur()}),e.dataset.scoreBound="true")}function Xe(e){e._bracketResizeObserver||(e._bracketResizeObserver=new ResizeObserver(()=>K(e)));const t=e.querySelector(".bracket-stage");e._observedBracketStage&&e._observedBracketStage!==t&&e._bracketResizeObserver.unobserve(e._observedBracketStage),t&&e._observedBracketStage!==t&&(e._bracketResizeObserver.observe(t),e._observedBracketStage=t),e._bracketWindowBound||(e._bracketWindowBound=!0,window.addEventListener("resize",()=>K(e)))}function K(e){e._bracketRaf&&cancelAnimationFrame(e._bracketRaf),e._bracketRaf=requestAnimationFrame(()=>{e._bracketRaf=null,Ze(e)})}function Ze(e){const t=e.querySelector(".bracket-stage");if(!t)return;const s={quarters:t.querySelector(".b-round--quarters .b-round-body"),semis:t.querySelector(".b-round--semis .b-round-body"),finals:t.querySelector(".b-round--finals .b-round-body"),champion:t.querySelector(".b-round--champion .b-round-body")},r={QF1:t.querySelector('[data-match-id="QF1"]'),QF2:t.querySelector('[data-match-id="QF2"]'),QF3:t.querySelector('[data-match-id="QF3"]'),QF4:t.querySelector('[data-match-id="QF4"]'),SF1:t.querySelector('[data-match-id="SF1"]'),SF2:t.querySelector('[data-match-id="SF2"]'),F:t.querySelector('[data-match-id="F"]'),TP:t.querySelector('[data-match-id="TP"]'),CHAMPION:t.querySelector('[data-node-id="CHAMPION"]')};if(Object.values(s).some(p=>!p)||Object.values(r).some(p=>!p))return;const n=t.querySelector(".b-label-3rd");if(!n)return;const i=r.QF1.getBoundingClientRect().height,o=r.CHAMPION.getBoundingClientRect().height,a=n.getBoundingClientRect().height,u=16,m=24,l=28,d=10,c={QF1:0,QF2:i+u};c.QF3=c.QF2+i+m,c.QF4=c.QF3+i+u,c.SF1=D(c.QF1+i/2,c.QF2+i/2)-i/2,c.SF2=D(c.QF3+i/2,c.QF4+i/2)-i/2,c.F=D(c.SF1+i/2,c.SF2+i/2)-i/2;const y=c.F+i+l;c.TP=y+a+d,c.CHAMPION=c.F+(i-o)/2;const _=Math.max(c.QF4+i,c.SF2+i,c.TP+i,c.CHAMPION+o);Object.values(s).forEach(p=>{p.style.height=`${_}px`}),["QF1","QF2","QF3","QF4","SF1","SF2","F","TP"].forEach(p=>{const f=r[p];f.style.top=`${c[p]}px`}),n.style.top=`${y}px`,r.CHAMPION.style.top=`${c.CHAMPION}px`,et(t)}function D(e,t){return(e+t)/2}function et(e){const t=e.querySelector(".bracket-svg");if(!t)return;const s=e.getBoundingClientRect(),r=Math.ceil(s.width),n=Math.ceil(s.height);t.setAttribute("viewBox",`0 0 ${r} ${n}`),t.setAttribute("width",r),t.setAttribute("height",n),t.innerHTML=Ge.map(([i,o])=>{const a=ae(e,i),u=ae(e,o);if(!a||!u)return"";const m=le(a,"right",s),l=le(u,"left",s),d=m.x+(l.x-m.x)/2;return`<path d="M ${m.x} ${m.y} L ${d} ${m.y} L ${d} ${l.y} L ${l.x} ${l.y}" />`}).join("")}function ae(e,t){return t==="CHAMPION"?e.querySelector('[data-node-id="CHAMPION"]'):e.querySelector(`[data-match-id="${t}"] .b-match`)}function le(e,t,s){const r=e.getBoundingClientRect();return{x:Math.round((t==="left"?r.left:r.right)-s.left),y:Math.round(r.top+r.height/2-s.top)}}function S(e,t,s){return`
    <div class="b-match-wrap" data-match-id="${e.id}">
      <div class="b-match">
        <div class="b-match-head">
          <span>${e.label}</span>
          ${e.isTie?'<span class="b-error">Pas de match nul</span>':`<span class="b-side-label">${t}</span>`}
        </div>
        ${oe(e.sides[0],e.id,"s1",!e.ready||s)}
        ${oe(e.sides[1],e.id,"s2",!e.ready||s)}
      </div>
    </div>`}const tt=5e3,C="/api/tournament",V="/api/admin/session",Z={poules:()=>Ke(document.getElementById("poules")),planning:()=>Ve(document.getElementById("planning")),finale:()=>Ye(document.getElementById("finale"))};let ye="poules",H=null,x=null,h=!1,be=null;document.querySelectorAll(".tab-btn").forEach(e=>{e.addEventListener("click",()=>st(e.dataset.tab))});at();lt();window.addEventListener("go-ouest:sync-error",e=>{var s,r;const t=((r=(s=e.detail)==null?void 0:s.error)==null?void 0:r.message)||"Synchronisation impossible.";v(t,"error")});Le(()=>{A(),Z[ye]()});nt();async function nt(){await rt(),A(),Z.poules()}function st(e){document.querySelectorAll(".tab-content").forEach(t=>t.classList.remove("active")),document.querySelectorAll(".tab-btn").forEach(t=>t.classList.remove("active")),document.getElementById(e).classList.add("active"),document.querySelector(`[data-tab="${e}"]`).classList.add("active"),ye=e,Z[e]()}async function rt(){await it()||ot(be)}async function it(){try{const e=await E(C);M(e.state,{persist:!0,notify:!1});let t=!1,s=!0;try{const r=await E(V);t=!!r.admin,s=r.configured!==!1}catch(r){s=r.status!==503,t=!1}return b({source:"remote",remote:!0,admin:t,readOnly:!t,authConfigured:s,lastRemoteUpdate:e.updatedAt??null}),te(async r=>{try{const n=await E(C,{method:"POST",body:r});return n!=null&&n.updatedAt&&b({lastRemoteUpdate:n.updatedAt}),n}catch(n){throw n.status===401&&b({admin:!1,readOnly:!0}),n}}),ct(),!0}catch(e){return be=e,Se(),te(null),!1}}function ot(e){if(vt()){b({source:"local-dev",remote:!1,admin:!0,readOnly:!1,authConfigured:!0,lastRemoteUpdate:null}),v("API Vercel indisponible ici : mode local de developpement actif.","info");return}b({source:"remote-down",remote:!1,admin:!1,readOnly:!0,authConfigured:!1,lastRemoteUpdate:null}),v((e==null?void 0:e.message)||"Synchronisation indisponible : la page reste en lecture seule.","error")}function at(){const e=document.getElementById("admin-access-trigger"),t=document.getElementById("admin-modal"),s=t.querySelectorAll("[data-admin-close]"),r=document.getElementById("admin-login-form"),n=document.getElementById("admin-password"),i=document.getElementById("admin-logout");e.addEventListener("click",()=>mt()),s.forEach(o=>{o.addEventListener("click",()=>k())}),r.addEventListener("submit",async o=>{if(o.preventDefault(),!h){G(),h=!0,A();try{await E(V,{method:"POST",body:{password:n.value}}),n.value="",b({admin:!0,readOnly:!1}),await L({silent:!0,forceRender:!0}),v("Mode admin active sur cet appareil.","success"),ee()}catch(a){ce(a.message||"Connexion admin impossible.")}finally{h=!1,A()}}}),i.addEventListener("click",async()=>{if(!h){if($().source==="local-dev"){k();return}h=!0,G(),A();try{await E(V,{method:"DELETE"}),b({admin:!1,readOnly:!0}),v("Mode admin desactive sur cet appareil.","success"),k()}catch(o){ce(o.message||"Deconnexion impossible.")}finally{h=!1,A()}}}),document.addEventListener("keydown",o=>{o.key==="Escape"&&!t.hidden&&k()})}function lt(){const e=document.getElementById("backup-export"),t=document.getElementById("backup-import-trigger"),s=document.getElementById("backup-import-input"),r=document.getElementById("backup-reset");e.addEventListener("click",()=>{const n=new Blob([JSON.stringify(Be(),null,2)],{type:"application/json"}),i=URL.createObjectURL(n),o=document.createElement("a");o.href=i,o.download=`go-ouest-2026-backup-${ft()}.json`,document.body.append(o),o.click(),o.remove(),URL.revokeObjectURL(i),v("Backup JSON exporte.","success")}),t.addEventListener("click",()=>{s.click()}),s.addEventListener("change",async n=>{var a;const i=(a=n.target.files)==null?void 0:a[0];if(n.target.value="",!(!i||!window.confirm("Importer ce backup remplacera les scores actuels. Continuer ?")))try{const u=await i.text(),m=Me(u);$().remote?(await E(C,{method:"POST",body:{type:"replaceState",state:m}}),await L({silent:!0,forceRender:!0})):Ie(u),v("Backup importe avec succes.","success")}catch(u){v(u.message||"Import impossible.","error")}}),r.addEventListener("click",async()=>{if(window.confirm("Reinitialiser tous les scores ? Pense a exporter un backup avant de confirmer."))try{$().remote?(await E(C,{method:"POST",body:{type:"reset"}}),await L({silent:!0,forceRender:!0})):Ce(),v("Scores reinitialises.","success")}catch(i){v(i.message||"Reinitialisation impossible.","error")}})}async function L(e={}){const{silent:t=!1,forceRender:s=!1}=e;if($().remote&&!ht())try{const r=await E(C),{changed:n}=M(r.state,{persist:!0,notify:!0});b({lastRemoteUpdate:r.updatedAt??null},{forceNotify:s&&!n})}catch(r){r.status===401&&b({admin:!1,readOnly:!0}),t||v(r.message||"Synchronisation impossible.","error")}}function ct(){Se(),x=window.setInterval(()=>{document.visibilityState!=="hidden"&&L({silent:!0})},tt),document.addEventListener("visibilitychange",we)}function Se(){x&&(window.clearInterval(x),x=null),document.removeEventListener("visibilitychange",we)}function we(){document.visibilityState==="visible"&&L({silent:!0,forceRender:!0})}function A(){const e=$(),t=document.getElementById("admin-actions"),s=document.getElementById("control-title"),r=document.getElementById("backup-meta"),n=document.getElementById("admin-access-trigger"),i=document.getElementById("sync-badge");document.body.classList.toggle("is-admin",e.admin),document.body.classList.toggle("is-public",!e.admin),t.hidden=!e.admin,e.source==="local-dev"?s.textContent="Mode local de developpement":e.admin?s.textContent="Console organisateurs":s.textContent="Consultation publique",r.textContent=dt(e),i.textContent=ut(e),n.textContent=e.admin?"Admin connecte":"Connexion admin",n.disabled=h||!Ee(e),ee()}function dt(e){const t=[],s=pt();return e.remote?t.push(e.admin?"Synchro cloud active":"Scores visibles en direct pour tous"):e.source==="local-dev"?t.push("Aucune synchro cloud sur ce poste local"):e.source==="remote-down"?t.push("Service de synchro temporairement indisponible"):t.push("Lecture seule tant que le service admin est indisponible"),e.lastRemoteUpdate&&t.push(`Maj ${gt(e.lastRemoteUpdate)}`),t.push(s>0?`${s} match${s>1?"s":""} saisi${s>1?"s":""}`:"Aucun score saisi pour l’instant"),!e.admin&&e.remote&&t.push("Seuls les organisateurs connectes peuvent modifier les scores"),!e.authConfigured&&e.remote&&t.push("Connexion admin non configuree sur ce deploiement"),t.join(" · ")}function ut(e){return e.source==="local-dev"?"Local dev":e.remote?e.admin?"Admin":"Public":"Lecture seule"}function ee(){const e=$(),t=document.getElementById("admin-modal"),s=document.getElementById("admin-modal-title"),r=document.getElementById("admin-modal-copy"),n=document.getElementById("admin-login-form"),i=document.getElementById("admin-logged-panel"),o=i.querySelector(".admin-logged-panel__text"),a=document.getElementById("admin-password"),u=document.getElementById("admin-login-submit"),m=document.getElementById("admin-logout"),l=Ee(e);u.disabled=h||!l,m.disabled=h,e.admin?(s.textContent=e.source==="local-dev"?"Mode local de developpement":"Mode admin actif",r.textContent=e.source==="local-dev"?"Cette version locale reste editable sur cet appareil meme sans API admin.":"Cet appareil peut saisir, importer et reinitialiser les scores.",n.hidden=!0,i.hidden=!1,o.textContent=e.source==="local-dev"?"Tu peux tester la saisie localement ici, mais rien n’est partage avec les autres appareils.":"Tu peux maintenant saisir les scores et utiliser les outils organisateurs sur cet appareil.",m.textContent=e.source==="local-dev"?"Fermer":"Se deconnecter"):(s.textContent="Connexion admin",r.textContent=l?"Entrez le mot de passe organisateurs pour debloquer la saisie sur cet appareil.":"La connexion admin n’est pas disponible sur cet environnement pour le moment.",n.hidden=!1,i.hidden=!0,a.disabled=h||!l,m.textContent="Se deconnecter"),!t.hidden&&!e.admin&&!h&&!a.disabled&&window.setTimeout(()=>a.focus(),0)}function mt(){const e=document.getElementById("admin-modal");e.hidden=!1,document.body.classList.add("admin-modal-open"),ee()}function k(){const e=document.getElementById("admin-modal"),t=document.getElementById("admin-password");e.hidden=!0,document.body.classList.remove("admin-modal-open"),t.value="",G()}function G(){const e=document.getElementById("admin-error");e.textContent=""}function ce(e){const t=document.getElementById("admin-error");t.textContent=e}function v(e,t=""){const s=document.getElementById("backup-status");s.textContent=e,s.dataset.kind=t,H&&clearTimeout(H),H=window.setTimeout(()=>{s.textContent="",s.dataset.kind=""},3500)}function pt(){return Object.values(de().scores).filter(e=>(e==null?void 0:e.s1)!=null&&(e==null?void 0:e.s2)!=null).length}function ft(){const e=new Date,t=s=>String(s).padStart(2,"0");return[e.getFullYear(),t(e.getMonth()+1),t(e.getDate()),"-",t(e.getHours()),t(e.getMinutes()),t(e.getSeconds())].join("")}function gt(e){return new Date(e).toLocaleTimeString("fr-FR",{hour:"2-digit",minute:"2-digit",second:"2-digit"})}function ht(){return!!document.querySelector(".sc-input:focus, .b-score-input:focus")}function vt(){return["localhost","127.0.0.1"].includes(window.location.hostname)}function Ee(e){return e.admin||e.source==="local-dev"?!0:e.remote&&e.authConfigured}async function E(e,t={}){const s={method:t.method||"GET",credentials:"same-origin",headers:{Accept:"application/json",...t.headers}};t.body!==void 0&&(s.body=JSON.stringify(t.body),s.headers["Content-Type"]="application/json");let r;try{r=await fetch(e,s)}catch{throw new Error("API Vercel indisponible sur cet environnement.")}const n=await yt(r);if(!r.ok){const i=new Error((n==null?void 0:n.error)||(n==null?void 0:n.message)||`Erreur ${r.status}`);throw i.status=r.status,i.payload=n,i}return n}async function yt(e){if((e.headers.get("content-type")||"").includes("application/json"))return e.json();const s=await e.text();if(!s)return{};try{return JSON.parse(s)}catch{return{message:s}}}
