<script>
  import '$lib/css/quill.snow.css';
  import '$lib/css/editor.css';
  import main from '$lib/svelte/main.svelte';
  import { onMount } from "svelte";
  import { db } from "$lib/js/db.js";
  import { targetID, darkTheme } from "$lib/js/stores.js";

  let textID;
  let quill, editor;

  export let toolbarOptions = [
    [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
    [{ 'size': ['small', false, 'large', 'huge'] }],
    [{ 'font': [] }],

    ['bold', 'italic', 'underline', 'strike', 'clean'],
    ['blockquote', 'code-block'],

    [{ 'list': 'ordered'}, { 'list': 'bullet' }, { 'list': 'check' }],
    [{ 'script': 'sub'}, { 'script': 'super' }],
    [{ 'indent': '-1'}, { 'indent': '+1' }],


    [{ 'color': [] }, { 'background': [] }],
    [{ 'align': [] }],
  ];

  onMount(async () => {
    const { default: Quill } = await import("quill");

    quill = new Quill(editor, {
      modules: {
        toolbar: toolbarOptions
      },
      theme: "snow",
      placeholder: ""
    });

    targetID.subscribe((value) => {
      textID = value;
    });

    if(textID > 0){
      let dbNoteData = await db.notes.where('id').equals(textID).toArray();
      if(dbNoteData.length > 0){
        quill.setContents(dbNoteData[0].delta);
      }else{
        targetID.set(0);
      }
    }
  });

  async function saveNote(){
      db.open().then(() => {
        if(textID > 0){
          return db.notes.update(textID, {
            delta: quill.getContents(),
            html: quill.getSemanticHTML()
          });
        }else{
          return db.notes.add({
            pinned: false,
            delta: quill.getContents(),
            html: quill.getSemanticHTML()
          });
        }
      }).then(() => {
        quill.deleteText(0,quill.getLength());
        targetID.set(0);
      })
  }
</script>

<svelte:component this={main}>
  <div class={$darkTheme? "editor-wrapper dark-mode":"editor-wrapper"}>
    <div bind:this={editor}/>
  </div>
  <a href="/notes" id="save-btn" on:click={saveNote}>Save</a>
</svelte:component>