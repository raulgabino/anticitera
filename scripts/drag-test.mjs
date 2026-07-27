import { chromium } from 'playwright';
const b = await chromium.launch();
const p = await b.newPage({ viewport:{width:390,height:900} });
const errs=[]; p.on('pageerror',e=>errs.push(e.message)); p.on('console',m=>{if(m.type()==='error')errs.push(m.text());});
await p.goto('file://' + process.cwd() + '/index.html'); await p.waitForTimeout(600);

const T0 = await p.evaluate(()=>T);
// arrastre circular sobre el centro del dial
const box = await p.locator('canvas#cv').boundingBox();
const cx = box.x + box.width/2, cy = box.y + box.width*0.565;
await p.mouse.move(cx + 60, cy);
await p.mouse.down();
for (let i=1;i<=36;i++){ const a=i*Math.PI/18; await p.mouse.move(cx+60*Math.cos(a), cy+60*Math.sin(a)); }
await p.mouse.up();
const T1 = await p.evaluate(()=>T);
console.log('arrastre circular completo → ΔT =', (T1-T0).toFixed(4), 'años =', ((T1-T0)*365.24667).toFixed(1), 'días (esperado ≈78.6)');

// arrastre sobre el anillo del calendario
const off0 = await p.evaluate(()=>calRingOffset);
const R = box.width*0.452, rr = R*0.94;
await p.mouse.move(cx + rr, cy); await p.mouse.down();
for (let i=1;i<=8;i++){ const a=i*0.05; await p.mouse.move(cx+rr*Math.cos(a), cy+rr*Math.sin(a)); }
await p.mouse.up();
const off1 = await p.evaluate(()=>calRingOffset);
const T2 = await p.evaluate(()=>T);
console.log('arrastre sobre el anillo → giró el anillo', (off1-off0).toFixed(1), '° y la máquina', (T2-T1).toFixed(6), 'años (debe ser 0)');

// un toque simple sigue seleccionando
await p.evaluate(()=>select(null));
await p.mouse.click(cx, cy);
const s = await p.evaluate(()=>sel);
console.log('toque en el centro → seleccionó:', s);

// la reproducción se detiene al arrastrar
await p.click('#play'); await p.waitForTimeout(200);
await p.mouse.move(cx+60, cy); await p.mouse.down(); await p.mouse.move(cx+60, cy-20); await p.mouse.move(cx+20, cy-56); await p.mouse.up();
console.log('¿sigue girando sola tras arrastrar?', await p.evaluate(()=>playing));
// gesto táctil: horizontal gira, vertical hace scroll
await p.evaluate(()=>{ T=0; });
const tt = async (dx,dy) => {
  await p.evaluate(()=>{T=0;});
  await p.touchscreen.tap(cx, cy).catch(()=>{});
  return p.evaluate(async ([x,y,dx,dy]) => {
    const cv=document.getElementById('cv');
    const ev=(t,cx,cy)=>cv.dispatchEvent(new PointerEvent(t,{pointerId:1,pointerType:'touch',clientX:cx,clientY:cy,bubbles:true,cancelable:true}));
    ev('pointerdown',x,y);
    for(let i=1;i<=10;i++) ev('pointermove', x+dx*i/10, y+dy*i/10);
    ev('pointerup', x+dx, y+dy);
    return T;
  }, [cx,cy,dx,dy]);
};
console.log('dedo horizontal 200px →', (await tt(200,0)).toFixed(4), 'años (debe ser ≠0)');
console.log('dedo vertical 200px  →', (await tt(0,200)).toFixed(4), 'años (debe ser 0)');
console.log('errores:', errs.length?errs:'ninguno');
await b.close();
