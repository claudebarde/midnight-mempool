<script lang="ts">
  import { onMount } from "svelte";
  import type { Extrinsic } from "@polkadot/types/interfaces";
  let { tx }: { tx: Extrinsic } = $props();
  import { getTxType } from "$lib/utils";

  let txType = $state("other");

  onMount(() => {
    txType = getTxType(tx);
  });
</script>

<style lang="scss">
  @use "../styles/global.scss" as *;

  .transaction {
    position: relative; // Position the element relative to the container
    animation: slide-out 3s ease-in forwards;
    padding: 3px;

    img {
      width: 30px;
      height: 30px;
    }
  }

  @keyframes slide-out {
    0% {
      transform: translateX(-10%);
      opacity: 1;
    }
    80% {
      transform: translateX(100%);
      opacity: 1;
    }
    100% {
      transform: translateX(110%);
      opacity: 0;
    }
  }
</style>

<div class="transaction">
  {#if txType === "transfer"}
    <img src="dust-icon.png" alt="dust-icon" />
  {:else}
    <img src="midnight-symbol.png" alt="midnight-icon" />
  {/if}
</div>
