<script lang="ts">
  import type { Extrinsic } from "@polkadot/types/interfaces";
  import Zzz from "../assets/zzz.svelte";
  import MempoolTransaction from "./MempoolTransaction.svelte";
  import { state as appState } from "$lib/state.svelte";

  const { newTxs }: { newTxs: Array<Transaction> } = $props();

  let lastTxsInMempool = $state(new Set<String>());

  $effect(() => {
    const initialSetLength = lastTxsInMempool.size;
    newTxs.forEach(tx => {
      const hash = tx.extrinsic.hash.toString();
      lastTxsInMempool.add(hash);
    });
    if (lastTxsInMempool.size > initialSetLength) {
      lastTxsInMempool = new Set(lastTxsInMempool);
    }
  });
</script>

<style lang="scss">
  @use "../styles/global.scss" as *;

  .mempool {
    width: 100%;
    position: relative;
    overflow: hidden;
    display: grid;
    grid-template-columns: 30% 70%;
    gap: 20px;

    &.empty {
      display: flex;
      justify-content: center;
      align-items: center;
    }
    &:not(.empty) {
      display: grid;
      grid-template-columns: 30% 70%;
      gap: 20px;
    }

    .txs-list {
      display: flex;
      flex-direction: column;
      align-items: center;
      margin: 10px;

      p {
        margin: 2px;
        font-weight: 500;
        word-break: break-all;
      }
    }

    .txs-animation {
      &:not(.empty) {
        display: flex;
        justify-content: center;
        align-items: center;
      }
    }
  }
</style>

<div>
  <h3>Mempool</h3>
  <div class="mempool" class:empty={lastTxsInMempool.size === 0}>
    {#if lastTxsInMempool.size > 0}
      <div class="txs-list">
        <p>Last transactions</p>
        {#each lastTxsInMempool as tx}
          <p>{tx}</p>
        {/each}
      </div>
    {/if}
    <div class="txs-animation" class:empty={lastTxsInMempool.size === 0}>
      {#each newTxs as tx, index (tx)}
        <MempoolTransaction tx={tx.extrinsic} />
      {:else}
        <Zzz stroke={appState.theme === "light" ? "#463699" : "#fbd5bd"} />
      {/each}
    </div>
  </div>
</div>
