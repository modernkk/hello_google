import { useRef } from 'react'
import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, ModalFooter, FormControl, FormLabel, Input, Button } from '@chakra-ui/react'
import useInput from '../hooks/useInput'

export default function AddCutModal({ isOpen, onClose, onSave }) {
  const initialRef = useRef()
  const nameInput = useInput('')
  const urlInput = useInput('')
  const handleClick = () => {
    const nameValue = nameInput.input.value
    const urlValue = urlInput.input.value
    onSave({
      name: nameValue,
      url: urlValue
    })
    nameInput.setValue('')
    urlInput.setValue('')
  }
  const handleClose = () => {
    nameInput.setValue('')
    urlInput.setValue('')
    onClose()
  }
  return (
    <>
      <Modal
        initialFocusRef={initialRef}
        isOpen={isOpen}
        onClose={handleClose}
        isCentered={true}
        closeOnOverlayClick={false}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>添加快捷方式</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <FormControl>
              <FormLabel>名称</FormLabel>
              <Input {...nameInput.input} ref={initialRef} type="text" placeholder="名称" />
            </FormControl>

            <FormControl mt={4}>
              <FormLabel>网址</FormLabel>
              <Input {...urlInput.input} type="text" placeholder="网址" />
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={handleClick}>完成</Button>
            <Button onClick={handleClose}>取消</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}