<script>
  import '$lib/css/quill.snow.css';
  import main from '$lib/svelte/main.svelte';
  import { onMount } from "svelte";
  import { db } from "$lib/js/db.js";

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
  });

  async function saveNote(){
    db.open().then(() => {
      return db.notes.add({
        pinned:false,
        delta: quill.getContents(),
        html: quill.root.innerHTML
      });
    })
  }
</script>


<style>
  #editor-wrapper{
    width: 70%;
    height: 60%;
    margin-top: 20px;
    border-radius: 8px;
    overflow: hidden;
    border: 1px solid gray;
    background-color: aliceblue;
  }

  #save-btn{
    padding: 8px;
    margin: 20px;
    border: none;
    border-radius: 8px;
    font-size: 28px;
    color: hsl(180, 100%, 95%);
    background-color: hsl(200, 100%, 50%);
  }
  
  #save-btn:hover{
      background-color: hsl(200, 100%, 45%);
  }
  #save-btn:active{
      background-color: hsl(200, 100%, 40%);
  }
</style>


<svelte:component this={main}>
  <div id="editor-wrapper">
    <div bind:this={editor}/>
  </div>
  <button id="save-btn" on:click={saveNote}>Save</button>
</svelte:component>