import { useState } from 'react';

export default function Eyedropper() {
  const [color, setColor] = useState('');
  const [supported] = useState(typeof window !== 'undefined' && 'EyeDropper' in window);

  const pick = async () => {
    if (!supported) return;
    try {
      const dropper = new (window as any).EyeDropper();
      const result = await dropper.open();
      setColor(result.sRGBHex);
    } catch {}
  };

  return (
    <div className="space-y-4 text-center">
      {supported ? (
        <>
          <button onClick={pick} className="px-8 py-4 bg-pink-600 text-white rounded-2xl font-medium text-lg hover:bg-pink-700 transition-colors">
            💉 Pick Color from Screen
          </button>
          {color && (
            <div className="space-y-3">
              <div className="w-32 h-32 rounded-2xl mx-auto shadow-lg border" style={{backgroundColor: color}} />
              <button onClick={() => navigator.clipboard.writeText(color)} className="text-lg font-mono text-gray-900 hover:text-pink-600">{color.toUpperCase()}</button>
            </div>
          )}
        </>
      ) : (
        <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-6">
          <p className="text-yellow-700">The EyeDropper API requires Chrome 95+, Edge 95+, or Opera 81+. Your browser does not support this feature.</p>
        </div>
      )}
    </div>
  );
}
