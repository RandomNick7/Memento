<script>
  import '$lib/css/quill.snow.css';
  import { onMount } from "svelte";

  let editor;
    
    export let toolbarOptions = [
      [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
      [{ 'size': ['small', false, 'large', 'huge'] }],  // custom dropdown
      [{ 'font': [] }],

      ['bold', 'italic', 'underline', 'strike'],        // toggled buttons
      ['blockquote', 'code-block'],

      [{ 'list': 'ordered'}, { 'list': 'bullet' }, { 'list': 'check' }],
      [{ 'script': 'sub'}, { 'script': 'super' }],      // superscript/subscript
      [{ 'indent': '-1'}, { 'indent': '+1' }],          // outdent/indent


      [{ 'color': [] }, { 'background': [] }],          // dropdown with defaults from theme
      [{ 'align': [] }],

      ['clean']                                        // remove formatting button
    ];

  onMount(async () => {
      const { default: Quill } = await import("quill");
      let quill = new Quill(editor, {
        modules: {
          toolbar: toolbarOptions
        },
        theme: "snow",
        placeholder: ""
      });
  });
</script>
  
<style>
  #editor-wrapper{
    width: 70%;
    height: 400px;
    margin-top: 20px;
    border-radius: 8px;
    overflow: hidden;
    border: 1px solid gray;
    background-color: aliceblue;
  }

  #main-section{
    width: 100%;
    height: calc(100vh - 44px);
    margin-top: -12px;
    display: flex;
    justify-content: center;
    background-image: linear-gradient(120deg, hsl(180, 100%, 92.5%),hsl(220, 100%, 92.5%));
  }
</style>

<div id="main-section">
  <div id="editor-wrapper">
    <div bind:this={editor}/>
  </div>
</div>