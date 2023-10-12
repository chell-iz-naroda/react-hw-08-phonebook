import { Navigation } from '../Navigation/Navigation';
import { UserMenu } from '../UserMenu/UserMenu';
import { AuthNav } from '../AuthNav/AuthNav.js';
import { useAuth } from 'hooks/useAuth';

import Toolbar from '@mui/material/Toolbar';

export const AppBar = () => {
    const { isLoggedIn } = useAuth();

    return (
        <header>
            <Toolbar sx={{ flexWrap: 'wrap', justifyContent: 'space-between', overflowX: 'auto' }}>
            <Navigation />
            {isLoggedIn ? <UserMenu /> : <AuthNav />}
            </Toolbar>
        </header>
    );
};
