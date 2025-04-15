import { MdAlternateEmail } from "react-icons/md";
import { TbLayoutDashboardFilled } from "react-icons/tb";
import { FaUserPlus } from "react-icons/fa";
import { GiPlantsAndAnimals } from "react-icons/gi";

const menu = [
    {
        label: "Dashboards",
        path: "/dashboards",
        icon: TbLayoutDashboardFilled,
        subItems: [
            { label: "Controle de Mamiferos", path: "/dashboards/controle", icon: GiPlantsAndAnimals },
        ]
    },
    {
        label: "Pedidos",
        path: "/pedidos",
        icon: MdAlternateEmail,
        subItems: [
            { label: "Acesso", path: "/pedidos/acesso", icon: FaUserPlus }
        ]
    }
];

export default menu;
