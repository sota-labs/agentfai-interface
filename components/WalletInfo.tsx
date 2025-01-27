'use client';
import { LogoSui } from '@/assets/images';
import {
  ArrowDownIcon,
  CopyIcon,
  DefaultAvatar,
  MenuDotIcon,
  OpenTabIcon,
} from '@/assets/icons';
import AppFallbackImage from '@/components/AppFallbackImage';
import { AppPopover } from '@/components/AppPopover';
import CardToken from '@/components/CardToken';
import React, { useState } from 'react';

const WalletInfo = () => {
  const [isPopoverMenu, setIsPopoverMenu] = useState(false);
  const [isPopoverToken, setIsPopoverToken] = useState(false);
  return (
    <div className="border border-solid border-[#3f3f46] rounded-[8px] p-[16px] max-desktop:hidden">
      <div className="flex items-center justify-between pb-[16px] border-b border-[#3f3f46] border-solid">
        <div className="flex items-center gap-1 space-x-[4px]">
          <span className="text-neutral-400">4jkgTU</span>
          <div className="cursor-pointer w-[36px] h-[36px] rounded-[8px] text-[#a0faa0] flex items-center justify-center hover:bg-[#a0faa0]/25 transition-colors duration-300">
            <CopyIcon />
          </div>
          <div className="cursor-pointer w-[36px] h-[36px] rounded-[8px] text-[#a0faa0] flex items-center justify-center hover:bg-[#a0faa0]/25 transition-colors duration-300">
            <OpenTabIcon />
          </div>
        </div>
        <div className="flex items-center gap-[8px]">
          <div className="px-[6px] py-[2px] bg-[#27272a] flex items-center gap-[6px] rounded-[6px]">
            <span className="text-[16px] font-semibold leading-[24px]">
              0.00
            </span>
            <AppFallbackImage
              src={LogoSui}
              alt="solana"
              width={24}
              height={24}
              className="rounded-full my-[8px]"
              fallbackSrc={DefaultAvatar}
            />
          </div>
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
                <p className="cursor-pointer py-[6px] px-[24px] text-[16px] leading-[24px] font-medium text-white-0 rounded-[8px] hover:bg-[#3396FF] transition-all">
                  Revoke
                </p>
                <p className="cursor-pointer py-[6px] px-[24px] text-[16px] leading-[24px] font-medium text-white-0 rounded-[8px] hover:bg-[#3396FF] transition-all">
                  Export
                </p>
              </>
            }
            customClassWrapper="min-w-[256px] border border-solid border-[#3f3f46] rounded-[8px] bg-[#18181A] p-[4px]"
          />
        </div>
      </div>
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
              <p className="cursor-pointer py-[6px] px-[12px] text-[16px] leading-[24px] font-medium text-white-0 rounded-[8px] hover:bg-[#3396FF] transition-all">
                NFTs
              </p>
            </>
          }
          customClassWrapper="min-w-[110px] border border-solid border-[#3f3f46] rounded-[8px] bg-[#18181A] p-[4px]"
        />
        <CardToken
          token={{
            image: '',
            title: 'Ethereum',
            tokenName: 'ETH',
            priceToken: '0.37',
            priceUSDT: '0.37',
          }}
        />
      </div>
    </div>
  );
};

export default React.memo(WalletInfo);
