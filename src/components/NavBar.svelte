<script>
	import { Navbar, NavBrand, NavUl, NavLi, NavHamburger, Dropdown, DropdownItem, Chevron, DropdownDivider } from 'flowbite-svelte';
</script>

<Navbar let:hidden let:toggle color="blue">
  <NavBrand href="/">
    <img
      src="/share-it-logo.png"
      class="mr-3 h-6 sm:h-9"
      alt="ShareIt logo"	
    />
    <span class="self-center whitespace-nowrap text-xl font-semibold dark:text-white">
      ShareIt
    </span>
  </NavBrand>
  <NavHamburger on:click={toggle} />
  <NavUl {hidden}>
    <NavLi href="/">Home</NavLi>
		<NavLi href="/stories">Stories</NavLi>
    <NavLi href="/about">About Us</NavLi>
    <NavLi href="/contact">Contact Us</NavLi>
		<NavLi id="nav-menu1" class="cursor-pointer"><Chevron aligned>Categories</Chevron></NavLi>
		<Dropdown triggeredBy="#nav-menu1" class="w-44 z-20">
      <DropdownItem href="/categories/family">Family</DropdownItem>
			<DropdownItem href="/categories/friends">Friends</DropdownItem>
			<DropdownItem href="/categories/pets">Pets</DropdownItem>
			<DropdownItem href="/categories/romance">Romance</DropdownItem>
			<DropdownItem href="/categories/workplace">Work Place</DropdownItem>
      <DropdownItem href="/categories/general">General</DropdownItem>
      <DropdownDivider />
      <DropdownItem>Sign out</DropdownItem>
    </Dropdown>
		<NavLi href="/login">Login</NavLi>
  </NavUl>
</Navbar>










