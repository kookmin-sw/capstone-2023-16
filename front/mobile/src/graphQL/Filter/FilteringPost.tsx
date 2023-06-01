import {graphql} from 'babel-plugin-relay/macro';
import {fetchQuery} from 'relay-runtime';
import RelayEnvironment from '../../RelayEnvironment';
import {allFilter} from './Queries/allFilter';
import {titleNtagsNcategroyFilter} from './Queries/titleNtagsNcategroyFilter';
import {titleNauthorNtagsFilter} from './Queries/titleNauthorNtagsFilter';
import {titleNauthorNcategoryFilter} from './Queries/titleNauthorNcategoryFilter';
import {authorNtagsNcategoryFilter} from './Queries/authorNtagsNcategory';
import {authorNcategoryFilter} from './Queries/authorNcategory';
import {titleNauthorFilter} from './Queries/titleNauthorFilter';
import {titleNtagsFilter} from './Queries/titleNtagsFilter';
import {authorNtagsFilter} from './Queries/authorNtagsFilter';
import {titleNcategoryFilter} from './Queries/titleNcategoryFilter';
import {titleFilter} from './Queries/titleFilter';
import {tagsFilter} from './Queries/tagsFilter';
import {categoryFilterQuery} from './Queries/categoryFilter';
import {authorFilter} from './Queries/authorFilter';

interface tmpProps {
  searchTitle?: string;
  searchTags?: Array<string>;
  searchCategory?: string;
  searchAuthor?: string;
}

export const getAfterFiltering = async (props: tmpProps) => {
  if (
    props.searchTitle !== undefined &&
    props.searchTags !== undefined &&
    props.searchCategory !== undefined &&
    props.searchAuthor !== undefined
  ) {
    const request = fetchQuery(RelayEnvironment, allFilter, {
      id: props.searchAuthor,
      category: props.searchCategory,
      tags: props.searchTags,
      title: props.searchTitle,
    });
    const response = await request.toPromise();
    return response?.getPublicPosts.edges;
  } else if (
    props.searchTitle !== undefined &&
    props.searchTags !== undefined &&
    props.searchCategory !== undefined
  ) {
    const request = fetchQuery(RelayEnvironment, titleNtagsNcategroyFilter, {
      category: props.searchCategory,
      tags: props.searchTags,
      title: props.searchTitle,
    });
    const response = await request.toPromise();
    return response?.getPublicPosts.edges;
  } else if (
    props.searchTitle !== undefined &&
    props.searchTags !== undefined &&
    props.searchAuthor !== undefined
  ) {
    const request = fetchQuery(RelayEnvironment, titleNauthorNtagsFilter, {
      id: props.searchAuthor,
      tags: props.searchTags,
      title: props.searchTitle,
    });
    const response = await request.toPromise();
    return response?.getPublicPosts.edges;
  } else if (
    props.searchTitle !== undefined &&
    props.searchCategory !== undefined &&
    props.searchAuthor !== undefined
  ) {
    const request = fetchQuery(RelayEnvironment, titleNauthorNcategoryFilter, {
      id: props.searchAuthor,
      category: props.searchCategory,
      title: props.searchTitle,
    });
    const response = await request.toPromise();
    return response?.getPublicPosts.edges;
  } else if (
    props.searchTags !== undefined &&
    props.searchCategory !== undefined &&
    props.searchAuthor !== undefined
  ) {
    const request = fetchQuery(RelayEnvironment, authorNtagsNcategoryFilter, {
      id: props.searchAuthor,
      category: props.searchCategory,
      tags: props.searchTags,
    });
    const response = await request.toPromise();
    return response?.getPublicPosts.edges;
  } else if (
    props.searchCategory !== undefined &&
    props.searchAuthor !== undefined
  ) {
    const request = fetchQuery(RelayEnvironment, authorNcategoryFilter, {
      id: props.searchAuthor,
      category: props.searchCategory,
    });
    const response = await request.toPromise();
    return response?.getPublicPosts.edges;
  } else if (
    props.searchTitle !== undefined &&
    props.searchAuthor !== undefined
  ) {
    const request = fetchQuery(RelayEnvironment, titleNauthorFilter, {
      id: props.searchAuthor,
      title: props.searchTitle,
    });
    const response = await request.toPromise();
    return response?.getPublicPosts.edges;
  } else if (
    props.searchTitle !== undefined &&
    props.searchTags !== undefined
  ) {
    const request = fetchQuery(RelayEnvironment, titleNtagsFilter, {
      tags: props.searchTags,
      title: props.searchTitle,
    });
    const response = await request.toPromise();
    return response?.getPublicPosts.edges;
  } else if (
    props.searchTags !== undefined &&
    props.searchAuthor !== undefined
  ) {
    const request = fetchQuery(RelayEnvironment, authorNtagsFilter, {
      id: props.searchAuthor,
      tags: props.searchTags,
    });
    const response = await request.toPromise();
    return response?.getPublicPosts.edges;
  } else if (
    props.searchTitle !== undefined &&
    props.searchCategory !== undefined
  ) {
    const request = fetchQuery(RelayEnvironment, titleNcategoryFilter, {
      category: props.searchCategory,
      title: props.searchTitle,
    });
    const response = await request.toPromise();
    return response?.getPublicPosts.edges;
  } else if (props.searchTitle !== undefined) {
    const request = fetchQuery(RelayEnvironment, titleFilter, {
      title: props.searchTitle,
    });
    const response = await request.toPromise();
    return response?.getPublicPosts.edges;
  } else if (props.searchTags !== undefined) {
    const request = fetchQuery(RelayEnvironment, tagsFilter, {
      tags: props.searchTags,
    });
    const response = await request.toPromise();
    return response?.getPublicPosts.edges;
  } else if (props.searchCategory !== undefined) {
    const request = fetchQuery(RelayEnvironment, categoryFilterQuery, {
      category: props.searchCategory,
    });
    const response = await request.toPromise();
    return response?.getPublicPosts.edges;
  } else {
    const request = fetchQuery(RelayEnvironment, authorFilter, {
      id: props.searchAuthor,
    });
    const response = await request.toPromise();
    return response?.getPublicPosts.edges;
  }
};
