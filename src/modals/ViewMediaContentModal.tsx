import {
  Text,
  ModalOverlay,
  ModalContent,
  ModalCloseButton,
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "@chakra-ui/react";
import { Media } from "../interfaces/Media";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  media: Media;
}

export const ViewMediaContentModal = ({ isOpen, onClose, media }: Props) => {
  // const { isOpen, onOpen, onClose } = useDisclosure()
  return (
    <>
      <Modal size={"lg"} isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader textStyle={"paragraph"}>{media?.title}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Text>{media?.description}</Text>
            <Text>{media?.content}</Text>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={onClose}>
              Close
            </Button>
            <Button variant="ghost">Secondary Action</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};
