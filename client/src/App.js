import React from "react";
import { BrowserRouter, Route } from "react-router-dom";
import Header from "./components/header.js";
import NavBar from "./components/Navigation/NavBar.js";
import HomeScreen from "./screens/HomeScreen.js";
import QuizScreen from "./screens/QuizScreen.js";
import PlatformScreen from "./screens/PlatformScreen.js";
import CreatePlatform from "./screens/CreatePlatform.js";
import Categories from "./components/CategoriesCard/Categories.js"
import MyPage from "./screens/Mypage.js";
import Search from "./screens/SearchScreen.js";
import CreateQuiz from "./screens/CreateQuiz.js";
import Help from "./screens/Help.js";
import CreateQuestion from "./screens/CreateQuestion.js";
import EditPlatform from "./screens/EditPlatform.js";
import ProfileSetting from "./screens/ProfileSetting.js";
import StoreScreen from "./screens/StoreScreen.js"
import LeaderboardScreen from "./screens/LeaderboardScreen.js";


function App() {
  return (
    <BrowserRouter>
      <div className="grid-container">
        <NavBar></NavBar>
        
          <Header />
          <main>
          <Route path="/quiz/:quizId" component={QuizScreen}></Route>
          <Route path="/platform/:id" component={PlatformScreen}></Route>
          <Route path="/CreatePlatform" component={CreatePlatform}></Route>
          <Route path="/categories" component={Categories}></Route>
          <Route path="/" component={HomeScreen} exact></Route>
          <Route path="/mypage" component={MyPage}></Route>
          <Route path="/search" component={Search}></Route>
          <Route path="/help" component={Help}></Route>
          <Route path="/CreateQuiz/:platformId" component={CreateQuiz}></Route>
          <Route path="/CreateQuestion/:quizId" component={CreateQuestion}></Route>
          <Route path="/EditPlatform/:platformId" component={EditPlatform}></Route>
          <Route path="/ProfileSetting/:userId" component={ProfileSetting}></Route>
          <Route path="/store" component={StoreScreen}></Route>
          <Route path="/leaderboard" component={LeaderboardScreen}></Route>
          </main>
        
      </div>
    </BrowserRouter>
  );
}

export default App;
