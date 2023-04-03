import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getUsers } from '../../thunk/getUsers';
import { User } from '../user/User';
import { getApiDatas } from '../../thunk/getApiDatas';
import { Loader } from '../loader/Loader';

import styles from './list.module.scss';
export const ListUsers = () => {
    const users = useSelector((state) => state.users.sortedUsers);
    const statusLoading = useSelector((state) => state.users.loading);
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getUsers(1));
        dispatch(getApiDatas());
    }, [dispatch]);

    return (
        <>
            {statusLoading === 'loading' && users.length === 0 ? (
                <div style={{ display: 'flex', justifyContent: 'center' }}>
                    <Loader />
                </div>
            ) : (
                <ul className={styles.list}>
                    {users.map((user) => {
                        return <User key={user.id} user={user} />;
                    })}
                </ul>
            )}
        </>
    );
};
