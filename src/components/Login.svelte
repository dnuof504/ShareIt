<script lang='ts'>
import { Button, Label, Input, Textarea} from "flowbite-svelte";

import { checkUser } from "../utils/utils";
import { loggedAs } from '../../src/store'

    const login = {
        username: '',
        password: ''
    }


    const handleSubmit = () => {
        checkUser(login.username, login.password)
        .then((matchedUser)=>{

            loggedAs.set(matchedUser[0].username)
            alert(`You've Logged in as ${login.username}`)
        })

    }


</script>



<h1 class="text-5xl text-center my-10">Login Here</h1>
<form class="flex flex-col items-center justify-center" on:submit|preventDefault={handleSubmit}>
    <div class="mb-6">
        <Label for="Username" class="mb-2">Username</Label>
        <Input type="text" id="Username" placeholder="Username" bind:value={login.username} class='w-96'  required />
      </div>
    <div class="mb-6">
      <Label for="Password" class="mb-2">Password</Label>
      <Input type="password" id="Password"  bind:value={login.password} class='w-96'  required />
    </div>

    <Button type="submit" class="text-white bg-gradient-to-r from-purple-400 via-purple-500 to-purple-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-purple-300 dark:focus:ring-purple-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2 my-5">Login</Button>
  </form>