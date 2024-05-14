<script>
  import "$lib/css/navbar.css"
  import { darkTheme } from '$lib/js/stores.js';
</script>

<nav class={$darkTheme? "dark-mode": ""}>
    <a href="/">Memento</a>
    <a href="/editor">Editor</a>
    <a href="/notes">Notes</a>
    <div class="nav-right-side">
      <div>Sign Up</div>
      <div>Log In</div>
      <div style="display:none">Sign Out</div>
      <button on:click={() => {darkTheme.set(!$darkTheme)}}>
          <img alt="Theme" src={$darkTheme? "/img/sun.svg" : "/img/moon.svg"}>
      </button>
    </div>
</nav>