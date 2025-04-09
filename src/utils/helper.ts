import { User } from "@/type";

const EXPIRES_IN = 20 * 60 * 1000; // 20 min

export const isCredentialValid = (email: string, password: string) => {
  const users = JSON.parse(localStorage.getItem("users") || "[]") as User[];

  const userExists = users.find(
    (user) => user.email === email && user.password === password
  );

  if (!userExists) {
    return { error: "Invalid Credential" };
  }

  localStorage.setItem(
    "auth",
    JSON.stringify({
      name: userExists.name,
      expiresAt: userExists.expiresAt,
      email: userExists.email,
    })
  );

  return {
    name: userExists.name,
    expiresAt: userExists.expiresAt,
    email: userExists.email,
  };
};

export const createAccount = (
  email: string,
  password: string,
  name: string,
  expiresAt: number
) => {
  const allUsers = localStorage.getItem("users");
  if (!allUsers) {
    localStorage.setItem("users", "[]");
  }

  const users = JSON.parse(localStorage.getItem("users")!) as User[];
  console.log({ users });
  const userExists = users.find((user) => user.email === email);

  if (userExists) {
    return { error: "User with this email exists." };
  }
  const newUser = {
    email,
    name,
    password,
    expiresAt,
  };

  users.push(newUser);
  localStorage.setItem("users", JSON.stringify(users));

  isCredentialValid(email, password);

  return { success: true };
};

export const logoutUser = () => {
  localStorage.setItem("auth", "");
};
