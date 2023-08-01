<script>  
import NavBar from "../components/NavBar.svelte"
import "../main.css"
</script>

  <div class="app">
      <NavBar />
      <main>
          <slot />
      </main>
  </div>
  
  <!-- <slot /> will display particular +page.svelte you created inside the each route's folder -->