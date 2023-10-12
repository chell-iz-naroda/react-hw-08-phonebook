import { useDispatch, useSelector } from 'react-redux';
import { changeFilter } from '../../redux/filter/slice';
import { selectFilter } from '../../redux/filter/selectors';

import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';


export const Filter = () => {

    const dispatch = useDispatch();
    const filter = useSelector(selectFilter);

    const onChange = newFilter => {
        newFilter && newFilter.length > 0 ?
            dispatch(changeFilter(newFilter))
            : dispatch(changeFilter(''));
    };

    return (
        <Grid textAlign='center'>
        <Typography sx={{mt: 2}}>Find contact by name </Typography>
            <TextField
                type="text"
                name="filter"
                value={filter}
                onChange={evt => onChange(evt.target.value)}
                sx={{mt: 2}}
            />
        </Grid>
    );
};    