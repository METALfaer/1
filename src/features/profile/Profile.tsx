import React, {useState} from 'react';
import profilePhoto from '../../common/assets/pngReact.png'
import s from './Profile.module.css'
import {useAppDispatch, useAppSelector} from "../../app/store";
import {Navigate} from "react-router";
import {logoutTC} from "../auth/sign-in/SingIn-reducer";
import {Button, Typography} from 'antd';
import {Link} from "react-router-dom";
import {routes} from "../../constants/constants";


const Profile = () => {
    const isLoggedIn = useAppSelector((state) => state.auth.isLoggedIn)
    const dispatch = useAppDispatch()
    const name = useAppSelector((state) => state.auth.userData.name)
    const email = useAppSelector((state) => state.auth.userData.email)

    const [editableStr, setEditableStr] = useState(name);
    const {Title} = Typography;


    const logOutProfile = () => {
        dispatch(logoutTC())
    }

   /* const changeNme = (title: string) => {
       ChangeName(title)
    }*/

    if (!isLoggedIn) return <Navigate to={routes.SIGN_IN_PATH}/>
    return (
        <div className={s.container}>
            <div className={s.profileGlobal}>
                <Link to={routes.PACKS_LIST}>back to packsList</Link>
                <div className={s.profile}>
                    <Title>Personal Information</Title>
                    <div className={s.profilePhoto}>
                        <img src={profilePhoto}/>
                        <div>
                            <Typography.Title editable={{onChange: setEditableStr}} level={3} style={{margin: 0}}>
                                {editableStr}
                            </Typography.Title>
                        </div>

                        <div><span>{email}</span></div>
                        <div>

                            <Button type="dashed" size={'small'} onClick={logOutProfile} shape={"round"}>
                                Log out
                            </Button>

                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Profile;