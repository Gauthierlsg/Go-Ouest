(function(){const s=document.createElement("link").relList;if(s&&s.supports&&s.supports("modulepreload"))return;for(const t of document.querySelectorAll('link[rel="modulepreload"]'))a(t);new MutationObserver(t=>{for(const i of t)if(i.type==="childList")for(const r of i.addedNodes)r.tagName==="LINK"&&r.rel==="modulepreload"&&a(r)}).observe(document,{childList:!0,subtree:!0});function n(t){const i={};return t.integrity&&(i.integrity=t.integrity),t.referrerPolicy&&(i.referrerPolicy=t.referrerPolicy),t.crossOrigin==="use-credentials"?i.credentials="include":t.crossOrigin==="anonymous"?i.credentials="omit":i.credentials="same-origin",i}function a(t){if(t.ep)return;t.ep=!0;const i=n(t);fetch(t.href,i)}})();const D=[{id:1,p1:"Colombe",p2:"Pierre"},{id:2,p1:"Castille",p2:"Léo D."},{id:3,p1:"Eugénie",p2:"Cyprien"},{id:4,p1:"Capucine",p2:"Henri"},{id:5,p1:"Valentine",p2:"Hugues"},{id:6,p1:"Candice",p2:"Alfred"},{id:7,p1:"Charlotte",p2:"Hippolyte"},{id:8,p1:"Clarisse",p2:"Alban R."},{id:9,p1:"Marion",p2:"Karol"},{id:10,p1:"Philippine",p2:"Xavier"},{id:11,p1:"Paola A.",p2:"Grégoire"},{id:12,p1:"Marie D.",p2:"Alban"},{id:13,p1:"Louise B.",p2:"Louis S."},{id:14,p1:"Charlotte G.",p2:"Amaury"},{id:15,p1:"Iklil",p2:"Jean"},{id:16,p1:"Margaux",p2:"Donatien"},{id:17,p1:"Paula",p2:"Paul"},{id:18,p1:"Théophile",p2:"Maylis"},{id:19,p1:"Eléonore",p2:"Stan"},{id:20,p1:"Mathilde",p2:"Victor"},{id:25,p1:"Sixtine",p2:"Gaspard"},{id:26,p1:"Anne-Thaïs",p2:"Brieuc"},{id:27,p1:"Aglaé",p2:"Gauthier"}],S=[{name:"Poule A",color:"#1a5c38",teams:[1,8,15,26]},{name:"Poule B",color:"#1a4a7c",teams:[2,9,16,27]},{name:"Poule C",color:"#7c1a1a",teams:[3,10,17]},{name:"Poule D",color:"#6b21a8",teams:[4,11,18]},{name:"Poule E",color:"#92400e",teams:[5,12,19]},{name:"Poule F",color:"#0e6b5e",teams:[6,13,20]},{name:"Poule G",color:"#155e75",teams:[7,14,25]}],_=15,x=5,B=_+x,H=10,P="go-ouest-2026",K=["go-ouest-2025"];let h=k();function b(e,s,n,a={}){const{notify:t=!0}=a;h.scores[e]||(h.scores[e]={}),h.scores[e][s]=n===""?null:Number(n),G(t)}function F(e){return h.scores[e]||{}}function j(e){I.push(e)}const I=[];function k(){const e=localStorage.getItem(P);if(e)return A(e);for(const s of K){const n=localStorage.getItem(s);if(!n)continue;const a=A(n);return localStorage.setItem(P,JSON.stringify(a)),a}return{scores:{}}}function A(e){try{const s=JSON.parse(e);return{scores:(s==null?void 0:s.scores)??{}}}catch{return{scores:{}}}}function G(e=!0){localStorage.setItem(P,JSON.stringify(h)),e&&I.forEach(s=>s(h))}const U=e=>D.find(s=>s.id===e),$=e=>{const s=U(e);return`${s.p1} & ${s.p2}`},O={quarterfinals:[{id:"QF1",label:"QF1",sides:[{qualifier:0},{qualifier:7}]},{id:"QF2",label:"QF2",sides:[{qualifier:1},{qualifier:6}]},{id:"QF3",label:"QF3",sides:[{qualifier:2},{qualifier:5}]},{id:"QF4",label:"QF4",sides:[{qualifier:3},{qualifier:4}]}],semifinals:[{id:"SF1",label:"SF1",sides:[{winnerOf:"QF1"},{winnerOf:"QF2"}]},{id:"SF2",label:"SF2",sides:[{winnerOf:"QF3"},{winnerOf:"QF4"}]}],finals:[{id:"F",label:"Finale",sides:[{winnerOf:"SF1"},{winnerOf:"SF2"}]},{id:"TP",label:"3e place",sides:[{loserOf:"SF1"},{loserOf:"SF2"}]}]};function M(){const e=[];let s=1;return S.forEach(n=>{const a=n.teams;for(let t=0;t<a.length;t++)for(let i=t+1;i<a.length;i++)e.push({id:s++,pool:n.name,color:n.color,t1:a[t],t2:a[i]})}),e}function V(e){const s={};e.forEach(i=>{var r;(s[r=i.pool]??(s[r]=[])).push(i)});const n=Object.values(s),a=e.length,t=[];return n.forEach((i,r)=>{const o=a/i.length,p=r*(o/n.length);i.forEach((d,l)=>t.push({m:d,pos:p+l*o}))}),t.sort((i,r)=>i.pos-r.pos),t.map(i=>i.m)}function J(e){const s=V(e),n=[];for(;s.length;){const a=new Set([...(n[n.length-1]||[]).flatMap(o=>[o.t1,o.t2]),...(n[n.length-2]||[]).flatMap(o=>[o.t1,o.t2])]),t=new Set((n[n.length-1]||[]).flatMap(o=>[o.t1,o.t2])),i=new Set,r=[];for(let o=0;o<3&&r.length<2;o++){const p=o===0?a:o===1?t:new Set;for(let d=0;d<s.length&&r.length<2;d++){const l=s[d];!i.has(l.t1)&&!i.has(l.t2)&&!p.has(l.t1)&&!p.has(l.t2)&&(r.push(l),i.add(l.t1),i.add(l.t2),s.splice(d--,1))}}n.push(r)}return n}function z(e,s,n){let a=0,t=0,i=0,r=0,o=0,p=0,d=0;return n.filter(l=>l.pool===s&&(l.t1===e||l.t2===e)).forEach(l=>{const c=F(l.id);if(c.s1==null||c.s2==null)return;const g=l.t1===e?c.s1:c.s2,y=l.t1===e?c.s2:c.s1;a++,p+=g,d+=y,g>y?(t++,o+=3):g===y?(r++,o+=1):i++}),{j:a,v:t,d:i,n:r,pts:o,gf:p,ga:d}}function T(e,s){return e.teams.map(n=>({id:n,...z(n,e.name,s)})).sort((n,a)=>a.pts-n.pts||a.gf-a.ga-(n.gf-n.ga)||a.gf-n.gf)}function W(e){const s=S.map(a=>{var i,r;const t=T(a,e);return{team:(i=t[0])==null?void 0:i.id,pool:a.name,color:a.color,pts:((r=t[0])==null?void 0:r.pts)??0}}),n=S.filter(a=>a.teams.length>=4).map(a=>{var i,r,o,p;const t=T(a,e);return{team:(i=t[1])==null?void 0:i.id,pool:a.name,color:a.color,pts:((r=t[1])==null?void 0:r.pts)??0,gf:((o=t[1])==null?void 0:o.gf)??0,ga:((p=t[1])==null?void 0:p.ga)??0,isWild:!0}}).sort((a,t)=>t.pts-a.pts||t.gf-t.ga-(a.gf-a.ga)||t.gf-a.gf)[0];return[...s,n]}function Y(e){var i;const s=W(e),n=new Map(s.filter(r=>r==null?void 0:r.team).map(r=>[r.team,r])),a={},t={quarterfinals:E(O.quarterfinals,s,n,a),semifinals:E(O.semifinals,s,n,a),finals:E(O.finals,s,n,a)};return{qualifiers:s,rounds:t,champion:((i=t.finals[0])==null?void 0:i.winner)??null}}function E(e,s,n,a){return e.map(t=>{const i=t.sides.map(d=>X(d,s,a)),r=F(t.id),o=Z(i,r,n),p={id:t.id,label:t.label,sides:i,score:r,ready:i.every(d=>d==null?void 0:d.team),...o};return a[t.id]=p,p})}function X(e,s,n){var a,t;return e.qualifier!=null?s[e.qualifier]??null:e.winnerOf?((a=n[e.winnerOf])==null?void 0:a.winner)??null:e.loserOf?((t=n[e.loserOf])==null?void 0:t.loser)??null:null}function Z(e,s,n){const[a,t]=e;if(!(a!=null&&a.team)||!(t!=null&&t.team)||s.s1==null||s.s2==null||s.s1===s.s2)return{winner:null,loser:null,isTie:s.s1!=null&&s.s1===s.s2};const i=s.s1>s.s2?a.team:t.team,r=i===a.team?t.team:a.team;return{winner:n.get(i)??{team:i},loser:n.get(r)??{team:r},isTie:!1}}function q(e){const s=M(),n=t=>["r1","r2","r3","rn"][Math.min(t,3)],a=t=>{const r=T(t,s).map((o,p)=>`
      <tr class="${p===0?"q":""}">
        <td><span class="rnk ${n(p)}">${p+1}</span></td>
        <td><span class="duo-name">${$(o.id)}</span></td>
        <td>${o.j}</td>
        <td>${o.v}</td>
        <td>${o.d}</td>
        <td><span class="pts-badge">${o.pts}</span></td>
      </tr>`).join("");return`
      <div class="pool-card">
        <div class="pool-hdr" style="background:${t.color}">
          <h3>${t.name}</h3>
          <span class="badge">${t.teams.length} duos</span>
        </div>
        <table class="stand-table">
          <thead><tr><th>#</th><th>Duo</th><th>J</th><th>V</th><th>D</th><th>Pts</th></tr></thead>
          <tbody>${r}</tbody>
        </table>
      </div>`};e.innerHTML=`
    <div class="tourney-meta">${D.length} duos · ${S.length} poules · ${s.length} matchs · 2 terrains · 6h</div>
    <div class="banner info">
      ℹ️ <div>
        <strong>Format :</strong> 7 poules → top 1 de chaque poule + meilleur 2ème = <strong>8 qualifiés</strong>.
        Ligne <span class="q-sample">orange</span> = qualifié provisoire.
      </div>
    </div>
    <div class="pools-grid">${S.map(a).join("")}</div>`}function w(e){return e.replace(/\D+/g,"").slice(0,2)}function C(e){const s=H*60+e*B,n=Math.floor(s/60),a=s%60;return`${String(n).padStart(2,"0")}:${String(a).padStart(2,"0")}`}function ee(e){const s=M(),n=J(s),a=n.length*B,t=Math.floor(a/60),i=a%60,r=(d,l)=>{if(!d)return`<div class="empty-slot"><span class="m-time">${C(l)}</span><span>—</span></div>`;const c=F(d.id);return`
      <div class="match-row" data-mid="${d.id}">
        <span class="m-time">${C(l)}</span>
        <div class="m-body">
          <div class="m-teams">${$(d.t1)} <span class="vs">vs</span> ${$(d.t2)}</div>
          <span class="m-pool-tag" style="background:${d.color}">${d.pool}</span>
        </div>
        <div class="m-score">
          <input class="sc-input" type="text" inputmode="numeric" pattern="[0-9]*" maxlength="2"
            value="${c.s1??""}" placeholder="—"
            data-mid="${d.id}" data-side="s1">
          <span class="sc-sep">:</span>
          <input class="sc-input" type="text" inputmode="numeric" pattern="[0-9]*" maxlength="2"
            value="${c.s2??""}" placeholder="—"
            data-mid="${d.id}" data-side="s2">
        </div>
      </div>`};let o="",p="";n.forEach((d,l)=>{o+=r(d[0]||null,l),p+=r(d[1]||null,l)}),e.innerHTML=`
    <div class="banner">
      ⚠️ <strong>${s.length} matchs · ${n.length} créneaux · ~${t}h${i>0?i:""}.</strong>
      Si ça dépasse 6h : réduire les matchs à <strong>12-13 min</strong> (transition incluse).
    </div>
    <div class="planning-header">
      <span class="section-title">Planning</span>
      <span class="planning-meta">Début 10h00 · matchs de 15 min</span>
    </div>
    <div class="courts-grid">
      <div class="court-card">
        <div class="court-hdr c1-hdr">🎾 Terrain 1</div>
        ${o}
      </div>
      <div class="court-card">
        <div class="court-hdr c2-hdr">🎾 Terrain 2</div>
        ${p}
      </div>
    </div>`,e.dataset.scoreBound!=="true"&&(e.addEventListener("input",d=>{const l=d.target;if(!l.dataset.mid)return;const c=w(l.value);l.value!==c&&(l.value=c),b(Number(l.dataset.mid),l.dataset.side,c,{notify:!1})}),e.addEventListener("change",d=>{const l=d.target;if(!l.dataset.mid)return;const c=w(l.value);l.value!==c&&(l.value=c),b(Number(l.dataset.mid),l.dataset.side,c)}),e.addEventListener("focusout",d=>{const l=d.target;if(!l.dataset.mid)return;const c=w(l.value);l.value!==c&&(l.value=c),b(Number(l.dataset.mid),l.dataset.side,c)}),e.dataset.scoreBound="true")}function L(e){return e.replace(/\D+/g,"").slice(0,2)}const te=e=>e!=null&&e.team?`<span class="m-pool-tag" style="background:${e.color??"#888"}">${e.pool??"Phase finale"}${e.isWild?" ⭐":""}</span>`:'<span class="b-team-meta">À déterminer</span>',N=(e,s,n,a)=>{if(!(e!=null&&e.team))return'<div class="b-team b-team--tbd"><span>À déterminer</span></div>';const t=F(s);return`
    <div class="b-team">
      <div class="b-team-main">
        ${te(e)}
        <span>${$(e.team)}</span>
      </div>
      <div class="b-score">
        <input class="b-score-input" type="text" inputmode="numeric" pattern="[0-9]*" maxlength="2"
          value="${t[n]??""}" placeholder="—"
          data-mid="${s}" data-side="${n}" ${a?"disabled":""}>
      </div>
    </div>`},m=(e,s)=>`
  <div class="b-match-wrap">
    <div class="b-match">
      <div class="b-match-head">
        <span>${e.label}</span>
        ${e.isTie?'<span class="b-error">Pas de match nul</span>':`<span class="b-side-label">${s}</span>`}
      </div>
      ${N(e.sides[0],e.id,"s1",!e.ready)}
      ${N(e.sides[1],e.id,"s2",!e.ready)}
    </div>
  </div>`;function se(e){const s=M(),{qualifiers:n,rounds:a,champion:t}=Y(s),[i,r,o,p,d,l,c,g]=n,y=n.map((u,f)=>`
    <div class="qual-card" style="border-color:${(u==null?void 0:u.color)||"#aaa"}">
      <div class="qual-pool" style="color:${(u==null?void 0:u.color)||"#aaa"}">
        ${(u==null?void 0:u.pool)||"—"}${u!=null&&u.isWild?" ⭐ Wildcard":""}
      </div>
      <div class="qual-name">${u!=null&&u.team?$(u.team):"—"}</div>
      <div class="qual-meta">QF${f+1} · ${(u==null?void 0:u.pts)??0} pts</div>
    </div>`).join("");e.innerHTML=`
    <div class="banner info">
      ℹ️ Les quarts se remplissent selon les résultats des poules.
      Saisissez ensuite les scores de phase finale ici pour faire avancer automatiquement le bracket.
    </div>

    <div class="section-card">
      <div class="section-title" style="margin-bottom:1rem">Phase finale · 8 qualifiés</div>
      <div class="bracket-wrap">
        <div class="bracket">

          <!-- Quarts de finale : 2 paires de 2 matchs -->
          <div class="b-round b-round--quarters">
            <div class="b-round-title">Quarts de finale</div>
            <div class="b-pair">
              ${m(a.quarterfinals[0],`${(i==null?void 0:i.pool)??"—"} vs ${(g==null?void 0:g.pool)??"—"}`)}
              ${m(a.quarterfinals[1],`${(r==null?void 0:r.pool)??"—"} vs ${(c==null?void 0:c.pool)??"—"}`)}
            </div>
            <div class="b-round-spacer"></div>
            <div class="b-pair">
              ${m(a.quarterfinals[2],`${(o==null?void 0:o.pool)??"—"} vs ${(l==null?void 0:l.pool)??"—"}`)}
              ${m(a.quarterfinals[3],`${(p==null?void 0:p.pool)??"—"} vs ${(d==null?void 0:d.pool)??"—"}`)}
            </div>
          </div>

          <!-- Demi-finales : 1 paire de 2 matchs, alignée avec les QF -->
          <div class="b-round b-round--semis">
            <div class="b-round-title">Demi-finales</div>
            <div class="b-pair b-pair--sf">
              ${m(a.semifinals[0],"Vainqueurs QF1/QF2")}
              ${m(a.semifinals[1],"Vainqueurs QF3/QF4")}
            </div>
          </div>

          <!-- Finale + 3ème place, centrés sur la SF -->
          <div class="b-round b-round--finals">
            <div class="b-round-title">Finale</div>
            <div class="b-pair b-pair--solo b-pair--final">
              ${m(a.finals[0],"Vainqueurs SF")}
            </div>
            <div class="b-label-3rd">3ème place</div>
            <div class="b-pair b-pair--solo b-pair--third">
              ${m(a.finals[1],"Perdants SF")}
            </div>
          </div>

          <!-- Champion -->
          <div class="b-round b-round--champion">
            <div class="b-round-title">Champion</div>
            <div class="trophy-box">
              <div class="trophy-icon">🏆</div>
              <div class="trophy-name">GO OUEST 2026</div>
              <div class="trophy-sub">${t!=null&&t.team?$(t.team):"À déterminer"}</div>
            </div>
          </div>

        </div>
      </div>
    </div>

    <div class="section-card" style="margin-top:1.25rem">
      <div class="section-title" style="margin-bottom:1rem">Qualifiés provisoires</div>
      <div class="qual-grid">${y}</div>
    </div>`,e.dataset.scoreBound!=="true"&&(e.addEventListener("input",u=>{const f=u.target;if(!f.dataset.mid)return;const v=L(f.value);f.value!==v&&(f.value=v),b(f.dataset.mid,f.dataset.side,v,{notify:!1})}),e.addEventListener("change",u=>{const f=u.target;if(!f.dataset.mid)return;const v=L(f.value);f.value!==v&&(f.value=v),b(f.dataset.mid,f.dataset.side,v)}),e.addEventListener("focusout",u=>{const f=u.target;if(!f.dataset.mid)return;const v=L(f.value);f.value!==v&&(f.value=v),b(f.dataset.mid,f.dataset.side,v)}),e.dataset.scoreBound="true")}const Q={poules:()=>q(document.getElementById("poules")),planning:()=>ee(document.getElementById("planning")),finale:()=>se(document.getElementById("finale"))};let R="poules";function ae(e){document.querySelectorAll(".tab-content").forEach(s=>s.classList.remove("active")),document.querySelectorAll(".tab-btn").forEach(s=>s.classList.remove("active")),document.getElementById(e).classList.add("active"),document.querySelector(`[data-tab="${e}"]`).classList.add("active"),R=e,Q[e]()}document.querySelectorAll(".tab-btn").forEach(e=>{e.addEventListener("click",()=>ae(e.dataset.tab))});j(()=>Q[R]());Q.poules();
