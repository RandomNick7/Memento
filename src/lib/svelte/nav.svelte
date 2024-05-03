<script>
  import "$lib/css/navbar.css"
  import { darkTheme } from '$lib/js/stores.js';

  let darkMode, classList, iconSrc
  
  $: $darkTheme, changeTheme()
  darkTheme.subscribe((value) => {
    darkMode = value;
  });
  
  function toggleTheme(){
    darkTheme.set(!darkMode);
  }
  
  function changeTheme(){
    if(darkMode == true){
      iconSrc = "/img/sun.svg"
      classList = "dark-mode";
    }else{
      classList = "";
      iconSrc = "/img/moon.svg"
    }
  }
</script>

<nav class={classList}>
    <a href="/">Memento</a>
    <a href="/editor">Editor</a>
    <a href="/notes">Notes</a>
    <button on:click={toggleTheme}>
        <img alt="Theme" src={iconSrc}>
    </button>
</nav>