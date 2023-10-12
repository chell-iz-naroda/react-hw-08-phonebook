import { createSlice } from "@reduxjs/toolkit";

import { fetchContacts, addContact, deleteContact } from "./operations";

const handlePending = state => {
    state.isLoading = true;
};

const handleRejected = (state, action) => {
    state.isLoading = false;
    state.error = action.payload;
};

const handleFetchContacts = (state, action) => {
    state.isLoading = false;
    state.error = null;
    state.items = action.payload;
};

const handleAddContact = (state, action) => {
    state.isLoading = false;
    state.error = null;
    state.items.push(action.payload);
};

const handleDeleteContact = (state, action) =>{
    state.isLoading = false;
    state.error = null;
    const index = state.items.findIndex(item => item.id === action.payload.id);
    state.items.splice(index, 1);
};

const contactsInitialState = {
    items: [],
    isLoading: false,
    error: null,
};

const contactsSlice = createSlice({
    name: 'contacts',
    initialState: contactsInitialState,
    extraReducers: builder =>
        builder
            .addCase(fetchContacts.pending, handlePending)
            .addCase(fetchContacts.fulfilled, handleFetchContacts)
            .addCase(fetchContacts.rejected, handleRejected)
            .addCase(addContact.pending, handlePending)
            .addCase(addContact.fulfilled, handleAddContact)
            .addCase(addContact.rejected, handleRejected)
            .addCase(deleteContact.pending, handlePending)
            .addCase(deleteContact.fulfilled, handleDeleteContact)
            .addCase(deleteContact.rejected, handleRejected),
});

export const contactsReducer = contactsSlice.reducer;