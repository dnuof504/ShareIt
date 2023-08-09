<script lang="ts">
	import { goto } from '$app/navigation';
	import {
		changeAvatar,
		checkAvatarExists,
		replaceUserAvatar,
		uploadUserAvatar
	} from '../../server';
	import { avatarIsChanged, loggedAs } from '../store';
	import { Label, Fileupload } from 'flowbite-svelte';

	let avatar: File;

	let fileuploadprops = {
		id: 'user_avatar'
	};

	let newUrl: string;

	avatarIsChanged.set(false);

	async function handleSubmit2() {
		const avatarExists = await checkAvatarExists($loggedAs);
		if (!avatarExists) {
			uploadUserAvatar($loggedAs, avatar).then((path) => {
				newUrl = `https://jxdsmvzqgqofgdetgfha.supabase.co/storage/v1/object/public/users/${path}`;
				changeAvatar($loggedAs, newUrl);
				avatarIsChanged.set(true);
				goto('/account');
			});
		} else {
			replaceUserAvatar($loggedAs, avatar).then((path) => {
				newUrl = `https://jxdsmvzqgqofgdetgfha.supabase.co/storage/v1/object/public/users/${path}`;
				changeAvatar($loggedAs, newUrl);
				avatarIsChanged.set(true);
				goto('/account');
			});
		}
	}

	function handleFileSelection(e: any) {
		avatar = e.target.files[0];
	}
</script>

<form on:submit|preventDefault={handleSubmit2}>
	<Label class="pb-2">Upload file</Label>
	<Fileupload {...fileuploadprops} on:change={handleFileSelection} required/>
	<button
		type="submit"
		class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
		>Submit</button
	>
</form>
