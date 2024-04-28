import {
  Box,
  Flex,
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuDivider,
  Stack,
  IconButton,
  Image,
  Text,
  useToast,
} from "@chakra-ui/react";
import { HamburgerIcon, CloseIcon } from "@chakra-ui/icons";
import { NavLink, useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";

export default function Navbar() {
  // const { colorMode, toggleColorMode } = useColorMode();
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const token = localStorage.getItem("accessToken") || "";
  const toast = useToast()

  const handleToggle = () => setIsOpen(!isOpen);

  const handleLogout = async () => {
    try {
      const accessToken = JSON.parse(localStorage.getItem("accessToken"));
      await axios.post("https://pokemon-app-jf23.onrender.com/users/logout", null, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      localStorage.removeItem("accessToken");
      toast({
        title: 'Logout sucessful.',
          status: 'success',
          duration: 500,
          isClosable: true,
      })
      navigate("/login");
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <>
      <Box bg={"crimson"} px={4} color={"white"} padding={2}>
        <Flex h={16} alignItems={"center"} justifyContent={"space-between"}>
          <Flex gap={8} alignItems={"center"}>
            <Box width={"300px"}>
              <NavLink to={"/"}>
                <Image
                  src="https://static.vecteezy.com/system/resources/previews/027/127/571/original/pokemon-logo-pokemon-icon-transparent-free-png.png"
                  alt="Pokemon Logo"
                  boxSize="100px"
                  width={"200px"}
                />
              </NavLink>
            </Box>
          </Flex>
          <Flex alignItems={"center"}>
            <Stack direction={"row"} spacing={7} alignItems="center">
              {/* <Button
                onClick={toggleColorMode}
                display={{ base: "none", md: "none", lg: "block" }}
              >
                {colorMode === "light" ? <MoonIcon /> : <SunIcon />}
              </Button> */}
              {token ? (
                <>
                  {/* <Button width={{base:"50px", md:"100px"}} bg={"#ecc94b"} onClick={()=>{navigate("/")}}>
                    <svg xmlns="http://www.w3.org/2000/svg" height="80" viewBox="0 -960 960 960" width="80"><path d="M229-189h124v-258h254v258h124v-377L480-754 229-565.67V-189Zm-94 94v-518l345-259 346 259v518H524v-269h-88v269H135Zm345-377Z"/></svg>
                  </Button> */}
                  <Button
                    variant="solid"
                    colorScheme="yellow"
                    display={{ base: "none", md: "block" }}
                    textAlign="center"
                    lineHeight="1.5"
                    borderRadius="md"
                    px="4"
                    py="2"
                    width="100%"
                    onClick={handleLogout}
                  >
                    Logout
                  </Button>
                  <Flex
                    display={{ base: "none", md: "block" }}
                    alignItems="center"
                    justifyContent="center"
                    borderRadius="md"
                    px="4"
                    py="2"
                    width="100%"
                  >
                    <Text mr="2">Welcome</Text>
                    <Text>
                      {JSON.parse(atob(token.split(".")[1])).data.username}!
                    </Text>
                  </Flex>
                </>
              ) : (
                <>
                  <Button
                    as={NavLink}
                    to="/login"
                    variant="solid"
                    colorScheme="yellow"
                    display={{ base: "none", md: "block" }}
                    textAlign="center"
                    lineHeight="1.5"
                    borderRadius="md"
                    px="4"
                    py="2"
                    width="100%"
                  >
                    Login
                  </Button>
                  <Button
                    as={NavLink}
                    to="/register"
                    variant="solid"
                    colorScheme="yellow"
                    display={{ base: "none", md: "block" }}
                    textAlign="center"
                    lineHeight="1.5"
                    borderRadius="md"
                    px="4"
                    py="2"
                    width="100%"
                  >
                    Register
                  </Button>
                </>
              )}

              <Menu>
                <MenuButton
                  as={Button}
                  rounded={"full"}
                  variant={"link"}
                  cursor={"pointer"}
                  minW={0}
                  display={{ base: "none", md: "block" }}
                >
                  {/* Avatar removed */}
                </MenuButton>
                <MenuList alignItems={"center"}>
                  {/* Avatar removed */}
                  <MenuDivider />
                  <MenuItem>Your Servers</MenuItem>
                  <MenuItem>Account Settings</MenuItem>
                  {/* <MenuItem onClick={()=>{dispatch(LogoutAction())}}>Logout</MenuItem> */}
                </MenuList>
              </Menu>

              {/* Hamburger Icon for Medium and Small Screens */}
              <IconButton
                display={{ base: "block", md: "none" }}
                onClick={handleToggle}
                icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
                variant="ghost"
                aria-label="Toggle Menu"
              />
            </Stack>
          </Flex>
        </Flex>
        {/* Responsive Dropdown Menu */}
        {isOpen && (
          <Box pb={4} display={{ base: "block", md: "none" }}>
            <Stack spacing={4}>
              {token ? (
                <>
                  <Button
                    variant="ghost"
                    colorScheme="white"
                    textAlign="center"
                    onClick={handleLogout}
                  >
                    Logout
                  </Button>
                </>
              ) : (
                <>
                  <Button
                    as={NavLink}
                    to="/login"
                    variant="ghost"
                    colorScheme="white"
                    textAlign="center"
                  >
                    Login
                  </Button>
                  <Button
                    as={NavLink}
                    to="/register"
                    variant="ghost"
                    colorScheme="white"
                    textAlign="center"
                  >
                    Register
                  </Button>
                </>
              )}
              <Button color={"white"} onClick={()=>{navigate("/")}} variant="ghost">
                Home
              </Button>
            </Stack>
          </Box>
        )}
      </Box>
    </>
  );
}
