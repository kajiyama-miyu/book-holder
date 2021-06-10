import { useCallback, useState } from "react";
import { Login } from "../type/type";
import {
  Card,
  CardContent,
  Grid,
  Typography,
  makeStyles,
  createStyles,
} from "@material-ui/core";
import TextInput from "./TextInput";
import { signInValidation } from "../lib/validation";
import axios from "axios";
import { useRouter } from "next/router";

type Props = {
  setStatus: (open: boolean) => void;
  isLogin: boolean;
};

type Form = {
  info: Login;
};

type Error = {
  message: Login;
};

const useStyles = makeStyles((theme) =>
  createStyles({
    errorColor: {
      color: "red",
    },
  })
);

const UserForm: React.FC<Props> = (props) => {
  const router = useRouter();
  const classes = useStyles();
  const { setStatus, isLogin } = props;
  const [form, setForm] = useState<Form>({
      info: {
        email: "",
        password: "",
      },
    }),
    [error, setError] = useState<Error>({
      message: {
        email: "",
        password: "",
      },
    });

  const handleSetValue = (event: React.ChangeEvent<HTMLInputElement>) => {
    const key = event.target.name;
    const value = event.target.value;

    setForm({
      info: { ...form.info, [key]: value },
    });
    setError({
      message: {
        ...error.message,
        [key]: signInValidation(key, value),
      },
    });
  };

  const canSubmit = (): boolean => {
    const validInfo =
      Object.values(form.info).filter((value) => {
        return value === "";
      }).length === 0;
    const validMessage =
      Object.values(error.message).filter((value) => {
        return value === "";
      }).length === 0;
    return validInfo || validMessage;
  };

  const signIn = async () => {
    await axios
      .post<string>(`${process.env.NEXT_PUBLIC_RESTAPI_URL}login`, {
        email: form.info.email,
        password: form.info.password,
      })
      .then((res) => {
        const token = res.data;
        console.log("login !");

        if (!res.data) {
          alert("ユーザーが存在しません。ユーザー登録してください。");
        }
        localStorage.setItem("token", token);

        router.push("/home");
      })
      .catch(() => {
        alert("メールアドレスまたはパスワードが間違っています");
      });
  };

  //ユーザー登録したらそのままログイン処理してホーム画面に遷移する。
  const signUp = async () => {
    if (isLogin) {
      signIn();
    } else {
      await axios
        .post(`${process.env.NEXT_PUBLIC_RESTAPI_URL}signUp`, {
          email: form.info.email,
          password: form.info.password,
        })
        .then(() => {
          console.log("登録成功！");
          signIn();
          setForm({ info: { email: "", password: "" } });
        })
        .catch(() => {
          alert(
            "アカウントの登録に失敗しました。もう一度登録し直してください。"
          );
        });
    }
  };

  return (
    <>
      <div className="rounded-md shadow-sm ">
        <Card className="w-full">
          <CardContent>
            <div className="mb-7">
              <TextInput
                fullwidth={true}
                label={"email"}
                multiline={false}
                name={"email"}
                required={true}
                rows={1}
                value={form.info.email}
                type={"text"}
                onChange={(e) => handleSetValue(e)}
                autoComplete={"off"}
                placeholder={"email"}
                helperText={error.message.email && error.message.email}
                FormHelperTextProps={{ className: classes.errorColor }}
              />
              <TextInput
                fullwidth={true}
                label={"password"}
                name={"password"}
                multiline={false}
                required={true}
                rows={1}
                value={form.info.password}
                type={"password"}
                onChange={(e) => handleSetValue(e)}
                autoComplete={"off"}
                placeholder={"password"}
                helperText={error.message.password && error.message.password}
                FormHelperTextProps={{ className: classes.errorColor }}
              />
            </div>
          </CardContent>
        </Card>
      </div>

      <Grid container alignItems="center" justify="center">
        <Grid item>
          <Typography
            onClick={() => setStatus(!isLogin)}
            component="p"
            variant="inherit"
            className="cursor-pointer font-medium hover:text-yellow-500"
          >
            {isLogin ? "Sign up ?" : "Login ?"}
          </Typography>
        </Grid>
      </Grid>

      <button
        className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-yellow-300 hover:bg-yellow-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-200"
        type="submit"
        disabled={!canSubmit()}
        onClick={() => signUp()}
      >
        <span className="absolute left-0 inset-y-0 flex items-center text-center pl-3">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 text-yellow-100 group-hover:text-yellow-300"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4"
            />
          </svg>
        </span>
        {isLogin ? "Login" : "SignUp"}
      </button>
    </>
  );
};

export default UserForm;
