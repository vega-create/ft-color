import { useState, useRef } from 'react';

export default function ImageColors() {
  const [colors, setColors] = useState<string[]>([]);
  const [preview, setPreview] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  const extract = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]; if (!file) return;
    const url = URL.createObjectURL(file);
    setPreview(url);
    const img = new Image();
    img.onload = () => {
      const canvas = document.createElement('canvas');
      const size = 50;
      canvas.width = size; canvas.height = size;
      const ctx = canvas.getContext('2d')!;
      ctx.drawImage(img, 0, 0, size, size);
      const data = ctx.getImageData(0, 0, size, size).data;
      const colorMap: Record<string, number> = {};
      for (let i = 0; i < data.length; i += 4) {
        const r = Math.round(data[i] / 32) * 32;
        const g = Math.round(data[i+1] / 32) * 32;
        const b = Math.round(data[i+2] / 32) * 32;
        const hex = '#' + [r,g,b].map(c => Math.min(255,c).toString(16).padStart(2,'0')).join('');
        colorMap[hex] = (colorMap[hex] || 0) + 1;
      }
      const sorted = Object.entries(colorMap).sort((a,b) => b[1] - a[1]).slice(0, 8).map(([c]) => c);
      setColors(sorted);
    };
    img.src = url;
  };

  return (
    <div className="space-y-4">
      <div className="border-2 border-dashed border-gray-200 rounded-2xl p-8 text-center hover:border-pink-300 cursor-pointer" onClick={() => inputRef.current?.click()}>
        <input ref={inputRef} type="file" accept="image/*" onChange={extract} className="hidden" />
        <div className="text-4xl mb-2">🖼️</div>
        <p className="text-gray-600 font-medium">Click to upload an image</p>
      </div>
      {preview && <img src={preview} alt="Preview" className="max-h-64 mx-auto rounded-xl" />}
      {colors.length > 0 && (
        <div className="grid grid-cols-4 sm:grid-cols-8 gap-3">
          {colors.map((c, i) => (
            <button key={i} onClick={() => navigator.clipboard.writeText(c)} className="group">
              <div className="w-full aspect-square rounded-xl shadow-sm border border-gray-100" style={{backgroundColor: c}} />
              <span className="text-xs text-gray-500 font-mono mt-1 block group-hover:text-pink-600">{c}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
