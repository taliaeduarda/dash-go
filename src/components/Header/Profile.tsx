import { Flex, Text, Box, Avatar } from "@chakra-ui/react";

interface ProfilePros {
  showProfileData?: boolean;
}

export function Profile({ showProfileData = true }: ProfilePros) {
  return (
    <Flex align="center">
      {showProfileData && (
        <Box mr="4" textAlign="right">
          <Text>Talia Eduarda</Text>
          <Text color="gray.300" fontSize="small">
            talia@gmail.com
          </Text>
        </Box>
      )}

      <Avatar
        size="md"
        name="Talia Eduarda"
        src="https://github.com/taliaeduarda.png"
      />
    </Flex>
  );
}
