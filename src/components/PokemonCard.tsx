import React from 'react';

interface PokemonProps {
  name: string;
  types: string[];
  sprite: string;
}

const PokemonCard: React.FC<PokemonProps> = ({ name, types, sprite }) => {
  return (
    <div className="bg-white border border-gray-200 text-black rounded-lg shadow-xs hover:shadow-lg r transition-shadow cursor-pointe p-4 text-center">
      <h2 className="text-3xl font-semibold capitalize mb-2">{name}</h2>

      <img
        src={sprite}
        alt={name}
        className="w-32 h-32 mx-auto  object-cover"
      />
      
      <div className="flex justify-center space-x-2">
        {types.map((type) => (
          <span
            key={type}
            className={`px-3 py-1 text-xs font-bold rounded-full ${
              type === 'fire'
                ? 'bg-red-500 text-white'
                : type === 'water'
                ? 'bg-blue-500 text-white'
                : type === 'grass'
                ? 'bg-green-500 text-white'
                : type === 'poison'
                ? ' bg-violet-500 text-white'
                : type === 'electric'
                ? ' bg-yellow-500 text-white'
                : type === 'bug'
                ? ' bg-emerald-400 text-white'
                : type === 'fairy'
                ? ' bg-pink-400 text-white'
                : type === 'ground'
                ? 'bg-amber-900 text-white'
                : type === 'flying'
                ? ' bg-teal-400 text-white'
                : 'bg-slate-500 text-white'
            }`}
          >
            {type}
          </span>
        ))}
      </div>
    </div>
  );
};

export default PokemonCard;