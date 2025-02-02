import { useState } from "react";
import "./App.css";
import Auth from "./containers/auth";
import { useSelector } from "react-redux";
import ChatSidebar from "./containers/chat-sidebar";
import ChatWindow from "./containers/chat";
import Chat from "./containers/chat";

function App() {
  const isAuth = useSelector((state) => state.auth.isAuth);

  return (
    <div className="App">
      {isAuth ? (
        <>
          <Chat />
        </>
      ) : (
        <Auth />
      )}
    </div>
  );
}

export default App;
