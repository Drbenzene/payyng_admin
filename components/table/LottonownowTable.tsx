import Image from "next/image";
import { PiTimerFill } from "react-icons/pi";
import { useRouter } from "next/navigation";
import { Fragment, useState } from "react";
import { cn } from "@/utils/utils";
import LottoLoader from "../loader/LottoLoader";
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import { HiOutlineDotsVertical } from "react-icons/hi";
import ReactPaginate from "react-paginate";

interface LottoNowNowTableProps {
  title: string;
  subTitle: string;
  columns: any;
  data: any;
  loading: boolean;
  hideActions?: boolean;
  meta?: any;
  nextPageHandler?: (page: number) => void;
  menuOptions?: any[];
  OptionsComponents?: any;
  showSearch?: boolean;
  setFilters?: any;
  filters?: any;
}

export default function LottoNowNowTable({
  title,
  subTitle,
  columns,
  data,
  hideActions,
  loading,
  meta,
  nextPageHandler,
  menuOptions,
  OptionsComponents,
  showSearch,
  setFilters,
  filters,
}: LottoNowNowTableProps) {
  const { push } = useRouter();
  const [activePage, setActivePage] = useState(1);
  return (
    <section className="shadow-sm border  border-t-[#BB4D0D] border-t-4 rounded-lg py-5 ">
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="sm:flex sm:items-center">
          {/* <div className="mr-5"> */}
          <div className="mr-2">
            {/* <Image
              src="/img/game_avatar.svg"
              width={50}
              height={50}
              alt="LottoNowNow logo"
              className="w-12 h-12"
            /> */}
          </div>

          <div className="sm:flex-auto">
            <h1 className="text-xl font-semibold leading-6 text-gray-900">
              {title}
            </h1>
            <p className="mt-2 text-sm  text-[#667085]">{subTitle}</p>
          </div>
          {OptionsComponents ? (
            <OptionsComponents />
          ) : (
            <div className="mt-4 sm:ml-16 sm:mt2-0  flex justify-center items-center space-x-3 cursor-pointer">
              {/* <span className="text-sm font-semibold text-gray-400">
                Sort by
              </span>
              <CgSortAz className="w-6 h-6 text-gray-400" /> */}
            </div>
          )}
        </div>

        {showSearch && (
          <input
            type="text"
            placeholder="Search keywords  ..."
            className="w-full mt-5 border border-[#D0D5DD] rounded-3xl p-5 focus:outline-none focus:ring-2 focus:ring-primary"
            name="search"
            onKeyDown={(e: any) => {
              if (e.key === "Enter") {
                setFilters({
                  ...filters,
                  search: e.target.value,
                });

                console.log("Enter key pressed");
              }
            }}
          />
        )}

        <div className="mt-8 flow-root">
          <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
              <table className="min-w-full divide-y divide-gray-300">
                <thead>
                  <tr>
                    {columns.map((column: any, i: number) => (
                      <th
                        key={i}
                        scope="col"
                        className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-3"
                      >
                        {column?.Header}
                      </th>
                    ))}

                    <th
                      scope="col"
                      className="relative py-3.5 pl-3 pr-4 sm:pr-3"
                    >
                      <span className="sr-only">Edit</span>
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white">
                  {data &&
                    data?.map((item: any, i: number) => (
                      <tr
                        key={i}
                        className={i % 2 === 0 ? undefined : "bg-[#F9F6F2]"}
                      >
                        {columns.map((column: any, i: number) => (
                          <Fragment key={i}>
                            {column?.accessor === "drawDate" ? (
                              <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-3">
                                {/* <Countdown
                                  date={new Date(item[column?.accessor])}
                                  overtime={false}
                                  renderer={renderer}
                                /> */}
                                {item[column?.accessor]}
                              </td>
                            ) : column?.accessor === "name" ? (
                              <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-3">
                                <div className="flex justify-start items-center space-x-3">
                                  <Image
                                    src="/images/game_avatar.svg"
                                    alt="Lotto"
                                    width={30}
                                    height={30}
                                  />
                                  <p>{item[column?.accessor]}</p>
                                </div>
                              </td>
                            ) : column?.accessor === "winningNumbers" ? (
                              <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-[#B67D08] sm:pl-3">
                                {item[column?.accessor]}
                              </td>
                            ) : column?.accessor === "status" ? (
                              <td
                                className={`
                              whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium  sm:pl-3
                              ${
                                item[column?.accessor] === "Verified"
                                  ? "text-[#027A48]  px-3 py-1 "
                                  : item[column?.accessor] === "Unverified"
                                  ? "text-[#B67D08]"
                                  : item[column?.accessor] === "Suspended"
                                  ? "text-[#344054]"
                                  : item[column?.accessor] === "won"
                                  ? "text-[#027A48]"
                                  : item[column?.accessor] === "verified"
                                  ? "text-[#027A48]"
                                  : item[column?.accessor] === "success"
                                  ? "text-[#027A48]"
                                  : item[column?.accessor] === "Active"
                                  ? "text-[#027A48]"
                                  : item[column?.accessor] === "paid"
                                  ? "text-[#027A48]"
                                  : item[column?.accessor] === "Resolved"
                                  ? "text-[#027A48]"
                                  : item[column?.accessor] === "drawn"
                                  ? "text-[#027A48]"
                                  : item[column?.accessor] === "Deactivated"
                                  ? "text-[#B67D08]"
                                  : item[column?.accessor] === "initiated"
                                  ? "text-[#B67D08]"
                                  : item[column?.accessor] === "pending"
                                  ? "text-[#B67D08]"
                                  : item[column?.accessor] === "Expired"
                                  ? "text-red-500"
                                  : item[column?.accessor] === "Pending"
                                  ? "text-[#B67D08]"
                                  : item[column?.accessor] === "Cancelled"
                                  ? "text-red-500"
                                  : item[column?.accessor] === "In Progress"
                                  ? "text-[#B67D08]"
                                  : item[column?.accessor] === "lost"
                                  ? "text-[#B67D08]"
                                  : item[column?.accessor] === "Expired"
                                  ? "text-[#B67D08]"
                                  : "text-[#000]"
                              }
                              `}
                              >
                                {item[column?.accessor]}
                              </td>
                            ) : (
                              <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-3">
                                {item[column?.accessor]}
                              </td>
                            )}
                          </Fragment>
                        ))}

                        {!hideActions && (
                          <>
                            <Menu>
                              <MenuButton className="inline-flex items-center text-primary gap-2 rounded-md  py-1.5 px-3 text-sm/6 font-semibold  shadow-inner shadow-white/10 focus:outline-none   data-[focus]:outline-white">
                                <HiOutlineDotsVertical size={20} />
                              </MenuButton>

                              <MenuItems
                                transition
                                anchor="bottom end"
                                className="w-52 origin-top-right p-2 rounded-xl border text-black bg-[#FFFAF5]"
                              >
                                {menuOptions?.map((option, i) => (
                                  <MenuItem key={i}>
                                    <button
                                      onClick={() => {
                                        option?.action(item);
                                      }}
                                      className="group flex w-full items-center gap-2 rounded-lg py-1.5 px-3 data-[focus]:bg-white/10"
                                    >
                                      {option?.icon}
                                      {option?.name}
                                      <kbd className="ml-auto hidden font-sans text-xs text-white/50 group-data-[focus]:inline">
                                        {option?.shortcut}
                                      </kbd>
                                    </button>
                                  </MenuItem>
                                ))}
                              </MenuItems>
                            </Menu>
                          </>
                        )}
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {loading && (
          <div className="mt-20 w-full">
            <LottoLoader />
          </div>
        )}

        {/* ///PAGINATION STARTS HERE  */}
        {!loading && data?.length === 0 && (
          <div className="flex justify-center flex-col mt-20 items-center h-[300px]">
            <Image
              src="/images/NoSearchResult.svg"
              alt="Loader"
              className="h-28 w-28 rounded-full animate-pulse"
              height={40}
              width={40}
            />
            <p className="text-[#667085]">No data available</p>
          </div>
        )}
        {data?.length > 0 && meta?.totalPages && (
          <section className="flex justify-center items-center my-10">
            <ReactPaginate
              breakLabel="..."
              nextLabel="next >"
              onPageChange={(data) => {
                setActivePage(data.selected + 1);
                if (nextPageHandler) {
                  nextPageHandler(data.selected + 1);
                }
              }}
              pageRangeDisplayed={5}
              pageCount={meta?.totalPages || 5}
              previousLabel="< previous"
              className="flex justify-center items-center space-x-4"
              activeClassName="bg-[#F9F6F2] font-extrabold border border-[#D0D5DD] rounded-xl px-3 py-2"
              previousClassName="px-5 py-2 border border-[#D0D5DD] rounded-xl"
              nextClassName="px-5 py-2 border border-[#D0D5DD] rounded-xl"
              renderOnZeroPageCount={null}
            />
          </section>
        )}
      </div>
    </section>
  );
}
