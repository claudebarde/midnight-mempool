<script lang="ts">
  import type { Extrinsic } from "@polkadot/types/interfaces";
  import Zzz from "../assets/zzz.svelte";

  //   export let newTxs: Array<String>;
  export let newTxs: Array<Transaction>;
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

    .transaction {
      position: relative; // Position the element relative to the container
      animation: slide-out 3s ease-in forwards;

      img {
        width: 30px;
        height: 30px;
      }
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

<div>
  <h3>Mempool</h3>
  <div class="mempool" class:empty={newTxs.length === 0}>
    {#if newTxs.length > 0}
      <div class="txs-list">
        <p>Transaction hash</p>
        {#each newTxs as tx (tx.extrinsic.hash)}
          <p>{tx.extrinsic.hash}</p>
        {/each}
      </div>
    {/if}
    <div class="txs-animation">
      {#each newTxs as tx, index (tx)}
        <div class="transaction">
          <img src="midnight-symbol.png" alt="midnight-icon" />
        </div>
      {:else}
        <Zzz stroke="#463699" />
      {/each}
    </div>
  </div>
</div>
