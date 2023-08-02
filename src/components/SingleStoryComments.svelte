<script lang="ts">
	import { fetchStoryComments, deleteSingleComment } from '../../server';
	import { getContext, onDestroy, onMount } from 'svelte';
	import { loggedAs } from '../store';
	import AddComments from './AddComments.svelte';
	let storyId: number = getContext('slug');
	import { comments } from '../store';
	import { formatDate } from '../utils/utils';

	let renderComments: any = [];

	onMount(() => {
		fetchStoryComments(storyId).then((responseComments) => {
			renderComments = responseComments;
		});
	});

	const unsubscribe = comments.subscribe(() =>
		fetchStoryComments(storyId).then((responseComments) => {
			renderComments = responseComments;
		})
	);

	onDestroy(unsubscribe);

	async function handleDelete(comment_id: number) {
		await deleteSingleComment(comment_id);

		await fetchStoryComments(storyId).then((responseComments) => {
			renderComments = responseComments;
		});
	}
</script>

<AddComments />
<ul class="border">
	{#if renderComments.length}
		{#each renderComments as comment}
			<li>
				<b>{comment.username} said:</b>
				{comment.body} <b>IT HAPPENED</b>
				{formatDate(comment.created_at)}
				{#if comment.username === $loggedAs}
					<button
						on:click={() => {
							handleDelete(comment.comment_id);
						}}
						type="button"
						class="text-white bg-gradient-to-r from-red-400 via-red-500 to-red-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2"
						>Delete Comment</button
					>
				{/if}
			</li>
		{/each}
	{/if}
</ul>
