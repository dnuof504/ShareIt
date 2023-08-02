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
			comments.update((comments) => [newComment, ...comments]);
		});
	};
</script>

<form action="" on:submit|preventDefault={handleSubmit}>
	<Textarea bind:value={newComment.body} />
	<button
		type="submit"
		class="text-white bg-gradient-to-r from-red-400 via-red-500 to-red-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2"
		>Add Comment</button
	>
</form>
