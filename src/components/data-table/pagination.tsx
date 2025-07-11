"use client";
import { PaginationMeta } from "@/lib/apis/user";
import { Table } from "@tanstack/react-table";
import React, { useCallback, useEffect } from "react";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
  PaginationEllipsis,
} from "../ui/pagination";
import { useSearchParams, useRouter, usePathname } from "next/navigation";

interface DataTablePaginationProps {
  table: Table<any>;
  meta: {
    total_pages: number;
    current_page: number;
    limit: number;
    total_count: number;
  };
  onPageChange?: (page: number) => void;
  loading?: boolean;
}

function DataTablePagination({
  table,
  meta,
  onPageChange,
  loading = false,
}: DataTablePaginationProps) {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const currentPage = table.getState().pagination.pageIndex + 1;
  const totalPages = meta?.total_pages || 1;

  // Update table state when URL changes
  useEffect(() => {
    const page = searchParams.get('page');
    if (page) {
      const pageNum = parseInt(page, 10);
      if (!isNaN(pageNum) && pageNum !== currentPage) {
        table.setPageIndex(pageNum - 1);
      }
    }
  }, [searchParams, table, currentPage]);

  const handlePageChange = useCallback((page: number) => {
    if (page < 1 || page > totalPages || page === currentPage) return;
    
    // Update table state
    table.setPageIndex(page - 1);
    
    // Update URL
    const params = new URLSearchParams(searchParams.toString());
    params.set('page', page.toString());
    router.replace(`${pathname}?${params.toString()}`, { scroll: false });
    
    // Notify parent
    onPageChange?.(page);
  }, [currentPage, onPageChange, pathname, router, searchParams, table, totalPages]);

  if (totalPages <= 1) return null;

  const getPageNumbers = () => {
    const pages = [];
    const maxVisiblePages = 5;
    let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
    let endPage = startPage + maxVisiblePages - 1;

    if (endPage > totalPages) {
      endPage = totalPages;
      startPage = Math.max(1, endPage - maxVisiblePages + 1);
    }

    if (startPage > 1) {
      pages.push(1);
      if (startPage > 2) {
        pages.push('...');
      }
    }

    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }

    if (endPage < totalPages) {
      if (endPage < totalPages - 1) {
        pages.push('...');
      }
      pages.push(totalPages);
    }

    return pages;
  };

  return (
    <div className="flex items-center justify-between w-full">
      
      <Pagination className="justify-end">
        <PaginationContent>
          <PaginationItem>
            <div 
              onClick={() => {
                if (currentPage > 1 && !loading) {
                  handlePageChange(currentPage - 1);
                }
              }}
              className={`cursor-pointer ${
                currentPage <= 1 || loading 
                  ? "opacity-50 pointer-events-none" 
                  : ""
              }`}
            >
              <PaginationPrevious 
                href="#" 
                onClick={(e) => e.preventDefault()}
              />
            </div>
          </PaginationItem>

          {getPageNumbers().map((page, index) => {
            if (page === '...') {
              return (
                <PaginationItem key={`ellipsis-${index}`}>
                  <PaginationEllipsis />
                </PaginationItem>
              );
            }

            const pageNum = Number(page);
            return (
              <PaginationItem key={pageNum}>
                <PaginationLink
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    handlePageChange(pageNum);
                  }}
                  isActive={currentPage === pageNum}
                  className={currentPage === pageNum ? 'font-bold' : 'cursor-pointer'}
                >
                  {pageNum}
                </PaginationLink>
              </PaginationItem>
            );
          })}

          <PaginationItem>
            <div 
              onClick={() => {
                if (currentPage < totalPages && !loading) {
                  handlePageChange(currentPage + 1);
                }
              }}
              className={`cursor-pointer ${
                currentPage >= totalPages || loading 
                  ? "opacity-50 pointer-events-none" 
                  : ""
              }`}
            >
              <PaginationNext 
                href="#" 
                onClick={(e) => e.preventDefault()}
              />
            </div>
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  );
}

export default DataTablePagination;
