<script>
  import main from '$lib/svelte/main.svelte';
</script>

<style>
    #page-wrapper {
        width: 100%;
        height: 100%;
        display: flex;
        align-items: inherit;
        flex-direction: inherit;
        justify-content: space-around;
        font-family: Verdana, sans-serif;
    }
    #main-text{
        text-align: center;
        font-size: 60px;
        color: transparent;
        background-image: linear-gradient(60deg, hsl(200, 100%, 40%),hsl(200, 100%, 70%));
        background-clip: text;
    }
    #editor-btn{
        width: fit-content;
        padding: 12px;
        border-radius: 12px;
        font-size: 36px;
        color: hsl(180, 100%, 95%);
        background-color: hsl(200, 100%, 50%);
        text-decoration: none;
    }
    #editor-btn:hover{
        background-color: hsl(200, 100%, 45%);
    }
    #editor-btn:active{
        background-color: hsl(200, 100%, 40%);
    }
</style>

<svelte:component this={main}>
  <div id="page-wrapper">
    <div id="main-text">Save notes in the comfort of your browser.</div>
    <a id="editor-btn" href="/editor">Start Writing</a>
  </div>
</svelte:component>