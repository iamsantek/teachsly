import * as React from "react";
import {
  useColorMode,
  Switch,
  FormControl,
  useColorModeValue,
  Text,
} from "@chakra-ui/react";

const DarkModeSwitch: React.FC = () => {
  const { colorMode, toggleColorMode } = useColorMode();
  const isDark = colorMode === "dark";
  const bg = useColorModeValue("white", "gray.800");
  return (
    <FormControl
      bg={bg}
      w="100%"
      display="inline-flex"
      alignItems="center"
      bottom={0}
      left={0}
      p={4}
      borderTopWidth="1px"
    >
      <Text
        textStyle={"paragraph"}
        marginRight={3}
        color={useColorModeValue("black", "white")}
      >
        Dark Mode
      </Text>
      <Switch
        id="color-mode-switch"
        colorScheme="brand"
        isChecked={isDark}
        onChange={toggleColorMode}
      />
    </FormControl>
  );
};

export default DarkModeSwitch;
