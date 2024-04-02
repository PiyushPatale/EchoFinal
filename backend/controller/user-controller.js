import User from "../modal/User.js";


export const addUser = async (request, response) => {
    try {
        console.log("1");
        let exist = await User.findOne({ sub: request.body.sub });
        console.log("2");

        if(exist) {
            response.status(200).json('user already exists');
            return;
        }

        console.log(exist);
        console.log(request.body);

        const newUser = new User(request.body);
        await newUser.save();
        response.status(200).json(newUser);
    } catch (error) {
        response.status(500).json(error);
    }
}

export const getUser = async (request, response) => {
    try {
        const user = await User.find({});
        response.status(200).json(user);
    } catch (error) {
        response.status(500).json(error);
    }
}