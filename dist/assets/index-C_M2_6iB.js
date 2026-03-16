(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))a(s);new MutationObserver(s=>{for(const r of s)if(r.type==="childList")for(const o of r.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&a(o)}).observe(document,{childList:!0,subtree:!0});function n(s){const r={};return s.integrity&&(r.integrity=s.integrity),s.referrerPolicy&&(r.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?r.credentials="include":s.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function a(s){if(s.ep)return;s.ep=!0;const r=n(s);fetch(s.href,r)}})();const Y="go-ouest-2026",Re=["go-ouest-2025"],xe={source:"booting",admin:!1,readOnly:!0,remote:!1,authConfigured:!0,lastRemoteUpdate:null};let g=De(),k={...xe},X=null;const Q=[];function Ne(){return g}function j(e){return g.scores[String(e)]||{}}function _e(){return I(K(),{persist:!0,notify:!0}),g}function I(e,t={}){const{notify:n=!0,persist:a=!0}=t,s=ke(e),r=!He(g,s);return g=s,a&&q(),n&&r&&D(),{changed:r,state:g}}function S(){return{...k}}function $(){return k.readOnly}function v(e,t={}){const{forceNotify:n=!1}=t,a={...k,...e},s=!je(k,a);return k=a,(s||n)&&D(),k}function le(e){X=e||null}function we(e,t,n){return $()||(Pe(g,e,t,n),q()),g}async function Oe(e,t,n){if($())return g;const a=Ke(g);if(Pe(g,e,t,n),q(),D(),!X)return g;try{const s=await X({type:"setScore",matchId:String(e),side:t,value:re(n)});return s!=null&&s.state&&I(s.state,{persist:!0,notify:!0}),g}catch(s){throw g=a,q(),D(),ze(s),s}}function qe(e){return Q.push(e),()=>{const t=Q.indexOf(e);t>=0&&Q.splice(t,1)}}function De(){const e=localStorage.getItem(Y);if(e)return de(e);for(const t of Re){const n=localStorage.getItem(t);if(!n)continue;const a=de(n);return localStorage.setItem(Y,JSON.stringify(a)),a}return K()}function K(){return{scores:{}}}function de(e){try{return ke(JSON.parse(e))}catch{return K()}}function ke(e){const t=e==null?void 0:e.scores;if(!t||typeof t!="object"||Array.isArray(t))return K();const n={};return Object.entries(t).forEach(([a,s])=>{if(!s||typeof s!="object"||Array.isArray(s))return;const r={};["s1","s2"].forEach(o=>{const i=re(s[o]);i!==void 0&&(r[o]=i)}),!(r.s1==null&&r.s2==null)&&(n[String(a)]=r)}),{scores:n}}function Pe(e,t,n,a){if(n!=="s1"&&n!=="s2")return;const s=re(a);if(s===void 0)return;const r=String(t),o=e.scores[r]?{...e.scores[r]}:{};if(o[n]=s,o.s1==null&&o.s2==null){delete e.scores[r];return}e.scores[r]=o}function re(e){if(e===""||e==null)return null;const t=Number(e);if(!(!Number.isFinite(t)||t<0))return t}function He(e,t){return JSON.stringify(e)===JSON.stringify(t)}function je(e,t){const n=Object.keys(e),a=Object.keys(t);return n.length!==a.length?!1:n.every(s=>e[s]===t[s])}function Ke(e){return JSON.parse(JSON.stringify(e))}function ze(e){typeof window>"u"||window.dispatchEvent(new CustomEvent("go-ouest:sync-error",{detail:{error:e}}))}function q(){localStorage.setItem(Y,JSON.stringify(g))}function D(){const e=Ne(),t=S();Q.forEach(n=>n(e,t))}const Ce=[{id:1,p1:"Colombe",p2:"Pierre"},{id:2,p1:"Castille",p2:"Léo D."},{id:3,p1:"Eugénie",p2:"Cyprien"},{id:4,p1:"Capucine",p2:"Henri"},{id:5,p1:"Valentine",p2:"Hugues"},{id:6,p1:"Candice",p2:"Alfred"},{id:7,p1:"Charlotte",p2:"Hippolyte"},{id:8,p1:"Clarisse",p2:"Alban R."},{id:9,p1:"Marion",p2:"Karol"},{id:10,p1:"Philippine",p2:"Xavier"},{id:11,p1:"Paola A.",p2:"Grégoire"},{id:12,p1:"Marie D.",p2:"Alban"},{id:13,p1:"Louise B.",p2:"Louis S."},{id:14,p1:"Charlotte G.",p2:"Amaury"},{id:15,p1:"Iklil",p2:"Jean"},{id:16,p1:"Margaux",p2:"Donatien"},{id:17,p1:"Paula",p2:"Paul"},{id:18,p1:"Théophile",p2:"Maylis"},{id:19,p1:"Eléonore",p2:"Stan"},{id:20,p1:"Mathilde",p2:"Victor"},{id:25,p1:"Sixtine",p2:"Gaspard"},{id:26,p1:"Anne-Thaïs",p2:"Brieuc"},{id:27,p1:"Aglaé",p2:"Gauthier"}],C=[{name:"Poule A",color:"#1a5c38",teams:[1,8,15,26]},{name:"Poule B",color:"#1a4a7c",teams:[2,9,16,27]},{name:"Poule C",color:"#7c1a1a",teams:[3,10,17]},{name:"Poule D",color:"#6b21a8",teams:[4,11,18]},{name:"Poule E",color:"#92400e",teams:[5,12,19]},{name:"Poule F",color:"#0e6b5e",teams:[6,13,20]},{name:"Poule G",color:"#155e75",teams:[7,14,25]}],R=15,Ae=5,L=R+Ae,Z=10,H=15,Ue=e=>Ce.find(t=>t.id===e),O=e=>{const t=Ue(e);return`${t.p1} & ${t.p2}`},G={quarterfinals:[{id:"QF1",label:"QF1",sides:[{qualifier:0},{qualifier:7}]},{id:"QF2",label:"QF2",sides:[{qualifier:1},{qualifier:6}]},{id:"QF3",label:"QF3",sides:[{qualifier:2},{qualifier:5}]},{id:"QF4",label:"QF4",sides:[{qualifier:3},{qualifier:4}]}],semifinals:[{id:"SF1",label:"SF1",sides:[{winnerOf:"QF1"},{winnerOf:"QF2"}]},{id:"SF2",label:"SF2",sides:[{winnerOf:"QF3"},{winnerOf:"QF4"}]}],finals:[{id:"F",label:"Finale",sides:[{winnerOf:"SF1"},{winnerOf:"SF2"}]},{id:"TP",label:"3e place",sides:[{loserOf:"SF1"},{loserOf:"SF2"}]}]};function z(){const e=[];let t=1;return C.forEach(n=>{const a=n.teams;for(let s=0;s<a.length;s++)for(let r=s+1;r<a.length;r++)e.push({id:t++,pool:n.name,color:n.color,t1:a[s],t2:a[r]})}),e}function Ge(e){const t={};e.forEach(r=>{var o;(t[o=r.pool]??(t[o]=[])).push(r)});const n=Object.values(t),a=e.length,s=[];return n.forEach((r,o)=>{const i=a/r.length,d=o*(i/n.length);r.forEach((l,c)=>s.push({m:l,pos:d+c*i}))}),s.sort((r,o)=>r.pos-o.pos),s.map(r=>r.m)}function Ve(e){const t=Ge(e),n=[];for(;t.length;){const a=new Set([...(n[n.length-1]||[]).flatMap(i=>[i.t1,i.t2]),...(n[n.length-2]||[]).flatMap(i=>[i.t1,i.t2])]),s=new Set((n[n.length-1]||[]).flatMap(i=>[i.t1,i.t2])),r=new Set,o=[];for(let i=0;i<3&&o.length<2;i++){const d=i===0?a:i===1?s:new Set;for(let l=0;l<t.length&&o.length<2;l++){const c=t[l];!r.has(c.t1)&&!r.has(c.t2)&&!d.has(c.t1)&&!d.has(c.t2)&&(o.push(c),r.add(c.t1),r.add(c.t2),t.splice(l--,1))}}n.push(o)}return n}function Je(e,t,n){let a=0,s=0,r=0,o=0,i=0,d=0,l=0;return n.filter(c=>c.pool===t&&(c.t1===e||c.t2===e)).forEach(c=>{const f=j(c.id);if(f.s1==null||f.s2==null)return;const m=c.t1===e?f.s1:f.s2,y=c.t1===e?f.s2:f.s1;a++,d+=m,l+=y,m>y?(s++,i+=3):m===y?(o++,i+=1):r++}),{j:a,v:s,d:r,n:o,pts:i,gf:d,ga:l}}function ee(e,t){return e.teams.map(n=>({id:n,...Je(n,e.name,t)})).sort((n,a)=>a.pts-n.pts||a.gf-a.ga-(n.gf-n.ga)||a.gf-n.gf)}function We(e){const t=C.map(a=>{var r,o;const s=ee(a,e);return{team:(r=s[0])==null?void 0:r.id,pool:a.name,color:a.color,pts:((o=s[0])==null?void 0:o.pts)??0}}),n=C.filter(a=>a.teams.length>=4).map(a=>{var r,o,i,d;const s=ee(a,e);return{team:(r=s[1])==null?void 0:r.id,pool:a.name,color:a.color,pts:((o=s[1])==null?void 0:o.pts)??0,gf:((i=s[1])==null?void 0:i.gf)??0,ga:((d=s[1])==null?void 0:d.ga)??0,isWild:!0}}).sort((a,s)=>s.pts-a.pts||s.gf-s.ga-(a.gf-a.ga)||s.gf-a.gf)[0];return[...t,n]}function Me(e){var r;const t=We(e),n=new Map(t.filter(o=>o==null?void 0:o.team).map(o=>[o.team,o])),a={},s={quarterfinals:V(G.quarterfinals,t,n,a),semifinals:V(G.semifinals,t,n,a),finals:V(G.finals,t,n,a)};return{qualifiers:t,rounds:s,champion:((r=s.finals[0])==null?void 0:r.winner)??null}}function V(e,t,n,a){return e.map(s=>{const r=s.sides.map(l=>Ye(l,t,a)),o=j(s.id),i=Xe(r,o,n),d={id:s.id,label:s.label,sides:r,score:o,ready:r.every(l=>l==null?void 0:l.team),...i};return a[s.id]=d,d})}function Ye(e,t,n){var a,s;return e.qualifier!=null?t[e.qualifier]??null:e.winnerOf?((a=n[e.winnerOf])==null?void 0:a.winner)??null:e.loserOf?((s=n[e.loserOf])==null?void 0:s.loser)??null:null}function Xe(e,t,n){const[a,s]=e;if(!(a!=null&&a.team)||!(s!=null&&s.team)||t.s1==null||t.s2==null||t.s1===t.s2)return{winner:null,loser:null,isTie:t.s1!=null&&t.s1===t.s2};const r=t.s1>t.s2?a.team:s.team,o=r===a.team?s.team:a.team;return{winner:n.get(r)??{team:r},loser:n.get(o)??{team:o},isTie:!1}}const Ze=["QF1","QF2","QF3","QF4","SF1","SF2","F","TP"];function et(){const e={};return z().forEach(t=>{e[String(t.id)]=tt()}),Ze.forEach(t=>{e[t]=nt()}),{scores:e}}function tt(){if(Math.random()<.18){const e=te(4,9);return{s1:e,s2:e}}return Ie(4,9)}function nt(){return Ie(4,9)}function Ie(e,t){const n=te(e,t),a=te(0,Math.max(0,n-1));return Math.random()<.5?{s1:n,s2:a}:{s1:a,s2:n}}function te(e,t){return Math.floor(Math.random()*(t-e+1))+e}function at(e){const t=z(),n=s=>["r1","r2","r3","rn"][Math.min(s,3)],a=s=>{const o=ee(s,t).map((i,d)=>`
      <tr class="${d===0?"q":""}">
        <td><span class="rnk ${n(d)}">${d+1}</span></td>
        <td><span class="duo-name">${O(i.id)}</span></td>
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
    <div class="tourney-meta">${Ce.length} duos · ${C.length} poules · ${t.length} matchs · 2 terrains · 6h</div>
    <div class="banner info">
      ℹ️ <div>
        <strong>Format :</strong> 7 poules → top 1 de chaque poule + meilleur 2ème = <strong>8 qualifiés</strong>.
        Ligne <span class="q-sample">orange</span> = qualifié provisoire.
      </div>
    </div>
    <div class="pools-grid">${C.map(a).join("")}</div>`}const st=[{id:"QF1",round:"Quart de finale",tag:"QF1",color:"#a34710",fallbacks:["1er Poule A","Meilleur 2e"]},{id:"QF2",round:"Quart de finale",tag:"QF2",color:"#a34710",fallbacks:["1er Poule B","1er Poule G"]},{id:"QF3",round:"Quart de finale",tag:"QF3",color:"#a34710",fallbacks:["1er Poule C","1er Poule F"]},{id:"QF4",round:"Quart de finale",tag:"QF4",color:"#a34710",fallbacks:["1er Poule D","1er Poule E"]},{id:"SF1",round:"Demi-finale",tag:"SF1",color:"#7c3aed",fallbacks:["Vainqueur QF1","Vainqueur QF2"]},{id:"SF2",round:"Demi-finale",tag:"SF2",color:"#7c3aed",fallbacks:["Vainqueur QF3","Vainqueur QF4"]},{id:"TP",round:"3e place",tag:"3e place",color:"#0f766e",fallbacks:["Perdant SF1","Perdant SF2"]},{id:"F",round:"Finale",tag:"Finale",color:"#c2450a",fallbacks:["Vainqueur SF1","Vainqueur SF2"]}];function ce(e){return e.replace(/\D+/g,"").slice(0,2)}function x(e){const t=Math.floor(e/60),n=e%60;return`${String(t).padStart(2,"0")}:${String(n).padStart(2,"0")}`}function rt(e){const t=Math.floor(e/60),n=e%60;return`${t}h${n>0?String(n).padStart(2,"0"):""}`}function ot(e){const t=$(),n=z(),a=Ve(n),s=it(n,a),r=s.endMinutes-Z*60;e.innerHTML=`
    <div class="banner">
      ⚠️ <strong>${n.length} matchs de poule + 8 matchs de phase finale · pause ${H} min · fin estimée ${x(s.endMinutes)} (~${rt(r)}).</strong>
      Si ça dépasse : réduire les matchs à <strong>${R-2}-${R-1} min</strong> et garder la transition fluide.
    </div>
    <div class="planning-header">
      <span class="section-title">Planning</span>
      <span class="planning-meta">Début ${String(Z).padStart(2,"0")}h00 · matchs ${R} min + ${Ae} min transition · pause ${H} min avant les quarts</span>
    </div>
    <div class="courts-grid">
      <div class="court-card">
        <div class="court-hdr c1-hdr">🎾 Terrain 1</div>
        ${s.courts[0].map(o=>he(o,t)).join("")}
      </div>
      <div class="court-card">
        <div class="court-hdr c2-hdr">🎾 Terrain 2</div>
        ${s.courts[1].map(o=>he(o,t)).join("")}
      </div>
    </div>`,e.dataset.scoreBound!=="true"&&(e.addEventListener("input",o=>{if($())return;const i=o.target;if(!i.dataset.mid)return;const d=ce(i.value);i.value!==d&&(i.value=d),we(i.dataset.mid,i.dataset.side,d)}),e.addEventListener("focusout",o=>{if($())return;const i=o.target;if(!i.dataset.mid)return;const d=ce(i.value);i.value!==d&&(i.value=d),Oe(i.dataset.mid,i.dataset.side,d)}),e.addEventListener("keydown",o=>{if(o.key!=="Enter")return;const i=o.target;i.dataset.mid&&i.blur()}),e.dataset.scoreBound="true")}function it(e,t){const n=[[],[]],a=Z*60;t.forEach((l,c)=>{const f=a+c*L;n[0].push(l[0]?ue(l[0],f):pe(f)),n[1].push(l[1]?ue(l[1],f):pe(f))});const s=a+t.length*L;n[0].push(fe(s)),n[1].push(fe(s));const r=s+H,{rounds:o}=Me(e),i=Object.fromEntries([...o.quarterfinals,...o.semifinals,...o.finals].map(l=>[l.id,l])),d=[["QF1","QF2"],["QF3","QF4"],["SF1","SF2"],["TP","F"]];return d.forEach((l,c)=>{const f=r+c*L;n[0].push(me(i[l[0]],f,l[0])),n[1].push(me(i[l[1]],f,l[1]))}),{courts:n,endMinutes:r+d.length*L}}function ue(e,t){return{type:"match",matchId:e.id,startMinutes:t,leftLabel:O(e.t1),rightLabel:O(e.t2),tag:e.pool,tagColor:e.color,detail:"Phase de poules",editable:!0,kind:"pool"}}function me(e,t,n){const a=st.find(s=>s.id===n);return{type:"match",matchId:e.id,startMinutes:t,leftLabel:ge(e.sides[0],a.fallbacks[0]),rightLabel:ge(e.sides[1],a.fallbacks[1]),tag:a.tag,tagColor:a.color,detail:a.round,editable:e.ready,kind:"knockout"}}function fe(e){return{type:"break",startMinutes:e,label:"Pause avant la phase finale",detail:`${H} min · calcul des qualifiés`}}function pe(e){return{type:"empty",startMinutes:e}}function ge(e,t){return e!=null&&e.team?O(e.team):t}function he(e,t){if(e.type==="empty")return`
      <div class="empty-slot">
        <span class="m-time">${x(e.startMinutes)}</span>
        <span>—</span>
      </div>`;if(e.type==="break")return`
      <div class="planning-break-row">
        <span class="m-time">${x(e.startMinutes)}</span>
        <div class="m-body">
          <div class="planning-break-title">${e.label}</div>
          <div class="planning-break-meta">${e.detail}</div>
        </div>
      </div>`;const n=j(e.matchId),a=t||!e.editable;return`
    <div class="match-row ${e.kind==="knockout"?"match-row--knockout":""}" data-mid="${e.matchId}">
      <span class="m-time">${x(e.startMinutes)}</span>
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
    </div>`}const lt=[["QF1","SF1"],["QF2","SF1"],["QF3","SF2"],["QF4","SF2"],["SF1","F"],["SF2","F"],["SF1","TP"],["SF2","TP"],["F","CHAMPION"]];function be(e){return e.replace(/\D+/g,"").slice(0,2)}const dt=e=>e!=null&&e.team?`<span class="m-pool-tag" style="background:${e.color??"#888"}">${e.pool??"Phase finale"}${e.isWild?" ⭐":""}</span>`:'<span class="b-team-meta">À déterminer</span>',ye=(e,t,n,a)=>{if(!(e!=null&&e.team))return'<div class="b-team b-team--tbd"><span>À déterminer</span></div>';const s=j(t);return`
    <div class="b-team">
      <div class="b-team-main">
        ${dt(e)}
        <span>${O(e.team)}</span>
      </div>
      <div class="b-score">
        <input class="b-score-input" type="text" inputmode="numeric" pattern="[0-9]*" maxlength="2"
          value="${s[n]??""}" placeholder="—"
          data-mid="${t}" data-side="${n}" ${a?"disabled":""}>
      </div>
    </div>`};function ct(e){const t=$(),n=z(),{qualifiers:a,rounds:s,champion:r}=Me(n),[o,i,d,l,c,f,m,y]=a,U=a.map((u,p)=>`
    <div class="qual-card" style="border-color:${(u==null?void 0:u.color)||"#aaa"}">
      <div class="qual-pool" style="color:${(u==null?void 0:u.color)||"#aaa"}">
        ${(u==null?void 0:u.pool)||"—"}${u!=null&&u.isWild?" ⭐ Wildcard":""}
      </div>
      <div class="qual-name">${u!=null&&u.team?O(u.team):"—"}</div>
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
                ${F(s.quarterfinals[1],`${(i==null?void 0:i.pool)??"—"} vs ${(m==null?void 0:m.pool)??"—"}`,t)}
                ${F(s.quarterfinals[2],`${(d==null?void 0:d.pool)??"—"} vs ${(f==null?void 0:f.pool)??"—"}`,t)}
                ${F(s.quarterfinals[3],`${(l==null?void 0:l.pool)??"—"} vs ${(c==null?void 0:c.pool)??"—"}`,t)}
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
                  <div class="trophy-sub">${r!=null&&r.team?O(r.team):"À déterminer"}</div>
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
    </div>`,ut(e),ne(e),e.dataset.scoreBound!=="true"&&(e.addEventListener("input",u=>{if($())return;const p=u.target;if(!p.dataset.mid)return;const w=be(p.value);p.value!==w&&(p.value=w),we(p.dataset.mid,p.dataset.side,w)}),e.addEventListener("focusout",u=>{if($())return;const p=u.target;if(!p.dataset.mid)return;const w=be(p.value);p.value!==w&&(p.value=w),Oe(p.dataset.mid,p.dataset.side,w)}),e.addEventListener("keydown",u=>{if(u.key!=="Enter")return;const p=u.target;p.dataset.mid&&p.blur()}),e.dataset.scoreBound="true")}function ut(e){e._bracketResizeObserver||(e._bracketResizeObserver=new ResizeObserver(()=>ne(e)));const t=e.querySelector(".bracket-stage");e._observedBracketStage&&e._observedBracketStage!==t&&e._bracketResizeObserver.unobserve(e._observedBracketStage),t&&e._observedBracketStage!==t&&(e._bracketResizeObserver.observe(t),e._observedBracketStage=t),e._bracketWindowBound||(e._bracketWindowBound=!0,window.addEventListener("resize",()=>ne(e)))}function ne(e){e._bracketRaf&&cancelAnimationFrame(e._bracketRaf),e._bracketRaf=requestAnimationFrame(()=>{e._bracketRaf=null,mt(e)})}function mt(e){const t=e.querySelector(".bracket-stage");if(!t)return;const n={quarters:t.querySelector(".b-round--quarters .b-round-body"),semis:t.querySelector(".b-round--semis .b-round-body"),finals:t.querySelector(".b-round--finals .b-round-body"),champion:t.querySelector(".b-round--champion .b-round-body")},a={QF1:t.querySelector('[data-match-id="QF1"]'),QF2:t.querySelector('[data-match-id="QF2"]'),QF3:t.querySelector('[data-match-id="QF3"]'),QF4:t.querySelector('[data-match-id="QF4"]'),SF1:t.querySelector('[data-match-id="SF1"]'),SF2:t.querySelector('[data-match-id="SF2"]'),F:t.querySelector('[data-match-id="F"]'),TP:t.querySelector('[data-match-id="TP"]'),CHAMPION:t.querySelector('[data-node-id="CHAMPION"]')};if(Object.values(n).some(u=>!u)||Object.values(a).some(u=>!u))return;const s=t.querySelector(".b-label-3rd");if(!s)return;const r=a.QF1.getBoundingClientRect().height,o=a.CHAMPION.getBoundingClientRect().height,i=s.getBoundingClientRect().height,d=16,l=24,c=28,f=10,m={QF1:0,QF2:r+d};m.QF3=m.QF2+r+l,m.QF4=m.QF3+r+d,m.SF1=J(m.QF1+r/2,m.QF2+r/2)-r/2,m.SF2=J(m.QF3+r/2,m.QF4+r/2)-r/2,m.F=J(m.SF1+r/2,m.SF2+r/2)-r/2;const y=m.F+r+c;m.TP=y+i+f,m.CHAMPION=m.F+(r-o)/2;const U=Math.max(m.QF4+r,m.SF2+r,m.TP+r,m.CHAMPION+o);Object.values(n).forEach(u=>{u.style.height=`${U}px`}),["QF1","QF2","QF3","QF4","SF1","SF2","F","TP"].forEach(u=>{const p=a[u];p.style.top=`${m[u]}px`}),s.style.top=`${y}px`,a.CHAMPION.style.top=`${m.CHAMPION}px`,ft(t)}function J(e,t){return(e+t)/2}function ft(e){const t=e.querySelector(".bracket-svg");if(!t)return;const n=e.getBoundingClientRect(),a=Math.ceil(n.width),s=Math.ceil(n.height);t.setAttribute("viewBox",`0 0 ${a} ${s}`),t.setAttribute("width",a),t.setAttribute("height",s),t.innerHTML=lt.map(([r,o])=>{const i=ve(e,r),d=ve(e,o);if(!i||!d)return"";const l=Se(i,"right",n),c=Se(d,"left",n),f=l.x+(c.x-l.x)/2;return`<path d="M ${l.x} ${l.y} L ${f} ${l.y} L ${f} ${c.y} L ${c.x} ${c.y}" />`}).join("")}function ve(e,t){return t==="CHAMPION"?e.querySelector('[data-node-id="CHAMPION"]'):e.querySelector(`[data-match-id="${t}"] .b-match`)}function Se(e,t,n){const a=e.getBoundingClientRect();return{x:Math.round((t==="left"?a.left:a.right)-n.left),y:Math.round(a.top+a.height/2-n.top)}}function F(e,t,n){return`
    <div class="b-match-wrap" data-match-id="${e.id}">
      <div class="b-match">
        <div class="b-match-head">
          <span>${e.label}</span>
          ${e.isTie?'<span class="b-error">Pas de match nul</span>':`<span class="b-side-label">${t}</span>`}
        </div>
        ${ye(e.sides[0],e.id,"s1",!e.ready||n)}
        ${ye(e.sides[1],e.id,"s2",!e.ready||n)}
      </div>
    </div>`}const pt=5e3,A="/api/tournament",ae="/api/admin/session",oe={poules:()=>at(document.getElementById("poules")),planning:()=>ot(document.getElementById("planning")),finale:()=>ct(document.getElementById("finale"))};let Le="poules",W=null,N=null,b=!1,Te=null,T=null,Fe=null;document.querySelectorAll(".tab-btn").forEach(e=>{e.addEventListener("click",()=>ht(e.dataset.tab))});Ft();$t();Et();window.addEventListener("go-ouest:sync-error",e=>{var n,a;const t=((a=(n=e.detail)==null?void 0:n.error)==null?void 0:a.message)||"Synchronisation impossible.";h(t,"error")});qe(()=>{P(),oe[Le]()});gt();async function gt(){await bt(),P(),oe.poules()}function ht(e){document.querySelectorAll(".tab-content").forEach(t=>t.classList.remove("active")),document.querySelectorAll(".tab-btn").forEach(t=>t.classList.remove("active")),document.getElementById(e).classList.add("active"),document.querySelector(`[data-tab="${e}"]`).classList.add("active"),Le=e,oe[e]()}async function bt(){const e=await vt();await yt(e)||St(Te,e)}async function yt(e){try{const t=await E(A);return I(t.state,{persist:!0,notify:!1}),v({source:"remote",remote:!0,admin:e.admin,readOnly:!e.admin,authConfigured:e.authConfigured,lastRemoteUpdate:t.updatedAt??null}),le(async n=>{try{const a=await E(A,{method:"POST",body:n});return a!=null&&a.updatedAt&&v({lastRemoteUpdate:a.updatedAt}),a}catch(a){throw a.status===401&&v({admin:!1,readOnly:!0}),a}}),wt(),!0}catch(t){return Te=t,Be(),le(null),!1}}async function vt(){try{const e=await E(ae);return{admin:!!e.admin,authConfigured:e.configured!==!1}}catch(e){return{admin:!1,authConfigured:e.status!==503}}}function St(e,t){if(At()){v({source:"local-dev",remote:!1,admin:!0,readOnly:!1,authConfigured:!0,lastRemoteUpdate:null}),h("API Vercel indisponible ici : mode local de developpement actif.","info");return}v({source:"remote-down",remote:!1,admin:!1,readOnly:!0,authConfigured:(t==null?void 0:t.authConfigured)??!1,lastRemoteUpdate:null}),h((e==null?void 0:e.message)||"Synchronisation indisponible : la page reste en lecture seule.","error")}function Ft(){const e=document.getElementById("admin-access-trigger"),t=document.getElementById("admin-modal"),n=t.querySelectorAll("[data-admin-close]"),a=document.getElementById("admin-login-form"),s=document.getElementById("admin-password"),r=document.getElementById("admin-logout");e.addEventListener("click",()=>Pt()),n.forEach(o=>{o.addEventListener("click",()=>B())}),a.addEventListener("submit",async o=>{if(o.preventDefault(),!b){se(),b=!0,P();try{await E(ae,{method:"POST",body:{password:s.value}}),s.value="",S().remote?(v({admin:!0,readOnly:!1}),await M({silent:!0,forceRender:!0}),h("Mode admin active sur cet appareil.","success")):(v({admin:!0,readOnly:!1,source:"local-admin"}),h("Mode admin local actif sur cet appareil.","warning")),ie()}catch(i){Ee(i.message||"Connexion admin impossible.")}finally{b=!1,P()}}}),r.addEventListener("click",async()=>{if(!b){if(S().source==="local-dev"){B();return}b=!0,se(),P();try{await E(ae,{method:"DELETE"}),v({admin:!1,readOnly:!0}),h("Mode admin desactive sur cet appareil.","success"),B()}catch(o){Ee(o.message||"Deconnexion impossible.")}finally{b=!1,P()}}}),document.addEventListener("keydown",o=>{o.key==="Escape"&&!t.hidden&&B()})}function $t(){const e=document.getElementById("backup-mock"),t=document.getElementById("backup-reset");e.addEventListener("click",async()=>{if(!$e()||!window.confirm("Generer des scores aleatoires pour tout le tournoi ? Cela remplacera les scores actuels."))return;const a=et();try{S().remote?(await E(A,{method:"POST",body:{type:"replaceState",state:a}}),await M({silent:!0,forceRender:!0})):I(a,{persist:!0,notify:!0}),h("Mock data generee pour les tests.","success")}catch(s){h(s.message||"Generation mock impossible.","error")}}),t.addEventListener("click",async()=>{if(!(!$e()||!window.confirm("Reinitialiser tous les scores du tournoi ?")))try{S().remote?(await E(A,{method:"POST",body:{type:"reset"}}),await M({silent:!0,forceRender:!0})):_e(),h("Scores reinitialises.","success")}catch(a){h(a.message||"Reinitialisation impossible.","error")}})}function Et(){const e=document.getElementById("admin-toolbar");e&&(window.addEventListener("resize",_),"ResizeObserver"in window&&(Fe=new ResizeObserver(()=>{_()}),Fe.observe(e)),_())}async function M(e={}){const{silent:t=!1,forceRender:n=!1}=e;if(S().remote&&!Ct())try{const a=await E(A),{changed:s}=I(a.state,{persist:!0,notify:!0});v({lastRemoteUpdate:a.updatedAt??null},{forceNotify:n&&!s})}catch(a){a.status===401&&v({admin:!1,readOnly:!0}),t||h(a.message||"Synchronisation impossible.","error")}}function wt(){Be(),N=window.setInterval(()=>{document.visibilityState!=="hidden"&&M({silent:!0})},pt),document.addEventListener("visibilitychange",Qe)}function Be(){N&&(window.clearInterval(N),N=null),document.removeEventListener("visibilitychange",Qe)}function Qe(){document.visibilityState==="visible"&&M({silent:!0,forceRender:!0})}function P(){const e=S(),t=document.getElementById("admin-toolbar"),n=document.getElementById("admin-access-trigger"),a=document.getElementById("sync-badge");document.body.classList.toggle("is-admin",e.admin),document.body.classList.toggle("is-public",!e.admin),t.hidden=!e.admin,a.textContent=kt(e),n.textContent=e.admin?"Admin connecte":"Connexion admin",n.disabled=b,_(),ie()}function _(){T&&window.cancelAnimationFrame(T),T=window.requestAnimationFrame(()=>{T=null,Ot()})}function Ot(){const e=document.getElementById("admin-toolbar"),t=document.documentElement.style;if(!e||e.hidden){t.setProperty("--admin-toolbar-offset","0px");return}const n=window.getComputedStyle(e);if(n.display==="none"||n.visibility==="hidden"){t.setProperty("--admin-toolbar-offset","0px");return}const a=Number.parseFloat(n.bottom)||0,s=Math.ceil(e.getBoundingClientRect().height+a+24);t.setProperty("--admin-toolbar-offset",`${s}px`)}function $e(){return S().admin?!0:(h("Connexion admin requise pour cette action.","error"),!1)}function kt(e){return e.source==="local-dev"?"Mode local":e.source==="local-admin"?"Admin local":e.admin?"Mode admin":"Lecture seule"}function ie(){const e=S(),t=document.getElementById("admin-modal"),n=document.getElementById("admin-modal-title"),a=document.getElementById("admin-modal-copy"),s=document.getElementById("admin-login-form"),r=document.getElementById("admin-logged-panel"),o=r.querySelector(".admin-logged-panel__text"),i=document.getElementById("admin-password"),d=document.getElementById("admin-login-submit"),l=document.getElementById("admin-logout"),c=Mt(e);d.disabled=b||!c,l.disabled=b,e.admin?(n.textContent=e.source==="local-dev"?"Mode local de developpement":e.source==="local-admin"?"Mode admin local":"Mode admin actif",a.textContent=e.source==="local-dev"?"Cette version locale reste editable sur cet appareil meme sans API admin.":e.source==="local-admin"?"Le mot de passe a ete accepte, mais la synchro distante est indisponible. Les changements resteront locaux a cet appareil.":"Cet appareil peut saisir les scores, generer des donnees de test et reinitialiser le tournoi.",s.hidden=!0,r.hidden=!1,o.textContent=e.source==="local-dev"?"Tu peux tester la saisie localement ici, mais rien n’est partage avec les autres appareils.":e.source==="local-admin"?"Tu peux saisir localement sur cet appareil en attendant le retour de la synchro.":"Tu peux maintenant saisir les scores et utiliser la barre d’actions admin en bas de page.",l.textContent=e.source==="local-dev"?"Fermer":"Se deconnecter"):(n.textContent="Connexion admin",a.textContent=e.authConfigured?e.remote?"Entrez le mot de passe organisateurs pour debloquer la saisie sur cet appareil.":"La synchro distante est indisponible, mais tu peux quand meme ouvrir un mode admin local sur cet appareil.":"La connexion admin n’est pas encore configuree sur ce deploiement.",s.hidden=!c,r.hidden=!0,i.disabled=b||!c,l.textContent="Se deconnecter"),!t.hidden&&!e.admin&&!b&&!i.disabled&&window.setTimeout(()=>i.focus(),0)}function Pt(){const e=document.getElementById("admin-modal");e.hidden=!1,document.body.classList.add("admin-modal-open"),ie()}function B(){const e=document.getElementById("admin-modal"),t=document.getElementById("admin-password");e.hidden=!0,document.body.classList.remove("admin-modal-open"),t.value="",se()}function se(){const e=document.getElementById("admin-error");e.textContent=""}function Ee(e){const t=document.getElementById("admin-error");t.textContent=e}function h(e,t=""){const n=document.getElementById("backup-status");n.textContent=e,n.dataset.kind=t,W&&clearTimeout(W),W=window.setTimeout(()=>{n.textContent="",n.dataset.kind=""},3500)}function Ct(){return!!document.querySelector(".sc-input:focus, .b-score-input:focus")}function At(){return["localhost","127.0.0.1"].includes(window.location.hostname)}function Mt(e){return e.source==="local-dev"?!0:e.authConfigured}async function E(e,t={}){const n={method:t.method||"GET",credentials:"same-origin",headers:{Accept:"application/json",...t.headers}};t.body!==void 0&&(n.body=JSON.stringify(t.body),n.headers["Content-Type"]="application/json");let a;try{a=await fetch(e,n)}catch{throw new Error("API Vercel indisponible sur cet environnement.")}const s=await It(a);if(!a.ok){const r=new Error((s==null?void 0:s.error)||(s==null?void 0:s.message)||`Erreur ${a.status}`);throw r.status=a.status,r.payload=s,r}return s}async function It(e){if((e.headers.get("content-type")||"").includes("application/json"))return e.json();const n=await e.text();if(!n)return{};try{return JSON.parse(n)}catch{return{message:n}}}
