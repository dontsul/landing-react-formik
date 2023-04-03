import { ErrorMessage } from 'formik';
import styles from './input.module.scss';
export const Input = ({ field, ...props }) => {
    return (
        <>
            <input className={styles.input} {...field} {...props} />
            <ErrorMessage
                className={styles.error}
                name={field.name}
                component="div"
            />
        </>
    );
};
