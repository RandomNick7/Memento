<script>
  import "$lib/css/quill.snow.css";
  import "$lib/css/notes.css";
  import main from "$lib/svelte/main.svelte";
  import { db } from "$lib/js/db";
  import { darkTheme } from "$lib/js/stores.js";
  import { onMount } from "svelte";

  let url = "https://randomnickname.pythonanywhere.com/memento/1"
  $: notes = []

  onMount(async () => {
    let res = await fetch(url, {
      method: "GET",
      headers:{
        "Content-Type":"application/json"
      }
    })
    let response = await res.json();
    notes = response["notes"]
  })

  function saveToDB(){
    let target = this.parentElement.parentElement;
    let targetID = parseInt(target.dataset.id);
    let noteCopy = notes[targetID];

    db.open().then(() => {
      return db.notes.add({
        pinned: noteCopy["pinned"],
        delta: noteCopy["delta"],
        html: noteCopy["html"]
      });
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
  <div id="backup-header">Backed up notes:</div>
  <div class={$darkTheme? "notes-wrapper dark-mode": "notes-wrapper"}>
    {#if notes.length > 0}
      {#each notes as note, i}
        <div class="note" data-id={i}>
          <div class="controls">
            <a href="/notes" on:click={saveToDB}>
              <img alt="Download" src="/img/cloud_down.svg">
            </a>
          </div>
          {@html note.html}
        </div>
      {/each}
    {:else}
      <div id="no-notes-text">Nothing saved yet...</div>
    {/if}
  </div>
</svelte:component>