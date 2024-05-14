<script>
  import main from '$lib/svelte/main.svelte';
  import '$lib/css/index.css';
  import { darkTheme } from '$lib/js/stores.js';
</script>

<svelte:component this={main}>
  <div class={$darkTheme? "page-wrapper dark-mode" : "page-wrapper"}>
    <div id="main-text">Save notes in the comfort of your browser.</div>
    <a id="editor-btn" href="/editor">Start Writing</a>
  </div>
</svelte:component>