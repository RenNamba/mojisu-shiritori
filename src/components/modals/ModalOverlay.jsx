import { Box } from "@chakra-ui/react";

// 全画面オーバーレイの共通ラッパー。すべてのモーダルはこのコンポーネントで包む
const ModalOverlay = ({ children, flexDirection = "row" }) => (
  <Box
    position="fixed"
    top={0}
    left={0}
    right={0}
    bottom={0}
    bg="blackAlpha.700"
    display="flex"
    flexDirection={flexDirection}
    alignItems="center"
    justifyContent="center"
    zIndex={1000}
  >
    {children}
  </Box>
);

export default ModalOverlay;
