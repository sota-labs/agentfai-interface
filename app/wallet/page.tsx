'use client';
import React, { useEffect, useState } from 'react';
import {
  ArrowDownIcon,
  DefaultAvatar,
  MenuDotIcon,
  OpenTabIcon,
} from '@/assets/icons';
import { AppPopover } from '@/components/AppPopover';
import CardToken from '@/components/CardToken';
import { useDisconnectWallet } from '@mysten/dapp-kit';
import { getSuiVisionExplore, truncateMiddleText } from '@/utils/helper';
import { TokenImages } from '@/assets/images/token';
import { Sui } from '@/assets/images';
import AppFallbackImage from '@/components/AppFallbackImage';
import { useWalletBalances } from '@/hooks/useBalance';
import { useAuthStore } from '@/libs/zustand/auth';
import CopyButton from '@/components/CopyButton';

const Wallet = () => {
  const [isPopoverMenu, setIsPopoverMenu] = useState(false);
  const [isPopoverToken, setIsPopoverToken] = useState(false);
  const [clientZkAddress, setClientZkAddress] = useState('');

  const { mutate: disconnect } = useDisconnectWallet();
  const { activeWallet } = useWalletBalances();
  const { zkAddress } = useAuthStore();

  useEffect(() => {
    if (zkAddress) setClientZkAddress(zkAddress);
  }, [zkAddress]);

  return (
    <div className="border border-solid border-[#3f3f46] rounded-[8px] p-[16px] max-desktop:hidden">
      {clientZkAddress && (
        <div className="flex items-center justify-between pb-[16px] border-b border-[#3f3f46] border-solid">
          <div className="flex items-center gap-1 space-x-[4px]">
            <div className="text-neutral-400">
              {truncateMiddleText(clientZkAddress || '')}
            </div>
            <div className="cursor-pointer w-[36px] h-[36px] rounded-[8px] text-[#a0faa0] flex items-center justify-center hover:bg-[#a0faa0]/25 transition-colors duration-300">
              <CopyButton text={clientZkAddress || ''} />
            </div>
            <a href={getSuiVisionExplore(clientZkAddress)} target="_blank">
              <div className="cursor-pointer w-[36px] h-[36px] rounded-[8px] text-[#a0faa0] flex items-center justify-center hover:bg-[#a0faa0]/25 transition-colors duration-300">
                <OpenTabIcon />
              </div>
            </a>
          </div>
          <div className="flex">
            <div className="px-[6px] py-[2px] bg-[#27272a] flex items-center gap-[6px] rounded-[6px]">
              <span className="text-[14px] font-medium leading-[18px]">
                0.00
              </span>
              <AppFallbackImage
                src={Sui}
                alt="sui"
                width={18}
                height={18}
                className="rounded-full my-[8px]"
                fallbackSrc={DefaultAvatar}
              />
            </div>
            <div className="flex items-center gap-[8px]">
              <AppPopover
                isOpen={isPopoverMenu}
                onToggle={(isOpen) => setIsPopoverMenu(isOpen)}
                onClose={() => setIsPopoverMenu(false)}
                trigger={
                  <div className="cursor-pointer w-[36px] h-[36px] rounded-[8px] text-[#a0faa0] flex items-center justify-center hover:bg-[#a0faa0]/25 transition-colors duration-300">
                    <MenuDotIcon />
                  </div>
                }
                position="left"
                content={
                  <>
                    <p
                      className="cursor-pointer py-[6px] px-[18px] text-[12px] leading-[18px] text-white-0 rounded-[8px] hover:bg-[#3396FF] transition-all"
                      onClick={() => disconnect()}
                    >
                      Disconnect
                    </p>
                  </>
                }
                customClassWrapper="min-w-[256px] border border-solid border-[#3f3f46] rounded-[8px] bg-[#18181A] p-[4px]"
              />
            </div>
          </div>
        </div>
      )}
      <div className="pt-[16px] space-y-[16px]">
        <AppPopover
          isOpen={isPopoverToken}
          onToggle={(isOpen) => setIsPopoverToken(isOpen)}
          onClose={() => setIsPopoverToken(false)}
          trigger={
            <div className="cursor-pointer px-[11px] py-1 rounded-[8px] inline-flex items-center gap-[8px] text-[#a0faa0]  hover:bg-[#a0faa0]/25 transition-colors duration-300">
              <span className="text-white-0 text-[16px] leading-[24px] font-bold">
                Tokens
              </span>
              <ArrowDownIcon />
            </div>
          }
          position="right"
          content={
            <>
              <p className="cursor-pointer py-[6px] px-[12px] text-[16px] leading-[24px] font-medium text-white-0 rounded-[8px] hover:bg-[#3396FF] transition-all">
                Tokens
              </p>
              {/* <p className="cursor-pointer py-[6px] px-[12px] text-[16px] leading-[24px] font-medium text-white-0 rounded-[8px] hover:bg-[#3396FF] transition-all">
                NFTs
              </p> */}
            </>
          }
          customClassWrapper="min-w-[110px] border border-solid border-[#3f3f46] rounded-[8px] bg-[#18181A] p-[4px]"
        />
        {activeWallet.coinBalances?.map((item, index) => (
          <CardToken
            key={'token ' + index}
            token={{
              image: TokenImages[item?.name?.toLocaleLowerCase()],
              symbol: item.symbol,
              tokenName: item.name,
              tokenBalance: item.balance,
              decimal: item.decimal,
              priceUSDT: '0.37',
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default Wallet;
