<script>
  import '$lib/css/quill.snow.css';
  import '$lib/css/editor.css';
  import main from '$lib/svelte/main.svelte';
  import { onMount } from "svelte";
  import { db } from "$lib/js/db.js";
  import { targetID } from "$lib/js/stores.js";

  let editor;
  let quill;
    
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

    let textID 
    targetID.subscribe((value) => {
      textID = value;
    });

    if(textID > 0){
      let dbNoteData = await db.notes.where('id').equals(textID).toArray();
      quill.setContents(dbNoteData[0].delta)
      console.log(dbNoteData[0].delta);
    }
  });

  async function saveNote(){
    db.open().then(() => {
      return db.notes.add({
        pinned: false,
        delta: quill.getContents(),
        html: quill.root.innerHTML
      });
    })
  }
</script>

<svelte:component this={main}>
  <div id="editor-wrapper">
    <div bind:this={editor}/>
  </div>
  <button id="save-btn" on:click={saveNote}>Save</button>
</svelte:component>