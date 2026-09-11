import {
  findMetadataPda,
  findMasterEditionPda,
} from "@metaplex-foundation/mpl-token-metadata";

import { createUmi } from "@metaplex-foundation/umi-bundle-defaults";
import { publicKey } from "@metaplex-foundation/umi";

const umi = createUmi("https://api.devnet.solana.com");

const collectionMint = publicKey(
  "A5AaiYvCdNLr2cpME1qtRcRAV1LA9pUn2XCrpRbMN58f"
);

const metadata = findMetadataPda(umi, {
  mint: collectionMint,
});

const masterEdition = findMasterEditionPda(umi, {
  mint: collectionMint,
});

console.log("Collection Mint:", collectionMint);
console.log("Collection Metadata:", metadata[0]);
console.log("Collection Master Edition:", masterEdition[0]);

console.log(
  "Metadata account:",
  await umi.rpc.getAccount(metadata[0])
);

console.log(
  "Master Edition account:",
  await umi.rpc.getAccount(masterEdition[0])
);
