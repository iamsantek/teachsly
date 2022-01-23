import { splitCamelCase } from "../../utils/StringUtils";
import { Badge } from "reactstrap"

interface Props {
    courses: string[];
}

export const CourseBadgeList: React.FC<Props> = ({ courses }) =>
    <>
        {courses?.map(course =>
            <Badge className="mx-1" color="primary" pill key={course}>
                {splitCamelCase(course)}
            </Badge>
        )}
    </>