window.EEL=`<svg viewBox="0 0 400 240" role="img" aria-label="Simple diagram of a stone eel trap: water flows along a channel through stone walls to a gap, where a woven basket catches the eel."><rect width="400" height="240" fill="#e8efe2"/>
<path d="M0 95Q100 80 200 104T400 98V146Q300 150 200 140T0 150Z" fill="#7fb6c8"/>
${Array.from({length:18},(_,i)=>`<ellipse cx="${10+i*22}" cy="${86+((i*37)%9)}" rx="12" ry="8" fill="#6b6762"/><ellipse cx="${14+i*22}" cy="${156+((i*23)%9)}" rx="12" ry="8" fill="#6b6762"/>`).join('')}
<g fill="#6b6762">${[0,1,2,3,4].map(i=>`<ellipse cx="250" cy="${96+i*12}" rx="9" ry="7"/>`).join('')}</g>
<rect x="244" y="112" width="14" height="10" fill="#7fb6c8"/>
<path d="M258 108 L300 112 Q312 117 300 122 L258 126 Z" fill="#c9a36a" stroke="#8a6a3a" stroke-width="2"/><path d="M266 109V125M276 110V124M286 111V123M296 112V122" stroke="#8a6a3a" stroke-width="1.5"/>
<path d="M150 118 q12 -8 24 0 t24 0 t20 2" stroke="#3d3a2a" stroke-width="5" fill="none" stroke-linecap="round"/>
<path d="M40 122 H110" stroke="#1d3b4a" stroke-width="2.5" marker-end="url(#f)"/><defs><marker id="f" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="5" markerHeight="5" orient="auto"><path d="M0 0L10 5L0 10z" fill="#1d3b4a"/></marker></defs>
<g font-family="system-ui" font-size="13" font-weight="700" fill="#2b2a24"><text x="10" y="40">stone walls of lava rock</text><text x="40" y="200">water flows along a channel</text><text x="150" y="102">kooyang (eel)</text><text x="300" y="150">woven basket</text><text x="214" y="225">stone weir with a gap</text></g>
<path d="M300 140 L292 126" stroke="#2b2a24" stroke-width="1.5"/><path d="M250 214 L250 160" stroke="#2b2a24" stroke-width="1.5"/></svg>`;
