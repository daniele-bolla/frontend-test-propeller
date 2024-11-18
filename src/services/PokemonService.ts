import { Pokemon, PokemonDetails } from '@/models/PokemonModel'
import ApiService from '@/services/ApiService'
import { serializeObj } from '@/utils/serializeObj'

const API_ENDPOINT = '/pokemon'

type FetchAllParams = {
  offset: string
  limit: string
}

async function fetchAll(params: Partial<FetchAllParams>):Promise<Pokemon[]> {
  const urlParams = serializeObj(params)
  const { data } = await ApiService.get(`${API_ENDPOINT}?${urlParams.toString()}`)
  const { results } = data
  return results
}
async function fetchAllWithDetails(params: Partial<FetchAllParams>):Promise<PokemonDetails[]> {
  const result = await fetchAll(params)
  const detailedData = await Promise.all(
    result.map(async (pokemon: Pokemon) => {
      const details = await fetch(pokemon.url).then((res) => res.json());
      return {
        id: details.id,
        name: details.name,
        types: details.types.map((typeObj: { type: {name:string} }) => typeObj.type.name),
        sprite: details.sprites.front_default,
      };
    })
  );
  return detailedData
}


export default {
  fetchAllWithDetails
}
