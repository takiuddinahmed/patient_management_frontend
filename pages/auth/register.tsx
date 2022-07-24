import Link from "next/link";
import { useEffect, useState, FormEventHandler } from "react";
import Button from "../../components/basic/button.component";
import Form from "../../components/form/form.component";
import InputField from "../../components/form/inputField.component";
import SelectField from "../../components/form/select.component";
import Main from "../../components/layouts/main.component";
import Navbar from "../../components/layouts/navbar.component";
import { role } from "../../interface/user.interface";

interface IRegisterForm {
  username: string;
  password: string;
  firstname: string;
  lastname: string;
  role: role | "";
  card_id: string;
}

const initialLoginFormData: IRegisterForm = {
  username: "",
  password: "",
  firstname: "",
  lastname: "",
  role: "",
  card_id: "",
};
const roles = ["patient", "doctor", "lab", "pharmacy"];

const Register = () => {
  const [loginFormData, setLoginFormData] =
    useState<IRegisterForm>(initialLoginFormData);
  const [error, setError] = useState<IRegisterForm>(initialLoginFormData);

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
    if (!roles.some((role) => role == loginFormData.role)) {
      updateLoginFormError("role", "Select a valid role");
    } else {
      updateLoginFormError("role", "");
    }
  }, [loginFormData]);

  const handleSubmit = () => {
    console.log(loginFormData);
  };

  return (
    <>
      <Main>
        <Form onSubmit={handleSubmit} error={error}>
          <InputField
            label="First Name"
            error={error.firstname}
            placeholder="First Name"
            name="firstname"
            value={loginFormData.firstname}
            required
            onChange={(e) => updateLoginForm("firstname", e.target.value)}
          />
          <InputField
            label="Last Name"
            error={error.lastname}
            placeholder="Last Name"
            name="lastname"
            value={loginFormData.lastname}
            required
            onChange={(e) => updateLoginForm("lastname", e.target.value)}
          />
          <InputField
            label="Username"
            error={error.username}
            placeholder="Username"
            name="username"
            value={loginFormData.username}
            required
            onChange={(e) => updateLoginForm("username", e.target.value)}
          />
          <InputField
            label="Password"
            error={error.password}
            placeholder="Password"
            name="password"
            type="password"
            value={loginFormData.password}
            required
            onChange={(e) => updateLoginForm("password", e.target.value)}
          />
          <SelectField
            label="Role"
            error={error.role}
            name="role"
            value={loginFormData.role}
            onChange={(e) => updateLoginForm("role", e.target.value)}
          >
            <option value="">Select Role</option>
            <option value="patient">Patient</option>
            <option value="doctor">Doctor</option>
            <option value="lab">Lab</option>
            <option value="pharmacy">Pharmacy</option>
          </SelectField>
          <div className="flex flex-row items-center justify-between">
            <div>
              <Button type="submit">Register</Button>
            </div>
            <div>
              <Link href={"/auth/login"}>
                <a className="no-underline hover:underline">Already Member?</a>
              </Link>
            </div>
          </div>
        </Form>
      </Main>
    </>
  );
};

export default Register;
