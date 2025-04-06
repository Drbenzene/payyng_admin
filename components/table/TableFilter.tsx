import React, { useEffect, useState } from "react";
import ReactPaginate from "react-paginate";

interface TableFilterProps {
  data: any[];
  itemsPerPage: number;
  setItemPerPage: any;
  handlePageClick: any;
  pageCount: any;
  meta?: any;
}
function TableFilter({
  data,
  itemsPerPage,
  setItemPerPage,
  handlePageClick,
  pageCount,
  meta,
}: TableFilterProps) {
  const [itemOffset, setItemOffset] = useState(0);
  useEffect(() => {
    // Fetch items from another resources.
    const endOffset = itemOffset + itemsPerPage;
  }, [itemOffset, itemsPerPage]);

  return (
    <div className="mt-10 flex h-28 w-full flex-col items-center justify-between rounded-sm bg-white md:h-20 md:flex-row">
      <div className="m-3 flex items-center justify-start space-x-3 px-3 md:m-0">
        <select
          onChange={(e) => setItemPerPage(Number(e.target.value))}
          className="border-pink focus:border-pink active:border-pink rounded-md border bg-white px-6 py-2  text-sm font-medium text-gray-700 ring-1 ring-inset ring-white"
        >
          <option value="10">10</option>
          <option value="20">20</option>
          <option value="30">30</option>
          <option value="40">40</option>
          <option value="50">50</option>
        </select>
        <p className="text-hervestText text-sm ">
          Showing 1 to{" "}
          {itemsPerPage > data?.length ? data.length : itemsPerPage} of{" "}
          {data?.length}
        </p>
      </div>

      <div className="">
        <ReactPaginate
          breakLabel="..."
          nextLabel=">"
          onPageChange={handlePageClick}
          pageRangeDisplayed={2}
          pageCount={pageCount || Number(data?.length / itemsPerPage)}
          previousLabel="<"
          renderOnZeroPageCount={null}
          containerClassName="flex text-sm md:pb-0 pb-5 space-x-5 justify-start items-center px-3"
          nextClassName="cursor-pointer py-2 px-4 bg-secondary border border-gray-300 rounded-md"
          previousClassName="cursor-pointer py-2 px-4 bg-white border border-gray-300 rounded-md"
          pageClassName="cursor-pointer  py-2 px-4 bg-white border border-gray-300 rounded-md"
          activeClassName="bg-black text-white activePage"
          activeLinkClassName="text-white"
          disabledClassName="cursor-not-allowed"
          breakClassName="cursor-not-allowed"
          marginPagesDisplayed={1}
          pageLinkClassName="cursor-pointer"
        />
      </div>
    </div>
  );
}

export default TableFilter;
