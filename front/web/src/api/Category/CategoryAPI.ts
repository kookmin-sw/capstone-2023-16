// GraphQl 
import { useLazyLoadQuery, usePaginationFragment } from 'react-relay';
import categoryAllGetQuery from '../../graphQL/Queries/categoryAllGetQuery';
import { pagination_categoryAllGetQuery } from '../../graphQL/Components/__generated__/pagination_categoryAllGetQuery.graphql';
import categoryPaginationFragment from '../../graphQL/Components/categoryPaginationFragment';


class CategoryAPI {
  public categoryAllGet = () => {
    const queryData = useLazyLoadQuery(categoryAllGetQuery, []);
    return usePaginationFragment<pagination_categoryAllGetQuery, any>(categoryPaginationFragment, queryData);
  };
}

export default CategoryAPI;
