import { ListClassAttendancesQuery } from "../API";
import { listClassAttendances } from "../graphql/queries";
import GraphQLService from "./GraphQLService";

const getClassAttendance = (
  userId: string,
  courseId: string,
  nextToken?: string | undefined
) => {
  return GraphQLService.fetchQuery<ListClassAttendancesQuery>({
    query: listClassAttendances,
    nextToken,
    filter: {
      and: [
        {
          userId: { eq: userId },
        },
        { externalCourseId: { eq: courseId } },
      ],
    },
  });
};

export { getClassAttendance };
