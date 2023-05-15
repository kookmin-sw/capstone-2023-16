import graphql from 'babel-plugin-relay/macro';

const personaCreateMutation = graphql`
  mutation personaCreateMutation(
    $nickname: String!, 
    $birthYear: Int, 
    $gender: Gender, 
    $introduction: String, 
    $isPublic: Boolean=true, 
    $job: Job, 
    $preferredTagBodies: [String!]=[]
    $preferredCategories: [CategoryIDInput!]
  ) {
    personaCreate(
      newPersonaInput: {nickname: $nickname, birthYear: $birthYear, gender: $gender, introduction: $introduction, isPublic: $isPublic, job: $job, preferredTagBodies: $preferredTagBodies, preferredCategories: $preferredCategories}
    ) {
      ... on Persona {
        id
      }
    }
  }
`;

export default personaCreateMutation;