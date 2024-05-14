<script>
  import "$lib/css/navbar.css"
  import { darkTheme } from '$lib/js/stores.js';
</script>

<nav class={$darkTheme? "dark-mode": ""}>
    <a href="/">Memento</a>
    <a href="/editor">Editor</a>
    <a href="/notes">Notes</a>
    <button on:click={() => {darkTheme.set(!$darkTheme)}}>
        <img alt="Theme" src={$darkTheme? "/img/sun.svg" : "/img/moon.svg"}>
    </button>
</nav>