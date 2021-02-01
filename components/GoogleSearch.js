import { Box, VStack, InputGroup, InputLeftElement, Input, InputRightElement } from '@chakra-ui/react'
import Image from 'next/image'
import { AiOutlineSearch, AiFillAudio } from "react-icons/ai";

export default function GoogleSearch() {
  return <Box maxW={1200} mx="auto" mt={165}>
    <VStack spacing="40px">
      <Image src={'/google_logo.svg'} width="272px" height="92px" />
      <InputGroup width="560px">
        <InputLeftElement
          pointerEvents="none"
          color="gray.300"
          fontSize="1.2em"
          children={<AiOutlineSearch />}
        />
        <Input borderRadius={"1.5rem"} placeholder="在google上搜索，或者输入一个网址" />
        <InputRightElement children={<AiFillAudio color="green.500" />} />
      </InputGroup>
    </VStack>
  </Box>
}