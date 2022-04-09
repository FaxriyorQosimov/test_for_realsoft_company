import React from 'react'



import classes from './Index.module.css'
function Button() {
    return (
        <>
            <button className={classes.register_btn} onClick={()=> setActiveRegister(prev => !prev)}>Tizimga kirish</button>
        </>
    )
}

export default Button
