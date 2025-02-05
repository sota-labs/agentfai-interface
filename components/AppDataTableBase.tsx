'use client';

import { debounce } from 'lodash';
import React, {
  forwardRef,
  ReactNode,
  Ref,
  useCallback,
  useEffect,
  useImperativeHandle,
  useMemo,
  useState,
} from 'react';
import { AppPagination } from '@/components';
import { FaArrowLeftLong, FaArrowRight } from '@/node_modules/react-icons/fa6';

interface DataTableProps {
  requestParams?: any; // if requestParams are not passed, only fetchs API in didMount
  limit?: number;
  wrapperClassName?: string;
  fetchData: (requestParams: any) => Promise<any>;
  renderBody: (tableData: any[]) => ReactNode;
  renderHeader?: () => ReactNode;
  renderNoData?: () => ReactNode;
  dataSortTable?: any;
  loading?: boolean;
  isNotShowNoData?: boolean;
  hidePagination?: boolean;
  isLoadingOnce?: boolean;
}

export interface Pagination {
  limit: number; // the limit item of page
  page: number; // the current page
  sortBy?: string;
  sortType?: 'asc' | 'desc'; // Available values : asc, desc
}

export const AppDataTableBase = forwardRef(
  (props: DataTableProps, ref: Ref<any>) => {
    const DEFAULT_LIMIT = 10;
    const DEBOUNCE_TIME = 1000;
    const CONSTANT = 'CONSTANT';

    // make requestParams not change => call at the first load
    const defaultRequestParams = useMemo(() => ({}), [CONSTANT]);

    const {
      limit = DEFAULT_LIMIT,
      requestParams = defaultRequestParams,
      fetchData,
      dataSortTable,
      renderBody,
      renderHeader,
      renderNoData,
      isNotShowNoData = false,
      hidePagination = false,
      isLoadingOnce = false,
    } = props;

    const initialPagination: Pagination = { limit, page: 1 };
    const [tableData, setTableData] = useState<any[]>([]);
    const [totalPages, setTotalPages] = useState<number>(0);
    const [pagination, setPagination] = useState<Pagination>(initialPagination);
    const [isLoading, setIsLoading] = useState<boolean>(true);

    useImperativeHandle(ref, () => ({
      tableData,
      fetchTableData,
      pagination,
    }));

    const fetchTableData = async (params: any, tablePagination: Pagination) => {
      if (!isLoadingOnce) {
        setIsLoading(true);
      }
      const response: any = await fetchData({
        ...params,
        ...tablePagination,
      });

      setIsLoading(false);
      if (response) {
        setTableData(response?.docs);
        setPagination({ ...tablePagination });
        setTotalPages(response?.totalPages || 0);
      } else setTableData([]);
    };

    const debounceFetchTableData = useCallback(
      debounce(fetchTableData, DEBOUNCE_TIME),
      [requestParams],
    );

    const onChangePagination = (event: { selected: number }) => {
      fetchTableData(requestParams, {
        ...pagination,
        page: event.selected + 1,
      }).then();
    };

    const _renderLoading = () => {
      return <div className="data-loading">Loading...</div>;
    };

    const _renderPagination = () => {
      if (totalPages <= 1) return;
      return (
        <div className="flex justify-between items-center mt-3">
          <div
            className="flex items-center gap-1"
            onClick={() => {
              if (pagination.page === 1) return;
              onChangePagination({ selected: pagination.page - 2 });
            }}
          >
            <FaArrowLeftLong className="text-[#a0faa0]" />
            <div className="hover:text-neutral-300 transition-colors cursor-pointer">
              Previous
            </div>
          </div>
          <AppPagination
            pageCount={totalPages}
            forcePage={pagination.page - 1}
            onPageChange={onChangePagination}
          />
          <div
            className="flex items-center gap-1"
            onClick={() => {
              if (pagination.page === totalPages) return;
              onChangePagination({ selected: pagination.page });
            }}
          >
            <div className="hover:text-neutral-300 transition-colors cursor-pointer">
              Next
            </div>
            <FaArrowRight className="text-[#a0faa0]" />
          </div>
        </div>
      );
    };

    const _renderFooter = () => {
      if (isLoading || props.loading || hidePagination) {
        return null;
      }
      return _renderPagination();
    };

    const _renderNoResultOrLoading = () => {
      if (isLoading || props.loading) {
        return _renderLoading();
      }

      if (!tableData?.length && !isNotShowNoData) {
        return renderNoData ? (
          renderNoData()
        ) : (
          <div className="data-loading">No data...</div>
        );
      }
    };

    const _renderBody = () => {
      if (!tableData?.length || isLoading || props.loading) {
        return;
      }
      return <>{renderBody(tableData)}</>;
    };

    const _renderTable = () => {
      return (
        <table className="w-full">
          {renderHeader && renderHeader()}
          {_renderBody()}
        </table>
      );
    };

    useEffect(() => {
      debounceFetchTableData(requestParams, { ...pagination, page: 1 });
      return () => {
        debounceFetchTableData.cancel();
      };
    }, [debounceFetchTableData]);

    useEffect(() => {
      if (dataSortTable) {
        setTableData(dataSortTable);
      }
    }, [dataSortTable]);

    return (
      <>
        <div>{_renderTable()}</div>
        <div className="flex justify-center">{_renderNoResultOrLoading()}</div>

        {_renderFooter()}
      </>
    );
  },
);

AppDataTableBase.displayName = 'AppDataTableBase';
