'use client'

import {
  Flex,
  Box,
  FormControl,
  Input,
  InputGroup,
  InputRightElement,
  Stack,
  Button,
  Heading,
  Text,
  useColorModeValue,
} from '@chakra-ui/react'
import { ChangeEvent, useState } from 'react'
import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons'
import { Link, useNavigate } from 'react-router-dom'
import { API } from '@/lib/api'
import { IUserRegister } from '@/interfaces/user'



export default function SignupCard() {
  const [showPassword, setShowPassword] = useState(false)

  const [form, setForm] = useState<IUserRegister>({
    email: "",
    username: "",
    fullname: "",
    password: ""
  })

  function handleChange(event:ChangeEvent<HTMLInputElement>){
    setForm({
      ...form,
      [event.target.name] : event.target.value
    })
  }

  const navigate = useNavigate()

  async function handleRegister() {
    try {
      const response = await API.post('/auth/register', form)
      console.log("register success", response)
      navigate("/")
    } catch (err){
      console.log(err)  
    }
  }


  return (
    <Flex
      minH={'100vh'}
      align={'center'}
      justify={'center'}
      bg={useColorModeValue('gray.50', 'gray.800')}>
      <Stack spacing={8} mx={'auto'} maxW={'lg'} py={12} px={6} width={'800px'}>
        <Stack align={'center'}>
          <Heading fontSize={'6xl'} textAlign={'center'} color='green'>
            Circle
          </Heading>
          <Text fontSize={'4xl'} textAlign={'center'}>
            Create account Circle!
          </Text>
        </Stack>
        <Box
          rounded={'lg'}
          bg={useColorModeValue('white', 'gray.700')}
          boxShadow={'lg'}
          p={8}>
          <Stack spacing={4}>
            <FormControl id="fullname" isRequired>
              <Input type="fullname" placeholder='Fullname' name='fullname' onChange={handleChange}/>
            </FormControl>
            <FormControl id="username" isRequired>
              <Input type="username" placeholder='Username' name='username' onChange={handleChange}/>
            </FormControl>
            <FormControl id="email" isRequired>
              <Input type="email" placeholder='Email' name='email' onChange={handleChange}/>
            </FormControl>
            <FormControl id="password" isRequired>
              <InputGroup>
                <Input type={showPassword ? 'text' : 'password'} placeholder='Password' name='password' onChange={handleChange}/>
                <InputRightElement h={'full'}>
                  <Button
                    variant={'ghost'}
                    onClick={() => setShowPassword((showPassword) => !showPassword)}>
                    {showPassword ? <ViewIcon /> : <ViewOffIcon />}
                  </Button>
                </InputRightElement>
              </InputGroup>
            </FormControl>
            <Stack spacing={10} pt={2}>
              <Button
                type='submit'
                onClick={handleRegister}
                loadingText="Submitting"
                size="lg"
                bg={'green'}
                color={'white'}
                _hover={{
                  bg: 'green.500',
                }}>
                Sign up
              </Button> 
            </Stack>
            <Stack pt={1}>
              <Text align={'center'} onClick={()=> navigate("/")}>
                Already a user? <Link to={"/"}><Text color={'green'}>Login</Text></Link>
              </Text>
            </Stack>
          </Stack>
        </Box>
      </Stack>
    </Flex>
  )
}