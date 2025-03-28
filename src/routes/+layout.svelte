<script lang="ts">
  import Header from "$lib/Header.svelte";
  import { state } from "$lib/state.svelte";

  let { children } = $props();
</script>

<style lang="scss">
  @use "../styles/global.scss" as *;

  :global(html, body) {
    height: 100vh;
    width: 100vw;
    margin: 0;
    padding: 0;
  }

  main {
    height: 100vh;
    width: 100vw;
    display: grid;
    grid-template-rows: 5% 95%;
    font-family: "Outfit", sans-serif;
    font-optical-sizing: auto;
    font-weight: 200;
    font-style: normal;

    &.light {
      background-color: $silver-bird;
      color: $cold-steel;
    }

    &.dark {
      background-color: $cold-steel;
      color: $silver-bird;
    }
  }
</style>

<main class:dark={state.theme === "dark"} class:light={state.theme === "light"}>
  <Header />
  {@render children()}
</main>
