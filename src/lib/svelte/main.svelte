<script>
  import { darkTheme } from '$lib/js/stores.js';
</script>

<style>
  .main-section{
    width: 100%;
    min-height: calc(100vh - 44px);
    height: calc(100% - 44px);
    margin-top: -12px;
    display: flex;
    align-items: center;
    flex-direction: column;
    background-image: linear-gradient(120deg, hsl(180, 100%, 92.5%), hsl(220, 100%, 92.5%));
  }

  .main-section.dark-mode{
    background-image: linear-gradient(120deg, hsl(190, 100%, 7.5%), hsl(220, 100%, 7.5%));
  }
</style>

<div class={$darkTheme? "main-section dark-mode": "main-section"}>
    <slot/>
</div>