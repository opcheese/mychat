import { useQuery, gql } from '@apollo/client';
const GET_TEMPLATES = gql`
  query {
    templates {
      id
      filename
      content
    }
  }
`;

export const useAiTemplates = () => {
 
  const { loading, error, data } = useQuery(GET_TEMPLATES);
  return { loading, error, data } 
}
