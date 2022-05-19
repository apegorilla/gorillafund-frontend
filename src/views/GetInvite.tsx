import React, { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { URL } from "libs/constants";

const GetInvite = () => {
    const { uid } = useParams();
    const navigate = useNavigate();
    useEffect(() => {
        navigate(URL.SIGNUP + '?refer=' + uid);
    }, [uid, navigate]);
    return <></>;
}

export default GetInvite;