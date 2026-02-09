import { useState } from 'react';

export default function HexToRgb() {
  const [hex, setHex] = useState('#EC4899');
  const clean = hex.replace('#','');
  const valid = /^[0-9A-Fa-f]{6}$/.test(clean);
  const r = valid ? parseInt(clean.slice(0,2),16) : 0;
  const g = valid ? parseInt(clean.slice(2,4),16) : 0;
  const b = valid ? parseInt(clean.slice(4,6),16) : 0;

  return (
    <div className="space-y-4">
      <div><label className="block text-sm font-medium text-gray-700 mb-1">HEX Color</label>
        <input type="text" value={hex} onChange={e => setHex(e.target.value)} placeholder="#EC4899" className="w-full px-4 py-3 border border-gray-200 rounded-xl text-lg font-mono outline-none focus:ring-2 focus:ring-pink-500" /></div>
      {valid && (
        <>
          <div className="h-20 rounded-xl" style={{backgroundColor: `#${clean}`}} />
          <div className="grid grid-cols-3 gap-3">
            {[['R', r],['G', g],['B', b]].map(([label, val]) => (
              <div key={label as string} className="bg-white border border-gray-100 rounded-xl p-4 text-center">
                <div className="text-3xl font-bold text-gray-900">{val}</div>
                <div className="text-xs text-gray-500 mt-1">{label}</div>
              </div>
            ))}
          </div>
          <div className="flex gap-2">
            <input readOnly value={`rgb(${r}, ${g}, ${b})`} className="flex-1 px-4 py-2 border border-gray-200 rounded-lg font-mono bg-gray-50" />
            <button onClick={() => navigator.clipboard.writeText(`rgb(${r}, ${g}, ${b})`)} className="px-4 py-2 bg-pink-600 text-white rounded-lg text-sm hover:bg-pink-700">Copy</button>
          </div>
        </>
      )}
    </div>
  );
}
