import React from "react";
import { IconButton } from 'office-ui-fabric-react';
import "./Pagination.scss";

interface IProps {
    totalPages: number;
    currentPage: number;
    changePage: (page: number) => void;
}

export const Pagination = ({ totalPages, currentPage, changePage }: IProps) => {
    const numberButtons = new Array(totalPages).fill(null);
    const onPage = (page: number) => {
        if (page <= totalPages && page >= 1) {
            changePage(page);
        }
    }
    return (
        <div className="pagination-wrapper">
            <IconButton className="pagination-item" onClick={() => onPage(1)} size={10} disabled={currentPage <= 1}
                        iconProps={{ iconName: "DoubleChevronLeftMed" }}/>
            <IconButton className="pagination-item" onClick={() => onPage(currentPage - 1)} height={8}
                        disabled={currentPage <= 1} iconProps={{ iconName: "ChevronLeftMed" }}/>

            {numberButtons.map((item, idx) => {
                return <button disabled={idx + 1 === currentPage} onClick={() => onPage(idx + 1)}
                               className="pagination-item pagination-number-item">{idx + 1}</button>
            })}

            <IconButton className="pagination-item" onClick={() => onPage(currentPage + 1)}
                        disabled={currentPage >= totalPages} iconProps={{ iconName: "ChevronRightMed" }}/>
            <IconButton className="pagination-item" onClick={() => onPage(totalPages)}
                        disabled={currentPage >= totalPages} iconProps={{ iconName: "DoubleChevronLeftMedMirrored" }}/>


        </div>
    )
}