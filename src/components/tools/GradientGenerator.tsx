import { useState } from 'react';

export default function GradientGenerator() {
  const [c1, setC1] = useState('#EC4899');
  const [c2, setC2] = useState('#06B6D4');
  const [angle, setAngle] = useState(135);
  const [type, setType] = useState<'linear'|'radial'>('linear');
  const css = type === 'linear' ? `linear-gradient(${angle}deg, ${c1}, ${c2})` : `radial-gradient(circle, ${c1}, ${c2})`;

  return (
    <div className="space-y-4">
      <div className="h-48 rounded-2xl shadow-lg" style={{background: css}} />
      <div className="grid sm:grid-cols-2 gap-3">
        <div><label className="block text-xs text-gray-500 mb-1">Color 1</label>
          <div className="flex gap-2"><input type="color" value={c1} onChange={e => setC1(e.target.value)} className="w-12 h-10 rounded cursor-pointer" /><input type="text" value={c1} onChange={e => setC1(e.target.value)} className="flex-1 px-3 py-2 border border-gray-200 rounded-lg font-mono text-sm" /></div></div>
        <div><label className="block text-xs text-gray-500 mb-1">Color 2</label>
          <div className="flex gap-2"><input type="color" value={c2} onChange={e => setC2(e.target.value)} className="w-12 h-10 rounded cursor-pointer" /><input type="text" value={c2} onChange={e => setC2(e.target.value)} className="flex-1 px-3 py-2 border border-gray-200 rounded-lg font-mono text-sm" /></div></div>
      </div>
      <div className="flex gap-3 items-center">
        <div className="flex gap-2">
          {(['linear','radial'] as const).map(t => (
            <button key={t} onClick={() => setType(t)} className={`px-3 py-1.5 rounded-lg text-sm font-medium ${type === t ? 'bg-pink-600 text-white' : 'bg-gray-100 text-gray-600'}`}>{t}</button>
          ))}
        </div>
        {type === 'linear' && <div className="flex-1"><label className="text-xs text-gray-500">Angle: {angle}°</label><input type="range" min="0" max="360" value={angle} onChange={e => setAngle(+e.target.value)} className="w-full accent-pink-600" /></div>}
      </div>
      <div className="flex gap-2">
        <code className="flex-1 px-3 py-2 bg-gray-900 text-green-400 rounded-lg text-sm font-mono overflow-x-auto">background: {css};</code>
        <button onClick={() => navigator.clipboard.writeText(`background: ${css};`)} className="px-4 py-2 bg-pink-600 text-white rounded-lg text-sm flex-shrink-0">Copy CSS</button>
      </div>
    </div>
  );
}
