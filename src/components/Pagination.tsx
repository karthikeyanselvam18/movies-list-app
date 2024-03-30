import React, { useState, useEffect } from "react";

export interface IPaginationProps {
  pageNo: number;
  setPageNo: (pageNo: number) => void;
  totalPages: number;
}

export function Pagination({
  pageNo,
  setPageNo,
  totalPages,
}: IPaginationProps) {
  const [jsx, setJsx] = useState<any[]>([]);

  useEffect(() => {
    const updatePagination = () => {
      const updatedJsx: any[] = [];

      if (pageNo > 1) {
        updatedJsx.push(
          <button key="first" onClick={() => handlePageClick(1)}>
            {"<<"}
          </button>,
          <button key="prev" onClick={() => handlePageClick(pageNo - 1)}>
            {"<"}
          </button>
        );
      }

      const renderPages = () => {
        const pagesToRender: (number | string)[] = [];
        for (let i = 1; i <= totalPages; i++) {
          if (i === 1 || i === totalPages || Math.abs(pageNo - i) <= 1) {
            pagesToRender.push(i);
          } else if (pagesToRender[pagesToRender.length - 1] !== "...") {
            pagesToRender.push("...");
          }
        }
        const newJsx = pagesToRender.map((page, index) => (
          <button
            onClick={() =>
              handlePageClick(typeof page === "number" ? page : pageNo)
            }
            className={
              typeof page === "number" && page === pageNo ? "clicked" : ""
            }
          >
            {page}
          </button>
        ));
        updatedJsx.push(...newJsx);
      };

      renderPages();

      if (pageNo < totalPages) {
        updatedJsx.push(
          <button key="next" onClick={() => handlePageClick(pageNo + 1)}>
            {">"}
          </button>,
          <button key="last" onClick={() => handlePageClick(totalPages)}>
            {">>"}
          </button>
        );
      }

      setJsx(updatedJsx);
    };

    if (totalPages > 1) updatePagination();
    else setJsx([]);

    return () => {
      setJsx([]);
    };
  }, [pageNo, totalPages]);

  const handlePageClick = (pageNumber: number) => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
    setPageNo(pageNumber);
  };

  return <div className="pagination">{jsx}</div>;
}
