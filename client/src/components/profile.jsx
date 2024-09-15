import React, { useContext, useEffect, useState } from 'react'
import noteContext from '../context/notes/NoteContext';





const Profile = () => {
    const context = useContext(noteContext);
    const { getNote } = context;
    const [userInfo, setUserInfo] = useState(null);
    const url = `https://inotes-kwax.onrender.com/auth/userdata`

    useEffect(() => {
        const fetchData = async () => {
            try {
                let response = await fetch(`${url}`, {
                    method: "POST",
                    headers: {
                        "auth-token": localStorage.getItem('token'),
                        "content-type": "application/json"
                    }

                });
                const data = await response.json()
                setUserInfo(data);
            } catch (error) {
                //console.log(error)
            }
        }
        console.log(localStorage.getItem('token'));
        fetchData();
    }, []);

    // const notes = getNote()
    // const noteValue = Object.keys(notes).length;
    // var data = null
    
    

    return (
        <div className=' py-3 px-3' style={{ border: '5px solid black' ,borderRadius: 34 + 'px', fontFamily: 'cursive'}}>
            <h2 className='my-4 '>Profile-</h2>
            <h4 className='my-4 '>Username : {`${(userInfo) ? userInfo.username : " "}`}</h4>
            <h3 className='my-4 '>Email : {`${(userInfo) ? userInfo.email : " "}`}</h3>
            <h5 className='my-4 '>User Since :  {`${(userInfo) ? userInfo.date.slice(0, 10) : " "}`}</h5>

        </div>
    )

}
export default Profile
