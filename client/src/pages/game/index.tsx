import Card from "./webSocketTest/Card";
import WebSocketTest from "./webSocketTest/WebSocketTest";

const GamePage = () => {
  return <>
  <div className="flex justify-center bg-[#EDF0FF] w-[100vw] h-[100vh] gap-10 p-5">
    {/* 좌측 보라색 박스 */}
    <div className="bg-[#A1A7FF] w-[60%] rounded-xl grid grid-cols-3 gap-2 p-2">
      <Card 
        id="1" 
        type="answer" 
        content="스레드야스레드" />
     
    </div>
    
    {/* 우측 흰색 박스의 컨테이너 */}
    <div className="flex flex-col w-[40%] h-[100%] gap-5">
      {/* 우측 흰색 박스 1 */}
    <div className="bg-white w-full h-full p-5 rounded-xl">
      <span className="text-2xl font-bold">2P</span>
    </div>
    {/* 우측 흰색 박스 2 */}
    <div className="bg-white w-full h-full p-5 rounded-xl">
    <span className="text-2xl font-bold">1P</span>
    </div>
    </div>
  </div>
  </>;
};

export default GamePage;
