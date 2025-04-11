import { ExpenseItem, PendingQueueItem, User } from "@/type";

export const isCredentialValid = (
  email: string,
  password: string,
  expiresAt: number
) => {
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
      expiresAt: expiresAt,
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

  isCredentialValid(email, password, expiresAt);

  return { success: true };
};

export const logoutUser = () => {
  localStorage.setItem("auth", "");
};

export const addItemToLocalStorage = (item: ExpenseItem, isOnline: boolean) => {
  if (isOnline) {
    const allItemsString = localStorage.getItem("items");
    if (!allItemsString) {
      localStorage.setItem("items", "[]");
    }
    const allItems = JSON.parse(
      localStorage.getItem("items")!
    ) as ExpenseItem[];
    allItems.push(item);

    localStorage.setItem("items", JSON.stringify(allItems));
  } else {
    const pendingPayload: PendingQueueItem = { type: "add", item };

    const pendingQueue = JSON.parse(
      localStorage.getItem("pending_queue") || "[]"
    ) as PendingQueueItem[];

    pendingQueue.push(pendingPayload);
    localStorage.setItem("pending_queue", JSON.stringify(pendingQueue));
  }
};

export const updateItemInLocalStorage = (
  item: ExpenseItem,
  isOnline: boolean
) => {
  if (isOnline) {
    let allItemsString = localStorage.getItem("items");
    if (!allItemsString) {
      throw new Error("Error updating expense");
    }
    let allItems = JSON.parse(localStorage.getItem("items")!) as ExpenseItem[];
    allItems = allItems.map((cur) => (cur.id === item.id ? item : cur));

    localStorage.setItem("items", JSON.stringify(allItems));
  } else {
    const pendingPayload = { type: "update", item };
    localStorage.setItem("pending_queue", JSON.stringify([pendingPayload]));
  }
};

export const deleteItemFromLocalStorage = (id: string, isOnline: boolean) => {
  if (isOnline) {
    const allItemsString = localStorage.getItem("items");
    if (!allItemsString) {
      throw new Error("No data found in localStorage");
    }

    const allItems = JSON.parse(allItemsString) as ExpenseItem[];
    const updatedItems = allItems.filter((item) => item.id !== id);

    localStorage.setItem("items", JSON.stringify(updatedItems));
  } else {
    const pendingPayload = { type: "delete", id };

    localStorage.setItem("pending_queue", JSON.stringify([pendingPayload]));
  }
};

export const syncItems = () => {
  const pendingQueue = JSON.parse(
    localStorage.getItem("pending_queue") || "[]"
  ) as PendingQueueItem[];

  const allItemsString = localStorage.getItem("items");
  if (!allItemsString) {
    throw new Error("No data found in localStorage");
  }

  const allItems = JSON.parse(allItemsString) as ExpenseItem[];

  pendingQueue.forEach((item) => {
    if (item.type === "add") {
      allItems.push(item.item);
    } else if (item.type === "update") {
      const idx = allItems.findIndex((cur) => cur.id === item.item.id);
      if (idx !== -1) {
        allItems[idx] = item.item;
      }
    } else if (item.type === "delete") {
      const idx = allItems.findIndex((cur) => cur.id === item.id);
      if (idx !== -1) {
        allItems.splice(idx, 1);
      }
    }
  });

  localStorage.setItem("items", JSON.stringify(allItems));
  localStorage.setItem("pending_queue", "[]");
};
