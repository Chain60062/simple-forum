import styled from 'styled-components'

const ModalContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color:  
 rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;  

  z-index: 999;
`

const ModalContent = styled.div`
  background-color: white;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0px 0px 10px rgba(0, 0, 0,  
 0.2);
  max-width: 800px;
`

const ModalHeader = styled.h2`
  margin: 0;
  font-size: 18px;
`

const ModalBody = styled.p`
  margin: 10px 0;
`

const ModalFooter = styled.div`
  display: flex;
  justify-content: flex-end;
`

const ModalButton = styled.button`
  background-color: #007bff;
  color:  
 white;
  border: none;
  padding: 10px 20px;
  border-radius: 5px;
  cursor: pointer;
`
