import { formatNumber } from '@/utils/format';
import BigNumber from 'bignumber.js';

const AppNumberForUSD = ({
  value,
  className = '',
}: {
  value: number | BigNumber | string;
  className?: string;
}) => {
  const bigValue = new BigNumber(value);
  const isNegative = bigValue.isLessThan(0);
  const absValue = bigValue.abs();

  if (absValue.isGreaterThan(1)) {
    return (
      <div className={className} title={formatNumber(value, 2)}>
        {isNegative ? '-' : ''}${formatNumber(absValue, 2)}
      </div>
    );
  }

  const numStr = absValue.toExponential();
  const exponent = parseInt(numStr.split('e-')[1]);

  if (Number(exponent) >= 1 && Number(exponent) <= 3) {
    return (
      <div title={formatNumber(value, 2)} className={className}>
        {isNegative ? '-' : ''}${formatNumber(absValue, exponent - 1 + 4)}
      </div>
    );
  }

  if (Number(exponent) > 3) {
    const significantDigits = absValue
      .toFixed()
      .toString()
      .replace(/0+\.0*/, '');

    return (
      <div className={`flex ${className}`} title={formatNumber(value)}>
        {isNegative ? '-' : ''}$0.0
        <div className={`text-[10px] mt-1 ${className}`}>{exponent - 1}</div>
        <div className={className}>{significantDigits.slice(0, 4)}</div>
      </div>
    );
  }

  return (
    <div className={className} title={formatNumber(value, 4)}>
      {isNegative ? '-' : ''}${formatNumber(absValue, 4)}
    </div>
  );
};

export const AppNumber = ({
  value,
  decimals = 4,
  isForUSD = false,
  className = '',
}: {
  value: number | BigNumber | string | undefined;
  decimals?: number;
  isForUSD?: boolean;
  className?: string;
}) => {
  if (
    !value ||
    new BigNumber(value || 0).isZero() ||
    new BigNumber(value).isNaN()
  ) {
    return <>--</>;
  }

  if (isForUSD) {
    return <AppNumberForUSD value={value} className={className} />;
  }

  const bigValue = new BigNumber(value);
  const isNegative = bigValue.isLessThan(0);
  const absValue = bigValue.abs();
  const numStr = absValue.toExponential();
  const exponent = parseInt(numStr.split('e-')[1]);

  if (Number(exponent) >= 1 && Number(exponent) <= 3) {
    return (
      <div title={formatNumber(value, decimals)} className={className}>
        {isNegative ? '-' : ''}
        {formatNumber(absValue, exponent - 1 + 4)}
      </div>
    );
  }

  if (Number(exponent) > 3) {
    const significantDigits = absValue
      .toFixed()
      .toString()
      .replace(/0+\.0*/, '');

    return (
      <div
        className={`flex ${className}`}
        title={formatNumber(value, decimals)}
      >
        {isNegative ? '-' : ''}0.0
        <div className={`text-[10px] mt-1 ${className}`}>{exponent - 1}</div>
        <div className={className}>{significantDigits.slice(0, 4)}</div>
      </div>
    );
  }

  return (
    <div title={formatNumber(value, decimals)} className={className}>
      {isNegative ? '-' : ''}
      {formatNumber(absValue, decimals > 4 ? 4 : decimals)}
    </div>
  );
};
