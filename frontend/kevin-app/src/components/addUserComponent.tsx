import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { AppService } from '../service/backenApi'
import { useForm, SubmitHandler } from "react-hook-form";
import ActionAlert from './ActionAlerts';

interface IFormInputs {
    firstName: string
    lastName: string
    age: number
    course: string
}

export default function AddUserComponent() {

    const [showAlert, setShowAlert] = React.useState(false);

    const onSubmit: SubmitHandler<IFormInputs> = data => {
        try {
                AppService.addUser({
                    first_name: data.firstName,
                    last_name: data.lastName,
                    age: data.age,
                    course: data.course
                })
                setShowAlert(true)
                reset()              
        } catch (exception) {
            return exception;
        }
    }

    const { register, formState: { errors }, handleSubmit, reset } = useForm<IFormInputs>();

    return (
        <>
        <form onSubmit={handleSubmit(onSubmit) }>
            <label>First Name</label>
            <input {...register("firstName", { required: true })} />
            {errors.firstName && <p>"First name is required"</p>}
            <label>Last Name</label>
            <input {...register("lastName", { required: true })} />
            {errors.lastName && <p>"Last name is required"</p>}
            <label>Age</label>
            <input {...register("age", { required: true })} />
            {errors.age && <p>"age is required"</p>}
            <label>Course</label>
            <input {...register("course", { required: true })} />
            {errors.course && <p>"course is required"</p>}
            <input type="submit" />
        </form>
        {showAlert === true && <ActionAlert/>}
        </>
    );
}
