import { Link } from "react-router-dom";

const Pagination = ({
  page,
  articlesCount,
  movePage,
  url,
}: {
  page: number;
  articlesCount: number;
  movePage: (num: number) => void;
  url: string;
}) => {
  const pageLength = Math.floor(articlesCount / 10) + 1;
  const pageNums = [...Array(pageLength).keys()].map((x) => x + 1);

  if (pageLength === 1) return null;

  return (
    <>
      <nav>
        <ul className="pagination">
          {pageNums.map((num) => (
            <li
              key={num}
              className={`page-item ${page === num ? "active" : ""}`}
            >
              <Link
                to={url}
                className="page-link"
                onClick={() => movePage(num)}
              >
                {num}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </>
  );
};

export default Pagination;
