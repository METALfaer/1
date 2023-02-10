import React from 'react';
import {Controller, SubmitHandler, useForm} from "react-hook-form";
import {useAppDispatch, useAppSelector} from "../../../app/store";
import {Link, Navigate} from "react-router-dom";
import {loginTC} from "./SingIn-reducer";
import {LoginParamsType} from "./SingIn.api";
import {routes} from "../../../common/components/routes/Routes";

const SingIn = () => {
    const dispatch = useAppDispatch()
    const isLoggedIn = useAppSelector((state) => state.auth.isLoggedIn)
    const {
        control,
        register,
        handleSubmit,
        formState: {errors},
        reset,
        clearErrors
    } = useForm<LoginParamsType>({mode: 'onChange'})
    const onSubmit: SubmitHandler<LoginParamsType> = (data: LoginParamsType) => {
        dispatch(loginTC(data))
        reset()
        clearErrors()
    }
    if (isLoggedIn) {
        return <Navigate to={'/'}/>
    }
    return (
        <div>
            <h1>Sign In</h1>
            <form onSubmit={handleSubmit(onSubmit)} action="">
                <Controller
                    control={control}
                    name={'email'}
                    rules={{
                        required: "email is required",
                        pattern: {
                            value: /^((([0-9A-Za-z]{1}[-0-9A-z\.]{1,}[0-9A-Za-z]{1})|([0-9А-Яа-я]{1}[-0-9А-я\.]{1,}[0-9А-Яа-я]{1}))@([-A-Za-z]{1,}\.){1,2}[-A-Za-z]{2,})$/u,
                            message: 'Please enter valid email!'
                        }

                    }}
                    render={({field: {onChange, value}, fieldState: {error}}) => <>
                    </>}
                />
                <div>
                    <input {...(register("email", {
                        required: 'email is required',
                        pattern: {
                            value: /^((([0-9A-Za-z]{1}[-0-9A-z\.]{1,}[0-9A-Za-z]{1})|([0-9А-Яа-я]{1}[-0-9А-я\.]{1,}[0-9А-Яа-я]{1}))@([-A-Za-z]{1,}\.){1,2}[-A-Za-z]{2,})$/u,
                            message: 'Please enter valid email!'
                        }
                    }))} placeholder={'email'} type="text"/>
                    {errors.email && <div>{errors.email.message}
                    </div>}
                </div>

                <input {...register("password", {required: 'password is required'})} placeholder={'pass'} type="text"/>
                {errors.password && <div>{errors.password.message}</div>}

                <div>
                    <input{...register("rememberMe")} type="checkbox"/> rememberMe
                </div>

                <p><Link to={routes.RESET_PASS_PATH}>Forgot Password?</Link></p>

                <div>
                    <button>Sign In</button>
                </div>
                <div>
                    <Link to="/sign-up">sign-up</Link>
                </div>
            </form>
        </div>
    );
};

export default SingIn;