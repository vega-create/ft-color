import { useState } from 'react';

function hexToRgb(hex: string) { const m = hex.replace('#','').match(/.{2}/g); return m ? m.map(x => parseInt(x,16)) : [0,0,0]; }
function rgbToHsl(r: number, g: number, b: number) { r/=255;g/=255;b/=255;const max=Math.max(r,g,b),min=Math.min(r,g,b),l=(max+min)/2;let h=0,s=0;if(max!==min){const d=max-min;s=l>0.5?d/(2-max-min):d/(max+min);switch(max){case r:h=((g-b)/d+(g<b?6:0))/6;break;case g:h=((b-r)/d+2)/6;break;case b:h=((r-g)/d+4)/6;break;}}return[Math.round(h*360),Math.round(s*100),Math.round(l*100)];}

export default function ColorPicker() {
  const [color, setColor] = useState('#EC4899');
  const rgb = hexToRgb(color);
  const hsl = rgbToHsl(rgb[0], rgb[1], rgb[2]);
  const copy = (t: string) => navigator.clipboard.writeText(t);

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row gap-6">
        <div className="flex-shrink-0">
          <input type="color" value={color} onChange={e => setColor(e.target.value)} className="w-48 h-48 rounded-2xl cursor-pointer border-0 p-0" />
        </div>
        <div className="flex-1 space-y-3">
          <div><label className="block text-sm font-medium text-gray-700 mb-1">HEX</label>
            <div className="flex gap-2"><input type="text" value={color.toUpperCase()} onChange={e => { const v = e.target.value; if (/^#[0-9A-Fa-f]{0,6}$/.test(v)) setColor(v); }} className="flex-1 px-4 py-2 border border-gray-200 rounded-lg font-mono" />
              <button onClick={() => copy(color.toUpperCase())} className="px-3 py-2 bg-pink-600 text-white rounded-lg text-sm hover:bg-pink-700">Copy</button></div></div>
          <div><label className="block text-sm font-medium text-gray-700 mb-1">RGB</label>
            <div className="flex gap-2"><input readOnly value={`rgb(${rgb.join(', ')})`} className="flex-1 px-4 py-2 border border-gray-200 rounded-lg font-mono bg-gray-50" />
              <button onClick={() => copy(`rgb(${rgb.join(', ')})`)} className="px-3 py-2 bg-pink-600 text-white rounded-lg text-sm hover:bg-pink-700">Copy</button></div></div>
          <div><label className="block text-sm font-medium text-gray-700 mb-1">HSL</label>
            <div className="flex gap-2"><input readOnly value={`hsl(${hsl[0]}, ${hsl[1]}%, ${hsl[2]}%)`} className="flex-1 px-4 py-2 border border-gray-200 rounded-lg font-mono bg-gray-50" />
              <button onClick={() => copy(`hsl(${hsl[0]}, ${hsl[1]}%, ${hsl[2]}%)`)} className="px-3 py-2 bg-pink-600 text-white rounded-lg text-sm hover:bg-pink-700">Copy</button></div></div>
        </div>
      </div>
      <div className="h-24 rounded-2xl shadow-inner" style={{backgroundColor: color}} />
    </div>
  );
}
