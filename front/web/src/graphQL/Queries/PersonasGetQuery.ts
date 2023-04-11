import graphql from 'babel-plugin-relay/macro';


const PersonasGetQuery = graphql`
  query PersonasGetQuery($first: Int, $after: String ){
    ...PersonasFragment  @arguments(first: $first, after: $after)
  }
`;

export default PersonasGetQuery;