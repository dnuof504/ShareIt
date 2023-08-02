<script lang='ts'>

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

<a href="./">Link to main</a>