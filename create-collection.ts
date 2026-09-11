import { createNft, mplTokenMetadata } from '@metaplex-foundation/mpl-token-metadata';
import { airdropIfRequired,getExplorerLink,getKeypairFromFile } from '@solana-developers/helpers';
import { createUmi } from '@metaplex-foundation/umi-bundle-defaults';
import {clusterApiUrl, Connection,LAMPORTS_PER_SOL,PublicKey } from "@solana/web3.js"
import { generateSigner, keypairIdentity, percentAmount, publicKey } from '@metaplex-foundation/umi';

const connection = new Connection(clusterApiUrl('devnet'));

const user = await getKeypairFromFile();

await airdropIfRequired(connection,user.publicKey,1*LAMPORTS_PER_SOL,0.5*LAMPORTS_PER_SOL);

console.log("loaded user",user.publicKey);

const umi = createUmi(connection.rpcEndpoint);
umi.use(mplTokenMetadata());

const umiUser = umi.eddsa.createKeypairFromSecretKey(user.secretKey);

umi.use(keypairIdentity(umiUser));

console.log("set up umi instance for user");

console.log(`Creating NFT...`);

const collectionMint = generateSigner(umi);


const transaction = await createNft(umi,{
    mint: collectionMint,
    name:"my nft",
    symbol:"MF",
    uri:"https://raw.githubusercontent.com/hasanabushamla2/web3-5/refs/heads/main/nft.json",
    sellerFeeBasisPoints: percentAmount(0),
    isCollection: true,
});

try {
  await transaction.sendAndConfirm(umi);
  console.log("NFT transaction confirmed");
} catch (e) {
  console.error("CREATE NFT ERROR:", e);
  process.exit(1);
}

console.log(
  `created collection ! address: ${getExplorerLink(
    "address",
    collectionMint.publicKey,
    "devnet"
  )}`
);