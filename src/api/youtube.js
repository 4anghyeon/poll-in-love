import axios from 'axios';

export const getRandomPlayListItem = async () => {
  const {data} = await axios.get(
    `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&playlistId=PLhq-TG_Ot68BvQwgav2b8HR4qtNDsF-1Z&maxResults=50&key=${process.env.REACT_APP_YOUTUBE_API_KEY}`,
  );
  return data.items[new Date().getSeconds() % data.items.length].snippet.resourceId.videoId;
};
