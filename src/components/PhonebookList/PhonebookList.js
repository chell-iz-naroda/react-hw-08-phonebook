import { selectVisibleContacts } from '../../redux/contacts/selectors';
import { deleteContact } from '../../redux/contacts/operations';
import { useSelector, useDispatch } from 'react-redux';

import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import { Grid } from '@mui/material';

import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';


export const PhonebookList = () => {

    const contacts = useSelector(selectVisibleContacts);
    const dispatch = useDispatch();

    const onDelete = (contactId) => {
        dispatch(deleteContact(contactId));
    };

    function stringToColor(string) {
        let hash = 0;
        let i;

        /* eslint-disable no-bitwise */
        for (i = 0; i < string.length; i += 1) {
            hash = string.charCodeAt(i) + ((hash << 5) - hash);
        }

        let color = '#';

        for (i = 0; i < 3; i += 1) {
            const value = (hash >> (i * 8)) & 0xff;
            color += `00${value.toString(16)}`.slice(-2);
        }
        /* eslint-enable no-bitwise */

        return color;
    }

    function stringAvatar(name) {
        return {
            sx: {
                bgcolor: stringToColor(name),
            },
            children: `${name.split(' ')[0][0]}${name.split(' ')[1] !== undefined ? name.split(' ')[1][0] : ''}`,
        };
    }


    return contacts.length > 0 ? (
        <List sx={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: 2,
            flexDirection: 'row'
        }}>
            {contacts.map(({ id, name, number }) => (
                <ListItem key={id} sx={{
                    width: 'calc(33% - 4 * 2px)',
                    display: 'flex',
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    borderRadius: 10,
                    boxShadow: '5px 5px 5px 5px grey'
                }}>
                    <Avatar {...stringAvatar(`${name}`)} />
                    <Grid sx={{ width: '100%', maxWidth: 144, wordWrap: 'break-word' }}>
                        <ListItemText>
                            <Typography>{name}</Typography>
                        </ListItemText>
                        <ListItemText>
                            <Typography>{number}</Typography>
                        </ListItemText>
                    </Grid>
                    <Tooltip title="Delete" onClick={() => onDelete(id)}>
                        <IconButton>
                            <DeleteIcon />
                        </IconButton>
                    </Tooltip>
                </ListItem>
            ))}
        </List>
    ) : (
        <Typography sx={{ mt: 3, mb: 2 }}>
            Not contacts you phonebook....
        </Typography>
    );
}   