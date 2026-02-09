import { useState } from 'react';

function hslToRgb(h:number,s:number,l:number){s/=100;l/=100;const a=s*Math.min(l,1-l);const f=(n:number)=>{const k=(n+h/30)%12;return l-a*Math.max(Math.min(k-3,9-k,1),-1);};return[Math.round(f(0)*255),Math.round(f(8)*255),Math.round(f(4)*255)];}

export default function HslConverter() {
  const [h, setH] = useState(330);
  const [s, setS] = useState(81);
  const [l, setL] = useState(60);
  const rgb = hslToRgb(h,s,l);
  const hex = '#' + rgb.map(c => c.toString(16).padStart(2,'0')).join('');

  return (
    <div className="space-y-4">
      {[['Hue',h,setH,360,'°'],['Saturation',s,setS,100,'%'],['Lightness',l,setL,100,'%']].map(([label,val,setter,max,unit]) => (
        <div key={label as string}>
          <div className="flex justify-between mb-1"><label className="text-sm font-medium text-gray-700">{label as string}</label><span className="text-sm text-gray-500">{val as number}{unit as string}</span></div>
          <input type="range" min="0" max={max as number} value={val as number} onChange={e => (setter as Function)(+e.target.value)} className="w-full accent-pink-600" />
        </div>
      ))}
      <div className="h-20 rounded-xl shadow-inner" style={{backgroundColor: hex}} />
      <div className="grid grid-cols-3 gap-2">
        {[[`hsl(${h}, ${s}%, ${l}%)`,'HSL'],[`rgb(${rgb.join(', ')})`,'RGB'],[hex.toUpperCase(),'HEX']].map(([val,label]) => (
          <button key={label} onClick={() => navigator.clipboard.writeText(val)} className="p-3 bg-white border border-gray-100 rounded-xl text-center hover:border-pink-200">
            <div className="text-xs text-gray-500 mb-1">{label}</div>
            <div className="text-sm font-mono text-gray-900">{val}</div>
          </button>
        ))}
      </div>
    </div>
  );
}
