(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))a(s);new MutationObserver(s=>{for(const r of s)if(r.type==="childList")for(const i of r.addedNodes)i.tagName==="LINK"&&i.rel==="modulepreload"&&a(i)}).observe(document,{childList:!0,subtree:!0});function n(s){const r={};return s.integrity&&(r.integrity=s.integrity),s.referrerPolicy&&(r.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?r.credentials="include":s.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function a(s){if(s.ep)return;s.ep=!0;const r=n(s);fetch(s.href,r)}})();const J="go-ouest-2026",Qe=["go-ouest-2025"],Be={source:"booting",admin:!1,readOnly:!0,remote:!1,authConfigured:!0,lastRemoteUpdate:null};let g=Ne(),w={...Be},W=null;const B=[];function Te(){return g}function D(e){return g.scores[String(e)]||{}}function Re(){return I(H(),{persist:!0,notify:!0}),g}function I(e,t={}){const{notify:n=!0,persist:a=!0}=t,s=Ee(e),r=!_e(g,s);return g=s,a&&N(),n&&r&&_(),{changed:r,state:g}}function S(){return{...w}}function $(){return w.readOnly}function b(e,t={}){const{forceNotify:n=!1}=t,a={...w,...e},s=!qe(w,a);return w=a,(s||n)&&_(),w}function ie(e){W=e||null}function Fe(e,t,n){return $()||(Oe(g,e,t,n),N()),g}async function $e(e,t,n){if($())return g;const a=De(g);if(Oe(g,e,t,n),N(),_(),!W)return g;try{const s=await W({type:"setScore",matchId:String(e),side:t,value:ae(n)});return s!=null&&s.state&&I(s.state,{persist:!0,notify:!0}),g}catch(s){throw g=a,N(),_(),He(s),s}}function xe(e){return B.push(e),()=>{const t=B.indexOf(e);t>=0&&B.splice(t,1)}}function Ne(){const e=localStorage.getItem(J);if(e)return oe(e);for(const t of Qe){const n=localStorage.getItem(t);if(!n)continue;const a=oe(n);return localStorage.setItem(J,JSON.stringify(a)),a}return H()}function H(){return{scores:{}}}function oe(e){try{return Ee(JSON.parse(e))}catch{return H()}}function Ee(e){const t=e==null?void 0:e.scores;if(!t||typeof t!="object"||Array.isArray(t))return H();const n={};return Object.entries(t).forEach(([a,s])=>{if(!s||typeof s!="object"||Array.isArray(s))return;const r={};["s1","s2"].forEach(i=>{const o=ae(s[i]);o!==void 0&&(r[i]=o)}),!(r.s1==null&&r.s2==null)&&(n[String(a)]=r)}),{scores:n}}function Oe(e,t,n,a){if(n!=="s1"&&n!=="s2")return;const s=ae(a);if(s===void 0)return;const r=String(t),i=e.scores[r]?{...e.scores[r]}:{};if(i[n]=s,i.s1==null&&i.s2==null){delete e.scores[r];return}e.scores[r]=i}function ae(e){if(e===""||e==null)return null;const t=Number(e);if(!(!Number.isFinite(t)||t<0))return t}function _e(e,t){return JSON.stringify(e)===JSON.stringify(t)}function qe(e,t){const n=Object.keys(e),a=Object.keys(t);return n.length!==a.length?!1:n.every(s=>e[s]===t[s])}function De(e){return JSON.parse(JSON.stringify(e))}function He(e){typeof window>"u"||window.dispatchEvent(new CustomEvent("go-ouest:sync-error",{detail:{error:e}}))}function N(){localStorage.setItem(J,JSON.stringify(g))}function _(){const e=Te(),t=S();B.forEach(n=>n(e,t))}const ke=[{id:1,p1:"Colombe",p2:"Pierre"},{id:2,p1:"Castille",p2:"Léo D."},{id:3,p1:"Eugénie",p2:"Cyprien"},{id:4,p1:"Capucine",p2:"Henri"},{id:5,p1:"Valentine",p2:"Hugues"},{id:6,p1:"Candice",p2:"Alfred"},{id:7,p1:"Charlotte",p2:"Hippolyte"},{id:8,p1:"Clarisse",p2:"Alban R."},{id:9,p1:"Marion",p2:"Karol"},{id:10,p1:"Philippine",p2:"Xavier"},{id:11,p1:"Paola A.",p2:"Grégoire"},{id:12,p1:"Marie D.",p2:"Alban"},{id:13,p1:"Louise B.",p2:"Louis S."},{id:14,p1:"Charlotte G.",p2:"Amaury"},{id:15,p1:"Iklil",p2:"Jean"},{id:16,p1:"Margaux",p2:"Donatien"},{id:17,p1:"Paula",p2:"Paul"},{id:18,p1:"Théophile",p2:"Maylis"},{id:19,p1:"Eléonore",p2:"Stan"},{id:20,p1:"Mathilde",p2:"Victor"},{id:25,p1:"Sixtine",p2:"Gaspard"},{id:26,p1:"Anne-Thaïs",p2:"Brieuc"},{id:27,p1:"Aglaé",p2:"Gauthier"}],C=[{name:"Poule A",color:"#1a5c38",teams:[1,8,15,26]},{name:"Poule B",color:"#1a4a7c",teams:[2,9,16,27]},{name:"Poule C",color:"#7c1a1a",teams:[3,10,17]},{name:"Poule D",color:"#6b21a8",teams:[4,11,18]},{name:"Poule E",color:"#92400e",teams:[5,12,19]},{name:"Poule F",color:"#0e6b5e",teams:[6,13,20]},{name:"Poule G",color:"#155e75",teams:[7,14,25]}],T=15,we=5,L=T+we,Y=10,q=15,je=e=>ke.find(t=>t.id===e),k=e=>{const t=je(e);return`${t.p1} & ${t.p2}`},U={quarterfinals:[{id:"QF1",label:"QF1",sides:[{qualifier:0},{qualifier:7}]},{id:"QF2",label:"QF2",sides:[{qualifier:1},{qualifier:6}]},{id:"QF3",label:"QF3",sides:[{qualifier:2},{qualifier:5}]},{id:"QF4",label:"QF4",sides:[{qualifier:3},{qualifier:4}]}],semifinals:[{id:"SF1",label:"SF1",sides:[{winnerOf:"QF1"},{winnerOf:"QF2"}]},{id:"SF2",label:"SF2",sides:[{winnerOf:"QF3"},{winnerOf:"QF4"}]}],finals:[{id:"F",label:"Finale",sides:[{winnerOf:"SF1"},{winnerOf:"SF2"}]},{id:"TP",label:"3e place",sides:[{loserOf:"SF1"},{loserOf:"SF2"}]}]};function j(){const e=[];let t=1;return C.forEach(n=>{const a=n.teams;for(let s=0;s<a.length;s++)for(let r=s+1;r<a.length;r++)e.push({id:t++,pool:n.name,color:n.color,t1:a[s],t2:a[r]})}),e}function Ke(e){const t={};e.forEach(r=>{var i;(t[i=r.pool]??(t[i]=[])).push(r)});const n=Object.values(t),a=e.length,s=[];return n.forEach((r,i)=>{const o=a/r.length,c=i*(o/n.length);r.forEach((l,d)=>s.push({m:l,pos:c+d*o}))}),s.sort((r,i)=>r.pos-i.pos),s.map(r=>r.m)}function Ue(e){const t=Ke(e),n=[];for(;t.length;){const a=new Set([...(n[n.length-1]||[]).flatMap(o=>[o.t1,o.t2]),...(n[n.length-2]||[]).flatMap(o=>[o.t1,o.t2])]),s=new Set((n[n.length-1]||[]).flatMap(o=>[o.t1,o.t2])),r=new Set,i=[];for(let o=0;o<3&&i.length<2;o++){const c=o===0?a:o===1?s:new Set;for(let l=0;l<t.length&&i.length<2;l++){const d=t[l];!r.has(d.t1)&&!r.has(d.t2)&&!c.has(d.t1)&&!c.has(d.t2)&&(i.push(d),r.add(d.t1),r.add(d.t2),t.splice(l--,1))}}n.push(i)}return n}function Ge(e,t,n){let a=0,s=0,r=0,i=0,o=0,c=0,l=0;return n.filter(d=>d.pool===t&&(d.t1===e||d.t2===e)).forEach(d=>{const f=D(d.id);if(f.s1==null||f.s2==null)return;const m=d.t1===e?f.s1:f.s2,y=d.t1===e?f.s2:f.s1;a++,c+=m,l+=y,m>y?(s++,o+=3):m===y?(i++,o+=1):r++}),{j:a,v:s,d:r,n:i,pts:o,gf:c,ga:l}}function X(e,t){return e.teams.map(n=>({id:n,...Ge(n,e.name,t)})).sort((n,a)=>a.pts-n.pts||a.gf-a.ga-(n.gf-n.ga)||a.gf-n.gf)}function Ve(e){const t=C.map(a=>{var r,i;const s=X(a,e);return{team:(r=s[0])==null?void 0:r.id,pool:a.name,color:a.color,pts:((i=s[0])==null?void 0:i.pts)??0}}),n=C.filter(a=>a.teams.length>=4).map(a=>{var r,i,o,c;const s=X(a,e);return{team:(r=s[1])==null?void 0:r.id,pool:a.name,color:a.color,pts:((i=s[1])==null?void 0:i.pts)??0,gf:((o=s[1])==null?void 0:o.gf)??0,ga:((c=s[1])==null?void 0:c.ga)??0,isWild:!0}}).sort((a,s)=>s.pts-a.pts||s.gf-s.ga-(a.gf-a.ga)||s.gf-a.gf)[0];return[...t,n]}function Pe(e){var r;const t=Ve(e),n=new Map(t.filter(i=>i==null?void 0:i.team).map(i=>[i.team,i])),a={},s={quarterfinals:G(U.quarterfinals,t,n,a),semifinals:G(U.semifinals,t,n,a),finals:G(U.finals,t,n,a)};return{qualifiers:t,rounds:s,champion:((r=s.finals[0])==null?void 0:r.winner)??null}}function G(e,t,n,a){return e.map(s=>{const r=s.sides.map(l=>ze(l,t,a)),i=D(s.id),o=Je(r,i,n),c={id:s.id,label:s.label,sides:r,score:i,ready:r.every(l=>l==null?void 0:l.team),...o};return a[s.id]=c,c})}function ze(e,t,n){var a,s;return e.qualifier!=null?t[e.qualifier]??null:e.winnerOf?((a=n[e.winnerOf])==null?void 0:a.winner)??null:e.loserOf?((s=n[e.loserOf])==null?void 0:s.loser)??null:null}function Je(e,t,n){const[a,s]=e;if(!(a!=null&&a.team)||!(s!=null&&s.team)||t.s1==null||t.s2==null||t.s1===t.s2)return{winner:null,loser:null,isTie:t.s1!=null&&t.s1===t.s2};const r=t.s1>t.s2?a.team:s.team,i=r===a.team?s.team:a.team;return{winner:n.get(r)??{team:r},loser:n.get(i)??{team:i},isTie:!1}}const We=["QF1","QF2","QF3","QF4","SF1","SF2","F","TP"];function Ye(){const e={};return j().forEach(t=>{e[String(t.id)]=Xe()}),We.forEach(t=>{e[t]=Ze()}),{scores:e}}function Xe(){if(Math.random()<.18){const e=Z(4,9);return{s1:e,s2:e}}return Ce(4,9)}function Ze(){return Ce(4,9)}function Ce(e,t){const n=Z(e,t),a=Z(0,Math.max(0,n-1));return Math.random()<.5?{s1:n,s2:a}:{s1:a,s2:n}}function Z(e,t){return Math.floor(Math.random()*(t-e+1))+e}function et(e){const t=j(),n=s=>["r1","r2","r3","rn"][Math.min(s,3)],a=s=>{const i=X(s,t).map((o,c)=>`
      <tr class="${c===0?"q":""}">
        <td><span class="rnk ${n(c)}">${c+1}</span></td>
        <td><span class="duo-name">${k(o.id)}</span></td>
        <td>${o.j}</td>
        <td>${o.v}</td>
        <td>${o.d}</td>
        <td><span class="pts-badge">${o.pts}</span></td>
      </tr>`).join("");return`
      <div class="pool-card">
        <div class="pool-hdr" style="background:${s.color}">
          <h3>${s.name}</h3>
          <span class="badge">${s.teams.length} duos</span>
        </div>
        <table class="stand-table">
          <thead><tr><th>#</th><th>Duo</th><th>J</th><th>V</th><th>D</th><th>Pts</th></tr></thead>
          <tbody>${i}</tbody>
        </table>
      </div>`};e.innerHTML=`
    <div class="tourney-meta">${ke.length} duos · ${C.length} poules · ${t.length} matchs · 2 terrains · 6h</div>
    <div class="banner info">
      ℹ️ <div>
        <strong>Format :</strong> 7 poules → top 1 de chaque poule + meilleur 2ème = <strong>8 qualifiés</strong>.
        Ligne <span class="q-sample">orange</span> = qualifié provisoire.
      </div>
    </div>
    <div class="pools-grid">${C.map(a).join("")}</div>`}const tt=[{id:"QF1",round:"Quart de finale",tag:"QF1",color:"#a34710",fallbacks:["1er Poule A","Meilleur 2e"]},{id:"QF2",round:"Quart de finale",tag:"QF2",color:"#a34710",fallbacks:["1er Poule B","1er Poule G"]},{id:"QF3",round:"Quart de finale",tag:"QF3",color:"#a34710",fallbacks:["1er Poule C","1er Poule F"]},{id:"QF4",round:"Quart de finale",tag:"QF4",color:"#a34710",fallbacks:["1er Poule D","1er Poule E"]},{id:"SF1",round:"Demi-finale",tag:"SF1",color:"#7c3aed",fallbacks:["Vainqueur QF1","Vainqueur QF2"]},{id:"SF2",round:"Demi-finale",tag:"SF2",color:"#7c3aed",fallbacks:["Vainqueur QF3","Vainqueur QF4"]},{id:"TP",round:"3e place",tag:"3e place",color:"#0f766e",fallbacks:["Perdant SF1","Perdant SF2"]},{id:"F",round:"Finale",tag:"Finale",color:"#c2450a",fallbacks:["Vainqueur SF1","Vainqueur SF2"]}];function le(e){return e.replace(/\D+/g,"").slice(0,2)}function R(e){const t=Math.floor(e/60),n=e%60;return`${String(t).padStart(2,"0")}:${String(n).padStart(2,"0")}`}function nt(e){const t=Math.floor(e/60),n=e%60;return`${t}h${n>0?String(n).padStart(2,"0"):""}`}function at(e){const t=$(),n=j(),a=Ue(n),s=st(n,a),r=s.endMinutes-Y*60;e.innerHTML=`
    <div class="banner">
      ⚠️ <strong>${n.length} matchs de poule + 8 matchs de phase finale · pause ${q} min · fin estimée ${R(s.endMinutes)} (~${nt(r)}).</strong>
      Si ça dépasse : réduire les matchs à <strong>${T-2}-${T-1} min</strong> et garder la transition fluide.
    </div>
    <div class="planning-header">
      <span class="section-title">Planning</span>
      <span class="planning-meta">Début ${String(Y).padStart(2,"0")}h00 · matchs ${T} min + ${we} min transition · pause ${q} min avant les quarts</span>
    </div>
    <div class="courts-grid">
      <div class="court-card">
        <div class="court-hdr c1-hdr">🎾 Terrain 1</div>
        ${s.courts[0].map(i=>pe(i,t)).join("")}
      </div>
      <div class="court-card">
        <div class="court-hdr c2-hdr">🎾 Terrain 2</div>
        ${s.courts[1].map(i=>pe(i,t)).join("")}
      </div>
    </div>`,e.dataset.scoreBound!=="true"&&(e.addEventListener("input",i=>{if($())return;const o=i.target;if(!o.dataset.mid)return;const c=le(o.value);o.value!==c&&(o.value=c),Fe(o.dataset.mid,o.dataset.side,c)}),e.addEventListener("focusout",i=>{if($())return;const o=i.target;if(!o.dataset.mid)return;const c=le(o.value);o.value!==c&&(o.value=c),$e(o.dataset.mid,o.dataset.side,c)}),e.addEventListener("keydown",i=>{if(i.key!=="Enter")return;const o=i.target;o.dataset.mid&&o.blur()}),e.dataset.scoreBound="true")}function st(e,t){const n=[[],[]],a=Y*60;t.forEach((l,d)=>{const f=a+d*L;n[0].push(l[0]?ce(l[0],f):me(f)),n[1].push(l[1]?ce(l[1],f):me(f))});const s=a+t.length*L;n[0].push(ue(s)),n[1].push(ue(s));const r=s+q,{rounds:i}=Pe(e),o=Object.fromEntries([...i.quarterfinals,...i.semifinals,...i.finals].map(l=>[l.id,l])),c=[["QF1","QF2"],["QF3","QF4"],["SF1","SF2"],["TP","F"]];return c.forEach((l,d)=>{const f=r+d*L;n[0].push(de(o[l[0]],f,l[0])),n[1].push(de(o[l[1]],f,l[1]))}),{courts:n,endMinutes:r+c.length*L}}function ce(e,t){return{type:"match",matchId:e.id,startMinutes:t,leftLabel:k(e.t1),rightLabel:k(e.t2),tag:e.pool,tagColor:e.color,detail:"Phase de poules",editable:!0,kind:"pool"}}function de(e,t,n){const a=tt.find(s=>s.id===n);return{type:"match",matchId:e.id,startMinutes:t,leftLabel:fe(e.sides[0],a.fallbacks[0]),rightLabel:fe(e.sides[1],a.fallbacks[1]),tag:a.tag,tagColor:a.color,detail:a.round,editable:e.ready,kind:"knockout"}}function ue(e){return{type:"break",startMinutes:e,label:"Pause avant la phase finale",detail:`${q} min · calcul des qualifiés`}}function me(e){return{type:"empty",startMinutes:e}}function fe(e,t){return e!=null&&e.team?k(e.team):t}function pe(e,t){if(e.type==="empty")return`
      <div class="empty-slot">
        <span class="m-time">${R(e.startMinutes)}</span>
        <span>—</span>
      </div>`;if(e.type==="break")return`
      <div class="planning-break-row">
        <span class="m-time">${R(e.startMinutes)}</span>
        <div class="m-body">
          <div class="planning-break-title">${e.label}</div>
          <div class="planning-break-meta">${e.detail}</div>
        </div>
      </div>`;const n=D(e.matchId),a=t||!e.editable;return`
    <div class="match-row ${e.kind==="knockout"?"match-row--knockout":""}" data-mid="${e.matchId}">
      <span class="m-time">${R(e.startMinutes)}</span>
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
          data-mid="${e.matchId}" data-side="s1" ${a?"disabled":""}>
        <span class="sc-sep">:</span>
        <input class="sc-input" type="text" inputmode="numeric" pattern="[0-9]*" maxlength="2"
          value="${n.s2??""}" placeholder="—"
          data-mid="${e.matchId}" data-side="s2" ${a?"disabled":""}>
      </div>
    </div>`}const rt=[["QF1","SF1"],["QF2","SF1"],["QF3","SF2"],["QF4","SF2"],["SF1","F"],["SF2","F"],["SF1","TP"],["SF2","TP"],["F","CHAMPION"]];function ge(e){return e.replace(/\D+/g,"").slice(0,2)}const it=e=>e!=null&&e.team?`<span class="m-pool-tag" style="background:${e.color??"#888"}">${e.pool??"Phase finale"}${e.isWild?" ⭐":""}</span>`:'<span class="b-team-meta">À déterminer</span>',he=(e,t,n,a)=>{if(!(e!=null&&e.team))return'<div class="b-team b-team--tbd"><span>À déterminer</span></div>';const s=D(t);return`
    <div class="b-team">
      <div class="b-team-main">
        ${it(e)}
        <span>${k(e.team)}</span>
      </div>
      <div class="b-score">
        <input class="b-score-input" type="text" inputmode="numeric" pattern="[0-9]*" maxlength="2"
          value="${s[n]??""}" placeholder="—"
          data-mid="${t}" data-side="${n}" ${a?"disabled":""}>
      </div>
    </div>`};function ot(e){const t=$(),n=j(),{qualifiers:a,rounds:s,champion:r}=Pe(n),[i,o,c,l,d,f,m,y]=a,K=a.map((u,p)=>`
    <div class="qual-card" style="border-color:${(u==null?void 0:u.color)||"#aaa"}">
      <div class="qual-pool" style="color:${(u==null?void 0:u.color)||"#aaa"}">
        ${(u==null?void 0:u.pool)||"—"}${u!=null&&u.isWild?" ⭐ Wildcard":""}
      </div>
      <div class="qual-name">${u!=null&&u.team?k(u.team):"—"}</div>
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
                ${F(s.quarterfinals[0],`${(i==null?void 0:i.pool)??"—"} vs ${(y==null?void 0:y.pool)??"—"}`,t)}
                ${F(s.quarterfinals[1],`${(o==null?void 0:o.pool)??"—"} vs ${(m==null?void 0:m.pool)??"—"}`,t)}
                ${F(s.quarterfinals[2],`${(c==null?void 0:c.pool)??"—"} vs ${(f==null?void 0:f.pool)??"—"}`,t)}
                ${F(s.quarterfinals[3],`${(l==null?void 0:l.pool)??"—"} vs ${(d==null?void 0:d.pool)??"—"}`,t)}
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
                  <div class="trophy-sub">${r!=null&&r.team?k(r.team):"À déterminer"}</div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>

    <div class="section-card" style="margin-top:1.25rem">
      <div class="section-title" style="margin-bottom:1rem">Qualifiés provisoires</div>
      <div class="qual-grid">${K}</div>
    </div>`,lt(e),ee(e),e.dataset.scoreBound!=="true"&&(e.addEventListener("input",u=>{if($())return;const p=u.target;if(!p.dataset.mid)return;const O=ge(p.value);p.value!==O&&(p.value=O),Fe(p.dataset.mid,p.dataset.side,O)}),e.addEventListener("focusout",u=>{if($())return;const p=u.target;if(!p.dataset.mid)return;const O=ge(p.value);p.value!==O&&(p.value=O),$e(p.dataset.mid,p.dataset.side,O)}),e.addEventListener("keydown",u=>{if(u.key!=="Enter")return;const p=u.target;p.dataset.mid&&p.blur()}),e.dataset.scoreBound="true")}function lt(e){e._bracketResizeObserver||(e._bracketResizeObserver=new ResizeObserver(()=>ee(e)));const t=e.querySelector(".bracket-stage");e._observedBracketStage&&e._observedBracketStage!==t&&e._bracketResizeObserver.unobserve(e._observedBracketStage),t&&e._observedBracketStage!==t&&(e._bracketResizeObserver.observe(t),e._observedBracketStage=t),e._bracketWindowBound||(e._bracketWindowBound=!0,window.addEventListener("resize",()=>ee(e)))}function ee(e){e._bracketRaf&&cancelAnimationFrame(e._bracketRaf),e._bracketRaf=requestAnimationFrame(()=>{e._bracketRaf=null,ct(e)})}function ct(e){const t=e.querySelector(".bracket-stage");if(!t)return;const n={quarters:t.querySelector(".b-round--quarters .b-round-body"),semis:t.querySelector(".b-round--semis .b-round-body"),finals:t.querySelector(".b-round--finals .b-round-body"),champion:t.querySelector(".b-round--champion .b-round-body")},a={QF1:t.querySelector('[data-match-id="QF1"]'),QF2:t.querySelector('[data-match-id="QF2"]'),QF3:t.querySelector('[data-match-id="QF3"]'),QF4:t.querySelector('[data-match-id="QF4"]'),SF1:t.querySelector('[data-match-id="SF1"]'),SF2:t.querySelector('[data-match-id="SF2"]'),F:t.querySelector('[data-match-id="F"]'),TP:t.querySelector('[data-match-id="TP"]'),CHAMPION:t.querySelector('[data-node-id="CHAMPION"]')};if(Object.values(n).some(u=>!u)||Object.values(a).some(u=>!u))return;const s=t.querySelector(".b-label-3rd");if(!s)return;const r=a.QF1.getBoundingClientRect().height,i=a.CHAMPION.getBoundingClientRect().height,o=s.getBoundingClientRect().height,c=16,l=24,d=28,f=10,m={QF1:0,QF2:r+c};m.QF3=m.QF2+r+l,m.QF4=m.QF3+r+c,m.SF1=V(m.QF1+r/2,m.QF2+r/2)-r/2,m.SF2=V(m.QF3+r/2,m.QF4+r/2)-r/2,m.F=V(m.SF1+r/2,m.SF2+r/2)-r/2;const y=m.F+r+d;m.TP=y+o+f,m.CHAMPION=m.F+(r-i)/2;const K=Math.max(m.QF4+r,m.SF2+r,m.TP+r,m.CHAMPION+i);Object.values(n).forEach(u=>{u.style.height=`${K}px`}),["QF1","QF2","QF3","QF4","SF1","SF2","F","TP"].forEach(u=>{const p=a[u];p.style.top=`${m[u]}px`}),s.style.top=`${y}px`,a.CHAMPION.style.top=`${m.CHAMPION}px`,dt(t)}function V(e,t){return(e+t)/2}function dt(e){const t=e.querySelector(".bracket-svg");if(!t)return;const n=e.getBoundingClientRect(),a=Math.ceil(n.width),s=Math.ceil(n.height);t.setAttribute("viewBox",`0 0 ${a} ${s}`),t.setAttribute("width",a),t.setAttribute("height",s),t.innerHTML=rt.map(([r,i])=>{const o=ve(e,r),c=ve(e,i);if(!o||!c)return"";const l=ye(o,"right",n),d=ye(c,"left",n),f=l.x+(d.x-l.x)/2;return`<path d="M ${l.x} ${l.y} L ${f} ${l.y} L ${f} ${d.y} L ${d.x} ${d.y}" />`}).join("")}function ve(e,t){return t==="CHAMPION"?e.querySelector('[data-node-id="CHAMPION"]'):e.querySelector(`[data-match-id="${t}"] .b-match`)}function ye(e,t,n){const a=e.getBoundingClientRect();return{x:Math.round((t==="left"?a.left:a.right)-n.left),y:Math.round(a.top+a.height/2-n.top)}}function F(e,t,n){return`
    <div class="b-match-wrap" data-match-id="${e.id}">
      <div class="b-match">
        <div class="b-match-head">
          <span>${e.label}</span>
          ${e.isTie?'<span class="b-error">Pas de match nul</span>':`<span class="b-side-label">${t}</span>`}
        </div>
        ${he(e.sides[0],e.id,"s1",!e.ready||n)}
        ${he(e.sides[1],e.id,"s2",!e.ready||n)}
      </div>
    </div>`}const ut=5e3,M="/api/tournament",te="/api/admin/session",se={poules:()=>et(document.getElementById("poules")),planning:()=>at(document.getElementById("planning")),finale:()=>ot(document.getElementById("finale"))};let Me="poules",z=null,x=null,v=!1,Ae=null;document.querySelectorAll(".tab-btn").forEach(e=>{e.addEventListener("click",()=>ft(e.dataset.tab))});yt();bt();window.addEventListener("go-ouest:sync-error",e=>{var n,a;const t=((a=(n=e.detail)==null?void 0:n.error)==null?void 0:a.message)||"Synchronisation impossible.";h(t,"error")});xe(()=>{P(),se[Me]()});mt();async function mt(){await pt(),P(),se.poules()}function ft(e){document.querySelectorAll(".tab-content").forEach(t=>t.classList.remove("active")),document.querySelectorAll(".tab-btn").forEach(t=>t.classList.remove("active")),document.getElementById(e).classList.add("active"),document.querySelector(`[data-tab="${e}"]`).classList.add("active"),Me=e,se[e]()}async function pt(){const e=await ht();await gt(e)||vt(Ae,e)}async function gt(e){try{const t=await E(M);return I(t.state,{persist:!0,notify:!1}),b({source:"remote",remote:!0,admin:e.admin,readOnly:!e.admin,authConfigured:e.authConfigured,lastRemoteUpdate:t.updatedAt??null}),ie(async n=>{try{const a=await E(M,{method:"POST",body:n});return a!=null&&a.updatedAt&&b({lastRemoteUpdate:a.updatedAt}),a}catch(a){throw a.status===401&&b({admin:!1,readOnly:!0}),a}}),St(),!0}catch(t){return Ae=t,Ie(),ie(null),!1}}async function ht(){try{const e=await E(te);return{admin:!!e.admin,authConfigured:e.configured!==!1}}catch(e){return{admin:!1,authConfigured:e.status!==503}}}function vt(e,t){if(Ot()){b({source:"local-dev",remote:!1,admin:!0,readOnly:!1,authConfigured:!0,lastRemoteUpdate:null}),h("API Vercel indisponible ici : mode local de developpement actif.","info");return}b({source:"remote-down",remote:!1,admin:!1,readOnly:!0,authConfigured:(t==null?void 0:t.authConfigured)??!1,lastRemoteUpdate:null}),h((e==null?void 0:e.message)||"Synchronisation indisponible : la page reste en lecture seule.","error")}function yt(){const e=document.getElementById("admin-access-trigger"),t=document.getElementById("admin-modal"),n=t.querySelectorAll("[data-admin-close]"),a=document.getElementById("admin-login-form"),s=document.getElementById("admin-password"),r=document.getElementById("admin-logout");e.addEventListener("click",()=>$t()),n.forEach(i=>{i.addEventListener("click",()=>Q())}),a.addEventListener("submit",async i=>{if(i.preventDefault(),!v){ne(),v=!0,P();try{await E(te,{method:"POST",body:{password:s.value}}),s.value="",S().remote?(b({admin:!0,readOnly:!1}),await A({silent:!0,forceRender:!0}),h("Mode admin active sur cet appareil.","success")):(b({admin:!0,readOnly:!1,source:"local-admin"}),h("Mode admin local actif sur cet appareil.","warning")),re()}catch(o){Se(o.message||"Connexion admin impossible.")}finally{v=!1,P()}}}),r.addEventListener("click",async()=>{if(!v){if(S().source==="local-dev"){Q();return}v=!0,ne(),P();try{await E(te,{method:"DELETE"}),b({admin:!1,readOnly:!0}),h("Mode admin desactive sur cet appareil.","success"),Q()}catch(i){Se(i.message||"Deconnexion impossible.")}finally{v=!1,P()}}}),document.addEventListener("keydown",i=>{i.key==="Escape"&&!t.hidden&&Q()})}function bt(){const e=document.getElementById("backup-mock"),t=document.getElementById("backup-reset");e.addEventListener("click",async()=>{if(!be()||!window.confirm("Generer des scores aleatoires pour tout le tournoi ? Cela remplacera les scores actuels."))return;const a=Ye();try{S().remote?(await E(M,{method:"POST",body:{type:"replaceState",state:a}}),await A({silent:!0,forceRender:!0})):I(a,{persist:!0,notify:!0}),h("Mock data generee pour les tests.","success")}catch(s){h(s.message||"Generation mock impossible.","error")}}),t.addEventListener("click",async()=>{if(!(!be()||!window.confirm("Reinitialiser tous les scores du tournoi ?")))try{S().remote?(await E(M,{method:"POST",body:{type:"reset"}}),await A({silent:!0,forceRender:!0})):Re(),h("Scores reinitialises.","success")}catch(a){h(a.message||"Reinitialisation impossible.","error")}})}async function A(e={}){const{silent:t=!1,forceRender:n=!1}=e;if(S().remote&&!Et())try{const a=await E(M),{changed:s}=I(a.state,{persist:!0,notify:!0});b({lastRemoteUpdate:a.updatedAt??null},{forceNotify:n&&!s})}catch(a){a.status===401&&b({admin:!1,readOnly:!0}),t||h(a.message||"Synchronisation impossible.","error")}}function St(){Ie(),x=window.setInterval(()=>{document.visibilityState!=="hidden"&&A({silent:!0})},ut),document.addEventListener("visibilitychange",Le)}function Ie(){x&&(window.clearInterval(x),x=null),document.removeEventListener("visibilitychange",Le)}function Le(){document.visibilityState==="visible"&&A({silent:!0,forceRender:!0})}function P(){const e=S(),t=document.getElementById("admin-toolbar"),n=document.getElementById("admin-access-trigger"),a=document.getElementById("sync-badge");document.body.classList.toggle("is-admin",e.admin),document.body.classList.toggle("is-public",!e.admin),t.hidden=!e.admin,a.textContent=Ft(e),n.textContent=e.admin?"Admin connecte":"Connexion admin",n.disabled=v,re()}function be(){return S().admin?!0:(h("Connexion admin requise pour cette action.","error"),!1)}function Ft(e){return e.source==="local-dev"?"Mode local":e.source==="local-admin"?"Admin local":e.admin?"Mode admin":"Lecture seule"}function re(){const e=S(),t=document.getElementById("admin-modal"),n=document.getElementById("admin-modal-title"),a=document.getElementById("admin-modal-copy"),s=document.getElementById("admin-login-form"),r=document.getElementById("admin-logged-panel"),i=r.querySelector(".admin-logged-panel__text"),o=document.getElementById("admin-password"),c=document.getElementById("admin-login-submit"),l=document.getElementById("admin-logout"),d=kt(e);c.disabled=v||!d,l.disabled=v,e.admin?(n.textContent=e.source==="local-dev"?"Mode local de developpement":e.source==="local-admin"?"Mode admin local":"Mode admin actif",a.textContent=e.source==="local-dev"?"Cette version locale reste editable sur cet appareil meme sans API admin.":e.source==="local-admin"?"Le mot de passe a ete accepte, mais la synchro distante est indisponible. Les changements resteront locaux a cet appareil.":"Cet appareil peut saisir les scores, generer des donnees de test et reinitialiser le tournoi.",s.hidden=!0,r.hidden=!1,i.textContent=e.source==="local-dev"?"Tu peux tester la saisie localement ici, mais rien n’est partage avec les autres appareils.":e.source==="local-admin"?"Tu peux saisir localement sur cet appareil en attendant le retour de la synchro.":"Tu peux maintenant saisir les scores et utiliser la barre d’actions admin en bas de page.",l.textContent=e.source==="local-dev"?"Fermer":"Se deconnecter"):(n.textContent="Connexion admin",a.textContent=e.authConfigured?e.remote?"Entrez le mot de passe organisateurs pour debloquer la saisie sur cet appareil.":"La synchro distante est indisponible, mais tu peux quand meme ouvrir un mode admin local sur cet appareil.":"La connexion admin n’est pas encore configuree sur ce deploiement.",s.hidden=!d,r.hidden=!0,o.disabled=v||!d,l.textContent="Se deconnecter"),!t.hidden&&!e.admin&&!v&&!o.disabled&&window.setTimeout(()=>o.focus(),0)}function $t(){const e=document.getElementById("admin-modal");e.hidden=!1,document.body.classList.add("admin-modal-open"),re()}function Q(){const e=document.getElementById("admin-modal"),t=document.getElementById("admin-password");e.hidden=!0,document.body.classList.remove("admin-modal-open"),t.value="",ne()}function ne(){const e=document.getElementById("admin-error");e.textContent=""}function Se(e){const t=document.getElementById("admin-error");t.textContent=e}function h(e,t=""){const n=document.getElementById("backup-status");n.textContent=e,n.dataset.kind=t,z&&clearTimeout(z),z=window.setTimeout(()=>{n.textContent="",n.dataset.kind=""},3500)}function Et(){return!!document.querySelector(".sc-input:focus, .b-score-input:focus")}function Ot(){return["localhost","127.0.0.1"].includes(window.location.hostname)}function kt(e){return e.source==="local-dev"?!0:e.authConfigured}async function E(e,t={}){const n={method:t.method||"GET",credentials:"same-origin",headers:{Accept:"application/json",...t.headers}};t.body!==void 0&&(n.body=JSON.stringify(t.body),n.headers["Content-Type"]="application/json");let a;try{a=await fetch(e,n)}catch{throw new Error("API Vercel indisponible sur cet environnement.")}const s=await wt(a);if(!a.ok){const r=new Error((s==null?void 0:s.error)||(s==null?void 0:s.message)||`Erreur ${a.status}`);throw r.status=a.status,r.payload=s,r}return s}async function wt(e){if((e.headers.get("content-type")||"").includes("application/json"))return e.json();const n=await e.text();if(!n)return{};try{return JSON.parse(n)}catch{return{message:n}}}
