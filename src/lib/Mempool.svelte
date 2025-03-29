<script lang="ts">
  import Zzz from "../assets/zzz.svelte";
  import MempoolTransaction from "./MempoolTransaction.svelte";
  import { state as appState } from "$lib/state.svelte";
  import { getTxType, shortenHash } from "$lib/utils";

  const { newTxs }: { newTxs: Array<Transaction> } = $props();

  const archivedTxs = new Set<{ hash: string; type: TxType }>();
  const lastTxsInMempool = $derived.by(() => {
    let txs = Array.from(archivedTxs).reverse().slice(0, 7);
    newTxs.forEach(tx => {
      const txToSave = {
        hash: tx.extrinsic.hash.toString(),
        type: getTxType(tx.extrinsic)
      };
      // Only add to txs if it is not already in archivedTxs
      if (
        ![...archivedTxs].some(existingTx => existingTx.hash === txToSave.hash)
      ) {
        archivedTxs.add(txToSave);
        txs = [txToSave, ...txs];
      }
    });
    console.log({ txs });
    return txs;
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
      justify-content: center;
      align-items: flex-start;
      margin: 10px;
      padding-left: 30px;

      p {
        margin: 2px;
        font-weight: 500;
        word-break: break-all;
      }

      .last-tx {
        display: flex;
        justify-content: center;
        align-items: center;
        gap: 10px;
        padding: 3px;

        img {
          width: 30px;
          height: 30px;
        }
      }
    }

    .txs-animation {
      //   &:not(.empty) {
      //     display: flex;
      //     justify-content: center;
      //     align-items: center;
      //   }
    }
  }
</style>

<div>
  <h3>Mempool</h3>
  <div class="mempool" class:empty={lastTxsInMempool.length === 0}>
    {#if lastTxsInMempool.length > 0}
      <div class="txs-list">
        <p>Last transactions</p>
        {#each lastTxsInMempool as tx (tx.hash)}
          <div class="last-tx">
            {#if tx.type === "transfer"}
              <img src="dust-icon.png" alt="dust-icon" />
            {:else if tx.type === "other"}
              <img src="midnight-symbol.png" alt="midnight-icon" />
            {/if}
            {shortenHash(tx.hash)}
          </div>
        {/each}
      </div>
    {/if}
    <div class="txs-animation" class:empty={lastTxsInMempool.length === 0}>
      {#each newTxs as tx, index (tx)}
        <MempoolTransaction tx={tx.extrinsic} />
      {:else}
        <Zzz stroke={appState.theme === "light" ? "#463699" : "#fbd5bd"} />
      {/each}
    </div>
  </div>
</div>
