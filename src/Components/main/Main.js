import { useDispatch, useSelector } from 'react-redux';
import { getUsers } from '../../thunk/getUsers';
import { Button } from '../button/Button';
import { ListUsers } from '../listUsers/ListUsers';
import { changePage } from '../../features/slices/apiSlice';
import { useEffect } from 'react';
import { getToken } from '../../thunk/getToken';
import styles from './main.module.scss';
export const Main = () => {
    const dispatch = useDispatch();
    const totalPages = useSelector((state) => state.api.totalPages);
    const page = useSelector((state) => state.api.page);

    useEffect(() => {
        dispatch(getToken());
    }, [dispatch]);

    return (
        <div className="container">
            <div className={styles.main}>
                <h2 className={styles.main__title}>Working with GET request</h2>
                <ListUsers />

                {totalPages && page < totalPages ? (
                    <div className={styles.main__btn}>
                        <Button
                            handleClick={() => {
                                dispatch(changePage());
                                dispatch(getUsers(page + 1));
                            }}
                            text="Show more"
                        />
                    </div>
                ) : null}
            </div>
        </div>
    );
};
