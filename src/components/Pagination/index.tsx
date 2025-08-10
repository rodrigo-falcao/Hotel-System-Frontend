import CustomLink from "../Link";
import { getPaginationRange } from "./helper";

type PaginationProps = {
    currentPage: number;
    totalPages: number;
    destination: string;
};

const pagesStyles = "flex items-center justify-center w-12 h-12 bg-white text-xl font-bold text-light-grey-800 border border-light-grey-300 rounded-lg hover:bg-gray-100";
const arrowStyles = "flex items-center justify-center w-12 h-12 bg-light-grey-400 text-xl font-bold text-light-grey-800 rounded-lg hover:bg-light-grey-200 transition-colors duration-300";
const activePageStyles = "mx -1 flex items-center justify-center w-12 h-12 bg-white text-xl font-bold text-main-brand-blue-300 border border-main-brand-blue-300 rounded-lg hover:bg-snow-white";
const disabledStyles = "pointer-events-none aria-disabled:bg-slate-100 aria-disabled:text-slate-400 aria-disabled:cursor-not-allowed hover:bg-snow-white";

const Pagination = ({
    currentPage = 1,
    totalPages,
    destination
}: PaginationProps) => {
    const isFirstPage = currentPage === 1;
    const isLastPage = currentPage === totalPages;

    return (
        <div>
            <nav aria-label="Page navigation example">
                <ul className="flex space-x-2">
                    <li>
                        <CustomLink 
                        href={{ pathname: destination, query: { page: 1 } }}
                        className={`${arrowStyles} ${isFirstPage ? disabledStyles : ''}`}
                        aria-label={isFirstPage}
                        >
                            {`<`}
                        </CustomLink>
                    </li>
                    {getPaginationRange(currentPage, totalPages).map((page) => {
                        const isCurrent = currentPage === page;
                        const styles = isCurrent ? activePageStyles : pagesStyles;
                        return (
                            <li key={page}>
                                <CustomLink 
                                    href={{ pathname: destination, query: { page } }}
                                    className={styles}
                                >
                                    {`${page}`}
                                </CustomLink>
                            </li>
                        );
                    })}
                    <li>
                        <CustomLink 
                            href={{ pathname: destination, query: { page: totalPages } }}
                            className={`${arrowStyles} ${isLastPage ? disabledStyles : ''}`}
                            aria-label={isLastPage}
                        >
                            {`>`}
                        </CustomLink>
                    </li>
                </ul>
            </nav>
        </div>
    )
}

export default Pagination;