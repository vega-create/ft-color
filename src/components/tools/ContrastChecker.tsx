import { useState } from 'react';

function hexToRgb(hex: string) { const m = hex.replace('#','').match(/.{2}/g); return m ? m.map(x => parseInt(x,16)) : [0,0,0]; }
function luminance(r:number,g:number,b:number) { const a = [r,g,b].map(v => { v /= 255; return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4); }); return a[0]*0.2126 + a[1]*0.7152 + a[2]*0.0722; }
function contrastRatio(c1: string, c2: string) { const l1 = luminance(...hexToRgb(c1) as [number,number,number]); const l2 = luminance(...hexToRgb(c2) as [number,number,number]); const lighter = Math.max(l1,l2), darker = Math.min(l1,l2); return (lighter + 0.05) / (darker + 0.05); }

export default function ContrastChecker() {
  const [fg, setFg] = useState('#111827');
  const [bg, setBg] = useState('#FFFFFF');
  const ratio = contrastRatio(fg, bg);
  const aaLarge = ratio >= 3; const aaNormal = ratio >= 4.5; const aaaLarge = ratio >= 4.5; const aaaNormal = ratio >= 7;

  return (
    <div className="space-y-4">
      <div className="grid sm:grid-cols-2 gap-3">
        <div><label className="block text-sm font-medium text-gray-700 mb-1">Text Color</label>
          <div className="flex gap-2"><input type="color" value={fg} onChange={e => setFg(e.target.value)} className="w-12 h-10 rounded cursor-pointer" /><input type="text" value={fg} onChange={e => setFg(e.target.value)} className="flex-1 px-3 py-2 border border-gray-200 rounded-lg font-mono text-sm" /></div></div>
        <div><label className="block text-sm font-medium text-gray-700 mb-1">Background Color</label>
          <div className="flex gap-2"><input type="color" value={bg} onChange={e => setBg(e.target.value)} className="w-12 h-10 rounded cursor-pointer" /><input type="text" value={bg} onChange={e => setBg(e.target.value)} className="flex-1 px-3 py-2 border border-gray-200 rounded-lg font-mono text-sm" /></div></div>
      </div>
      <button onClick={() => { setFg(bg); setBg(fg); }} className="text-sm text-pink-600 hover:text-pink-700">⇄ Swap colors</button>
      <div className="rounded-2xl p-8" style={{backgroundColor: bg}}>
        <p className="text-2xl font-bold mb-2" style={{color: fg}}>Sample Heading Text</p>
        <p className="text-base" style={{color: fg}}>This is sample paragraph text to preview the color contrast between foreground and background.</p>
        <p className="text-sm mt-2" style={{color: fg}}>Small text for checking readability at smaller sizes.</p>
      </div>
      <div className="text-center"><span className="text-5xl font-bold text-gray-900">{ratio.toFixed(2)}</span><span className="text-gray-500 ml-2">: 1</span></div>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {[['AA Normal', aaNormal],['AA Large', aaLarge],['AAA Normal', aaaNormal],['AAA Large', aaaLarge]].map(([label, pass]) => (
          <div key={label as string} className={`p-3 rounded-xl text-center border ${pass ? 'bg-green-50 border-green-200' : 'bg-red-50 border-red-200'}`}>
            <div className={`text-lg font-bold ${pass ? 'text-green-600' : 'text-red-600'}`}>{pass ? '✓ Pass' : '✗ Fail'}</div>
            <div className="text-xs text-gray-500 mt-1">{label as string}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
