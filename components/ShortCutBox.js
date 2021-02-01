import { Box, IconButton, HStack, Text, Image, useToast, useDisclosure } from '@chakra-ui/react'
import { AiOutlinePlus, AiOutlineMinus } from "react-icons/ai";
import styled from "@emotion/styled"
import AddCutModal from './AddCutModal'
import { useEffect, useState } from 'react';

const ClickableWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  position: relative;
  width: 112px;
  height: 112px;
  border-radius: 5px;
  &:hover {
    background-color: #DDD;
    cursor: pointer;
  }
`
function isValidShortCut(newItem, shortCut) {
  const { url } = newItem
  const filteredArray = shortCut.filter(item => item.url === url)
  if (filteredArray.length > 0) {
    return false
  }
  return true
}

export default function ShortCutBox() {
  const toast = useToast()
  const { isOpen, onClose, onOpen } = useDisclosure()
  const [shortCut, setShortCut] = useState([])
  const [showDel, setShowDel] = useState({})
  useEffect(() => {
    const shortCutStorage = window.localStorage.getItem('shortCut')
    if (shortCutStorage) {
      setShortCut(JSON.parse(shortCutStorage))
    }
  }, [])
  const handleModalSave = ({ name, url }) => {
    const newItem = { name, url }
    if (isValidShortCut(newItem, shortCut)) {
      const newShort = [...shortCut, newItem]
      setShortCut(newShort)
      window.localStorage.setItem('shortCut', JSON.stringify(newShort))
    } else {
      toast({
        position: "bottom-left",
        render: () => (
          <Box color="white" p={3} bg="blue.500">
            无法创建快捷方式
          </Box>
        )
      })
    }
    onClose()
  }
  const handleDelShortCut = ({ url }) => {
    const filtered = shortCut.filter(item => item.url !== url)
    setShortCut(filtered)
    window.localStorage.setItem('shortCut', JSON.stringify(filtered))
  }
  const handleClickShortCut = ({ url }) => {
    window.location.href = url
  }
  const handleMouseEnter = (item) => {
    setShowDel({
      [item.url]: true
    })
  }
  const handleMouseLeave = (item) => {
    setShowDel({
      [item.url]: false
    })
  }
  return (
    <Box width="560px" mx="auto" mt="30px">
      <HStack justifyContent="center" spacing={2} flexWrap="wrap">
        <ClickableWrapper onClick={onOpen}>
          <IconButton
            aria-label="Add"
            size="lg"
            bgColor="#EEE"
            borderRadius="50%"
            icon={<AiOutlinePlus />}
          />
          <Text fontSize="13px" mt={2} color="black" fontWeight={400}>添加快捷方式</Text>
        </ClickableWrapper>
        {
          shortCut.map((item, i) => (
            <ClickableWrapper
              key={i}
              onMouseLeave={() => handleMouseLeave(item)}
              onMouseEnter={() => handleMouseEnter(item)}>
              { showDel[item.url] ?
                <IconButton
                  aria-label="Add"
                  position="absolute"
                  right={"-5px"}
                  colorScheme="transparent"
                  color="black"
                  top={0}
                  onClick={() => handleDelShortCut(item)}
                  icon={<AiOutlineMinus />} /> : null}
              <IconButton
                onClick={() => handleClickShortCut(item)}
                aria-label="Add"
                size="lg"
                bgColor="#EEE"
                borderRadius="50%"
                icon={<Image src={`https://api.clowntool.cn/getico/?url=${item.url}`} width="24px" height="24px" />}
              />
              <Text fontSize="13px" mt={2} color="black" fontWeight={400}>{item.name}</Text>
            </ClickableWrapper>))
        }
      </HStack>
      <AddCutModal
        isOpen={isOpen}
        onSave={handleModalSave}
        onClose={onClose} />
    </Box>
  )
}
