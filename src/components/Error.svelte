<script lang='ts'>
    export let status:number;
    export let msg:string;

</script>

<section role="alert">
    <div class="bg-red-500 text-white font-bold rounded-t px-4 py-2">
      {status}
    </div>
    <div class="border border-t-0 border-red-400 rounded-b bg-red-100 px-4 py-3 text-red-700">
      <p>{msg}</p>
    </div>
  </section>