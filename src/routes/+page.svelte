<script>
  import main from '$lib/svelte/main.svelte';
  import '$lib/css/index.css';
  import { darkTheme } from '$lib/js/stores.js';

  let darkMode, classList
  $: $darkTheme, changeTheme()
  darkTheme.subscribe((value) => {
    darkMode = value;
  });
  
  function changeTheme(){
    if(darkMode == true){
      classList = "page-wrapper dark-mode";
    }else{
      classList = "page-wrapper";
    }
  }
</script>

<svelte:component this={main}>
  <div class={classList}>
    <div id="main-text">Save notes in the comfort of your browser.</div>
    <a id="editor-btn" href="/editor">Start Writing</a>
  </div>
</svelte:component>