
import styled from "styled-components";
import ThumbUpOutlinedIcon from "@mui/icons-material/ThumbUpOutlined";
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ThumbDownIcon from '@mui/icons-material/ThumbDown';
import ThumbDownOffAltOutlinedIcon from "@mui/icons-material/ThumbDownOffAltOutlined";
import ReplyOutlinedIcon from "@mui/icons-material/ReplyOutlined";
import AddTaskOutlinedIcon from "@mui/icons-material/AddTaskOutlined";
import Comments from "../components/Comments";
// import Card from "../components/Card";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import { dislike, fetchSuccess, like } from "../Redux/VideoSlice";
import { format } from "timeago.js";
import { subscription } from "../Redux/userSlice";
import Recommendation from "../components/Recommendation";

const Container = styled.div`
  display: flex;
  gap: 24px;
`;

const Content = styled.div`
  flex: 5;
`;
const VideoWrapper = styled.div``;

const Title = styled.h1`
  font-size: 18px;
  font-weight: 400;
  margin-top: 20px;
  margin-bottom: 10px;
  color: ${({ theme }) => theme.text};
`;

const Details = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const Info = styled.span`
  color: ${({ theme }) => theme.textSoft};
`;

const Buttons = styled.div`
  display: flex;
  gap: 20px;
  color: ${({ theme }) => theme.text};
`;

const Button = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;
  cursor: pointer;
`;

const Hr = styled.hr`
  margin: 15px 0px;
  border: 0.5px solid ${({ theme }) => theme.soft};
`;

// const Recommendation = styled.div`
//   flex: 2;
// `;


const Channel = styled.div`
  display: flex;
  justify-content: space-between;
`;

const ChannelInfo = styled.div`
  display: flex;
  gap: 20px;
`;

const Image = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 50%;
`;

const ChannelDetail = styled.div`
  display: flex;
  flex-direction: column;
  color: ${({ theme }) => theme.text};
`;

const ChannelName = styled.span`
  font-weight: 500;
`;

const ChannelCounter = styled.span`
  margin-top: 5px;
  margin-bottom: 20px;
  color: ${({ theme }) => theme.textSoft};
  font-size: 12px;
`;

const Description = styled.p`
  font-size: 14px;
`;

const Subscribe = styled.button`
  background-color: #cc1a00;
  font-weight: 500;
  color: white;
  border: none;
  border-radius: 3px;
  height: max-content;
  padding: 10px 20px;
  cursor: pointer;
`;

const VideoFrame = styled.div`
  width: 100%;
  object-fit: cover;
  max-height: 720px;
`;



function Video() {
  /* Destructuring the currentUser from the state.user object. */
  const currentUser = useSelector((state) => state.user);
  const currentVideo = useSelector((state) => state.video);
  console.log(currentVideo);
  const dispatch = useDispatch();

  const path = useLocation().pathname.split("/")[2];

  const [videos, setVideos] = useState({});
  const [channel, setChannel] = useState({});

  const handleLike = async () => {
    await axios.put(`http://localhost:5000/api/users/like/${currentVideo.id}`);
    dispatch(like(currentUser._id));
  };

  const handleDislike = async () => {
    await axios.put(`http://localhost:5000/api/users/dislike/${currentVideo._id}`);
    dispatch(dislike(currentUser._id));
  };

  const handleSub = async () => {
    currentUser.subscribedUser.includes(channel._id)
      ? await axios.put(`http://localhost:5000/api/user/unsub/${channel._id}`)
      : await axios.put(`http://localhost:5000/api/user/sub/${channel._id}`);
    dispatch(subscription(channel._id));
  };

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const videoRes = await axios.get(`http://localhost:5000/api/videos/find/${path}`);
        const channelRes = await axios.get(`http://localhost:5000/api/users/find/${videoRes.data.userId}`);
        console.log(setChannel(channelRes.data));
        dispatch(fetchSuccess(videoRes.data));
      } catch (error) {
        // console.log(error)
      }
    };
    fetchVideos();
  }, [path, dispatch]);

  return (
    <Container>
      <Content>
        <VideoWrapper>
          <VideoFrame src={currentVideo.videoUrl} controls/>
        </VideoWrapper>
        <Title>{currentVideo.title}</Title>
        <Details>
          <Info>{currentVideo.views}• {format(currentVideo.createdAt).toString()}</Info>
          <Buttons>
            <Button onClick={handleLike}>
              {currentVideo.like?.includes(currentUser._id) ? <ThumbUpIcon /> : (
                <ThumbUpOutlinedIcon />)}{""} {currentVideo.like?.length}
            </Button>
            <Button onClick={handleDislike}>
              {currentVideo.dislike?.includes(currentUser._id) ? <ThumbDownIcon /> : (
                <ThumbDownOffAltOutlinedIcon />
              )}{""}
            </Button>
            <Button>
              <ReplyOutlinedIcon /> Share
            </Button>
            <Button>
              <AddTaskOutlinedIcon /> Save
            </Button>
          </Buttons>
        </Details>
        <Hr />
        <Channel>
          <ChannelInfo>
            <Image src={channel.img} />
            <ChannelDetail>
              <ChannelName>{channel.name}</ChannelName>
              <ChannelCounter>{channel.subscribers}</ChannelCounter>
              <Description>
                {currentVideo.desc}
              </Description>
            </ChannelDetail>
          </ChannelInfo>
          <Subscribe onClick={handleSub}>
            {currentUser.SubscribedUser?.includes(channel._id)
              ? "SUBSCRIBED"
              : "SUBSCRIBE"}
          </Subscribe>
        </Channel>
        <Hr />
        <Comments videoId={currentVideo._id} />
      </Content>
      <Recommendation 
        tags={currentVideo.tags} 
      />
    </Container>
  );
}

export default Video;