<script>
  import main from '$lib/svelte/main.svelte';
  import '$lib/css/index.css';
</script>

<svelte:component this={main}>
  <div id="page-wrapper">
    <div id="main-text">Save notes in the comfort of your browser.</div>
    <a id="editor-btn" href="/editor">Start Writing</a>
  </div>
</svelte:component>