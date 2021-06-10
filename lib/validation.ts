export const emailValidation = (email: string): string => {
  if (!email) return "メールアドレスを入力してください";

  const regex = /^[A-Za-z0-9]{1}[A-Za-z0-9_.-]*@{1}[A-Za-z0-9_.-]{1,}\.[A-Za-z0-9]{1,}$/;
  if (!regex.test(email)) return "正しい形式でメールアドレスを入力してください";

  return "";
};

export const passwordValidation = (password: string): string => {
  if (!password) return "パスワードを入力してください";

  return "";
};

export const signInValidation = (type: string, value: string) => {
  switch (type) {
    case "email":
      return emailValidation(value);
    case "password":
      return passwordValidation(value);
  }
};
