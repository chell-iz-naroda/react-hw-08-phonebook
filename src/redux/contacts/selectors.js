import { createSelector } from "@reduxjs/toolkit";
import { selectFilter } from "redux/filter/selectors";

export const selectContacts = state => state.contacts.items;
export const selectIsLoading = state => state.contacts.isLoading;
export const selectError = state => state.contacts.error;

export const selectVisibleContacts = createSelector(
    [selectContacts, selectFilter],
    (contacts, filters) => {
        const lowerCaseContact = filters.toLowerCase();
        if (lowerCaseContact.trim().length === 0) {
            return contacts;
        }
        return contacts.filter (cnt => {
            return cnt.name.toLowerCase().includes(lowerCaseContact);
        })
    }
);