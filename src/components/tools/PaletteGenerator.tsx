import { useState } from 'react';

function hslToHex(h:number,s:number,l:number){s/=100;l/=100;const a=s*Math.min(l,1-l);const f=(n:number)=>{const k=(n+h/30)%12;return l-a*Math.max(Math.min(k-3,9-k,1),-1);};return'#'+[f(0),f(8),f(4)].map(x=>Math.round(x*255).toString(16).padStart(2,'0')).join('');}

const schemes: Record<string, (h:number)=>number[]> = {
  'Complementary': h => [h, (h+180)%360],
  'Analogous': h => [(h-30+360)%360, h, (h+30)%360],
  'Triadic': h => [h, (h+120)%360, (h+240)%360],
  'Split Comp.': h => [h, (h+150)%360, (h+210)%360],
  'Tetradic': h => [h, (h+90)%360, (h+180)%360, (h+270)%360],
  'Monochromatic': h => [h, h, h, h, h],
};

export default function PaletteGenerator() {
  const [hue, setHue] = useState(330);
  const [scheme, setScheme] = useState('Analogous');
  const [sat, setSat] = useState(70);

  const hues = schemes[scheme](hue);
  const palette = hues.map((h, i) => {
    const l = scheme === 'Monochromatic' ? 20 + i * 15 : 50;
    return hslToHex(h, sat, l);
  });

  return (
    <div className="space-y-4">
      <div><label className="block text-sm font-medium text-gray-700 mb-1">Base Hue: {hue}°</label>
        <input type="range" min="0" max="359" value={hue} onChange={e => setHue(+e.target.value)} className="w-full accent-pink-600" /></div>
      <div><label className="block text-sm font-medium text-gray-700 mb-1">Saturation: {sat}%</label>
        <input type="range" min="10" max="100" value={sat} onChange={e => setSat(+e.target.value)} className="w-full accent-pink-600" /></div>
      <div className="flex flex-wrap gap-2">
        {Object.keys(schemes).map(s => (
          <button key={s} onClick={() => setScheme(s)} className={`px-3 py-1.5 rounded-lg text-sm font-medium ${scheme === s ? 'bg-pink-600 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}>{s}</button>
        ))}
      </div>
      <div className="flex rounded-2xl overflow-hidden h-32 shadow-lg">
        {palette.map((c, i) => (
          <button key={i} onClick={() => navigator.clipboard.writeText(c)} className="flex-1 flex items-end justify-center pb-3 hover:opacity-90 transition-opacity" style={{backgroundColor: c}}>
            <span className="text-xs font-mono px-2 py-1 rounded bg-black/30 text-white">{c.toUpperCase()}</span>
          </button>
        ))}
      </div>
      <div className="flex gap-2">
        <input readOnly value={palette.join(', ')} className="flex-1 px-3 py-2 border border-gray-200 rounded-lg font-mono text-sm bg-gray-50" />
        <button onClick={() => navigator.clipboard.writeText(palette.join(', '))} className="px-4 py-2 bg-pink-600 text-white rounded-lg text-sm">Copy All</button>
      </div>
    </div>
  );
}
