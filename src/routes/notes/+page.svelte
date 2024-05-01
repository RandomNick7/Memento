<script>
  import '$lib/css/quill.snow.css';
  import '$lib/css/notes.css';
  import main from '$lib/svelte/main.svelte';
  import { db } from "$lib/js/db";
  import { liveQuery } from "dexie";

  let notes = liveQuery(
    () => db.notes.toArray()
  );

</script>

<svelte:component this={main}>
  <div id="notes-wrapper">
    {#if $notes}
      {#if $notes.length > 0}
        {#each $notes as note (note.id)}
          <div class="note">
            <div class="controls">
              <div>
                <img alt="Pin" src="/img/pin.svg">
              </div>
              <div>
                <img alt="Edit" src="/img/edit_pencil.svg">
              </div>
              <div>
                <img alt="Delete" src="/img/trash_bin.svg">
              </div>
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