<script lang="ts">
  import { onMount, onDestroy } from "svelte";
  import type {
    Header,
    SignedBlock,
    Extrinsic
  } from "@polkadot/types/interfaces";
  import { ApiPromise, WsProvider } from "@polkadot/api";
  import Blocks from "$lib/Blocks.svelte";
  import Mempool from "$lib/Mempool.svelte";

  let chainName: String | undefined = $state(undefined);
  let nodeName: String | undefined = $state(undefined);
  let nodeVersion: String | undefined = $state(undefined);
  let currentBlock: SignedBlock | undefined = $state(undefined);
  let unsubBlockNumber: any, unsubNewTxs: any;
  let blocks: Array<SignedBlock> = $state([]);
  let counter = $state(0);
  let newTxs: Array<Transaction> = $state([]);
  const numberOfBlocks = 7;

  const setUp = async () => {
    // Construct provider that connects the testnet-02 node WS url
    const wsProvider = new WsProvider("wss://rpc.testnet-02.midnight.network");
    const api = await ApiPromise.create({ provider: wsProvider });

    // Retrieve the chain & node information via rpc calls
    const [chain, name, version] = await Promise.all([
      api.rpc.system.chain(),
      api.rpc.system.name(),
      api.rpc.system.version()
    ]);
    chainName = chain.toString();
    nodeName = name.toString();
    nodeVersion = version.toString();

    // Retrieve the current block number
    unsubBlockNumber = await api.rpc.chain.subscribeNewHeads(
      async (header: Header) => {
        currentBlock = await api.rpc.chain.getBlock(header.hash);
        // console.log(currentBlock.toHuman());
        if (blocks.length < numberOfBlocks) {
          blocks = [...blocks, currentBlock];
        } else {
          blocks = [...blocks.slice(1, numberOfBlocks), currentBlock];
        }
      }
    );

    //   Create unsub function if you want to call it manually later - also call the pendingExtrinsics rpc method to get extrinsics in the tx pool
    const seenHashes = new Set();
    unsubNewTxs = setInterval(async () => {
      try {
        const extrinsics = await api.rpc.author.pendingExtrinsics();
        counter++;
        // newTxs = [`test-${counter}`];
        if (extrinsics.isEmpty) {
          console.log("No pending extrinsics");
          return;
        }
        // some extrinsics are duplicate, for a yet unknown reason
        const uniqueExtrinsics = extrinsics.filter(extrinsic => {
          const hash = extrinsic.hash.toString();
          if (seenHashes.has(hash)) {
            return false; // Skip duplicates
          }
          seenHashes.add(hash); // Add unique hash to the Set
          return true; // Keep unique extrinsic
        });
        uniqueExtrinsics.forEach((extrinsic, index) => {
          console.log(`Extrinsic meta:`, extrinsic.meta.toHuman());
          newTxs = [...newTxs, { counter, extrinsic }];
          const currentCounter = counter;
          setTimeout(() => {
            // Remove the extrinsic from the newTxs array after 5 seconds
            newTxs = [...newTxs.filter(tx => tx.counter !== currentCounter)];
          }, 5000000);
          counter++;
          // Option 1: Convert the extrinsic to a human-readable format.
          const human = extrinsic.toHuman();
          console.log(`Extrinsic #${index}:`, human);
          console.log(`Signer: ${extrinsic.signer.toString()}`);
        });
      } catch (error) {
        console.error("Error fetching pending extrinsics", error);
      }
    }, 1000);
  };

  onMount(async () => {
    await setUp();
  });

  onDestroy(() => {
    if (unsubBlockNumber) {
      unsubBlockNumber();
    }
    if (unsubNewTxs) {
      clearInterval(unsubNewTxs);
    }
  });
</script>

<style lang="scss">
  @use "../styles/global.scss" as *;

  main {
    padding: 10px;
    height: calc(100% - 20px);
    width: calc(100% - 20px);
  }
</style>

<main>
  <h1>Welcome to the Midnight mempool</h1>
  {#if chainName && nodeName && nodeVersion}
    <p style="text-align: center;">
      You are connected to the <strong>{chainName}</strong> chain, running on
      the{" "}
      <strong>{nodeName}</strong>, version <strong>{nodeVersion}</strong>.
    </p>
  {/if}
  {#if blocks.length > 0}
    <Blocks {blocks} />
  {/if}
  <Mempool {newTxs} />
</main>
