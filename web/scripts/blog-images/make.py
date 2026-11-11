"""Genera las ilustraciones de portada del blog (SVG) en este directorio. Luego `node build.mjs` las convierte a .webp."""
import random
W,H=1600,900
DEFS='''<defs>
<linearGradient id="bg" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#0b0c11"/><stop offset="1" stop-color="#1c1c25"/></linearGradient>
<radialGradient id="glow" cx="0.5" cy="0.5" r="0.5"><stop offset="0" stop-color="#ff3344" stop-opacity=".55"/><stop offset="1" stop-color="#ff3344" stop-opacity="0"/></radialGradient>
<linearGradient id="beam" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#ff3344" stop-opacity="0"/><stop offset="1" stop-color="#ff6a75"/></linearGradient>
<linearGradient id="metal" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#e3e8ee"/><stop offset=".5" stop-color="#a7b0bc"/><stop offset="1" stop-color="#6f7886"/></linearGradient>
<linearGradient id="metalD" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#59616d"/><stop offset="1" stop-color="#2b3039"/></linearGradient>
<linearGradient id="wood" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#d9a066"/><stop offset="1" stop-color="#9a6335"/></linearGradient>
<linearGradient id="red" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#e14a52"/><stop offset="1" stop-color="#a61d27"/></linearGradient>
<linearGradient id="glass" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#9ccbe8" stop-opacity=".55"/><stop offset="1" stop-color="#5b8fb0" stop-opacity=".25"/></linearGradient>
<filter id="blur" x="-50%" y="-50%" width="200%" height="200%"><feGaussianBlur stdDeviation="14"/></filter>
<filter id="shadow" x="-20%" y="-20%" width="140%" height="150%"><feDropShadow dx="0" dy="16" stdDeviation="18" flood-color="#000" flood-opacity=".5"/></filter>
</defs>'''
def base(body):
    grid=''.join(f'<line x1="{x}" y1="0" x2="{x}" y2="{H}" stroke="#fff" stroke-opacity=".035"/>' for x in range(0,W,80))+''.join(f'<line x1="0" y1="{y}" x2="{W}" y2="{y}" stroke="#fff" stroke-opacity=".035"/>' for y in range(0,H,80))
    return f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {W} {H}" width="{W}" height="{H}">{DEFS}<rect width="{W}" height="{H}" fill="url(#bg)"/>{grid}{body}</svg>'
def spark(x,y,r=60):
    return f'<circle cx="{x}" cy="{y}" r="{r*3}" fill="url(#glow)"/><circle cx="{x}" cy="{y}" r="{r*.22}" fill="#fff"/><path d="M{x-r} {y}H{x+r}M{x} {y-r}V{y+r}" stroke="#ff9aa2" stroke-width="3" stroke-linecap="round"/>'
def beam(x,y,y0=0,w=10):
    return f'<rect x="{x-w/2}" y="{y0}" width="{w}" height="{y-y0}" fill="url(#beam)"/><rect x="{x-w*2}" y="{y0}" width="{w*4}" height="{y-y0}" fill="url(#beam)" opacity=".25" filter="url(#blur)"/>'
def out(name,body): open(f'{name}.svg','w').write(base(body))

# 1. Metal por volumen: llaveros y placas en cuadrícula
b=''
for i,(x,y) in enumerate([(300,300),(620,300),(940,300),(300,600),(620,600),(940,600)]):
    b+=f'<g filter="url(#shadow)"><rect x="{x}" y="{y-70}" width="240" height="140" rx="26" fill="url(#metal)"/><circle cx="{x+36}" cy="{y}" r="14" fill="#14151b"/></g>'
    b+=f'<g stroke="#2a2f38" stroke-width="7" stroke-linecap="round" opacity=".85"><path d="M{x+80} {y-28}H{x+206}M{x+80} {y}H{x+170}M{x+80} {y+28}H{x+196}"/></g>'
b+=beam(940+150,300,0,12)+spark(940+150,300,50)
b+=f'<g transform="translate(1260 460)"><rect width="180" height="180" rx="16" fill="#101116" stroke="#ff3344" stroke-opacity=".5" stroke-width="3"/><g fill="#fff" opacity=".9">'+''.join(f'<rect x="{18+c*20}" y="{18+r*20}" width="{16 if (r*7+c*3)%3 else 0}" height="16"/>' for r in range(8) for c in range(8))+'</g></g>'
out('grabado-metal-volumen',b)

# 2. Lona gran formato: banner colgado con ojillos
b='<rect x="220" y="120" width="1160" height="600" rx="8" fill="#0f1016" stroke="#2f3340" stroke-width="6"/>'
b+='<g filter="url(#shadow)"><rect x="260" y="170" width="1080" height="500" rx="10" fill="url(#red)"/></g>'
b+='<circle cx="560" cy="420" r="150" fill="#fff" opacity=".12"/><path d="M820 270L1180 270L1180 330L820 330Z M820 380L1100 380L1100 430L820 430Z M820 480L1140 480L1140 530L820 530Z" fill="#fff" opacity=".85"/><rect x="330" y="240" width="460" height="360" rx="12" fill="none" stroke="#fff" stroke-opacity=".6" stroke-width="6"/>'
for x,y in [(285,195),(1315,195),(285,645),(1315,645),(800,195),(800,645)]: b+=f'<circle cx="{x}" cy="{y}" r="13" fill="#d7dce3"/><circle cx="{x}" cy="{y}" r="6" fill="#14151b"/>'
b+='<g stroke="#8a92a0" stroke-width="8" stroke-linecap="round"><path d="M220 720V840M1380 720V840"/></g>'
b+='<g transform="translate(1290 560)" fill="#fff" opacity=".75">'+''.join(f'<circle cx="{c*18}" cy="{r*18}" r="3"/>' for r in range(5) for c in range(5))+'</g>'
out('impresion-lona-gran-formato',b)

# 3. Vinil: cristal con vinil aplicándose
b='<rect x="200" y="140" width="1200" height="640" rx="14" fill="#14151b" stroke="#2c303b" stroke-width="6"/>'
for x in (230,820): b+=f'<rect x="{x}" y="170" width="{570 if x==230 else 550}" height="580" rx="8" fill="url(#glass)"/><path d="M{x+60} 170L{x+260} 750" stroke="#fff" stroke-opacity=".18" stroke-width="40"/>'
b+='<g filter="url(#shadow)"><path d="M300 330H760V620H300Z" fill="url(#red)"/><circle cx="440" cy="475" r="70" fill="#fff" opacity=".9"/><path d="M560 400H700M560 475H680M560 550H700" stroke="#fff" stroke-width="22" stroke-linecap="round"/></g>'
b+='<path d="M300 330H760V380L300 360Z" fill="#fff" opacity=".18"/>'
b+='<g transform="translate(1010 420) rotate(-18)" filter="url(#shadow)"><rect width="260" height="90" rx="14" fill="#2b3039"/><rect y="62" width="260" height="28" rx="8" fill="#ff3344"/></g>'
b+='<g fill="#fff" opacity=".35">'+''.join(f'<circle cx="{980+c*26}" cy="{230+r*26}" r="4"/>' for r in range(4) for c in range(10))+'</g>'
out('vinil-impreso-decorativo-comercial',b)

# 4. Vehicular: camioneta rotulada
b='<rect y="700" width="1600" height="200" fill="#0f1016"/><path d="M0 760H1600" stroke="#2c303b" stroke-width="6" stroke-dasharray="60 40"/>'
b+='<g filter="url(#shadow)"><path d="M230 640V330Q230 270 290 270H1010Q1070 270 1110 320L1260 470Q1320 500 1320 560V640Z" fill="#eef1f5"/><path d="M1020 300L1150 440H1020Z" fill="url(#glass)"/><path d="M940 300H1000V440H940Z" fill="url(#glass)"/></g>'
b+='<path d="M230 520H1320V600H230Z" fill="url(#red)"/><path d="M230 520L560 520L470 600H230Z" fill="#14151b" opacity=".35"/>'
b+='<circle cx="480" cy="400" r="86" fill="url(#red)"/><path d="M480 340L497 383L540 400L497 417L480 460L463 417L420 400L463 383Z" fill="#fff"/><path d="M620 360H860M620 410H800M620 460H840" stroke="#2b3039" stroke-width="18" stroke-linecap="round" opacity=".85"/>'
for x in (440,1130): b+=f'<circle cx="{x}" cy="650" r="72" fill="#14151b"/><circle cx="{x}" cy="650" r="34" fill="url(#metal)"/>'
b+='<g opacity=".4" stroke="#ff3344" stroke-width="6" stroke-linecap="round"><path d="M90 560H190M60 610H190M110 510H190"/></g>'
out('impresion-vehicular',b)

# 5. Campañas: valla, roll-up, exhibidor y muestras de color
b='<g filter="url(#shadow)"><rect x="200" y="150" width="620" height="330" rx="10" fill="url(#red)"/><circle cx="360" cy="315" r="86" fill="#fff" opacity=".9"/><path d="M500 250H760M500 315H720M500 380H760" stroke="#fff" stroke-width="22" stroke-linecap="round"/></g><path d="M420 480V700M600 480V700" stroke="#59616d" stroke-width="22"/>'
b+='<g filter="url(#shadow)"><rect x="930" y="250" width="200" height="440" rx="10" fill="#eef1f5"/><rect x="946" y="268" width="168" height="260" rx="6" fill="url(#red)"/><circle cx="1030" cy="380" r="46" fill="#fff" opacity=".9"/><path d="M965 570H1095M965 610H1060" stroke="#2b3039" stroke-width="14" stroke-linecap="round"/></g>'
b+='<g filter="url(#shadow)"><path d="M1230 690L1290 420H1500L1440 690Z" fill="url(#metal)"/><rect x="1300" y="450" width="190" height="120" rx="8" fill="url(#red)"/></g>'
for i,c in enumerate(['#ff3344','#e14a52','#ffffff','#a7b0bc','#2b3039']): b+=f'<rect x="{200+i*100}" y="780" width="84" height="60" rx="10" fill="{c}" stroke="#fff" stroke-opacity=".25"/>'
out('impresion-campanas-publicitarias-agencias',b)

# 6. Publicidad: plotter y rollos de material
b='<g filter="url(#shadow)"><rect x="240" y="170" width="1120" height="210" rx="28" fill="url(#metalD)"/><rect x="290" y="215" width="900" height="26" rx="13" fill="#0b0c11"/><circle cx="1260" cy="278" r="16" fill="#ff3344"/></g>'
b+='<rect x="520" y="241" width="160" height="40" rx="8" fill="#14151b"/><path d="M600 281V320" stroke="#ff3344" stroke-width="6"/>'
cols=['#ff3344','#e14a52','#ffffff','#a7b0bc','#ff8c3c','#6ee7a0']
b+='<g filter="url(#shadow)"><path d="M320 380H1280L1360 760H240Z" fill="#eef1f5"/>'+''.join(f'<path d="M{320-i*(80/6)*0} 0" />' for i in range(0))+'</g>'
for i,c in enumerate(cols):
    x0=330+i*158
    b+=f'<path d="M{x0} 400H{x0+150}L{x0+170} 740H{x0-30}Z" fill="{c}" opacity=".9"/>'
b+='<g fill="#fff" opacity=".35">'+''.join(f'<circle cx="{500+c*60}" cy="{480+r*70}" r="6"/>' for r in range(4) for c in range(10))+'</g>'
out('impresion-publicidad',b)

# 7. Grabado en vivo: termo en módulo con láser y asistentes
b='<g filter="url(#shadow)"><rect x="200" y="640" width="1200" height="40" rx="10" fill="#2b3039"/><rect x="260" y="680" width="40" height="150" fill="#1b1b22"/><rect x="1300" y="680" width="40" height="150" fill="#1b1b22"/></g>'
b+='<g filter="url(#shadow)"><rect x="380" y="120" width="840" height="190" rx="30" fill="url(#metalD)"/><rect x="440" y="170" width="480" height="30" rx="15" fill="#0b0c11"/><circle cx="1130" cy="215" r="20" fill="#ff3344"/></g>'
b+=beam(800,470,310,12)
b+='<g filter="url(#shadow)"><rect x="700" y="400" width="200" height="240" rx="22" fill="url(#metal)"/><rect x="730" y="372" width="140" height="44" rx="12" fill="#2b3039"/><rect x="745" y="470" width="110" height="90" rx="10" fill="none" stroke="#2a2f38" stroke-width="5" stroke-dasharray="14 10"/></g>'
b+=spark(800,470,48)
for x,h in [(260,170),(1340,190),(1470,150)]:
    b+=f'<circle cx="{x}" cy="{650-h}" r="38" fill="#3a3f4b"/><rect x="{x-48}" y="{650-h+46}" width="96" height="{h-40}" rx="40" fill="#3a3f4b"/>'
for x,y in [(520,520),(1010,540),(1090,330)]: b+=f'<circle cx="{x}" cy="{y}" r="4" fill="#ff9aa2"/>'
out('grabado-en-vivo-activaciones',b)

# 8. Madera eventos: número de mesa, portarretrato y posavasos
b='<g filter="url(#shadow)"><rect x="260" y="200" width="420" height="520" rx="20" fill="url(#wood)"/>'+''.join(f'<path d="M260 {250+i*48}Q470 {235+i*48} 680 {258+i*48}" stroke="#7a4a26" stroke-opacity=".35" stroke-width="3" fill="none"/>' for i in range(10))+'</g>'
b+='<path d="M470 330C430 300 380 330 400 380C415 415 470 450 470 450C470 450 525 415 540 380C560 330 510 300 470 330Z" fill="none" stroke="#3b2411" stroke-width="10" stroke-linejoin="round"/><path d="M340 520H600M370 565H570" stroke="#3b2411" stroke-width="10" stroke-linecap="round"/><circle cx="470" cy="640" r="12" fill="#3b2411"/>'
b+='<g filter="url(#shadow)"><rect x="800" y="260" width="360" height="300" rx="14" fill="url(#wood)"/><rect x="840" y="300" width="280" height="220" rx="6" fill="#eef1f5" opacity=".92"/><path d="M880 480L960 400L1010 450L1060 390L1090 480Z" fill="#a7b0bc"/></g>'
b+='<g filter="url(#shadow)"><circle cx="1330" cy="620" r="130" fill="url(#wood)"/><circle cx="1330" cy="620" r="96" fill="none" stroke="#3b2411" stroke-width="6" stroke-dasharray="10 12"/><path d="M1290 620H1370M1330 580V660" stroke="#3b2411" stroke-width="10" stroke-linecap="round"/></g>'
b+=beam(1330,470,0,10)+spark(1330,470,42)
out('grabado-madera-eventos',b)
print("svg listos")
