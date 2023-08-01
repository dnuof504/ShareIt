<script lang='ts'>
	import { postUser } from "../../../server";
	import { Permissions } from "../../components/enums";
	import type { Users } from "../../components/interfaces";
    let newUser:Users = {
        username: "",
        name: "",
        avatar_url: "",
        email: "",
        biography: "",
        password: "",
        permissions: Permissions.USER,
    }

function handleSubmit (){
    postUser(newUser)
    newUser={
        username: "",
        name: "",
        avatar_url: "",
        email: "",
        biography: "",
        password: "",
        permissions: Permissions.USER,
    }
}

</script>
<section>
<h1>Users Header</h1>
<form on:submit|preventDefault={handleSubmit}>
    <input type="text" placeholder="username" bind:value={newUser.username} required>
    <input type="text" placeholder="name" bind:value={newUser.name} required>
    <input type="text" placeholder="avatar_url" bind:value={newUser.avatar_url} required>
    <input type="text" placeholder="email" bind:value={newUser.email} required>
    <input type="text" placeholder="biography" bind:value={newUser.biography} required>
    <input type="text" placeholder="password" bind:value={newUser.password} required>
    <button> Submit!</button>
</form>
</section>