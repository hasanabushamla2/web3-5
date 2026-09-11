import { createUmi } from "@metaplex-foundation/umi-bundle-defaults";
import { publicKey } from "@metaplex-foundation/umi";
import { fetchMetadataFromSeeds } from "@metaplex-foundation/mpl-token-metadata";

const umi = createUmi("https://api.devnet.solana.com");

const nft = publicKey("4KdXgchu4AF4uvbyMwa9fUsPjFbZQ1iXjgPoXwjULgJs");
const collection = publicKey("A5AaiYvCdNLr2cpME1qtRcRAV1LA9pUn2XCrpRbMN58f");

const nftData = await fetchMetadataFromSeeds(umi, { mint: nft });
const collectionData = await fetchMetadataFromSeeds(umi, { mint: collection });

console.log("NFT Update Authority:", nftData.updateAuthority.toString());
console.log("NFT Collection:", nftData.collection);
console.log("Collection Update Authority:", collectionData.updateAuthority.toString());
console.log("Wallet:", "CW8uyTNrCpGimsdQ2otzvhgVBGxDuf5KR4sMqXD26wVu");
