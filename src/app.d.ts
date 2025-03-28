// See https://svelte.dev/docs/kit/types#app.d.ts
// for information about these interfaces
declare global {
  namespace App {
    // interface Error {}
    // interface Locals {}
    // interface PageData {}
    // interface PageState {}
    // interface Platform {}
  }
  interface Transaction {
    counter: number;
    extrinsic: Extrinsic;
  }
  type TxType = "transfer" | "other";
  type Theme = "light" | "dark";
  type State = {
    theme: Theme;
  };
}

export {};
