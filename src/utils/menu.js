import { FaWallet, FaRunning, FaTv } from "react-icons/fa";
import { PiCloverFill } from "react-icons/pi";
import { FaMoneyBillTransfer } from "react-icons/fa6";

const menu = [
    {
        label: "Corridas",
        path: "/corridas",
        icon: FaRunning,
        subItems: [
            { label: "Apostas", path: "/corridas/apostas", icon: PiCloverFill },
            { label: "Transmissões", path: "/corridas/transmissao", icon: FaTv }
        ]
    },
    {
        label: "Carteira",
        path: "/carteira",
        icon: FaWallet,
        subItems: [
            { label: "Saldo", path: "/carteira/saldo", icon: FaMoneyBillTransfer }
        ]
    }
];

export default menu;
