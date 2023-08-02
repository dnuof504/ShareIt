import { persisted } from 'svelte-local-storage-store'

export const loggedAs = persisted('loggedAs', "Anonymous")