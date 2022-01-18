import React from 'react'
import './SideBarOption.css'

function SideBarOption({playlist, Icon, onClick, id, title }) {

    const handleClick = () => {
        onClick(playlist)
    }

    return (
        <div onClick={handleClick} className='sideBarOption'>
            {Icon && <Icon className="sideBarOption_icon" />}
            {Icon ? <h4>{title}</h4> : <p>{title}</p>}
        </div>
    )
}

export default SideBarOption
