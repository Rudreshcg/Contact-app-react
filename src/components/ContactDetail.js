import React from "react";
import user from "../images/user.png"
import { Link } from "react-router-dom";

const ContactDetail = (props) => {

    return (
        <div className="main">
            <div className="ui card centered">
                <div className="image">
                    <img src={user} alt="user"/>
                </div>
                <div className="content">
                    <div className="header">Dipesh</div>
                    <div className="description">cs.dipesh@gmail.com</div>
                </div>
            </div>
        </div>
    );
};

export default ContactDetail;




















// return (
//     <div className="main">
//         <div className="ui card centered">
//             <div className="image">
//                 <img src={user} alt="user"/>
//             </div>
//             <div className="content">
//                 <div className="header">Dipesh</div>
//                 <div className="description">cs.dipesh@gmail.com</div>
//             </div>
//         </div>
//     </div>
// );