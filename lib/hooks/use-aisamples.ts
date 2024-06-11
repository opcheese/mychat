import { useQuery, gql } from '@apollo/client';
const GET_TEMPLATES = gql`
  query {
    samples {
      id
      filename
      content
    }
  }
`;

export const useAiSamples = () => {
 
  const { loading, error, data } = useQuery(GET_TEMPLATES);
  return { loading, error, data } 
}
