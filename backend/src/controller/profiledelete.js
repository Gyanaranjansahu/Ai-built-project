export default async function deleteProfile(req, res) {
    try {
        const userId = req.params.userId; // Assuming you have user ID from authentication middleware
        
        // 1. Delete user from database
        await connect.findByIdAndDelete(userId);
        req.cookies.set("token", "", { httpOnly: true, expires: new Date(0) }); // Clear the token cookie
        return res.status(200).json({
            success: true,
            message: "Profile deleted successfully",
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: "Failed to delete profile",
        });
    }
}