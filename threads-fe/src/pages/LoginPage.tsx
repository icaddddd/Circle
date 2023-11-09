'use client'

import { IUserLogin } from '@/interfaces/user'
import { API } from '@/lib/api'
import { AUTH_LOGIN } from '@/stores/rootReducer'
import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons'
import {
  Box,
  Button,
  Flex,
  FormControl,
  Heading,
  Input,
  InputGroup,
  InputRightElement,
  Stack,
  Text,
  useColorModeValue,
} from '@chakra-ui/react'
import { ChangeEvent, useState } from 'react'
import { useDispatch } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'


export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false)

  const [form, setForm] = useState<IUserLogin>({
    email: "",
    password: ''
  })

  function handleChange(event:ChangeEvent<HTMLInputElement>){
    setForm({
      ...form,
      [event.target.name] : event.target.value
    })
  }

  const navigate = useNavigate()
  async function handleLogin() {
    try {
      const response = await API.post('/auth/login', form)
      dispatch(AUTH_LOGIN(response.data))
      console.log("login success", response)
      // localStorage.setItem("token", response.data.token)
      // setAuthToken(localStorage.token)
      navigate('/home')
    } catch (err){
      console.log(err)
    }
  }
  const dispatch = useDispatch()

  
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
            Login to Circle
          </Text>
        </Stack>
        <Box
          rounded={'lg'}
          bg={useColorModeValue('white', 'gray.700')}
          boxShadow={'lg'}
          p={8}>
          <Stack spacing={4}>
            <FormControl id="email">
              <Input type="email" placeholder='Email' name='email'onChange={handleChange}/>
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
            <Stack spacing={6}>
              <Stack
                direction={{ base: 'column', sm: 'row' }}
                align={'start'}
                justify={'space-between'}>
                <Text color={'green'}>Forgot password?</Text>
              </Stack>
              <Button
               type='submit'
               onClick={handleLogin}
                bg={'green'}
                color={'white'}
                _hover={{
                  bg: 'green.500',
                }}>
                Sign in
              </Button>
            </Stack>
            <Stack pt={1}>
              <Text align={'center'}>
                Don't have account yet? <Link to={"/register"}><Text color={'green'}>Create Account</Text></Link>
              </Text>
            </Stack>
          </Stack>
        </Box>
      </Stack>
    </Flex>
  )
}