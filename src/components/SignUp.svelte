<script lang="ts">
    import { Label, Input, Button } from "flowbite-svelte";
    import { postUser } from "../../server";
	import { Permissions } from "./enums";
	import type { Users } from "./interfaces";
	import { goto } from "$app/navigation";
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
    alert("account created Please Login")
    goto("/login")
}
</script>

<section class="flex flex-col items-center justify-center" >
    <h1 class="text-5xl text-center my-10">Create an account</h1>
    <form on:submit|preventDefault={handleSubmit} >
        <div class="grid gap-6 mb-6 md:grid-cols-2">
            <div>
                <Label for="first_name" class="mb-2">Username</Label>
                <Input type="text" placeholder="username" bind:value={newUser.username} required />
            </div>
            <div>
                <Label for="first_name" class="mb-2">Name</Label>
                <Input type="text" placeholder="name" bind:value={newUser.name} />
            </div>
            <div>
                <Label for="first_name" class="mb-2">E-mail</Label>
                <Input type="text" placeholder="e-mail" bind:value={newUser.email}/>
            </div>
            <div>
                <Label for="first_name" class="mb-2">Password</Label>
                <Input type="text" placeholder="password" bind:value={newUser.password} required/>
            </div>
            <Button type="submit" class="text-white bg-gradient-to-r from-purple-400 via-purple-500 to-purple-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-purple-300 dark:focus:ring-purple-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2 my-5"> Submit</Button>
        </div>
    </form>
</section>
