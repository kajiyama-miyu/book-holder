import "../styles/globals.css";
import { AppProps } from "next/app";
import "tailwindcss/tailwind.css";
import { ThemeProvider } from "@material-ui/core/styles";
import theme from "../styles/theme";
import { useEffect } from "react";
import { CssBaseline } from "@material-ui/core";
import Head from "next/head";

function MyApp({ Component, pageProps }: AppProps) {
  useEffect(() => {
    const jssStyles = document.querySelector("#jss-server-side");
    if (jssStyles) {
      jssStyles.parentElement.removeChild(jssStyles);
    }
  }, []);

  return (
    <>
      <Head>
        <title>My page</title>
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width"
        />
      </Head>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Component {...pageProps} />
      </ThemeProvider>
    </>
  );
}

export default MyApp;
