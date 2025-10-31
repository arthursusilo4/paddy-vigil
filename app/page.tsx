"use client";

import { useState } from "react";
import PestSelector, { type PestDiseaseItem } from "./components/PestSelector";
import CalculationDisplay from "./components/CalculationDisplay";

const allItems: PestDiseaseItem[] = [
  { id: "brown_planthopper", name: "Wereng Coklat", type: "pest" },
  { id: "yellow_stem_borer", name: "Penggerek Batang Kuning", type: "pest" },
  { id: "rice_leaf_folder", name: "Penggulung Daun Padi", type: "pest" },
  { id: "rice_bug", name: "Kepinding Tanah", type: "pest" },
  { id: "field_rat", name: "Tikus Sawah", type: "pest" },
  { id: "golden_snail", name: "Keong Mas", type: "pest" },
  { id: "rice_blast", name: "Blas Padi", type: "disease" },
  { id: "bacterial_leaf_blight", name: "Hawar Daun Bakteri", type: "disease" },
  { id: "sheath_blight", name: "Hawar Pelepah", type: "disease" },
  { id: "brown_spot", name: "Bercak Coklat", type: "disease" },
  { id: "tungro", name: "Virus Tungro", type: "disease" },
];

export default function Home() {
  const [selectedId, setSelectedId] = useState<string>("brown_planthopper");

  return (
    <main className="max-w-5xl mx-auto px-4 py-8 md:py-12">
      <div className="space-y-8">
        <header className="relative text-center">
          <h1 className="text-3xl font-bold text-slate-900">
            Kamus Model Resiko Hama & Penyakit
          </h1>
          <p className="text-lg text-slate-600 pt-1">
            Rincian interaktif dari perhitungan resiko kemunculan Hama & Penyakit.
          </p>
        </header>

        <PestSelector
          items={allItems}
          selectedId={selectedId}
          onSelect={setSelectedId}
        />

        <CalculationDisplay selectedId={selectedId} />
      </div>
    </main>
  );
}