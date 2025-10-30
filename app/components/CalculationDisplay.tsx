'use client';

import { calculationData, type CalculationDetails } from './calculationData';

interface CalculationDisplayProps {
  selectedId: string;
}

export default function CalculationDisplay({
  selectedId,
}: CalculationDisplayProps) {
  const data =
    calculationData[selectedId] ||
    calculationData['brown_planthopper']; // Fallback

  const typeBadgeClass =
    data.type === 'Pest'
      ? 'bg-green-100 text-green-800'
      : 'bg-red-100 text-red-800';

  return (
    <article className="mt-8 bg-white p-6 md:p-8 rounded-xl shadow-lg animate-fade-in">
      {/* Header */}
      <header className="border-b border-slate-200 pb-4 mb-6">
        <div className="flex justify-between items-start">
          <div>
            <h2 className="text-2xl font-bold text-slate-900">{data.name}</h2>
            <p className="text-lg text-slate-500 italic">{data.sci_name}</p>
          </div>
          <span
            className={`px-3 py-1 rounded-full text-sm font-semibold ${typeBadgeClass}`}
          >
            {data.type}
          </span>
        </div>
        <p className="text-slate-700 mt-4">{data.description}</p>
      </header>

      {/* Main Content */}
      <div className="space-y-8">
        {/* Formula Section */}
        <section>
          <h3 className="text-xl font-semibold mb-4 text-slate-800">
            🧮 Core Risk Calculation
          </h3>
          <div className="bg-slate-900 text-slate-100 p-4 rounded-lg font-mono text-sm overflow-x-auto">
            {data.formula}
          </div>
        </section>

        {/* Variables Section */}
        <section>
          <h3 className="text-xl font-semibold mb-4 text-slate-800">
            🔬 Variables Explained
          </h3>
          <ul className="space-y-3">
            {data.variables.map((v) => (
              <li
                key={v.name}
                className="p-3 bg-slate-50 rounded-md border border-slate-200"
              >
                <strong className="text-blue-700">{v.name}:</strong>
                <span className="text-slate-700 ml-2">{v.description}</span>
              </li>
            ))}
          </ul>
        </section>

        {/* Source Section */}
        <section>
          <h3 className="text-xl font-semibold mb-4 text-slate-800">
            📚 Source & Citation
          </h3>
          <blockquote className="border-l-4 border-slate-300 pl-4 italic text-slate-600">
            {data.source}
          </blockquote>
        </section>
      </div>
    </article>
  );
}

// Simple fade-in animation for the card
// Add this to your globals.css or in a style tag if you prefer
// We can also just add a new animation to tailwind.config.ts
/*
@keyframes fadeIn {
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
}
.animate-fade-in {
  animation: fadeIn 0.3s ease-out;
}
*/