const Contact = require('../Models/contact-model');
const User = require('../Models/user-model')

const getAllUsers = async (req, res, next) => {
    try {
        const users = await User.find().select({ password: 0 })
        console.log(users);

        if (!users || users.length === 0) {
            return res.status(404).json({ message: 'No Users Found' })
            next({ message: 'No Users Found' })
        }
        res.status(200).json(users)
    } catch (error) {
        next(error)
    }
}

const getAllContacts = async (req, res, next) => {
    try {
        const contacts = await Contact.find()
        console.log(contacts);

        if (!contacts || contacts.length === 0) {
            return res.status(404).json({ message: 'No Contacts Found' })
            next({ message: 'No Contacts Found' })
        }
        res.status(200).json(contacts)
    } catch (error) {
        next(error)
    }
}


const deleteUserById = async (req, res, next) => {
    try {
        const id = req.params.id;
        await User.deleteOne({ _id: id })
        res.status(200).json({ message: 'User Deleted SuccessFully' })


    } catch (error) {
        next(error)
    }
}

const getUserById = async (req, res, next) => {
    try {
        const id = req.params.id;
        const data = await User.findOne({ _id: id }, { password: 0 });

        if (!data) {
            return res.status(404).json({ message: 'User not found' });
        }

        console.log('✅ Found user:', data);
        res.status(200).json(data);

    } catch (error) {
        next(error);
    }
};


const updateUserById = async (req, res, next) => {
    try {
        const id = req.params.id;
        const updateUserData = req.body;

        const updatedData = await User.updateOne({ _id: id }, {
            $set: updateUserData,
        });

        if (updatedData.modifiedCount === 0) {
            return res.status(200).json({ modifiedCount: 0, message: "No changes made" });
        }

        return res.status(200).json({ modifiedCount: 1, message: "User updated successfully" });

    } catch (error) {
        next(error);
    }
};



const deleteContactById = async (req, res, next) => {
    try {
        const id = req.params.id
        await Contact.deleteOne({ _id: id })
        res.status(200).json({ message: 'Contact Deleted SuccessFully' })

    } catch (error) {
        next(error)
    }
}

module.exports = { getAllUsers, getAllContacts, deleteUserById, getUserById, updateUserById, deleteContactById }