import { store } from '../../app/store';
import { getUsers } from '../../thunk/getUsers';
import { useEffect } from 'react';
import { Formik } from 'formik';
import { CustomForm } from '../customForm/CustomForm';
import { useDispatch, useSelector } from 'react-redux';
import { getPositions } from '../../thunk/getPositions';
import * as Yup from 'yup';
import styles from './registrationForm.module.scss';
import { resetPage } from '../../features/slices/apiSlice';
import { resetItems } from '../../features/slices/usersSlice';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const RegistrationForm = () => {
    const dispatch = useDispatch();
    const positions = useSelector((state) => state.users.positions);
    const listPostions = positions.map((position) => {
        return String(position.id);
    });
    const FILE_SIZE = 5 * 1024 * 1024;
    const SUPPORTED_FORMATS = ['image/jpeg', 'image/jpg'];

    useEffect(() => {
        dispatch(getPositions());
    }, [dispatch]);
    return (
        <div className="container">
            <div className={styles.formWrap}>
                <h2 className={styles.formWrap__title}>Working with POST request</h2>

                <Formik
                    initialValues={{
                        name: '',
                        email: '',
                        phone: '',
                        position: '',
                        photo: '',
                    }}
                    validationSchema={Yup.object({
                        name: Yup.string().required().min(2).max(60),
                        email: Yup.string().email().required(),
                        phone: Yup.string().required().min(10),
                        position: Yup.mixed()
                            .oneOf([...listPostions])
                            .required(),
                        photo: Yup.mixed()
                            .required('A photo is required')
                            .test(
                                'fileSize',
                                'File size too large, please select a file smaller than 5MB',
                                (value) => value && value.size <= FILE_SIZE
                            )
                            .test(
                                'fileFormat',
                                'Unsupported Format, please upload a JPG or JPEG image',
                                (value) => value && SUPPORTED_FORMATS.includes(value.type)
                            )
                            .test(
                                'fileResolution',
                                'File resolution too small, please select an image with a minimum resolution of 70x70px',
                                async (value) => {
                                    if (!value) return false;
                                    const file = await new Promise((resolve) => {
                                        const reader = new FileReader();
                                        reader.onload = (event) => {
                                            const image = new Image();
                                            image.onload = () => {
                                                resolve({
                                                    width: image.width,
                                                    height: image.height,
                                                });
                                            };
                                            image.src = event.target.result;
                                        };
                                        reader.readAsDataURL(value);
                                    });

                                    return file.width >= 70 && file.height >= 70;
                                }
                            ),
                    })}
                    onSubmit={(values, { setSubmitting, resetForm }) => {
                        setSubmitting(false);
                        const formData = new FormData();

                        formData.append('name', values.name);
                        formData.append('email', values.email);
                        formData.append('phone', values.phone);
                        formData.append('photo', values.photo);
                        formData.append('position_id', values.position);

                        const currentState = store.getState();
                        const token = currentState.users.token;

                        fetch('https://frontend-test-assignment-api.abz.agency/api/v1/users', {
                            method: 'POST',
                            body: formData,
                            headers: {
                                Token: token, // get token with GET api/v1/token method
                            },
                        })
                            .then(function (response) {
                                return response.json();
                            })
                            .then(function (data) {
                                if (data.success) {
                                    dispatch(resetPage());
                                    dispatch(resetItems());
                                    dispatch(getUsers(1));
                                    toast.success(`You registered`);
                                    resetForm();
                                } else {
                                    toast.error(data.message);
                                }
                            })
                            .catch(function (error) {
                                console.log(error);
                            });
                    }}
                    component={CustomForm}
                />
            </div>
        </div>
    );
};
