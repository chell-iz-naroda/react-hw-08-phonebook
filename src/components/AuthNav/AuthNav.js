import { Link, Grid } from '@mui/material';

import { NavLink } from 'react-router-dom';

export const AuthNav = () => {
    return (
        <Grid>
            <NavLink to="/register">
                <Link
                    variant="button"
                    color="text.primary"
                    href="#"
                    sx={{ my: 1, mx: 1.5 }}
                >
                    Register
                </Link>
            </NavLink>
            <NavLink to="/login">
                <Link
                variant="button"
                color="text.primary"
                href="#"
                sx={{ my: 1, mx: 1.5 }}
                >
                Log In 
                </Link>
            </NavLink>
        </Grid>
    );
};
