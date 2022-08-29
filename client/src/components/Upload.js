import React from 'react'
import styled from 'styled-components';

const Container = styled.div`
    height: 100%;
    width: 100%;
    position: absolute;
    top: 0;
    left: 0;
    background-color: #000000af;
    display: flex;
    justify-content: center;
    align-items: center;
`;
const Wrapper = styled.div`
    width: 600px;
    height: 600px;
    display: flex;
    position: relative;
    gap: 20px;
    flex-direction: column;
    padding: 20px;
    color: ${({ theme}) => theme.text};
    background-color: ${({theme}) => theme.bgLighter };
`;
const Close = styled.button`
    position: absolute;
    top: 10px;
    cursor: pointer;
    right: 10px;
`;
const Title = styled.h1`
    
`;

const Upload = ({setOpen}) => {
  return (
    <Container>
        <Wrapper>
            <Close onClick={()=>setOpen(false)}>X</Close>
            <Title>Upload</Title>
        </Wrapper>
    </Container>
  )
}

export default Upload;