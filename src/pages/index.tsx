import React, { useState, useEffect } from 'react';
import PokemonCard from '../components/PokemonCard';
import PokemonService from '@/services/PokemonService';
import LoadingSpinner from '@/components/LoadingSpinner';
import { PokemonDetails, PokemonType } from '@/models/PokemonModel';

const Home: React.FC = () => {
  const [pokemonList, setPokemonList] = useState<PokemonDetails[]>([]);
  const [filteredPokemon, setFilteredPokemon] = useState<PokemonDetails[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<PokemonType | null>(null);
  const [categories, setCategories] = useState<PokemonType[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const fetchPokemon = async () => {
      try {
        const data = await PokemonService.fetchAllWithDetails({ limit: '50' })
        setPokemonList(data);
        setFilteredPokemon(data);
        const uniqueTypes = Array.from(
          new Set(data.flatMap((pokemon) => pokemon.types))
        );
        setCategories(uniqueTypes);
        setIsLoaded(true)
      } catch (error) {
        console.error('Failed to fetch Pokémon:', error);
      }
    };
    fetchPokemon();
  }, []);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const term = e.target.value.toLowerCase();
    setSearchTerm(term);
    filterPokemon(term, selectedCategory);
  };

  const handleCategoryChange = (category: PokemonType | null) => {
    setSelectedCategory(category);
    filterPokemon(searchTerm, category);
  };

  const filterPokemon = (term: string, category: PokemonType | null) => {
    const filtered = pokemonList.filter((pokemon) => {
      const matchesSearch = pokemon.name.toLowerCase().includes(term);
      const matchesCategory = category
        ? pokemon.types.includes(category)
        : true;
      return matchesSearch && matchesCategory;
    });
    setFilteredPokemon(filtered);
  };

  return (
    <div className="bg-[#ef5351] min-h-screen flex justify-center items-center pt-12 pb-16">
      {!isLoaded ? (
        <LoadingSpinner />
      ) : (
        <>
          <div className="container mx-auto h-full">
            <h1 className="text-3xl font-bold mb-4">Pokémon List</h1>
            <input
              type="text"
              placeholder="Search Pokémon by name..."
              value={searchTerm}
              onChange={handleSearch}
              className="p-2 border rounded w-full text-black mb-4"
            />
            <div className="mb-4">
              <button
                onClick={() => handleCategoryChange(null)}
                className={`mr-2 px-4 py-2 rounded ${selectedCategory === null
                    ? 'bg-blue-500 text-white'
                    : 'bg-slate-600'
                  }`}
              >
                All
              </button>
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => handleCategoryChange(category)}
                  className={`mr-2 px-4 py-2 rounded ${selectedCategory === category
                      ? 'bg-blue-500 text-white'
                      : 'bg-slate-600'
                    }`}
                >
                  {category}
                </button>
              ))}
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {filteredPokemon.map((pokemon) => (
                <PokemonCard
                  key={pokemon.id}
                  name={pokemon.name}
                  types={pokemon.types}
                  sprite={pokemon.sprite}
                />
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Home;