<style>
    #main-section{
        height: calc(100vh - 44px);
        margin-top: -12px;
        display:flex;
        align-items: center;
        justify-content: space-around;
        flex-direction: column;
        font-family: Verdana, sans-serif;
        background-image: linear-gradient(120deg, hsl(180, 100%, 92.5%),hsl(220, 100%, 92.5%));
    }
    #main-text{
        text-align: center;
        font-size: 60px;
        color: transparent;
        background-image: linear-gradient(60deg, hsl(200, 100%, 40%),hsl(200, 100%, 70%));
        background-clip: text;
    }
    #editor-btn{
        padding: 12px;
        border-radius: 12px;
        font-size: 36px;
        color:hsl(180, 100%, 95%);
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

<div id="main-section">
  <div id="main-text">Save notes in the comfort of your browser.</div>
  <a id="editor-btn" href="/editor">Start Writing</a>
</div>