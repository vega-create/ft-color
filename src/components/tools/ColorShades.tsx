import { useState } from 'react';

function hexToRgb(hex: string) { const m = hex.replace('#','').match(/.{2}/g); return m ? m.map(x => parseInt(x,16)) : [0,0,0]; }
function rgbToHex(r:number,g:number,b:number) { return '#'+[r,g,b].map(c=>Math.max(0,Math.min(255,Math.round(c))).toString(16).padStart(2,'0')).join(''); }

export default function ColorShades() {
  const [base, setBase] = useState('#EC4899');
  const rgb = hexToRgb(base);

  const shades = Array.from({length: 11}, (_, i) => {
    const factor = (i - 5) / 5;
    if (factor < 0) return rgbToHex(rgb[0]+(255-rgb[0])*(-factor), rgb[1]+(255-rgb[1])*(-factor), rgb[2]+(255-rgb[2])*(-factor));
    if (factor > 0) return rgbToHex(rgb[0]*(1-factor), rgb[1]*(1-factor), rgb[2]*(1-factor));
    return base;
  });

  return (
    <div className="space-y-4">
      <div className="flex gap-3 items-end">
        <div><label className="block text-sm font-medium text-gray-700 mb-1">Base Color</label>
          <div className="flex gap-2"><input type="color" value={base} onChange={e => setBase(e.target.value)} className="w-12 h-10 rounded cursor-pointer" />
            <input type="text" value={base} onChange={e => setBase(e.target.value)} className="w-32 px-3 py-2 border border-gray-200 rounded-lg font-mono text-sm" /></div></div>
      </div>
      <div>
        <p className="text-sm text-gray-500 mb-2">Tints (lighter) → Base → Shades (darker)</p>
        <div className="flex rounded-2xl overflow-hidden h-24 shadow-lg">
          {shades.map((c, i) => (
            <button key={i} onClick={() => navigator.clipboard.writeText(c)} className="flex-1 flex items-end justify-center pb-2 hover:opacity-90" style={{backgroundColor: c}}>
              <span className="text-[10px] font-mono px-1 py-0.5 rounded bg-black/30 text-white">{c.toUpperCase()}</span>
            </button>
          ))}
        </div>
      </div>
      <div className="grid grid-cols-4 sm:grid-cols-6 gap-2">
        {shades.map((c, i) => (
          <button key={i} onClick={() => navigator.clipboard.writeText(c)} className="p-2 rounded-lg border border-gray-100 hover:border-pink-200">
            <div className="w-full h-10 rounded" style={{backgroundColor: c}} />
            <span className="text-xs font-mono text-gray-600 mt-1 block">{c.toUpperCase()}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
