<style>
    nav{
        margin-bottom: 12px;
        display: flex;
        background-color: hsl(200, 100%, 90%);
        color: hsl(200, 100%, 40%);
        font-size: 24px;
        font-family: 'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande', 'Lucida Sans', sans-serif;
    }

    a{
        padding: 8px;
        text-decoration: none;
    }

    a:hover{
        background-color: hsl(200, 100%, 85%);
    }

    a:active{
        color: hsl(200, 100%, 40%);
        background-color: hsl(200, 100%, 80%);
    }
</style>

<nav id="navbar">
    <a href="/">MiniDoc</a>
    <a href="/editor">Editor</a>
    <a href="/notes">Notes</a>
</nav>
<slot/>