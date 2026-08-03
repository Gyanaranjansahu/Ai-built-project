export default async function updateProfile(req, res) {
    try {
        const { name, email ,profileImage} = req.body;
        
        // 1. Basic empty field check
        if (!name || !email) {
            return res.status(400).json({
                success: false,
                message: "Name and email are required",
            });
        }
        const userId = req.params.userId; // Assuming you have user ID from authentication middleware
        
        // 2. Update user in database
        const updatedUser = await connect.findByIdAndUpdate(
            userId,
            { name, email ,profileImage},
            { new: true, runValidators: true }
        );
        return res.status(200).json({
            success: true,
            message: "Profile updated successfully",
            user: {
                id: updatedUser._id,
                name: updatedUser.name,
                email: updatedUser.email,
                profileImage: updatedUser.profileImage,
            },
        });        
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Failed to update profile",
        });
    }
}