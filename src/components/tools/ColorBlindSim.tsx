import { useState } from 'react';

function hexToRgb(hex: string) { const m = hex.replace('#','').match(/.{2}/g); return m ? m.map(x => parseInt(x,16)) : [0,0,0]; }
function rgbToHex(r:number,g:number,b:number) { return '#'+[r,g,b].map(c=>Math.max(0,Math.min(255,Math.round(c))).toString(16).padStart(2,'0')).join(''); }

const matrices: Record<string, number[][]> = {
  'Protanopia': [[0.567,0.433,0],[0.558,0.442,0],[0,0.242,0.758]],
  'Deuteranopia': [[0.625,0.375,0],[0.7,0.3,0],[0,0.3,0.7]],
  'Tritanopia': [[0.95,0.05,0],[0,0.433,0.567],[0,0.475,0.525]],
  'Achromatopsia': [[0.299,0.587,0.114],[0.299,0.587,0.114],[0.299,0.587,0.114]],
};

function simulate(hex: string, matrix: number[][]) {
  const [r,g,b] = hexToRgb(hex);
  return rgbToHex(
    matrix[0][0]*r + matrix[0][1]*g + matrix[0][2]*b,
    matrix[1][0]*r + matrix[1][1]*g + matrix[1][2]*b,
    matrix[2][0]*r + matrix[2][1]*g + matrix[2][2]*b
  );
}

export default function ColorBlindSim() {
  const [colors, setColors] = useState(['#EC4899','#3B82F6','#10B981','#F59E0B','#EF4444']);

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-2 items-center">
        {colors.map((c, i) => (
          <input key={i} type="color" value={c} onChange={e => { const n = [...colors]; n[i] = e.target.value; setColors(n); }} className="w-12 h-12 rounded-lg cursor-pointer" />
        ))}
        <button onClick={() => setColors([...colors, '#888888'])} className="w-12 h-12 bg-gray-100 rounded-lg text-gray-400 text-2xl hover:bg-gray-200">+</button>
      </div>
      <div className="space-y-3">
        <div className="flex rounded-xl overflow-hidden h-16">{colors.map((c,i) => <div key={i} className="flex-1" style={{backgroundColor:c}} />)}</div>
        <p className="text-sm text-gray-500 font-medium">Normal Vision ↑</p>
      </div>
      {Object.entries(matrices).map(([name, matrix]) => (
        <div key={name} className="space-y-1">
          <div className="flex rounded-xl overflow-hidden h-16">{colors.map((c,i) => <div key={i} className="flex-1" style={{backgroundColor:simulate(c,matrix)}} />)}</div>
          <p className="text-sm text-gray-500">{name}</p>
        </div>
      ))}
    </div>
  );
}
