import { useDispatch } from 'react-redux';
import { logOut } from 'redux/auth/operations';
import { useAuth } from 'hooks/useAuth';
import { Button, Grid, Typography } from '@mui/material';

export const UserMenu = () => {
    const dispatch = useDispatch();
    const { user } = useAuth();

    const handleClick = () => {
        dispatch(logOut())
    }

    return (
        <Grid sx={{ display: 'flex', alignItems: 'center'}}>
            <Typography>
                Welcome, {user.name}
            </Typography>
            <Button type="button" onClick={() => handleClick()} variant="outlined" sx={{ my: 1, mx: 1.5 }}>
            Logout
            </Button>
        </Grid>
    );
};
