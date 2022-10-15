import Link from "next/link";
import Router, { useRouter } from "next/router";
import { useEffect, useState, FormEventHandler } from "react";
import {
  initialLoginFormData,
  initialUserData,
  IRegisterForm,
  IUserData,
  registerApi,
} from "../../api_calls/user/register.api";
import Button from "../../components/basic/button.component";
import Form from "../../components/form/form.component";
import InputField from "../../components/form/inputField.component";
import SelectField from "../../components/form/select.component";
import Main from "../../components/layouts/main.component";
import Navbar from "../../components/layouts/navbar.component";
import { role } from "../../interface/user.interface";
import { useCreateUserWithEmailAndPassword } from 'react-firebase-hooks/auth';
import { auth, db } from "../../components/firebase";
import { addDoc, collection } from "firebase/firestore";






const roles = ["patient", "doctor", "lab", "pharmacy"];

const Register = () => {
  const [
    createUserWithEmailAndPassword,
    user,
    loading,
    createUserError,
  ] = useCreateUserWithEmailAndPassword(auth);

  const [userData, setUserData] = useState<IUserData>(initialUserData)




  const router = useRouter();
  const [loginFormData, setLoginFormData] =
    useState<IRegisterForm>(initialLoginFormData);




  const [error, setError] = useState<IRegisterForm>(initialLoginFormData);


  const updateLoginForm = (field: string, inputValue: string) => {
    setLoginFormData((value) => {
      return { ...value, [field]: inputValue };
    });

    setUserData((value) => {
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
      updateLoginFormError("email", "Email is too short.");
    } else {
      updateLoginFormError("email", "");
    }
    if (loginFormData.password.length < 6) {
      updateLoginFormError("password", "Password is too short.");
    } else {
      updateLoginFormError("password", "");
    }
    if (!roles.some((role) => role == loginFormData.userRole)) {
      updateLoginFormError("userRole", "Select a valid role");
    } else {
      updateLoginFormError("userRole", "");
    }
  }, [loginFormData]);

  const colRef = collection(db, "users")
  const handleSubmit = async () => {
    console.log(loginFormData);
    console.log(error);


    await addDoc(colRef, userData)


    try {
      const email = loginFormData.email;
      const password = loginFormData.password;
      createUserWithEmailAndPassword(email, password)
    } catch (err) {
      alert("Register Failed. Try again");
    }

    console.log(userData, 'from regestration')
  };


  return (
    <>
      <Main>
        <Form onSubmit={handleSubmit} error={error}>
          <InputField
            label="First Name"
            error={error.firstName}
            placeholder="First Name"
            name="firstname"
            value={loginFormData.firstName}
            required
            onChange={(e) => updateLoginForm("firstName", e.target.value)}
          />
          <InputField
            label="Last Name"
            error={error.lastName}
            placeholder="Last Name"
            name="lastname"
            value={loginFormData.lastName}
            required
            onChange={(e) => updateLoginForm("lastName", e.target.value)}
          />
          <InputField
            label="Email"
            error={error.email}
            placeholder="Email"
            name="email"
            value={loginFormData.email}
            required

            onChange={(e) => updateLoginForm("email", e.target.value)}
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
            error={error.userRole}
            name="role"
            value={loginFormData.userRole}
            onChange={(e) => updateLoginForm("userRole", e.target.value)}
          >
            <option value="">Select Role</option>
            <option value="patient">Patient</option>
            <option value="doctor">Doctor</option>
            <option value="lab">Lab</option>
            <option value="pharmacy">Pharmacy</option>
          </SelectField>

          {loginFormData.userRole === "patient" && (
            <>
              <InputField
                label="Card Id"
                error={error.cardId || null}
                placeholder="Card Id"
                name="card_id"
                value={loginFormData.cardId || ""}
                required
                onChange={(e) => updateLoginForm("cardId", e.target.value)}
              />
              <InputField
                error={""}
                label="Age"
                placeholder="Age"
                name="age"
                value={loginFormData.age?.toString() || ""}
                required
                type="number"
                onChange={(e) => updateLoginForm("age", e.target.value)}
              />
              <SelectField
                label="Sex"
                error={error.sex || ""}
                name="sex"
                value={loginFormData.sex || ""}
                onChange={(e) => updateLoginForm("sex", e.target.value)}
              >
                <option value="" disabled>
                  Select Role
                </option>
                <option value="male">Male</option>
                <option value="female">Female</option>=
              </SelectField>
            </>
          )}

          {loginFormData.userRole === "doctor" && (
            <>
              <InputField
                label="Doctor Type"
                error={error.doctorType || null}
                placeholder="Doctor Type"
                name="doctorType"
                value={loginFormData.doctorType || ""}
                required
                onChange={(e) => updateLoginForm("doctorType", e.target.value)}
              />
            </>
          )}

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
