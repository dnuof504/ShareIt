<script lang="ts">
    	import { postUser } from "../../server";
	import { Permissions } from "./enums";
	import type { Users } from "./interfaces";
    let newUser:Users = {
        username: "",
        name: "",
        avatar_url: "https://villagesonmacarthur.com/wp-content/uploads/2020/12/Blank-Avatar.png",
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
        avatar_url: "https://villagesonmacarthur.com/wp-content/uploads/2020/12/Blank-Avatar.png",
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
        <input type="text" placeholder="name" bind:value={newUser.name}>
        <input type="text" placeholder="email" bind:value={newUser.email}>
        <input type="text" placeholder="password" bind:value={newUser.password} required>
        <button> Submit!</button>
    </form>
</section>