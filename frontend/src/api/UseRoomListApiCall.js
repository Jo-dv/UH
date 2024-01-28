import axios from "axios";

const UseRoomListApiCall = () => {
  return axios.get("http://localhost:5000/rooms").then((response) => {
    console.log(response.data);
    return response.data;
  });
};

export default UseRoomListApiCall;
