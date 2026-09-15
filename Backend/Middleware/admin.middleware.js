export const isAdmin = (req, res, next) => {
    if (req.user && req.user.role === 'admin') {
        next(); 
    } else {
        return res.status(403).json({ 
           success : false, 
            error: "Forbidden", 
            message: "Access Denied: You don't have Admin rights!" 
        });
    }
};


export const isSuperAdmin = (req, res, next) => {
    
    if (req.user && req.user.isSuperAdmin) {
        next(); 
    } else {
        return res.status(403).json({ 
            success : false,
            error: "Forbidden", 
            message: "Access Denied: Super admin rights are required for this action!" 
        });
    }
};
