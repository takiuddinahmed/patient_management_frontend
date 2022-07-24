import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState, FormEventHandler } from "react";
import {
  ILoginForm,
  initialLoginFormData,
  loginApi,
} from "../../api_calls/user/login.api";
import Button from "../../components/basic/button.component";
import Form from "../../components/form/form.component";
import InputField from "../../components/form/inputField.component";
import Navbar from "../../components/layouts/navbar.component";

const Login = () => {
  const router = useRouter();
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
    if (loginFormData.email.length < 3) {
      updateLoginFormError("email", "Email is not valid.");
    } else {
      updateLoginFormError("email", "");
    }
    if (loginFormData.password.length < 6) {
      updateLoginFormError("password", "Password is too short.");
    } else {
      updateLoginFormError("password", "");
    }
  }, [loginFormData]);

  const handleSubmit: FormEventHandler<HTMLFormElement> = async (e) => {
    // e.preventDefault();
    console.log(loginFormData);
    try {
      const data = await loginApi(loginFormData);
      if (data) {
        router.push("/");
      } else {
        alert("Unable to login");
      }
    } catch (err) {
      alert("Unable to login");
    }
  };

  return (
    <>
      <Navbar />
      <div className="m-6 h-full flex justify-center items-center">
        <Form onSubmit={handleSubmit}>
          <InputField
            label="Email"
            error={error.email}
            placeholder="Email"
            name="email"
            value={loginFormData.email}
            onChange={(e) => updateLoginForm("email", e.target.value)}
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
              <Button type="submit">Login</Button>
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
