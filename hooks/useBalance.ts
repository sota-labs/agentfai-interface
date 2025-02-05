import { useEffect } from 'react';
import { useUserWallet } from '@/libs/zustand/wallet';
import { fetchCoinBalances } from '@/utils/sui';
import { useCurrentAccount } from '@mysten/dapp-kit';

export const useWalletBalances = () => {
  const { activeWallet, userAddresses, setUserAddresses, setActiveWalletData } =
    useUserWallet();
  const account = useCurrentAccount();

  const getBalances = async (activeWalletAddress: string) => {
    try {
      const balances = await fetchCoinBalances(activeWalletAddress);
      setActiveWalletData({
        address: activeWalletAddress,
        coinBalances: balances,
      });
    } catch (err) {
      console.log(`fetch coins balances of address ${activeWallet} error`, err);
    }
  };

  useEffect(() => {
    if (!userAddresses.length) return;

    getBalances(userAddresses[0]);
    const getBalanceInterval = setInterval(() => {
      getBalances(userAddresses[0]);
    }, 15000);

    return () => clearInterval(getBalanceInterval);
  }, [userAddresses]);

  useEffect(() => {
    if (!account?.address) return;

    if (userAddresses.includes(account.address.toLowerCase())) return;

    setUserAddresses(account.address);
  }, [account]);

  return { activeWallet, getBalances };
};
