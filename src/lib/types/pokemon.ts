export type Pokemon = {
	name: string;
	url: string;
};

export type IndexPokemon = Pokemon & {
	id: string;
	image: string;
};
