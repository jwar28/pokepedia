import { writable, type Writable } from 'svelte/store';

export const selectedRegion: Writable<string> = writable();

export const selectedRegionName: Writable<string> = writable();
