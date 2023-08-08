<script lang="ts">
	import { Label, Input, Button, Toast } from 'flowbite-svelte';
	import { postUser } from '../../server';
	import { Permissions } from './enums';
	import type { Users } from './interfaces';
	import { goto } from '$app/navigation';
	let newUser: Users = {
		username: '',
		name: '',
		avatar_url:
			'https://jxdsmvzqgqofgdetgfha.supabase.co/storage/v1/object/public/default/static/default-user-pic.png',
		email: '',
		biography: '',
		password: '',
		permissions: Permissions.USER
	};

	async function handleSubmit() {
		const { error } = await postUser(newUser);
		if (error) {
			showError = true;
		} else {
			newUser = {
				username: '',
				name: '',
				avatar_url:
					'https://jxdsmvzqgqofgdetgfha.supabase.co/storage/v1/object/public/default/static/default-user-pic.png',
				email: '',
				biography: '',
				password: '',
				permissions: Permissions.USER
			};
			showSuccess = true;
			goto('/login');
		}
	}
	let showSuccess = false;
	let showError = false;
</script>

<section class="flex flex-col items-center justify-center">
	<Toast bind:open={showSuccess} color="green">
		<svelte:fragment slot="icon">
			<svg
				aria-hidden="true"
				class="w-5 h-5"
				fill="currentColor"
				viewBox="0 0 20 20"
				xmlns="http://www.w3.org/2000/svg"
				><path
					fill-rule="evenodd"
					d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
					clip-rule="evenodd"
				/></svg
			>
			<span class="sr-only">Check icon</span>
		</svelte:fragment>
		Success!</Toast
	>
	<Toast bind:open={showError} color="red"
		><svelte:fragment slot="icon">
			<svg
				aria-hidden="true"
				class="w-5 h-5"
				fill="currentColor"
				viewBox="0 0 20 20"
				xmlns="http://www.w3.org/2000/svg"
				><path
					fill-rule="evenodd"
					d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
					clip-rule="evenodd"
				/></svg
			>
			<span class="sr-only">Error icon</span>
		</svelte:fragment>Username already exits, please try again with a unique username</Toast
	>
	<h1 class="text-5xl text-center my-10">Create an account</h1>
	<form on:submit|preventDefault={handleSubmit} class="flex flex-col max-w-md mx-auto gap-2">
		<div class="grid gap-6 mb-6 md:grid-cols-1 w-80">
			<div>
				<Label for="first_name" class="mb-2">Username</Label>
				<Input
					type="text"
					placeholder="username"
					bind:value={newUser.username}
					class="w-full"
					required
				/>
			</div>
			<div>
				<Label for="first_name" class="mb-2">Name</Label>
				<Input type="text" placeholder="Full Name" bind:value={newUser.name}  />
			</div>
			<div>
				<Label for="first_name" class="mb-2">E-mail</Label>
				<Input type="email" placeholder="e-mail" bind:value={newUser.email} />
			</div>
			<div>
				<Label for="first_name" class="mb-2">Password</Label>
				<Input
					type="password"
					placeholder="password"
					bind:value={newUser.password}
					class="w-full"
					required
				/>
			</div>
			<Button
				type="submit"
				class="text-white bg-gradient-to-r from-purple-400 via-purple-500 to-purple-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-purple-300 dark:focus:ring-purple-800 font-medium rounded-lg text-sm px-2 py-1.5 text-center mr-2 mb-2 my-1"
			>
				Submit</Button
			>
		</div>
	</form>
</section>
