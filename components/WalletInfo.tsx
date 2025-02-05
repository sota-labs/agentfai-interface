'use client';
import React, { useState } from 'react';
import { ArrowDownIcon } from '@/assets/icons';
import { AppPopover } from '@/components/AppPopover';
import CardToken from '@/components/CardToken';
import { ConnectButton } from '@mysten/dapp-kit';
import { useCurrentAccount } from '@mysten/dapp-kit';
import { TokenImages } from '@/assets/images/token';
import moment from 'moment';
import { useWalletBalances } from '@/hooks/useBalance';

const WalletInfo = () => {
  const [isPopoverToken, setIsPopoverToken] = useState(false);
  const { activeWallet } = useWalletBalances();
  const account = useCurrentAccount();

  return (
    <div className="border border-solid border-[#3f3f46] rounded-[8px] p-[16px] max-desktop:hidden">
      {account ? (
        <>
          <div className="flex items-center justify-between pb-[16px] border-b border-[#3f3f46] border-solid">
            <p className="text-[16px] leading-[32px] font-semibold text-white-0">
              Thread from {moment().format('MM/DD')}
            </p>
            <div className="flex gap-[4x]">
              <div className="space-y-[16px]">
                <AppPopover
                  isOpen={isPopoverToken}
                  onToggle={(isOpen) => setIsPopoverToken(isOpen)}
                  onClose={() => setIsPopoverToken(false)}
                  trigger={
                    <div className="cursor-pointer px-[8px] py-1 rounded-[8px] inline-flex items-center gap-[8px] text-[#a0faa0]  hover:bg-[#a0faa0]/25 transition-colors duration-300">
                      <span className="text-white-0 text-[14px] leading-[24px] font-bold">
                        Tokens
                      </span>
                      <ArrowDownIcon />
                    </div>
                  }
                  position="right"
                  content={
                    <>
                      <p className="cursor-pointer py-[6px] px-[8px] text-[14px] leading-[24px] font-medium text-white-0 rounded-[8px] hover:bg-[#3396FF] transition-all">
                        Tokens
                      </p>
                      {/* <p className="cursor-pointer py-[6px] px-[12px] text-[16px] leading-[24px] font-medium text-white-0 rounded-[8px] hover:bg-[#3396FF] transition-all">
                NFTs
              </p> */}
                    </>
                  }
                  customClassWrapper="min-w-[110px] border border-solid border-[#3f3f46] rounded-[8px] bg-[#18181A] p-[4px]"
                />
              </div>
            </div>
          </div>
          <div className="pt-[16px] space-y-[16px]">
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
        </>
      ) : (
        <div className="flex justify-center">
          <ConnectButton
            style={{
              background: '#a0faa0',
              color: '#08090C',
              padding: '8px',
              fontSize: '12px',
              borderRadius: '6px',
            }}
          />
        </div>
      )}
    </div>
  );
};

export default React.memo(WalletInfo);
