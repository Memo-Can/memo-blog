import {createContext,useState } from "react";

export const UserContext = createContext({});

export function UserContextProvider({children}){
    const [userInfo, setUserInfo] = useState({});
		// const [globalData, setGlobalData] = useState({});
		const [globalData, setGlobalData] = useState({});
    return(
        <UserContext.Provider value={{userInfo,setUserInfo,globalData,setGlobalData}}>
            {children}
        </UserContext.Provider>
    );
};