import AdminHeader from "../components/Headers/AdminHeader";
import { UserTypes } from "../enums/UserTypes";

const applicationHeaders: { [key in UserTypes]: JSX.Element } = {
  [UserTypes.ADMIN]: <AdminHeader />,
  [UserTypes.STUDENT]: <AdminHeader />,
  [UserTypes.TEACHER]: <AdminHeader />,
};

export default applicationHeaders;
