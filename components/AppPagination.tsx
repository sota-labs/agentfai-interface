import React, { FC } from 'react';
import ReactPaginate, { ReactPaginateProps } from 'react-paginate';

export const AppPagination: FC<ReactPaginateProps> = ({ ...props }) => {
  return (
    <ReactPaginate
      breakLabel="..."
      previousClassName="hidden"
      nextClassName="hidden"
      pageRangeDisplayed={props.pageCount > 5 ? 1 : 2}
      marginPagesDisplayed={2}
      pageLinkClassName="px-2.5 py-1 hover:bg-white-50 text-neutral-300 rounded"
      activeLinkClassName="bg-white-50"
      className="flex gap-2"
      {...props}
    />
  );
};
