<script lang='ts'>
    import { redirect } from '@sveltejs/kit';
    import { checkUser } from "../utils/utils";
    import { loggedAs } from '../../src/store'
	import { Button, Label, Input } from "flowbite-svelte";

    
    const login = {
        username: '',
        password: '',
    }
    
    function handleLogOutClick (){
        loggedAs.set("Anonymous")
}
  

    const handleSubmit = () => {
        checkUser(login.username, login.password)
        .then((matchedUser)=>{
            loggedAs.set(matchedUser[0].username)
            login.username = ''
            login.password = ''
        })
        .then(()=>{
            goto('/')   
        })
    }



</script>
<h1 class="text-5xl text-center my-10">Log in</h1>
<form action="" on:submit|preventDefault={handleSubmit} class="flex flex-col items-center justify-center">
    <div class="grid gap-6 mb-6 md:grid-cols-2">
    <div>
    <Label for="username" class="mb-2">Username</Label>
    <Input id="username" placeholder="Username" type="text" bind:value={login.username} required/>
</div>
<div>
    <Label for="password" class="mb-2">Password</Label>
    <Input id="password" placeholder="Password" type="password" bind:value={login.password} required/>
</div>
    <Button type="submit" class="text-white bg-gradient-to-r from-purple-400 via-purple-500 to-purple-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-purple-300 dark:focus:ring-purple-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2 my-5">Login</Button>
    {#if $loggedAs !== "Anonymous"}
    <Button on:click={handleLogOutClick} type="button" class="text-white bg-gradient-to-r from-purple-400 via-purple-500 to-purple-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-purple-300 dark:focus:ring-purple-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2 my-5">Logout</Button>
    <!-- <h2>Logged in as {$loggedAs}</h2> -->
    {:else}
    <Button href="/signup" class="text-white bg-gradient-to-r from-purple-400 via-purple-500 to-purple-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-purple-300 dark:focus:ring-purple-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2 my-5"> Sign up</Button>
{/if}
</form>
