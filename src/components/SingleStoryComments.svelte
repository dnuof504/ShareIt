<script lang="ts">
	import { deleteSingleComment, fetchStoryCommentsWithPicture } from '../../server';
	import { getContext, onDestroy, onMount } from 'svelte';
	import AddComments from './AddComments.svelte';
	import { comments } from '../store';
	import { Activity } from 'flowbite-svelte';
	import CommentCard from './CommentCard.svelte';

	let storyId: number = getContext('slug');
	let renderComments: any = [];

	onMount(async () => {
		const responseComments = await fetchStoryCommentsWithPicture(storyId);
		renderComments = responseComments;
	});

	const unsubscribe = comments.subscribe(() =>
		fetchStoryCommentsWithPicture(storyId).then((responseComments) => {
			renderComments = responseComments;
		})
	);

	onDestroy(unsubscribe);

	async function handleDelete(comment_id: number) {
		await deleteSingleComment(comment_id);
		const responseComments = await fetchStoryCommentsWithPicture(storyId);
		renderComments = responseComments;
	}
</script>

<AddComments />
<ul>
	{#if renderComments.length}
		<Activity>
			<CommentCard {renderComments} {handleDelete} />
		</Activity>
	{/if}
</ul>
