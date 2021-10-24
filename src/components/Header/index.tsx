import { Flex, useBreakpointValue, IconButton, Icon } from "@chakra-ui/react";

import { Profile } from "./Profile";
import { NotificationsNav } from "./NotificationsNav";
import { SearchBox } from "./SearchBox";
import { Logo } from "./Logo";
import { RiMenuLine } from "react-icons/ri";

export function Header() {
  const isWideVersion = useBreakpointValue({
    base: false,
    lg: true,
  })
  return (
    <Flex
      as="header"
      w="100%"
      // maxWidth={1480}
      h="20"
      mx="auto"
      bg="white.100"
      // mt="4"
      px="6"
      align="center"
    >
      { !isWideVersion && (
        <IconButton
          aria-label="Open navigation"
          icon={<Icon as={RiMenuLine} />}
          fontSize="24"
          variant="unstyled"
          // onClick={onOpen}
          mr="2"
        >

        </IconButton>
      )}

      <Logo />
      
      { isWideVersion && <SearchBox /> }

      <Flex align="center" ml="auto">
        <NotificationsNav />
        <Profile showProfileData={isWideVersion} />
      </Flex>
    </Flex>
  );
}
