import React, { useCallback } from "react";
import AuthForm from "../../components/auth-form";
import { useDispatch } from "react-redux";
import { onAuth } from "../../store/authSlice/authSlice";

const Auth = () => {
  const dispatch = useDispatch();

  const callbacks = {
    onAuth: useCallback((data) => dispatch(onAuth(data))),
  };
  return (
    <>
      <AuthForm onAuth={callbacks.onAuth} />
    </>
  );
};

export default Auth;
