'use client';

export interface PestDiseaseItem {
  id: string;
  name: string;
  type: 'pest' | 'disease';
}

interface PestSelectorProps {
  items: PestDiseaseItem[];
  selectedId: string;
  onSelect: (id: string) => void;
}

export default function PestSelector({
  items,
  selectedId,
  onSelect,
}: PestSelectorProps) {
  const pests = items.filter((item) => item.type === 'pest');
  const diseases = items.filter((item) => item.type === 'disease');

  const renderButton = (item: PestDiseaseItem) => {
    const isSelected = item.id === selectedId;
    return (
      <button
        key={item.id}
        onClick={() => onSelect(item.id)}
        className={`
          px-4 py-2 rounded-lg font-medium text-sm transition-all
          ${
            isSelected
              ? 'bg-blue-600 text-white shadow-md'
              : 'bg-white text-slate-700 hover:bg-slate-50 shadow'
          }
        `}
      >
        {item.name}
      </button>
    );
  };

  return (
    <nav className="space-y-6">
      <div>
        <h2 className="text-sm font-semibold uppercase text-slate-500 mb-3">
          🦗 Pests
        </h2>
        <div className="flex flex-wrap gap-2">{pests.map(renderButton)}</div>
      </div>
      <div>
        <h2 className="text-sm font-semibold uppercase text-slate-500 mb-3">
          🦠 Diseases
        </h2>
        <div className="flex flex-wrap gap-2">{diseases.map(renderButton)}</div>
      </div>
    </nav>
  );
}