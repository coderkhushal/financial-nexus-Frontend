import { Bot, CircleUserIcon, HandCoins, HomeIcon } from "lucide-react";
import { AiFillProfile, AiOutlineTransaction } from "react-icons/ai";

export const routes= [
    {
        route:"/main/dashboard",
        name:"Home",
        icon: HomeIcon

    },

    {
        route:"/main/profile",
        name:"Profile ",
        icon: CircleUserIcon 
    },
    {
        route:"/main/transactions", 
        name: "Transactions",
        icon : HandCoins
    },
    {
        route:"/main/chat", 
        name: "FinBOT",
        icon : Bot
    }

]