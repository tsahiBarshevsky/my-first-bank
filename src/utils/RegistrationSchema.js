import * as Yup from 'yup';

const RegistrationSchema = Yup.object().shape({
    name: Yup.string().required('זהו שדה חובה'),
    sum: Yup.number()
        .moreThan(0, 'ערך זה צריך להיות מספר חיובי')
        .typeError('ערך זה צריך להיות מספר'),
});

export { RegistrationSchema };