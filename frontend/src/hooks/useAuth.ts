import { useSelector, useDispatch } from 'react-redux';
import { type RootState } from '../store/index';
import { logout } from '../store/authSlice.ts';

const useAuth = () => {
  const dispatch = useDispatch();
  const token = useSelector((state: RootState) => state.auth.token);

  const handleLogout = () => {
    dispatch(logout());
  };

  return { isAuthenticated: !!token, handleLogout };
};

export default useAuth;