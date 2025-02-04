import { DefaultImage } from '@/assets/images';
import AppFallbackImage from '@/components/AppFallbackImage';
import { covertMistToDec } from '@/utils/format';
import { StaticImport } from 'next/dist/shared/lib/get-img-props';

interface Props {
  token: {
    image: string | StaticImport;
    symbol: string;
    tokenName: string;
    tokenBalance: string;
    decimal: number;
    priceUSDT: string;
  };
}

const CardToken = ({ token }: Props) => {
  return (
    <div className="rounded-[8px] bg-[#272729] py-1 px-2 flex items-center justify-between">
      <div className="flex items-center gap-[6px]">
        <AppFallbackImage
          fallbackSrc={DefaultImage}
          src={token.image}
          width={32}
          height={32}
          alt={token.symbol}
          className="rounded-[8px]"
        />
        <div className="space-y-[6px]">
          <p className="text-[E7E7E9] text-[14px] leading-[20px] font-medium">
            {token.symbol}
          </p>
          <p className="text-[#908F94] text-[14px] leading-[20px] font-medium">
            {covertMistToDec(token.tokenBalance, token.decimal)}{' '}
            {token.tokenName}
          </p>
        </div>
      </div>
      <div className="space-y-[6px]">
        <p className="text-[E7E7E9] text-[14px] leading-[20px] font-medium">
          {covertMistToDec(token.tokenBalance, token.decimal)}
        </p>
        <p className="text-[#908F94] text-[14px] leading-[20px] font-medium">
          {covertMistToDec(token.tokenBalance, token.decimal)}
        </p>
      </div>
    </div>
  );
};

export default CardToken;
