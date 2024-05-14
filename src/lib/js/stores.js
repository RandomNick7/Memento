import { writable } from 'svelte/store';
import { persisted } from 'svelte-persisted-store'

export const targetID = writable(0);

export const darkTheme = persisted("Memento Theme", false)
/*
const defaultTheme = false;
const initialTheme = browser ? window.localStorage.getItem("Memento Theme") ?? defaultTheme : defaultTheme;

export const darkTheme = writable(false);
darkTheme.subscribe((value) => {
    if(browser){
        return window.localStorage.setItem("Memento Theme", value);
    }
})*/