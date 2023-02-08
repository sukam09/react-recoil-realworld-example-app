import { Link } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import { pageAtom } from '../../atom';

interface PaginationProps {
  articlesCount: number;
  url: string;
}

const Pagination = ({ articlesCount, url }: PaginationProps) => {
  const [page, setPage] = useRecoilState(pageAtom);
  const pageLength = Math.ceil(articlesCount / 10);
  const pageNums = [...Array(pageLength).keys()].map(p => p + 1);

  if (pageLength === 1) return null;

  return (
    <>
      <nav>
        <ul className="pagination">
          {pageNums.map(num => (
            <li
              key={num}
              className={`page-item ${page === num ? 'active' : ''}`}
            >
              <Link to={url} className="page-link" onClick={() => setPage(num)}>
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
