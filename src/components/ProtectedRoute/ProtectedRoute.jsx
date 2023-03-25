import React from 'react';
import {useSelector} from "react-redux";
import {Navigate, useLocation} from "react-router-dom";

const ProtectedRoute = ({children, isOnlyAuth}) => {
    const {isAuth} = useSelector(state => state.user);
    const location = useLocation();

    if (isOnlyAuth && isAuth) {
        const {from} = location.state || {from: {pathname: '/'}}

        return <Navigate to={from}/>
    }

    if (!isOnlyAuth && !isAuth) {
        return <Navigate to={{pathname: '/login'}} state={{from: location}}/>
    }

    return (
        <>{children}</>
    );
};

export default ProtectedRoute;
