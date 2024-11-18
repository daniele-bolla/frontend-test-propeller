import { PokemonType } from "@/models/PokemonModel";
import React from "react";

const PokemonCard: React.FC<PokemonType[]> = (types) => {
  return (
    <div className="flex justify-center space-x-2">
      {types.map((type) => (
        <span
          key={type}
          className={`px-3 py-1 text-xs font-bold rounded-full ${
            type === "fire"
              ? "bg-red-500 text-white"
              : type === "water"
              ? "bg-blue-500 text-white"
              : type === "grass"
              ? "bg-green-500 text-white"
              : type === "poison"
              ? " bg-violet-500 text-white"
              : type === "electric"
              ? " bg-yellow-500 text-white"
              : type === "bug"
              ? " bg-emerald-400 text-white"
              : type === "fairy"
              ? " bg-pink-400 text-white"
              : type === "ground"
              ? "bg-amber-900 text-white"
              : type === "flying"
              ? " bg-teal-400 text-white"
              : "bg-slate-500 text-white"
          }`}
        >
          {type}
        </span>
      ))}
    </div>
  );
};

export default PokemonCard;
