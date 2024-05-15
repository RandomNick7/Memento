<script>
  import "$lib/css/navbar.css"
  import { darkTheme } from '$lib/js/stores.js';

  $: panel_state = 0;

  function signUpDisplay(){
    panel_state != 1? panel_state = 1 : panel_state = -1;
  }

  function logInDisplay(){
    panel_state != 2? panel_state = 2 : panel_state = -2;
  }

  async function signIn(){
    let user_field = document.getElementById("username").value;
    let pass_field = document.getElementById("password").value;
    let url = "http://randomnickname.pythonanywhere.com/" + (panel_state == 1? "sign_up" : "login")
    let res = await fetch(url, {
      method: "POST",
      headers:{
        "Content-Type":"application/json"
      },
      body: JSON.stringify({
        "username":user_field,
        "password":pass_field
      })
    })
    let token = await res.json();
    console.log(token["token"]);
    panel_state *= -1;
  }
</script>

<div class="nav-wrapper">
  <nav class={$darkTheme? "dark-mode": ""}>
      <a href="/">Memento</a>
      <a href="/editor">Editor</a>
      <a href="/notes">Notes</a>
      <div class="nav-right-side">
        <div role="button" tabindex="0" on:keydown={()=>{}} on:click={signUpDisplay}>Sign Up</div>
        <div role="button" tabindex="0" on:keydown={()=>{}} on:click={logInDisplay}>Log In</div>
        <div style="display:none">Sign Out</div>
        <button id="theme-swap" on:click={() => {darkTheme.set(!$darkTheme)}}>
            <img alt="Theme" src={$darkTheme? "/img/sun.svg" : "/img/moon.svg"}>
        </button>
      </div>
  </nav>
  <div class={$darkTheme? "login_form dark-mode": "login_form"} style="opacity:{panel_state}">
    <p>{panel_state == 1 || panel_state == -1? "Sign Up" : "Log In"}</p>
    <label for="username">Username:</label>
    <input id="username" type="text"/>
    <label for="password">Password:</label>
    <input id="password" type="text"/>
    <input type="button" value="Submit" on:click={signIn}/>
  </div>
</div>