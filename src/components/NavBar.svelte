<script>
	import { Navbar, NavBrand, NavUl, NavLi, NavHamburger } from 'flowbite-svelte';
</script>

<Navbar  let:hidden let:toggle rounded>
	<NavBrand href="/" class="flex">
		<img src="" class="flex-none w-14 h-14 ..." alt="ShareIt Logo" />
		<span class="text-3xl font-semibold dark:text-white flex-1 ">ShareIt</span>
		<div class="flex-auto">
			<NavUl>
				<NavLi href="/">Home</NavLi>
				<NavLi href="/stories">Stories</NavLi>
				<NavLi  href="/about">About Us</NavLi>
				<NavLi href="/contact">Contact Us</NavLi>
			</NavUl>
		
	
			<!-- svelte-ignore a11y-click-events-have-key-events -->
			<!-- svelte-ignore a11y-no-static-element-interactions -->
			<span on:click={toggle} >
        Categories
				<NavUl {hidden}>
					<NavLi href="/categories/workplace" active={true}>Work Place</NavLi>
					<NavLi href="/categories/romance">Romance</NavLi>
					<NavLi href="/categories/services">Family</NavLi>
					<NavLi href="/categories/pricing">Friends</NavLi>
					<NavLi href="/categories/contact">Pets</NavLi>
					<NavLi href="/categories/contact">General</NavLi>
				</NavUl>
			</span>
		</div>
	</NavBrand>
</Navbar>
