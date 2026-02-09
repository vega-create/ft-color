import { useState } from 'react';

export default function RandomColor() {
  const [colors, setColors] = useState<string[]>([]);
  const [count, setCount] = useState(6);

  const generate = () => {
    const result: string[] = [];
    for (let i = 0; i < count; i++) {
      const arr = new Uint8Array(3);
      crypto.getRandomValues(arr);
      result.push('#' + Array.from(arr).map(b => b.toString(16).padStart(2,'0')).join(''));
    }
    setColors(result);
  };

  if (colors.length === 0) generate();

  return (
    <div className="space-y-4">
      <div className="flex gap-3 items-end">
        <div><label className="block text-sm font-medium text-gray-700 mb-1">Count</label>
          <input type="number" value={count} onChange={e => setCount(Math.max(1, Math.min(24, +e.target.value)))} min="1" max="24" className="w-24 px-3 py-2 border border-gray-200 rounded-lg" /></div>
        <button onClick={generate} className="px-6 py-2 bg-pink-600 text-white rounded-lg font-medium hover:bg-pink-700">🎲 Generate</button>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3">
        {colors.map((c, i) => (
          <button key={i} onClick={() => navigator.clipboard.writeText(c)} className="group">
            <div className="w-full aspect-square rounded-xl shadow-sm border border-gray-100 group-hover:scale-105 transition-transform" style={{backgroundColor: c}} />
            <span className="text-xs font-mono text-gray-600 mt-1 block group-hover:text-pink-600">{c.toUpperCase()}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
