<script lang="ts">
    import {GradientButton} from "flowbite-svelte"
	import { deleteUser } from "../../server";
    import {loggedAs} from "../store"
    import { goto } from '$app/navigation';
	import { redirect } from "@sveltejs/kit";

 let counter = 0
function handleClick (){
    deleteUser($loggedAs)
    loggedAs.set("Anonymous")
    goto("/")

}
</script>
{#if counter === 0}
<GradientButton type="button" on:click={()=>{counter++}} color="red" >Want to delete your account?</GradientButton>
    {:else}
    <p class="mt-2 mb-2 text-center text-sm text-red-600 dark:text-red-500"><span class="font-medium">Warning!</span> This action is permanent!</p>

    <GradientButton type="button" on:click={handleClick} color="red" >Delete My Account</GradientButton>

{/if}