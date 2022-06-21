import { AiFillHome } from 'react-icons/ai';

import { AiFillWallet } from 'react-icons/ai';
import { BsTelephoneFill, BsFillBagFill } from 'react-icons/bs';
import { AiFillSwitcher } from 'react-icons/ai';





const navUser = [

    {
        _tag: 'CSidebarNavItem',
        name: "Home",
        to: '/home/user/home',
        key: 'user0',
        icon: <AiFillHome />,
    },
    {
        _tag: 'CSidebarNavItem',
        name: "My Orders",
        to: '/home/user/user-orders',
        key: 'user1',
        icon: <BsFillBagFill />,
    },
    {
        _tag: 'CSidebarNavItem',
        name: "My Wallets",
        to: '/home/user/user-wallets',
        icon: <AiFillWallet />,
        key: 'user2'

    },
    {
        _tag: 'CSidebarNavItem',
        name: 'Contact Us',
        to: '/home/user/user-contact-us',
        icon: <BsTelephoneFill />,
        key: 'user3'

    },
    {
        _tag: 'CSidebarNavItem',
        name: 'About Us',
        to: '/home/user/aboutus',
        icon: <AiFillSwitcher />,
        key: 'user4'

    },

]

export default navUser;