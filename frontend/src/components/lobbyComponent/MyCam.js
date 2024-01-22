import CommonModal from "./CommonModal";
import Webcam from "react-webcam";
import WebcamComponent from "./Webcam";
const MyCam = (props) => {
  
  return(
    <div className="ml-2 mr-2 mb-2 p-2 p-2 col-start-1 col-end-3 row-start-8 row-end-12 rounded-md border">
        <p>{ props.nickname }</p>
        <div className="p-2">
          <WebcamComponent/>
        </div>
        <div>
          <p onClick={()=>{}}>카메라</p> 
          <p onClick={()=>{}}>음소거</p>
        </div>
      </div>
  )
}

export default MyCam;