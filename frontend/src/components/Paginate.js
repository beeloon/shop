import { Pagination } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";

export const Paginate = ({ pages, page, isAdmin = false, keyword = "" }) => {
  return (
    pages > 1 && (
      <Pagination>
        {[...Array(pages).keys()].map((x) => {
          const p = x + 1;
          return (
            <LinkContainer
              key={p}
              to={
                isAdmin
                  ? `/admin/productlist/${p}`
                  : keyword
                  ? `/search/${keyword}/page/${p}`
                  : `/page/${p}`
              }
            >
              <Pagination.Item active={p === page}>{p}</Pagination.Item>
            </LinkContainer>
          );
        })}
      </Pagination>
    )
  );
};
