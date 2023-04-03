import styles from './user.module.scss';
export const User = (props) => {
    const { photo, email, name, phone, position } = props.user;

    return (
        <div className={styles.wrap}>
            <div className={styles.wrap__img}>
                <img src={photo} alt="userPhoto" />
            </div>
            <div className={styles.wrap__name}>
                {name[0].toUpperCase()}
                {name.slice(1)}
            </div>
            <div className={styles.wrap__position}>{position}</div>
            <div className={styles.wrap__email}>{email}</div>
            <div className={styles.wrap__phone}>{phone}</div>
        </div>
    );
};
