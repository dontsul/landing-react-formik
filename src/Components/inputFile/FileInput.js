import { ErrorMessage } from 'formik';

import styles from './inputFile.module.scss';

export const FileInput = ({ datas, ...props }) => {
    return (
        <>
            <div className={styles.wrapInputFile}>
                <input
                    className={styles.input}
                    id={props.name}
                    onChange={(event) => {
                        datas.setFieldValue(props.name, event.currentTarget.files[0]);
                    }}
                    {...props}
                />
                <div className={styles.btn} type="submit" onClick={datas.handleSubmit}>
                    Upload
                </div>
                <div className={styles.nameImg}>
                    {datas.values[props.name] ? (
                        <span>{datas.values[props.name].name}</span>
                    ) : (
                        <span>Upload your photo</span>
                    )}
                </div>
            </div>
            <div className={styles.error}>
                <ErrorMessage name={props.name} />
            </div>
        </>
    );
};

export default FileInput;
