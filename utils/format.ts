import config from '@/config';
import { DECIMAL_FUNDRAISE_GOAL, SI } from '@/constants';
import { getFullnodeUrl, SuiClient } from '@mysten/sui/client';
import BigNumber from 'bignumber.js';
import commaNumber from 'comma-number';
import moment from 'moment';

export const client = new SuiClient({
  url: getFullnodeUrl((config.network as any) || 'mainnet') as any,
});

export const formatUnixTimestamp = (
  timestamp: number,
  formatDate = 'YYYY-MM-DD HH:mm:ss',
) => {
  if (!timestamp) return '--';

  return moment(+timestamp).format(formatDate);
};

export const covertMistToDec = (
  amount: string | number | undefined | BigNumber,
  decimals = 9,
) => {
  return new BigNumber(amount || 0).dividedBy(10 ** decimals).toString();
};

export const convertDecToMist = (
  amount: string | number | undefined | BigNumber,
  decimals = 9,
) => {
  return new BigNumber(amount || 0).multipliedBy(10 ** decimals).toString();
};

export const truncateDecimals = (value: number, decimals = 9) => {
  return Math.round(value * 10 ** decimals) / 10 ** decimals;
};

export const formatShortAddress = (
  address: string | undefined,
  digits = 8,
  digitsAfter = 6,
): string => {
  if (!address) {
    return '--';
  }
  return `${address?.substring(0, digits)}...${address.substring(
    address.length - digitsAfter,
    address.length,
  )}`;
};

export const formatMillisecondsToDate = (milliseconds: number): string => {
  const date = new Date(milliseconds);
  return date.toLocaleString('en-US', {
    month: '2-digit',
    day: '2-digit',
    year: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
    second: '2-digit',
    hour12: true,
  });
};

export const getCoinAddressFromType = (coinType: string) => {
  return coinType.split('::')[0];
};
export function formatCommentTime(createdAt: string): string {
  const now = new Date();
  const createdDate = new Date(createdAt);
  const diffInSeconds = Math.max(
    0,
    Math.floor((now.getTime() - createdDate.getTime()) / 1000),
  );

  if (diffInSeconds < 60) {
    return `${diffInSeconds}s`;
  }

  const diffInMinutes = Math.floor(diffInSeconds / 60);
  if (diffInMinutes < 60) {
    return `${diffInMinutes}m`;
  }

  const diffInHours = Math.floor(diffInMinutes / 60);
  if (diffInHours < 24) {
    return `${diffInHours}h`;
  }

  const options: Intl.DateTimeFormatOptions = {
    month: 'short',
    day: 'numeric',
  };
  return createdDate.toLocaleDateString('en-US', options);
}

export const formatNumberWithComa = (num: number | string, decimals = 2) => {
  const number = Number(num);
  if (isNaN(number)) {
    return '--';
  }

  if (Number.isInteger(number)) {
    return number.toLocaleString();
  }

  const fixedNumber = number.toFixed(decimals);
  const trimmedNumber = parseFloat(fixedNumber);

  const [integerPart, decimalPart] = trimmedNumber.toString().split('.');

  const formattedInteger = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, ',');

  return decimals > 0 ? `${formattedInteger}.${decimalPart}` : formattedInteger;
};

// Format với {decimal} số sau dấu phẩy và thêm "," vào giữa 3 số
export const formatFundraiseGoal = (
  num: number | string,
  decimals = DECIMAL_FUNDRAISE_GOAL,
) => {
  const number = Number(num);
  if (isNaN(number)) {
    return '--';
  }
  const fixedNumber = new BigNumber(number).decimalPlaces(decimals).toString();

  const [integerPart, decimalPart] = fixedNumber.split('.');

  if (!decimalPart) {
    return integerPart;
  }

  const formattedInteger = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, ',');

  return decimals > 0 ? `${formattedInteger}.${decimalPart}` : formattedInteger;
};

export const formatMillisecondsToFullDate = (milliseconds: number): string => {
  if (!milliseconds) return '--';
  const date = new Date(milliseconds);

  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');
  const seconds = String(date.getSeconds()).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const year = date.getFullYear();

  return `${hours}:${minutes}:${seconds} ${day}/${month}/${year}`;
};

export const formatCurrency = (value: string | undefined): string => {
  if (!value || value === 'NaN') {
    return '--';
  }
  const numberValue = parseFloat(value);
  return `$${numberValue.toLocaleString('en-US', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`;
};

export function formatToPercent(
  number: string | number | BigNumber,
  decimalPlaces = 2,
  defaultValue = '0%',
): string {
  if (
    !number ||
    new BigNumber(number || 0).isZero() ||
    !new BigNumber(number).isFinite()
  ) {
    return defaultValue;
  }
  const newValue = new BigNumber(number)
    .multipliedBy(100)
    .toFixed(decimalPlaces);
  return new BigNumber(newValue).toString() + '%';
}

export function formatNumber(
  value: string | number | BigNumber,
  decimalPlaces = 8,
  defaultValue = '--',
): string {
  if (!value || new BigNumber(value || 0).isZero()) {
    return defaultValue;
  }

  if (
    new BigNumber(value).isGreaterThan(0) &&
    new BigNumber(value).isLessThan(0.00000001)
  ) {
    return '<' + new BigNumber(0.00000001).toString();
  }

  return _formatLargeNumberIfNeed(
    roundNumber(value, BigNumber.ROUND_DOWN, decimalPlaces),
    decimalPlaces,
  );
}

const _formatLargeNumberIfNeed = (number: string, digits = 0) => {
  if (new BigNumber(number).comparedTo(1000) < 0) {
    return formatNumberWithCommas(number, digits);
  }
  const rx = /\.0+$|(\.[0-9]*[1-9])0+$/;
  const num = parseFloat(number);
  let i;
  for (i = SI.length - 1; i > 0; i--) {
    if (num >= SI[i].value) {
      break;
    }
  }
  return (
    BigNumber(num / SI[i].value)
      .toFixed(digits, BigNumber.ROUND_DOWN)
      .toString()
      .replace(rx, '$1') + SI[i].symbol
  );
};

export const roundNumber = (
  number: number | string | BigNumber,
  roundMode = BigNumber.ROUND_DOWN,
  decimals = 18,
) => {
  const newNumber = new BigNumber(number).toFixed(decimals, roundMode);
  return new BigNumber(newNumber).toString();
};

export function formatNumberWithCommas(
  value: string | number | BigNumber,
  decimalPlaces = 8,
): string {
  return commaNumber(
    new BigNumber(Number(value).toFixed(decimalPlaces)).toString(),
    ',',
    '.',
  );
}
