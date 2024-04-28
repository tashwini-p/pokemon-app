import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Box, Button, FormControl, FormLabel, Input, Heading, useColorModeValue, useToast } from '@chakra-ui/react';

export const Login = () => {
  const navigate = useNavigate();
  const toast = useToast()
  const [loginInfo, setLoginInfo] = useState({
    email: '',
    password: ''
  });
  const crimson = useColorModeValue("crimson", "yellow");
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setLoginInfo({
      ...loginInfo,
      [name]: value
    });
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('https://pokemon-app-jf23.onrender.com/users/login', loginInfo);
      console.log(response.data);

      localStorage.setItem("accessToken", JSON.stringify(response.data.items))
      toast({
        title: 'Login sucessful.',
          status: 'success',
          duration: 500,
          isClosable: true,
      })
      navigate("/");
    } catch (error) {
      console.error('Error:', error);
      toast({
        title: 'Login failed.',
          status: 'error',
          duration: 2000,
          isClosable: true,
      })
    }
  }

  return (
    <Box textAlign="center" mt="30px" mx="auto" w="400px" p="20px" border="1px solid #ccc" borderRadius="md" bg="white" boxShadow={`0 0 10px ${crimson}`}>
      <Heading size="lg">Login</Heading>
      <form onSubmit={handleSubmit}>
        <FormControl id="email" mt="4">
          <FormLabel>Email</FormLabel>
          <Input type="email" name="email" value={loginInfo.email} onChange={handleChange} required />
        </FormControl>
        <FormControl id="password" mt="4">
          <FormLabel>Password</FormLabel>
          <Input type="password" name="password" value={loginInfo.password} onChange={handleChange} required />
        </FormControl>
        <Button type="submit" colorScheme="yellow" mt="4">Login</Button>
      </form>
    </Box>
  );
}
