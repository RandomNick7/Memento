<script>
  import '$lib/css/quill.snow.css';
  import '$lib/css/notes.css';
  import main from '$lib/svelte/main.svelte';
  import { db } from "$lib/js/db";
  import { liveQuery } from "dexie";

  let notes = liveQuery(
    () => db.notes.toArray()
  );

  function pinToTop(){
    let target = this.parentElement.parentElement;
    let img = this.children[0];
    let currentOrder = target.style.order;
    let defaultOrder = target.dataset.id;
    if(currentOrder >= 0){
      target.style.order = -1;
      img.src = '/img/pin_dark.svg';
    }else{
      target.style.order = defaultOrder;
      img.src = '/img/pin.svg';
    }
  }

  function deleteNote(){
    async function deleteEntry(id){
      db.notes.where('id').equals(id).delete();
    }

    let target = this.parentElement.parentElement;
    deleteEntry(parseInt(target.dataset.id));
  }

</script>

<svelte:component this={main}>
  <div id="notes-wrapper">
    {#if $notes}
      {#if $notes.length > 0}
        {#each $notes as note (note.id)}
          <div class="note" data-id={note.id} style="order:{note.id}">
            <div class="controls">
              <button on:click={pinToTop}>
                <img alt="Pin" src="/img/pin.svg">
              </button>
              <button>
                <img alt="Edit" src="/img/edit_pencil.svg">
              </button>
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