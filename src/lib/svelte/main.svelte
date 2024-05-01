<style> 
  #main-section{
    width: 100%;
    height: calc(100vh - 44px);
    margin-top: -12px;
    display: flex;
    align-items: center;
    flex-direction: column;
    background-image: linear-gradient(120deg, hsl(180, 100%, 92.5%),hsl(220, 100%, 92.5%));
  }
</style>

<div id="main-section">
    <slot/>
</div>