<script lang='ts'>
    import { checkUser } from "../utils/utils";
    import { writable } from "svelte/store";
    import { setContext } from "svelte";
    import { getContext } from "svelte";

    let matchedUserOutside;
    const user = writable(matchedUserOutside)

    const login = {
        username: '',
        password: ''
    }

    setContext('ourUser', user)
    $: user.set(matchedUserOutside!)

    const handleSubmit = () => {
        checkUser(login.username, login.password)
        .then((matchedUser)=>{
            matchedUserOutside=matchedUser[0].username
           
        })

    }


</script>

<form action="" on:submit={handleSubmit} >
    <label for="username">Username</label>
    <input id="username" placeholder="Username" type="text" bind:value={login.username}/>

    <label for="password">Username</label>
    <input id="password" placeholder="Password" type="password" bind:value={login.password}/>
    <button type="submit">Submit</button>
</form>

<a href="/stories/3">Link to stories</a>