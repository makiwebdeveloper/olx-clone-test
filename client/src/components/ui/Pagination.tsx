import { FC } from "react";
import { Button } from "@/components/ui";
import { usePagination, DOTS, IPagination } from "@/hooks/usePagination";
import { MdNavigateNext, MdNavigateBefore } from "react-icons/md";

interface IProps extends IPagination {
  onPageChange: (value: number) => void;
  className?: string;
  isPreviousData?: boolean;
}

const Pagination: FC<IProps> = ({
  onPageChange,
  dataLength,
  siblingCount,
  currentPage,
  perPage,
  className,
  isPreviousData,
}) => {
  const paginationRange = usePagination({
    currentPage,
    dataLength,
    siblingCount,
    perPage,
  });

  if (currentPage === 0 || !paginationRange || paginationRange.length < 2) {
    return null;
  }

  let lastPage = paginationRange[paginationRange.length - 1];

  const next = () => {
    if (!isPreviousData && currentPage !== lastPage) {
      onPageChange(currentPage + 1);
    }
  };

  const prev = () => {
    if (currentPage !== 1) {
      onPageChange(currentPage - 1);
    }
  };

  return (
    <ul className={`flex gap-1 sm:px-2 items-center ${className}`}>
      <li>
        <Button
          onClick={prev}
          disabled={currentPage === 1}
          restStyles="text-xs"
          p="py-2 px-2 sm:px-4"
        >
          <MdNavigateBefore className="text-lg sm:text-2xl" />
        </Button>
      </li>
      {paginationRange.map((pageNumber, index) => (
        <li key={index}>
          {pageNumber === DOTS ? (
            <span className="w-8 sm:w-10 h-10 center">&#8230;</span>
          ) : (
            <span
              key={pageNumber}
              className={`w-8 h-8 sm:w-10 sm:h-10 cursor-pointer center rounded font-semibold transition ${
                currentPage === pageNumber
                  ? "bg-teal-900 text-white hover:bg-teal-800"
                  : "bg-gray-200 hover:bg-gray-300"
              }`}
              onClick={() => onPageChange(+pageNumber)}
            >
              {pageNumber}
            </span>
          )}
        </li>
      ))}
      <li>
        <Button
          onClick={next}
          disabled={isPreviousData || currentPage === lastPage}
          restStyles="text-xs"
          p="py-2 px-2 sm:px-4"
        >
          <MdNavigateNext className="text-lg sm:text-2xl" />
        </Button>
      </li>
    </ul>
  );
};

export default Pagination;
