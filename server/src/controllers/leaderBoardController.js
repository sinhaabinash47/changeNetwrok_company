import leaderboard from "../models/leaderboard.js";

export const leaderboarScrore = async (req, res) => {
    try {
        const payload = req.body;
        const newUser = new leaderboard(payload);
        await newUser.save();
        res.status(201).json({success: true});
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Server Error", status: 500 });
    };
};
// getleaderboarScrore

export const getleaderboarScrore = async (req, res) => {
    console.log('sdlkfhkdj');
    try {
        const leaderBoadrData = await leaderboard.find();
        console.log(leaderBoadrData);
        res.status(201).json(leaderBoadrData);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Server Error", status: 500 });
    };
};