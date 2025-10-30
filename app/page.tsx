"use client";

import { useState } from "react";
import PestSelector, { type PestDiseaseItem } from "./components/PestSelector";
import CalculationDisplay from "./components/CalculationDisplay";
import { ThemeToggle } from "./components/ThemeToggle";

const allItems: PestDiseaseItem[] = [
  { id: "brown_planthopper", name: "Brown Planthopper", type: "pest" },
  { id: "yellow_stem_borer", name: "Yellow Stem Borer", type: "pest" },
  { id: "rice_leaf_folder", name: "Rice Leaf Folder", type: "pest" },
  { id: "rice_bug", name: "Rice Bug", type: "pest" },
  { id: "field_rat", name: "Field Rat", type: "pest" },
  { id: "golden_snail", name: "Golden Snail", type: "pest" },
  { id: "rice_blast", name: "Rice Blast", type: "disease" },
  { id: "bacterial_leaf_blight", name: "Bacterial Leaf Blight", type: "disease" },
  { id: "sheath_blight", name: "Sheath Blight", type: "disease" },
  { id: "brown_spot", name: "Brown Spot", type: "disease" },
  { id: "tungro", name: "Tungro Virus", type: "disease" },
];

export default function Home() {
  const [selectedId, setSelectedId] = useState<string>("brown_planthopper");

  return (
    <main className="max-w-5xl mx-auto px-4 py-8 md:py-12">
      <div className="space-y-8">
        <header className="relative text-center">
          <ThemeToggle />
          <h1 className="text-3xl font-bold text-slate-900 dark:text-slate-100">
            Pest & Disease Risk Model Explorer
          </h1>
          <p className="text-lg text-slate-600 dark:text-slate-400 mt-1">
            An interactive breakdown of the calculations from the
            `EnhancedRicePestPredictor`.
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