import React, { FC, useContext } from "react";
import { Center, Heading, Skeleton, Stack } from "@chakra-ui/react";
import { useParams } from "react-router-dom";
import { UserDashboardContext } from "../../contexts/UserDashboardContext";
import { CustomRouteObject } from "../../interfaces/Routes";

interface Props {
  sectionName?: string;
  children?: React.ReactNode;
}

export const SectionHeader: FC<Props> = ({ children, sectionName }: Props) => {
  const {
    context: { routes, courses },
  } = useContext(UserDashboardContext);
  const params = useParams();

  const getSectionNameFromRoute = () => {
    const route = routes?.find(
      // eslint-disable-next-line no-restricted-globals
      (route) => route.path === location.pathname
    ) as CustomRouteObject | undefined;

    const detailViewName = courses.find(
      (course) => course.externalId === params?.id
    )?.name;

    return route?.name || detailViewName;
  };

  return (
    <Skeleton isLoaded={routes.length !== 0}>
      <Stack direction={["column", "row"]} spacing={3} marginBottom={4}>
        <Center gap={4}>
          <Heading textStyle={"title"} marginRight={3} as="h4">
            {sectionName || getSectionNameFromRoute()}
          </Heading>
          {children}
        </Center>
      </Stack>
    </Skeleton>
  );
};
