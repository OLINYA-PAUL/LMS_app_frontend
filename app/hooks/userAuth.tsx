import { useSelector } from "react-redux";

const userAuth = (): boolean => {
  const { user } = useSelector((state: any) => state.auth);

  return Boolean(user);
};

export default userAuth;
