export const truncateMiddleText = (
  text: string,
  ellipsis = '...',
  start = 6,
  end = 6,
): string => {
  if (text?.length > start + end) {
    return `${text.slice(0, start)}${ellipsis}${text.slice(end * -1)}`;
  }

  return text;
};
