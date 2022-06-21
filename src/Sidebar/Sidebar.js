import React from 'react'
import './Sidebar.css';
import navAdmin from '../navigationAdmin'
import navUser from '../navigationUsers'
import { useSelector } from 'react-redux';
import { Link, useNavigate, NavLink } from 'react-router-dom';
import LoadingSpinnerMain from '../LoadingSpinner/LoadingSpinnerMain';

function Sidebar() {

    const user = useSelector((state) => state.user.value);
    const sidebarToggle = useSelector(state => state.sidebar.value)


    const navigate = useNavigate();


    // const navTitle = nav.filter((item) => item._tag == 'CSidebarNavTitle')

    // console.log(navTitle['Admin']);

    let activeClassName = "active__sidebar__optionsss";

    return (<>{sidebarToggle == false ?
        < div className='userSidebar' >
            <div className='main__userSidebar'>
                {user == null ? <LoadingSpinnerMain /> : user.role == 'user' ?
                    navUser.map((item, index) => {
                        return <NavLink
                            key={index}

                            className={({ isActive }) => isActive ? activeClassName : ""}
                            to={item.to}
                        >
                            <li
                                // id={window.location.pathname == item.to ? 'active__sidebar__options' : ""}
                                key={index}
                                onClick={() => navigate(item.to)}
                            >

                                <div className='sidebar__options'>
                                    <span className='sidebar__options__icon'>{item.icon}</span>
                                    <span className='sidebar__options__name'>{item.name}</span>
                                </div>

                            </li>
                        </NavLink>

                    })
                    : <>
                        {navAdmin.map((items, index) => (
                            <NavLink
                                className={({ isActive }) => isActive ? activeClassName : ""}
                                to={items.to}
                                key={index}

                            >
                                <li
                                    // id={window.location.pathname == item.to ? 'active__sidebar__options' : ""}
                                    key={index}
                                    onClick={() => navigate(items.to)}
                                >

                                    <div className='sidebar__options'>
                                        <span className='sidebar__options__icon'>{items.icon}</span>
                                        <span className='sidebar__options__name'>{items.name}</span>
                                    </div>

                                </li>
                            </NavLink>
                        ))}
                    </>
                }
            </div>

        </div >
        : <></>
    }</>
    )
}

export default Sidebar