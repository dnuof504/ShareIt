<script lang='ts'>
    import { checkUser } from "../utils/utils";
    import { loggedAs, rights } from '../../src/store'
	import { Button, Label, Input, Toast } from "flowbite-svelte";
	import { goto } from '$app/navigation';

    
    const login = {
        username: '',
        password: '',
    }
    
    function handleLogOutClick (){
        loggedAs.set("Anonymous")
        rights.set("USER")
    }
  

    const handleSubmit = () => {
        checkUser(login.username, login.password)
        .then((matchedUser)=>{
            if(matchedUser.length !==0)
            {
            loggedAs.set(matchedUser[0].username)
            rights.set(matchedUser[0].permissions)
            login.username = ''
            login.password = ''
            goto('/')   }
            else{
                showError = true
                login.username=""
                login.password=""
            
            }
        })


    

    }
    let showError = false;
</script>


<h1 class="text-5xl text-center my-10">Log in</h1>
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
		</svelte:fragment>Login failed, please check the username or the password and login again.</Toast
	>
<form action="" on:submit|preventDefault={handleSubmit} class="flex flex-col max-w-md mx-auto gap-2 ">
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

    {:else}
    <Button href="/signup" class="text-white bg-gradient-to-r from-purple-400 via-purple-500 to-purple-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-purple-300 dark:focus:ring-purple-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2 my-5"> Sign up</Button>
{/if}
</form>
