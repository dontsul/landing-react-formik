import { Field } from 'formik';
import { useSelector } from 'react-redux';
import { useField } from 'formik';
import styles from './radioInput.module.scss';
export const RadioInput = (props) => {
    // eslint-disable-next-line
    const [field, meta] = useField(props);
    const positions = useSelector((state) => state.users.positions);
    const loading = useSelector((state) => state.users.loading);

    const listPostions = positions.map((position) => {
        return (
            <label key={position.name}>
                <Field {...props} value={String(position.id)} />
                {position.name}
            </label>
        );
    });

    return (
        <>
            {loading !== 'loading' && (
                <>
                    <div className={styles.title} id="my-radio-group">
                        Select your position
                    </div>
                    <div
                        className={styles.groupRadio}
                        role="group"
                        aria-labelledby="my-radio-group"
                    >
                        {listPostions}

                        {meta.touched && meta.error ? (
                            <div className={styles.error}>{meta.error}</div>
                        ) : null}
                    </div>
                </>
            )}
        </>
    );
};
