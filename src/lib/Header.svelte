<script lang="ts">
  import Sun from "../assets/sun.svelte";
  import Moon from "../assets/moon.svelte";
  import { state } from "$lib/state.svelte";

  const onclick = () =>
    (state.theme = state.theme === "light" ? "dark" : "light");
</script>

<style lang="scss">
  header {
    display: grid;
    grid-template-columns: 1fr 2fr 1fr;

    .right {
      display: flex;
      justify-content: flex-end;
      align-items: center;
      margin-right: 20px;

      button {
        border: none;
        background: none;
        cursor: pointer;
      }
    }
  }
</style>

<header>
  <div>&nbsp;</div>
  <div>&nbsp;</div>
  <div class="right">
    <button {onclick}>
      {#if state.theme === "light"}
        <Moon />
      {:else}
        <Sun />
      {/if}
    </button>
  </div>
</header>
