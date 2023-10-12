// import { Formik } from 'formik';
import * as Yup from 'yup';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import { Typography } from '@mui/material';

import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { useState } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { selectContacts } from '../../redux/contacts/selectors';
import { addContact } from '../../redux/contacts/operations';

import { Filter } from 'components/Filter/Filter';

import toast from 'react-hot-toast';

const defaultInputValues = {
    name: '',
    phoneNumber: ''
};


export const PhonebookForm = () => {

    const contacts = useSelector(selectContacts);
    const dispatch = useDispatch();

    const [values, setValues] = useState(defaultInputValues);

    const resetForm = () => {
        setValues(defaultInputValues);
    };

    const nameRegExp = /^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$/;
    const phoneRegExp = /\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}/;

    const validationSchema = Yup.object().shape({
        name: Yup.string().min(2, 'Too Short!').matches(nameRegExp, "Name may contain only letters, apostrophe, dash and spaces.").required('Name is a required field'),
        phoneNumber: Yup.string().matches(phoneRegExp, 'Phone number must be digits and can contain spaces, dashes, parentheses and can start with +').max(15, 'Too Long! Max 15 numbers').required('Number is a required field'),
    });

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(validationSchema),
        mode: "onBlur"
    });

    const handleChange = (value) => {
        setValues(value);
    };


    const addUser = (newContact) => {
        const { name, phoneNumber } = newContact;
        contacts.find(contact => contact.name.toLowerCase() === name.toLowerCase())
            ? toast.error(`Contact ${name} already exists. Please, choose another name`)
            : dispatch(addContact({
                name: name,
                number: phoneNumber,
            })) && resetForm();
    };

    return (
        <Box sx={{
            display: 'flex',
            gap: 8,
            flexDirection: 'row'
        }}>
            <Box component="form" onSubmit={handleSubmit(addUser)} sx={{ mt: 3 }}>
                <Grid container spacing={2} sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    maxWidth: '226px'
                }}>
                    <Typography component="h2" variant="h5">
                        New contact
                    </Typography>
                    <Grid item xs={12}>
                        <TextField
                            placeholder="Name"
                            name="name"
                            label="Name"
                            required
                            {...register('name')}
                            error={errors.name ? true : false}
                            helperText={errors.name?.message}
                            value={values.name}
                            onChange={(event) => handleChange({ ...values, name: event.target.value })}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            placeholder="Phone number"
                            name="phoneNumber"
                            label="Phone number"
                            required
                            {...register('phoneNumber')}
                            error={errors.phoneNumber ? true : false}
                            helperText={errors.phoneNumber?.message}
                            value={values.phoneNumber}
                            onChange={(event) => handleChange({ ...values, phoneNumber: event.target.value })}
                        />
                    </Grid>
                    <Button
                        type="submit"
                        variant="contained"
                        sx={{ mt: 3, mb: 2 }}
                    >
                        Add to list
                    </Button>
                </Grid>
            </Box>
            <Filter />
        </Box>
    );
};