import { useSelector } from "react-redux"
import Login from "./Pages/Login/Login"

export default function PrivateRoute({ children}) {
    const {auth} = useSelector((state)=>state.userReducer)

    if (auth) {
        return children
    }

    return <Login/>

}