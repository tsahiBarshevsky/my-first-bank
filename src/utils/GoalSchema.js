import * as Yup from 'yup';

const GoalSchema = Yup.object().shape({
    name: Yup.string().required('זהו שדה חובה'),
    sum: Yup.number()
        .moreThan(0, 'ערך זה צריך להיות מספר חיובי')
        .required('זהו שדה חובה')
        .typeError('ערך זה צריך להיות מספר'),
});

export { GoalSchema };