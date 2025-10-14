import Navigation from './Header'
import { Outlet } from 'react-router-dom'

const MainLayout = () => {
    return (
        <>
            <Navigation />
            <Outlet />
        </>
    )
}

export default MainLayout