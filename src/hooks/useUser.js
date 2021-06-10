import { useEffect, useState } from "react";
import { onAuthStateChanged } from "../firebase/firebase";
import { navigate } from "gatsby";

export const USER_STATES = {
  NOT_LOGGED: null,
  NOT_KNOWN: undefined,
};

export default function useUser() {
  const [user, setUser] = useState(USER_STATES.NOT_KNOWN);

  useEffect(() => {
    onAuthStateChanged(setUser);
  }, []);

  useEffect(() => {
    user === USER_STATES.NOT_LOGGED && navigate("/admin");
  }, [user]);

  return user;
}
