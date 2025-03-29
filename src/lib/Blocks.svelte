<script lang="ts">
  import type { SignedBlock } from "@polkadot/types/interfaces";
  import Cube from "../assets/cube.svelte";
  import { state } from "$lib/state.svelte";
  import { shortenHash } from "$lib/utils";

  export let blocks: Array<SignedBlock>;

  const getBlockHash = (block: SignedBlock) => {
    return block.block.header.hash.toHex();
  };

  const getBlockTxs = (block: SignedBlock) => {
    return block.block.extrinsics.length;
  };
</script>

<style lang="scss">
  @use "../styles/global.scss" as *;

  .blocks-display {
    width: 100%;
    position: relative;
    overflow: hidden;
    display: grid;
    grid-template-columns: 30% 70%;
    gap: 20px;

    .blocks-details {
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

    .blocks {
      display: flex;
      flex-wrap: wrap;
      gap: 10px;
      justify-content: flex-start;

      .block {
        display: flex;
        flex-direction: column;
        align-items: center;
        margin: 10px;

        &.current-block {
          -webkit-animation: slide-in-right 0.5s
            cubic-bezier(0.25, 0.46, 0.45, 0.94) both;
          animation: slide-in-right 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94)
            both;
        }

        p {
          margin: 2px;
          font-weight: bold;
        }
      }
    }
  }
</style>

<div>
  <h3>Blocks</h3>
  <div class="blocks-display">
    <div class="blocks-details">
      <p>Current block</p>
      <p>{shortenHash(getBlockHash(blocks[blocks.length - 1]))}</p>
      <p>{getBlockTxs(blocks[blocks.length - 1])} transaction(s)</p>
    </div>
    <div class="blocks">
      {#each blocks as block, index (block.hash)}
        {#if index + 1 == blocks.length}
          <div class="block current-block">
            <p>{block.block.header.number}</p>
            <Cube stroke={state.theme === "light" ? "#463699" : "#fbd5bd"} />
            <p>&nbsp;</p>
          </div>
        {:else}
          <div class="block">
            <p>&nbsp;</p>
            <Cube stroke={state.theme === "light" ? "#463699" : "#fbd5bd"} />
            <p>{block.block.header.number}</p>
          </div>
        {/if}
      {/each}
    </div>
  </div>
</div>
