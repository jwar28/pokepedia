import { localStorageStore } from '@skeletonlabs/skeleton';
import { writable, type Writable } from 'svelte/store';

export const selectedRegion: Writable<string> = writable();

export const selectedRegionName: Writable<string> = writable();

export const randomizerSelectedRegionName: Writable<string> = localStorageStore(
	'randomizerRegionNameSelected',
	''
);
