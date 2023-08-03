<script lang='ts'>

	import { onMount } from "svelte";
    import { 
        Card, 
        MenuButton, 
        Dropdown, 
        DropdownItem, 
        Avatar, 
        GradientButton, 
        Label, 
        Input,
        Textarea  } from "flowbite-svelte";
    import { fetchUser, patchUser } from "../../server";
    import { loggedAs } from '../../src/store'
	import type { Users } from "./interfaces";
	import { Permissions } from "./enums";
	import { checkUpdatedUser } from "../utils/utils";
    let userInfo: Users;
    let userInfoCopy: Users = {
        username: '',
        name: "",
        avatar_url: "https://villagesonmacarthur.com/wp-content/uploads/2020/12/Blank-Avatar.png",
        email: "",
        biography: "",
        password: "",
        permissions: Permissions.USER,
    }
    
    onMount(()=>{

        fetchUser($loggedAs)
        .then((data)=>{
            userInfo = data![0];
            userInfoCopy.username = userInfo.username;
            userInfoCopy.permissions = userInfo.permissions;
        })
    })

    const handleSubmit = () => {
        const updatedUser = checkUpdatedUser(userInfo, userInfoCopy)
        patchUser(updatedUser)
        .then((data)=>{
            userInfo = data![0]
            userInfoCopy = {
            username: '',
            name: "",
            avatar_url: "https://villagesonmacarthur.com/wp-content/uploads/2020/12/Blank-Avatar.png",
            email: "",
            biography: "",
            password: "",
            permissions: Permissions.USER,
        }
        })
    }
</script>



{#if userInfo}
<Card padding='sm'>
    <div class="flex justify-end">
      <MenuButton />
      <Dropdown class="w-36">
        <DropdownItem>Edit</DropdownItem>
        <DropdownItem>Export data</DropdownItem>
        <DropdownItem>Delete</DropdownItem>
      </Dropdown>
    </div>
    <div class="flex flex-col items-center pb-4">
      <Avatar size="lg" src="" />
        <h5 class="mb-1 text-xl font-medium text-gray-900 dark:text-white">{userInfo.username}</h5>
        <span class="text-sm text-gray-500 dark:text-gray-400">{userInfo.biography}</span>
        <div class="flex mt-4 space-x-3 lg:mt-6">
            {#if userInfo.avatar_url==='https://villagesonmacarthur.com/wp-content/uploads/2020/12/Blank-Avatar.png'}
            <GradientButton type="button" color="green">Set Avatar</GradientButton>
            {:else}
            <GradientButton type="button" color="green" >Update Avatar</GradientButton>
            {/if}

        </div>
    </div>
</Card>
  <form on:submit|preventDefault={handleSubmit}>
    <div class='mb-6'>
        <Label for='username' class='block mb-2'>Username</Label>
        <Input id="username" type="text" size="lg" disabled value={userInfo.username} />
    </div>
    <div class='mb-6'>
        <Label for='name' class='block mb-2'>Name</Label>
        <Input id="name" type="text" size="lg" placeholder={userInfo.name} bind:value={userInfoCopy.name}/>
    </div>
    <div class='mb-6'>
        <Label for='email' class='block mb-2' >Email</Label>
        <Input type="email" size="lg" placeholder={userInfo.email} bind:value={userInfoCopy.email}/>
    </div>
    <div class='mb-6'>
        <Label for='biography' class='block mb-2'>Biography</Label>
        <Textarea id='biography' size="lg" placeholder={userInfo.biography} bind:value={userInfoCopy.biography} />
    </div>
    <div class='mb-6'>
        <Label for='password' class='block mb-2'>Password</Label>
        <Input type="password" id="password" size="lg" placeholder='Your secure password' bind:value={userInfoCopy.password} />
    </div>
    <GradientButton type="submit" color="green" >Submit!</GradientButton>
  </form>
  
  {/if}
