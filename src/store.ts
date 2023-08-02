import { persisted } from 'svelte-local-storage-store'
import { writable } from 'svelte/store'

export const loggedAs = persisted('loggedAs', "Anonymous")
export const category_slug = writable('')
export const comments = writable('')