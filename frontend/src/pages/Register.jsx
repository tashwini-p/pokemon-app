import { useState } from 'react';
import axios from 'axios';
import { Box, Button, FormControl, FormLabel, Input, Heading, useColorModeValue } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';

export const Register = () => {
  const [userInfo, setUserInfo] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const navigate = useNavigate();
  const crimson = useColorModeValue("crimson", "yellow");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserInfo({
      ...userInfo,
      [name]: value
    });
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:8080/users/register', userInfo);
      console.log(response.data);
      alert("user registered successfully!");
      navigate('/login');
    } catch (error) {
      console.error('Error:', error);
    }
  }

  return (
    <Box textAlign="center" mt="30px" mx="auto" w="400px" p="20px" border="1px solid #ccc" borderRadius="md" bg="white" boxShadow={`0 0 10px ${crimson}`}>
      <Heading size="lg">Registration Form</Heading>
      <form onSubmit={handleSubmit}>
        <FormControl id="username" mt="4">
          <FormLabel>Username</FormLabel>
          <Input type="text" name="username" value={userInfo.username} onChange={handleChange} required />
        </FormControl>
        <FormControl id="email" mt="4">
          <FormLabel>Email</FormLabel>
          <Input type="email" name="email" value={userInfo.email} onChange={handleChange} required />
        </FormControl>
        <FormControl id="password" mt="4">
          <FormLabel>Password</FormLabel>
          <Input type="password" name="password" value={userInfo.password} onChange={handleChange} required />
        </FormControl>
        <FormControl id="confirmPassword" mt="4">
          <FormLabel>Confirm Password</FormLabel>
          <Input type="password" name="confirmPassword" value={userInfo.confirmPassword} onChange={handleChange} required />
        </FormControl>
        <Button type="submit" colorScheme="yellow" mt="4">Register</Button>
      </form>
    </Box>
  )
}
