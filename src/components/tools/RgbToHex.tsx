import { useState } from 'react';

export default function RgbToHex() {
  const [r, setR] = useState(236);
  const [g, setG] = useState(72);
  const [b, setB] = useState(153);
  const hex = '#' + [r,g,b].map(c => Math.max(0,Math.min(255,c)).toString(16).padStart(2,'0')).join('');

  return (
    <div className="space-y-4">
      {[['Red',r,setR,'bg-red-500'],['Green',g,setG,'bg-green-500'],['Blue',b,setB,'bg-blue-500']].map(([label,val,setter,bg]) => (
        <div key={label as string}>
          <div className="flex justify-between mb-1"><label className="text-sm font-medium text-gray-700">{label as string}</label><span className="text-sm text-gray-500 font-mono">{val as number}</span></div>
          <input type="range" min="0" max="255" value={val as number} onChange={e => (setter as Function)(+e.target.value)} className={`w-full h-2 rounded-lg appearance-none cursor-pointer accent-pink-600`} />
        </div>
      ))}
      <div className="h-20 rounded-xl shadow-inner" style={{backgroundColor: hex}} />
      <div className="flex gap-2">
        <input readOnly value={hex.toUpperCase()} className="flex-1 px-4 py-3 border border-gray-200 rounded-lg font-mono text-lg bg-gray-50" />
        <button onClick={() => navigator.clipboard.writeText(hex.toUpperCase())} className="px-4 py-2 bg-pink-600 text-white rounded-lg font-medium hover:bg-pink-700">Copy</button>
      </div>
    </div>
  );
}
