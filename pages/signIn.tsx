import { useState, useCallback } from "react";
import UserForm from "../components/UserForm";

const SignIn: React.FC = () => {
  const [isLogin, setIsLogin] = useState(true);
  const handleStatus = useCallback((open: boolean) => {
    setIsLogin(open);
  }, []);
  return (
    <>
      <div className="max-w-md w-full space-y-8">
        <h2 className="text-center text-3xl font-extrabold">
          {isLogin ? "Login" : "Sign Up"}
        </h2>
        <div className="h-10" />
        <UserForm setStatus={handleStatus} isLogin={isLogin} />
      </div>
    </>
  );
};

export default SignIn;
