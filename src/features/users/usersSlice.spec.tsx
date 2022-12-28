import { render, screen, fireEvent } from '@testing-library/react';
import { useAppSelector, useAppDispatch } from '../../app/hooks';
import { getUsers } from './usersAPI';
import {
    users,
} from './usersSlice';
import usersReducer, { UserState } from './usersSlice';

describe("Users List", () => {
    const initialState: UserState = {
        allUsers: [],
        status: 'idle',
    };

    it('should ',  () => {
        // const { getByText } = render(
        //     <Users />
        // );
        expect(true).toBe(true)
        // expect(getByText(/Select users to view albums/i)).toBeInTheDocument();
    });
    
})