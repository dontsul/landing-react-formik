import styles from './button.module.scss';
export const Button = ({ text, handleClick = Function.prototype, type = '', disabled = false }) => {
    return (
        <button onClick={handleClick} className={styles.btn} type={type} disabled={disabled}>
            {text}
        </button>
    );
};
