/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import { get } from 'lodash';
import React, {
  CSSProperties,
  forwardRef,
  ReactNode,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from 'react';
import { TableVirtuoso, Virtuoso } from 'react-virtuoso';

interface AppDataTableProps<T> {
  ref?: React.RefObject<HTMLDivElement>;
  getData: (params: {
    page: number;
    limit: number;
  }) => Promise<{ data: T[]; totalPages: number }>;
  renderHeader: () => ReactNode;
  overrideHeaderClassName?: string;
  overrideBodyClassName?: string;
  renderRow: (item: T, index: number) => ReactNode;
  height?: number | string;
  limit?: number;
  containerStyle?: CSSProperties;
  headerStyle?: CSSProperties;
  bodyStyle?: CSSProperties;
  rowStyle?: CSSProperties;
  noDataMessage?: string;
  minWidth?: number;
  shouldAutoFetchOnInit?: boolean;
  onInitializationDone?: () => void;
  isBasicTable?: boolean;
  components?: any;
  isHideHeader?: boolean;
}

export const AppDataTable = forwardRef<HTMLDivElement, AppDataTableProps<any>>(
  (
    {
      getData,
      renderHeader,
      renderRow,
      height = 400,
      limit = 10,
      containerStyle,
      headerStyle,
      bodyStyle,
      rowStyle,
      noDataMessage = 'No data',
      overrideHeaderClassName,
      overrideBodyClassName,
      minWidth = 900,
      shouldAutoFetchOnInit = true,
      onInitializationDone,
      isBasicTable,
      components,
      isHideHeader,
    },
    ref,
  ) => {
    const [items, setItems] = useState<any[]>([]);
    const [page, setPage] = useState(1);
    const [isEmptyData, setIsEmptyData] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const filterParamsRef = useRef<any>();

    useImperativeHandle(
      ref,
      () => {
        return {
          isLoading() {
            return isLoading;
          },

          async refresh() {
            setPage(1);
            await fetchNewData();
          },

          async appendNewData(newData: any) {
            setItems((prevItems: any[]) => [newData, ...prevItems]);
          },

          async filter(filterParams: any) {
            filterParamsRef.current = filterParams;
            setPage(1);
            await fetchNewData();
          },

          updateOne(updatedData: any, fieldKey: string, update: any) {
            if (!fieldKey) {
              console.warn(
                'Warning: fieldKey is required for updating an item',
              );
              return;
            }
            setItems((prevItems) => {
              const updatedItems = prevItems.map((item) => {
                if (get(item, fieldKey) === get(updatedData, fieldKey)) {
                  const updatedItem = update(item, updatedData);
                  return updatedItem || item;
                }
                return item;
              });
              return updatedItems;
            });
          },

          removeItem(key: string, value: any) {
            setItems((prev) => prev.filter((item) => item[key] !== value));
          },

          async polling(filterParams: any) {
            filterParamsRef.current = filterParams;
            const { data } = await getData({
              page,
              limit,
              ...filterParamsRef.current,
            });
            setItems(data);
            setIsEmptyData(!!(data?.length < limit));
          },

          getItems() {
            return items;
          },
        } as any;
      },
      // eslint-disable-next-line
      [],
    );

    const fetchNewData = async () => {
      setIsLoading(true);
      const { data } = await getData({
        page,
        limit,
        ...filterParamsRef.current,
      });

      if (page === 1 && onInitializationDone) {
        onInitializationDone();
      }
      setItems(data);
      setIsEmptyData(!!(data?.length < limit));
      setIsLoading(false);
    };

    useEffect(() => {
      if (!shouldAutoFetchOnInit) return;
      fetchNewData().then();
      // eslint-disable-next-line
    }, [shouldAutoFetchOnInit]);

    const loadMore = async () => {
      if (isEmptyData || isLoading) return;

      setIsLoading(true);
      try {
        const newPage = page + 1;
        const { data } = await getData({
          page: newPage,
          limit,
        });
        setItems((prevItems) => [...prevItems, ...data]);
        setIsEmptyData(!!(data?.length < limit));
        setPage(newPage);
      } catch (error) {
        console.error('Error loading data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    if (isBasicTable) {
      return (
        <div className={'overflow-x-auto'}>
          <div ref={ref} style={{ ...containerStyle }}>
            {items?.length === 0 && !isLoading ? (
              <div
                style={{
                  height,
                  ...bodyStyle,
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              >
                {noDataMessage}
              </div>
            ) : (
              <TableVirtuoso
                className="customer-scroll"
                style={{ height, ...bodyStyle }}
                data={items}
                endReached={loadMore}
                itemContent={(index, item) => {
                  return renderRow(item, index);
                }}
                fixedHeaderContent={() => renderHeader()}
                components={components}
              />
            )}
          </div>
        </div>
      );
    }

    return (
      <div className={'overflow-x-auto'}>
        <div
          ref={ref}
          style={{
            ...containerStyle,
            minWidth: isHideHeader ? '100%' : `${minWidth}px`,
          }}
        >
          {!isHideHeader && (
            <div
              className={
                overrideHeaderClassName
                  ? overrideHeaderClassName
                  : 'flex text-[12px] leading-[1.5] font-normal text-neutral-alpha-500 border-b border-neutral-alpha-50 min-h-[40px]'
              }
              style={{ ...headerStyle }}
            >
              {renderHeader()}
            </div>
          )}

          {items.length === 0 && !isLoading ? (
            <div
              style={{
                height,
                ...bodyStyle,
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              {noDataMessage}
            </div>
          ) : (
            <Virtuoso
              className="customer-scroll"
              style={{ height, ...bodyStyle }}
              data={items}
              endReached={loadMore}
              itemContent={(index, item) => (
                <div
                  className={
                    overrideBodyClassName
                      ? overrideBodyClassName
                      : `flex text-[12px] hover:bg-neutral-alpha-50 border-b border-neutral-alpha-50 leading-[1.5] font-normal`
                  }
                  style={{ ...rowStyle }}
                >
                  {renderRow(item, index)}
                </div>
              )}
              // components={{
              //   Footer: () =>
              //     isLoading ? (
              //       <div style={{ padding: '12px', textAlign: 'center' }}>
              //         Loading...
              //       </div>
              //     ) : null,
              // }}
            />
          )}
        </div>
      </div>
    );
  },
);

AppDataTable.displayName = 'AppDataTable';
