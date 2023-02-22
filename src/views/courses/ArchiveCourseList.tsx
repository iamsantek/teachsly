import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Text,
  Flex,
  Wrap,
  WrapItem,
} from "@chakra-ui/react";
import { BsFillArchiveFill } from "react-icons/bs";
import { Course } from "../../API";
import { CourseCardPreview } from "../../components/Card/CourseCardPreview";
import { translate } from "../../utils/LanguageUtils";

interface Props {
  courses: Course[];
  isAdminView?: boolean;
}

export const ArchiveCourseList = ({ courses, isAdminView }: Props) => (
  <Accordion allowMultiple>
    <AccordionItem>
      <h2>
        <AccordionButton>
          <Flex gap={4} alignItems="center">
            <BsFillArchiveFill />
            <Text fontWeight="bold">{translate("COURSES_ARCHIVE")}</Text>
          </Flex>

          <AccordionIcon />
        </AccordionButton>
      </h2>
      <AccordionPanel pb={4}>
        <Wrap spacing={4} display="flex" mx={"auto"}>
          {courses.map((course) => (
            <WrapItem key={course.id} w={["100%", "30%"]}>
              <CourseCardPreview course={course} key={course.id} />
            </WrapItem>
          ))}
        </Wrap>
      </AccordionPanel>
    </AccordionItem>
  </Accordion>
);
