
import { useState } from "react";
import GameLogin from "./webSocketTest/GameLogin";
import GameScreen from "./webSocketTest/GameScreen";
import GameInviteOrParticipation from "./webSocketTest/GameInviteOrParticipation";

const GamePage = () => {
  const [isLogin, setIsLogin] = useState(false); // 로그인 여부
  const [isGameStart, setIsGameStart] = useState(false); // 게임 시작
  const [member,setMember] = useState({
    id:"",
    name:"",
    email:""
  });
  
  
  return <>
  
  {
  // 1. 로그인이 되지 않았다면 로그인 화면 출력.
  !isLogin ?   
  <GameLogin 
  isLogin = {isLogin}
  setIsLogin = {setIsLogin}
  setMember={setMember}
  />
  
  
  // 2. 로그인을 했고, 게임 시작을 진행하지 않았다면 게임초대혹은입장장 화면 출력.
  : !isGameStart ? 
  <GameInviteOrParticipation 
  isGameStart = {isGameStart}
  setIsGameStart = {setIsGameStart}
  member = {member}
  
  />

  // 3. 게임 시작이 되면 게임 화면 출력.
  : <GameScreen />}
  
  
  </>;
};

export default GamePage;
