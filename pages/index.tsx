import Layout from "../components/Layout";
import React from "react";
import SignIn from "./signIn";

const Auth: React.FC = () => {
  return (
    <Layout title="login">
      <SignIn />
    </Layout>
  );
};

export default Auth;
