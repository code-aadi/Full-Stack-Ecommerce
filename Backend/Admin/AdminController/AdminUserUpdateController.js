
export const updateUserRole = async(req,res)=>{
  const {id} = req.params
  const {newRole} = req.body
  


   
  const targetUser = await User.findById(id);

    if (!targetUser) {
      return res.status(404).json({ message: "User nahi mila!" });
    }

   
    targetUser.role = newRole;
    await targetUser.save();

    return res.status(200).json({ 
      message: `${targetUser.name} ka role successfully badal kar ${newRole} kar diya gaya hai.` 
    });

    
}