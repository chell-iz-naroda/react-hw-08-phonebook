import { NavLink } from 'react-router-dom';
import { useAuth } from 'hooks/useAuth';

import Link from '@mui/material/Link';

export const Navigation = () => {
    const { isLoggedIn } = useAuth();

    return (
        <nav>
            <NavLink to="/">
                <Link
                    variant="button"
                    color="text.primary"
                    href="#"
                    sx={{ my: 1, mx: 1.5}}>
                    Home
                </Link>
            </NavLink>
            {isLoggedIn && (
                <NavLink to="/contacts">
                    <Link
                        variant="button"
                        color="text.primary"
                        href="#"
                        sx={{ my: 1, mx: 1.5 }}>
                        Contacts
                    </Link>
                </NavLink>
            )}
        </nav>
    );
};
