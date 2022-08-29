import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react';
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
    const [ img, setImg ] = useState(undefined)
    const [ vid, setVid ] = useState(undefined)
    const [ imgPercentage, setImgPrcentage] = useState(0)
    const [ vidPercentage, setVidPercentage ] = useState(0)
    const [ title, setTitle ] = useState("")
    const [ desc, setDesc ] = useState("")
    const [ tags, setTags ] = useState([])

const handleTags = (e) => {
    setTags(e.target.value.split(","));
}

const uploadFile=() => {

}

useEffect(() => {
    uploadFile(vid)
}, [vid])

useEffect(() => {
    uploadFile(img)
}, [img])


  return (
    <Container>
        <Wrapper>
            <Close onClick={()=>setOpen(false)}>X</Close>
            <Title>Upload New Video</Title>
            <Label>Video:</Label>
            <Input 
                type="file" 
                onChange={(e) =>setVid(e.target.files[0])}
                accept="video/*" />
            <Input 
                type="text" 
                onChange={(e)=> setTitle(e.target.value)}
                placeholder="Title" />
            <Description  
                onChange={(e)=> setDesc(e.target.value)}
                rows={8} />  
            <Label>Image:</Label>
            <Input type="text" 
                placeholder="Separate tags with commas"
                onClick={handleTags} 
            />
            <Input 
                type="file"
                onChange={(e)=> setImg(e.target.files[0])} 
                accept="image/*" />
            <Button>Upload</Button>
        </Wrapper>
    </Container>
  )
}

export default Upload;