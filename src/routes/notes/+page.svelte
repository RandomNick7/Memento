<script>
  import "$lib/css/quill.snow.css";
  import "$lib/css/notes.css";
  import main from "$lib/svelte/main.svelte";
  import { db } from "$lib/js/db";
  import { liveQuery } from "dexie";
  import { get } from "svelte/store";
  import { targetID, darkTheme, loggedIn } from "$lib/js/stores.js";
  import jsCookie from "js-cookie";
  import Nav from "../../lib/svelte/nav.svelte";

  let notes = liveQuery(
    () => db.notes.toArray()
  );
  let url = "https://randomnickname.pythonanywhere.com/memento"

  function parseJWT(token){
    var base64Url = token.split('.')[1];
    var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    var jsonPayload = decodeURIComponent(window.atob(base64).split('').map(function(c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));

    return JSON.parse(jsonPayload);
  }

  function pinToTop(){
    let target = this.parentElement.parentElement;
    let targetID = parseInt(target.dataset.id);
    db.notes.get(targetID).then((result) => {
      db.notes.update(targetID, {pinned: !result.pinned})
    });
  }

  function editNote(){
    let target = this.parentElement.parentElement;
    targetID.set(parseInt(target.dataset.id));
  }

  function deleteNote(){
    async function deleteEntry(id){
      db.notes.where('id').equals(id).delete();
    }

    let target = this.parentElement.parentElement;
    deleteEntry(parseInt(target.dataset.id));
  }

  async function uploadNote(){
    let target = this.parentElement.parentElement;
    let db_entry = await db.notes.get(parseInt(target.dataset.id));
    let uid = parseJWT(jsCookie.get("MementoJWT"))["id"]

    await fetch(url, {
      method: "POST",
      headers:{
        "Content-Type":"application/json"
      },
      body: JSON.stringify({
        "uid":uid,
        "entries":JSON.stringify([db_entry])
      })
    })
  }

  async function uploadAllNotes(){
    let db_entries = await db.notes.toArray();
    let uid = parseJWT(jsCookie.get("MementoJWT"))["id"]

    await fetch(url, {
      method: "POST",
      headers:{
        "Content-Type":"application/json"
      },
      body: JSON.stringify({
        "uid":uid,
        "entries":JSON.stringify(db_entries)
      })
    })
  }
</script>

<style>
  /* Cherry picked from quill.snow.css */
  .note :global(.ql-font-serif){
    font-family: Georgia, Times New Roman, serif;
  }

  .note :global(.ql-font-monospace){
    font-family: Monaco, Courier New, monospace;
  }

  .note :global(.ql-size-small){
    font-size:.75em;
  }
  
  .note :global(.ql-size-large){
      font-size:1.5em;
  }

  .note :global(.ql-size-huge){
      font-size:2.5em;
  }

  .note :global(blockquote){
    padding-left: 16px;
    border-left: 4px solid #ccc;
    margin-bottom: 5px;
    margin-top: 5px;
  }

  .note :global(pre[data-language]){
    padding: 5px 10px;
    border-radius: 3px;
    margin-bottom: 5px;
    margin-top: 5px;
    background-color:#23241f;
    color:#f8f8f2;
    font-family: monospace;
  }
</style>

<svelte:component this={main}>
  {#if $notes}
    {#if $notes.length > 0}
      {#if $loggedIn}
        <a href="/backup" on:click={uploadAllNotes} class={$darkTheme? "upload-all dark-mode" : "upload-all"}>
          Upload all notes
        </a>
      {/if}
    {/if}
  {/if}
  <div class={$darkTheme? "notes-wrapper dark-mode" : "notes-wrapper"}>
    {#if $notes}
      {#if $notes.length > 0}
        {#each $notes as note}
          <div class="note" data-id={note.id} style="order:{note.pinned? -1 : note.id}">
            <div class="controls">
              {#if $loggedIn}
              <a href="/backup" on:click={uploadNote}>
                <img alt="Upload" src="/img/cloud_up.svg">
              </a>
              {/if}
              <button on:click={pinToTop}>
                <img alt="Pin" src="{note.pinned? "/img/pin_dark.svg" : "/img/pin.svg"}">
              </button>
              <a href="/editor" on:click={editNote}>
                <img alt="Edit" src="/img/edit_pencil.svg">
              </a>
              <button on:click={deleteNote}>
                <img alt="Delete" src="/img/trash_bin.svg">
              </button>
            </div>
            {@html note.html}
          </div>
        {/each}
      {:else}
        <div id="no-notes-text">Nothing saved yet...</div>
      {/if}
    {/if}
  </div>
</svelte:component>