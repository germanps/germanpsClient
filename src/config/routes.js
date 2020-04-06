// Layout
import LayoutAdmin from '../layouts/LayoutAdmin';
import LayoutBasic from '../layouts/LayoutBasic';

// Admin pages
import AdminHome from '../pages/Admin';
import AdminSignIn from '../pages/Admin/SignIn';
import AdminUsers from '../pages/Admin/Users';
import AdminMenuWeb from '../pages/Admin/MenuWeb';

// Pages
import Home from '../pages/Home';
import Contact from '../pages/Contact';

// Others
import Error404 from '../pages/Error404';

const routes = [
    {
        // Área Admin => cargará el layout en todas las rutas que contengan: germanps.com/admin
        path: "/admin",
        component: LayoutAdmin,
        exact: false,
        routes: [
            {
                //cargará cuando la ruta sea exacta a: germapn.com/admin
                path: "/admin",
                component: AdminHome,
                exact: true
            },
            {
                //cargará cuando la ruta sea exacta a: germapn.com/admin/login
                path: "/admin/login",
                component: AdminSignIn,
                exact: true
            },
            {
                path: "/admin/users",
                component: AdminUsers,
                exact: true
            },
            {
                path: "/admin/menu",
                component: AdminMenuWeb,
                exact: true
            },
            {
                //cargará cuando la ruta sea de error
                component: Error404,
            }
        ]
    },
    {
        // Área basic => cargará el layout en todas las rutas que contengan: germanps.com
        path: "/",
        component: LayoutBasic,
        exact: false,
        routes: [
            {
                //cargará cuando la ruta sea exacta a: germapn.com/
                path: "/",
                component: Home,
                exact: true
            },
            {
                //cargará cuando la ruta sea exacta a: germapn.com/contact
                path: "/contact",
                component: Contact,
                exact: true
            },
            {
                 //cargará cuando la ruta sea de error
                 component: Error404,
            }
        ]
    }
];

export default routes;