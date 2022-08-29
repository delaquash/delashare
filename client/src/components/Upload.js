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
    text-align: center;
`;

const Input = styled.input`
    border: 1px solid ${({ theme })=> theme.soft};
    color: ${({ theme }) => theme.text};
    background-color: transparent;
    border-radius: 3px;
    padding: 10px;
`;
const Description = styled.textarea`
    border: 1px solid ${({ theme })=> theme.soft};
    color: ${({ theme }) => theme.text};
    background-color: transparent;
    border-radius: 3px;
    padding: 10px;
`;

const Button = styled.button`
    padding: 10px 20px;
    border-radius: 3px;
    border: none;
    font-weight: 500;
    cursor: pointer;
    background-color: ${({theme}) => theme.soft};
    color: ${({theme}) => theme.textSoft};
`;

const Label = styled.label`
    font-size: 15px;
`;

const Upload = ({setOpen}) => {
  return (
    <Container>
        <Wrapper>
            <Close onClick={()=>setOpen(false)}>X</Close>
            <Title>Upload New Video</Title>
            <Label>Video:</Label>
            <Input type="file" accept="video/*" />
            <Input type="text" placeholder="Title" />
            <Description  rows={8} />  
            <Label>Image:</Label>
            <Input type="text" placeholder="Sepatate tags with commas" />
            <Input type="file" accept="image/*" />
            <Button>Upload</Button>
        </Wrapper>
    </Container>
  )
}

export default Upload;