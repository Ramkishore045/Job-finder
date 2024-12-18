import React from "react";
import { useLocation } from "react-router-dom";
import "./Breadcrumb.css";

function Breadcrumb() {
    const location = useLocation();

    
    const currentPath = location.pathname.split("/").filter((path) => path);
    const isHomePage = currentPath.length === 0;

    if (isHomePage) {
        return null;
    }

    return (
        <div className="breadcrumb-container">
            <span className="page-title">Home</span>
            {currentPath.map((path, index) => (
                <React.Fragment key={index}>
                    <span className="breadcrumb-separator">•</span>
                    <span className="breadcrumb-item">
                        {path.replace(/-/g, " ").replace(/\b\w/g, (char) => char.toUpperCase())}
                    </span>
                </React.Fragment>
            ))}
        </div>

    );
}

export default Breadcrumb;
