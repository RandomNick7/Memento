<script>
  import "$lib/css/quill.snow.css";
  import "$lib/css/notes.css";
  import main from "$lib/svelte/main.svelte";
  import { db } from "$lib/js/db";
  import { liveQuery } from "dexie";
  import { targetID, darkTheme } from "$lib/js/stores.js";

  let notes = liveQuery(
    () => db.notes.toArray()
  );

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
  <div class={$darkTheme? "notes-wrapper dark-mode": "notes-wrapper"}>
    {#if $notes}
      {#if $notes.length > 0}
        {#each $notes as note}
          <div class="note" data-id={note.id} style="order:{note.pinned? -1 : note.id}">
            <div class="controls">
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