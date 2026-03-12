import { useNavigate } from "react-router-dom";
import { Box, Button, Heading, VStack } from "@chakra-ui/react";

const TitlePage = () => {
  const navigate = useNavigate();

  const handleStart = () => {
    navigate("/settings");
  };

  return (
    <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
      <Box bg="white" shadow="md" borderRadius="2xl" p={12} textAlign="center">
        <VStack gap={8}>
          <Heading size="2xl" color="gray.700">
            文字数しりとり
          </Heading>
          <Button size="lg" bg="gray.900" color="white" _hover={{ bg: "gray.700" }} onClick={handleStart}>
            ゲームスタート
          </Button>
        </VStack>
      </Box>
    </Box>
  );
};

export default TitlePage;
