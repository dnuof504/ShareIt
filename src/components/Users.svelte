<script lang="ts">
	import { fetchAllUsers } from '../../server';
	import type { Users } from './interfaces';

	let users: Users[] | [] = [];

	fetchAllUsers().then((data) => {
		users = data!;
	});
</script>

<ul>
	{#if users.length}
		{#each users as user}
			<li>
				{user.username}
			</li>
		{/each}
	{/if}
</ul>
