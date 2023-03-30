import { Box, Circle, Flex } from "@chakra-ui/react";
import { MdFolder } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { MediaFolder } from "../../../API";
import { CommonContentLineTitle } from "../CommonContentLineTitle";

interface Props {
  folder: MediaFolder;
}

export const FolderCard = ({ folder: { name, id } }: Props) => {
  const navigate = useNavigate();
  return (
    <Box
      bg="white.100"
      rounded="lg"
      borderWidth="1px"
      boxShadow="lg"
      p={4}
      color="white"
      _hover={{
        transform: "scale(1.01)",
        cursor: "pointer",
      }}
      onClick={() => navigate(`/medias/folder/${id}`)}
    >
      <Flex>
        <Circle
          size="40px"
          bg="brand.500"
          color="whiteAlpha.900"
          marginRight={[3, 5]}
        >
          <MdFolder />
        </Circle>
        <Box>
          <CommonContentLineTitle id={id} title={name} />
        </Box>
      </Flex>
    </Box>
  );
};
