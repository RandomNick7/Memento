import { writable } from 'svelte/store';
import { persisted } from 'svelte-persisted-store'

export const targetID = writable(0);
export const darkTheme = persisted("Memento Theme", false)