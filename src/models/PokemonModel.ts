export type PokemonType =  'fire'|'water' |'grass'|'poison'|'electric'|'bug'|'fairy'|'ground'|'flying'
export type Pokemon = {
  name: string
  url: string
}
export type PokemonDetails = {
  id: string
  name:string
  types: PokemonType[]
  sprite:string
}