<script>
  import "$lib/css/navbar.css"
  import { darkTheme } from '$lib/js/stores.js';
  import jsCookie from "js-cookie";
  import { onMount } from "svelte";

  $: panel_state = 0;

  function cookieCheck(){
    if(jsCookie.get("MementoJWT")){
      document.getElementById("sign-up").style.display = "none";
      document.getElementById("log-in").style.display = "none";
      document.getElementById("sign-out").style.display = "inline-block";
      document.getElementById("backup").style.display = "inline-block";
    }else{
      document.getElementById("sign-up").style.display = "inline-block";
      document.getElementById("log-in").style.display = "inline-block";
      document.getElementById("sign-out").style.display = "none";
      document.getElementById("backup").style.display = "none";
    }
  }

  function parseJwt(token){
    var base64Url = token.split('.')[1];
    var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    var jsonPayload = decodeURIComponent(window.atob(base64).split('').map(function(c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));

    return JSON.parse(jsonPayload);
  }

  function expireCookie(){
    jsCookie.remove("MementoJWT", {sameSite: "lax"});
    cookieCheck();
  }

  onMount(async () => {
    cookieCheck();
  })

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

    if(token["token"]){
      let expiration_time = Date.parse(parseJwt(token["token"])["exp"]);
      jsCookie.set("MementoJWT", token["token"], {expires: expiration_time, sameSite: "lax"});

      let delta_time = expiration_time - Date.parse((new Date()).toUTCString());
      setTimeout(expireCookie, delta_time);
      cookieCheck();
    }
    panel_state *= -1;
  }

  function signOut(){
    jsCookie.remove("MementoJWT", {sameSite: "lax"});
    cookieCheck();
  }
</script>

<div class="nav-wrapper">
  <nav class={$darkTheme? "dark-mode": ""}>
      <a href="/">Memento</a>
      <a href="/editor">Editor</a>
      <a href="/notes">Notes</a>
      <a href="/backup" id="backup">Backup</a>
      <div class="nav-right-side">
        <div id="sign-up" role="button" tabindex="0" on:keydown={()=>{}} on:click={signUpDisplay}>Sign Up</div>
        <div id="log-in" role="button" tabindex="0" on:keydown={()=>{}} on:click={logInDisplay}>Log In</div>
        <div id="sign-out" role="button" tabindex="0" on:keydown={()=>{}} on:click={signOut} style="display:none">Sign Out</div>
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