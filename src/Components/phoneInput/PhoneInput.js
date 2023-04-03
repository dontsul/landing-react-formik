import { PatternFormat } from 'react-number-format';
import { useField } from 'formik';
import styles from './phoneInput.module.scss';

export const PhoneInput = ({ label, ...props }) => {
    const [field] = useField(props);

    return (
        <>
            <PatternFormat
                className={styles.input}
                format="+380#########"
                mask="_"
                allowEmptyFormatting
                {...props}
                {...field}
            />

            <label className={styles.label} htmlFor={field.name}>
                +38 (XXX) XXX-XX-XX
            </label>
        </>
    );
};
