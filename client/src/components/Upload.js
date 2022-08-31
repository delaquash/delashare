import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react';
import styled from 'styled-components';
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import app from '../firebase';

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
    const [ input, setInput ] = useState({})
    // const [ desc, setDesc ] = useState("")
    const [ tags, setTags ] = useState([])

const handleInputChange =(e)=> {
   /* A function that takes the previous state and returns a new state. */
    setInput((prev) => {
        return {...prev, [e.target.name]: e.target.value}
    })
}    

const handleTags = (e) => {
    setTags(e.target.value.split(","));
}

const uploadFile=(file, urlType) => {
    const storage = getStorage(app);
    const fileName = new Date().getTime() + file.name
    // Upload file and metadata to the object 'images/mountains.jpg'
    const storageRef = ref(storage, fileName)
    const uploadTask = uploadBytesResumable(storageRef, file);
    uploadTask.on('state_changed',
        (snapshot) => {
            // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
            const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            urlType === "imgUrl" ? setImgPrcentage(progress) : setVidPercentage(progress) 
            switch (snapshot.state) {
            case 'paused':
                console.log('Upload is paused');
                break;
            case 'running':
                console.log('Upload is running');
                break;
                default:
                break;
            }
        }, 
        (error) => {
            console.log(error);
        },
        () => {
            // Upload completed successfully, now we can get the download URL
            getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                setInput((prev) => {
                    return {...prev, [urlType]: downloadURL}
                })
            });
          }
    )
}



useEffect(() => {
   vid && uploadFile(vid, "vidUrl")
}, [vid])

useEffect(() => {
    img && uploadFile(img, "imgUrl")
}, [img])


  return (
    <Container>
        <Wrapper>
            <Close onClick={()=>setOpen(false)}>X</Close>
            <Title>Upload New Video</Title>
            <Label>Video:</Label>
            {vidPercentage > 0 ? (
                "Uploading" + vidPercentage + "%"
            ): (
                <Input 
                type="file" 
                onChange={(e) =>setVid(e.target.files[0])}
                accept="vid/*" />
            )}
            <Input 
                type="text"
                name="title" 
                onChange={handleInputChange}
                placeholder="Title" />
            <Description
                placeholder='Description....'
                name="description"  
                onChange={handleInputChange}
                rows={8} /> 
            <Input type="text" 
                placeholder="Separate tags with commas"
                onClick={handleTags} 
            />
            <Label>Image:</Label>
            {imgPercentage > 0 ? (
                "Uploading" + imgPercentage + "%"
            ): <Input 
                type="file"
                onChange={(e)=> setImg(e.target.files[0])} 
                accept="image/*" />
            }
            <Button>Upload</Button>
        </Wrapper>
    </Container>
  )
}

export default Upload;