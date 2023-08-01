<script>
    import { Navbar, NavBrand} from 'flowbite-svelte'
  </script>
  
  <Navbar rounded color="form">
    <NavBrand href="/">
      <img src="share-it-logo.png" class="mr-3 h-6 sm:h-9" alt="ShareIt Logo"/>
      <span class="self-center whitespace-nowrap text-xl font-semibold dark:text-white">ShareIt</span>
      <span>
        <a href="/" >Home</a>
        <a href="/stories">Stories</a>
        <a href="/services">Services</a>
        <a href="/pricing">Pricing</a>
        <a href="/contact">Contact</a>
    </span>
    </NavBrand>
  </Navbar>