import { ConnectWallet, useConnect, useActiveListings, useContract, MediaRenderer } from "@thirdweb-dev/react";
import type { NextPage } from "next";
import styles from "../styles/Home.module.css";
import { BigNumber } from "ethers";

const Home: NextPage = () => {
  const { contract } = useContract("", "marketplace")

  const { data: nfts, isLoading } = useActiveListings(contract);

  return (
    <div>
    <div className={styles.header}>
  <h1>Mumbai Marketplace</h1>
  <ConnectWallet/>
  </div>
  <main className={styles.main}>
    {!isLoading ? (
      <div className={styles.cardContainer}>
        {nfts && nfts.map((nft) => {
          return(
            <div key={nft.id} className={styles.card}>
              <MediaRenderer 
                src={nft.asset.image}
                height="200px"
                width="200px"
              />
              <p className={styles.cardTitle}>{nft.asset.name}</p> 
              <p className={styles.cardPrice}>Price: {nft.buyoutCurrencyValuePerToken.displayValue} MATIC</p> 
              <button
                className={styles.cardButton}
                onClick={async () => {
                  try {
                    await contract?.buyoutListing(BigNumber.from(nft.id), 1);
                  } catch (error) {
                    console.log(error);
                    alert(error);
                  }
                }}
              >
                Buy Now
              </button>
            </div>
          );
        })}
      </div>
    ) : (
      <div>Loading...</div>
    )}
  </main>
  
  <div className={styles.container}>
        <p>&copy; 2023 NFTs. All Rights Reserved.</p>
      
        <a href="https://twitter.com/2001Anuk" target="_blank">Contact Us</a>
        </div>


 
  </div>

  );
};

export default Home;



