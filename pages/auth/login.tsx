import Link from "next/link";
import { useEffect, useState, FormEventHandler } from "react";
import Button from "../../components/basic/button.component";
import Form from "../../components/form/form.component";
import InputField from "../../components/form/inputField.component";
import Navbar from "../../components/layouts/navbar.component";

interface ILoginForm {
  username: string;
  password: string;
}

const initialLoginFormData: ILoginForm = {
  username: "",
  password: "",
};

const Login = () => {
  const [loginFormData, setLoginFormData] =
    useState<ILoginForm>(initialLoginFormData);
  const [error, setError] = useState<ILoginForm>(initialLoginFormData);

  const updateLoginForm = (field: string, inputValue: string) => {
    setLoginFormData((value) => {
      return { ...value, [field]: inputValue };
    });
  };
  const updateLoginFormError = (field: string, inputValue: string) => {
    setError((value) => {
      return { ...value, [field]: inputValue };
    });
  };

  useEffect(() => {
    if (loginFormData.username.length < 3) {
      updateLoginFormError("username", "Username is too short.");
    } else {
      updateLoginFormError("username", "");
    }
    if (loginFormData.password.length < 6) {
      updateLoginFormError("password", "Password is too short.");
    } else {
      updateLoginFormError("password", "");
    }
  }, [loginFormData]);

  const handleSubmit: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    console.log(loginFormData);
  };

  return (
    <>
      <Navbar />
      <div className="m-6 h-full flex justify-center items-center">
        <Form onSubmit={handleSubmit}>
          <InputField
            label="Username"
            error={error.username}
            placeholder="Username"
            name="username"
            value={loginFormData.username}
            onChange={(e) => updateLoginForm("username", e.target.value)}
          />
          <InputField
            label="Password"
            error={error.password}
            placeholder="Password"
            name="password"
            type="password"
            value={loginFormData.password}
            onChange={(e) => updateLoginForm("password", e.target.value)}
          />
          <div className="flex flex-row items-center justify-between">
            <div>
              <Button>Login</Button>
            </div>
            <div>
              <Link href={"/auth/register"}>
                <a className="no-underline hover:underline">
                  Not yet registered?
                </a>
              </Link>
            </div>
          </div>
        </Form>
      </div>
    </>
  );
};

export default Login;
