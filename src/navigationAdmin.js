import { FaWallet } from 'react-icons/fa';
import { GrStackOverflow } from 'react-icons/gr';
import { FiUsers } from 'react-icons/fi';
import { BiAddToQueue } from 'react-icons/bi';
import { TiThSmall } from 'react-icons/ti';
import { MdRestaurantMenu } from 'react-icons/md';











const _nav = [

    {
        _tag: 'CSidebarNavItem',
        name: "Today's Menu",
        to: '/home/admin/home',
        icon: <MdRestaurantMenu />,
        key: 'admin0'
    },
    {
        _tag: 'CSidebarNavItem',
        name: 'Add Product',
        to: '/home/admin/add-products',
        icon: <BiAddToQueue />,
        key: 'admin1'

    },
    {
        _tag: 'CSidebarNavItem',
        name: "All Products",
        to: '/home/admin/all-products',
        icon: <TiThSmall />,
        key: 'admin2'

    },
    {
        _tag: 'CSidebarNavItem',
        name: "Wallets",
        to: '/home/admin/wallets',
        icon: <FaWallet />,
        key: 'admin3'

    },
    {
        _tag: 'CSidebarNavItem',
        name: "Orders",
        to: '/home/admin/orders',
        icon: <GrStackOverflow />,
        key: 'admin4'

    },
    {
        _tag: 'CSidebarNavItem',
        name: 'Users',
        to: '/home/admin/users',
        icon: <FiUsers />,
        key: 'admin5'

    },

];

export default _nav;