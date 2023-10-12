import { useSelector } from "react-redux/es/hooks/useSelector";
import { selectUser, selectIsLoggedIn, selectIsRefreshing } from "redux/auth/selectors";

export const useAuth = () => {
    return {
        isLoggedIn: useSelector(selectIsLoggedIn),
        isRefreshing: useSelector(selectIsRefreshing),
        user: useSelector(selectUser),
    };
};