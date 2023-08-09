<script lang="ts">
	import { postComment } from '../../server';
	import { comments, loggedAs } from '../store';
	import { getContext, onDestroy } from 'svelte';
	import { Textarea } from 'flowbite-svelte';

	let slug: number = getContext('slug');

	let newComment = {
		username: $loggedAs,
		story_id: slug,
		body: ''
	};

	const unsubscribe = loggedAs.subscribe((newUser) => {
		newComment.username = newUser;
	});
	onDestroy(unsubscribe);

	const handleSubmit = () => {
		postComment(newComment).then(() => {
			comments.update((comments) => [...comments]);
			newComment.body = '';
		});
	};
</script>

<form
	class="flex-col items-center content-center bg-white md:flex-row md:max-w-xl my-10 mx-auto"
	action=""
	on:submit|preventDefault={handleSubmit}
>
	<Textarea class="w-full" bind:value={newComment.body} required />
	<div class="flex flex-col self-center my-2.5">
		<button
			type="submit"
			class="text-white bg-gradient-to-r from-purple-400 via-purple-500 to-purple-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-purple-300 dark:focus:ring-purple-800 font-medium rounded-lg text-sm px-2.5 py-1.5 text-center mr-2 mb-2 my-1 w-full"
			>Add Comment</button
		>
	</div>
</form>
