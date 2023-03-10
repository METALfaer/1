import React from 'react';
import {useAppSelector} from "../../../app/store";
import {Link, useNavigate} from "react-router-dom";
import style from './accountBlock.module.css'
import {Button} from "antd";
import {routes} from "../../../constants/constants";


const AccountBlock = () => {
    const isLoggedIn = useAppSelector((state) => state.auth.isLoggedIn)
    const userName = useAppSelector((state) => state.auth.userData.name)
    const avatar = useAppSelector((state) => state.auth.userData.avatar)
    const navigate = useNavigate()

    const signInHandler = () => {
        navigate(routes.SIGN_IN)
    }

    return (
        <div className={style.accountContainer}>
            {isLoggedIn
                ?
                <div><Link to={'/'}>{userName}</Link><img style={{maxWidth:'45px'}} src={avatar} alt="-avatar"/></div>
                :
                <Button type="primary" onClick={signInHandler}>
                    sign-in
                </Button>}
        </div>
    );
};

export default AccountBlock;