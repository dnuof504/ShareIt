import { persisted } from 'svelte-local-storage-store'
import { writable } from 'svelte/store'

export const loggedAs = persisted('loggedAs', "Anonymous")
export const rights = persisted('rights','USER')
export const category_slug = writable('')
export const comments = writable([])
export const stories = writable([])
export const sentiment = writable("change me")
export const message = writable({
    firstName: '',
    lastName: '',
    email: '',
    message: '',
})

export const avatarIsChanged = writable(false)
export const coverIsChanged = writable(false)