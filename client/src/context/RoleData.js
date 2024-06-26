import React from 'react';
import { createContext, useState } from "react";

const RoleDataContext = createContext(null);
export const SupplyChainRoleProvider = ({ mRole, rRole, hRole, cRole, children }) => {

    const [roles, setRoles] = useState({
        manufacturer: mRole,
        retailer: rRole,
        distributionHub: hRole,
        customer: cRole
    });

    return (
        <RoleDataContext.Provider value={{ roles, setRoles }}>
            {children}
        </RoleDataContext.Provider>
    );
};

export const useRole = () => React.useContext(RoleDataContext);