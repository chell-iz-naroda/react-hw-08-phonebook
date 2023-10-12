import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Helmet } from 'react-helmet';
import { selectIsLoading } from '../redux/contacts/selectors';

import { PhonebookList } from 'components/PhonebookList/PhonebookList';
import { PhonebookForm } from 'components/PhonebookForm/PhonebookForm';
import { fetchContacts } from '../redux/contacts/operations';
import Typography from '@mui/material/Typography';

import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

export default function Contacts() {
    const dispatch = useDispatch();
    const isLoading = useSelector(selectIsLoading);

    useEffect(() => {
        dispatch(fetchContacts());
    }, [dispatch]);

    return (
        <>
            <Helmet>
                <title>Your contacts</title>
            </Helmet>
            <PhonebookForm />
            <Typography component="h2" variant="h5" sx={{ mt: 3, mb: 3, ml: 4 }}>
                Contact list
            </Typography>
            {isLoading ?
            <Box sx={{ display: 'flex', alignContent: 'center' }}>
                <CircularProgress />
            </Box>
            : <PhonebookList />}
        </>
    );
}
