import { error } from '@sveltejs/kit';

/** @type {import('./$types').PageLoad} */
export function load({ params }: any) {
        return {
            params
        };

    throw error(404, 'Not found');
}