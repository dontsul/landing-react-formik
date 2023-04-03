import { Form, Field } from 'formik';
import { Input } from '../input/Input';
import { PhoneInput } from '../phoneInput/PhoneInput';
import { RadioInput } from '../radioInput/RadioInput';

import { Button } from '../button/Button';
import { FileInput } from '../inputFile/FileInput';
import styles from './customForm.module.scss';

export const CustomForm = (props) => {
    return (
        <Form className={styles.form}>
            <Field name="name" placeholder="Name" type="text" component={Input} />
            <Field name="email" placeholder="Email" type="email" component={Input} />
            <PhoneInput name="phone" type="text" label="+38 (XXX) XXX - XX - XX" />
            <RadioInput type="radio" name="position" />
            <FileInput name="photo" type="file" datas={props} />

            <div className={styles.form__wrapBtn}>
                <Button text="Sign up" disabled={props.isSubmitting} type="submit" />
            </div>
        </Form>
    );
};
