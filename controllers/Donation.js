import Donation from '../models/donation.js'

export const createDonation = async (req, res) => {
    try {
        const {content} = req.body;
        console.log(content)
        console.log(req.files)
        let imagesUrl = [];
        if (req.files.length) {
            req.files.map(file => {
                imagesUrl.push(`${req.protocol}://${req.get("host")}/public/uploads/${file.filename}`);
            })
        }
        if (!content) return res.status(403).json({message: "please add some content !!"});
        const newDonation = new Donation({
            ...req.body,
            images: imagesUrl,
            user: req.user._id
        });
        if (!newDonation) return res.status(500).json({message: "smothing went wrong !!"});
        await newDonation.save()
        let fullDonation = await newDonation.populate('user', "username profile_pic")
        return res.status(200).json(fullDonation);
    } catch (error) {
        return res.status(500).json(error)
    }
}

export const allDonations = async (req, res) => {
    try {
        const getDonation = await Donation.find({user: req.user._id})
            .populate('user', "fullName avatarUrl")
            .populate({path: "comments", populate: {path: 'user', model: 'user', select: "fullName avatarUrl"}})
            .sort({"createdAt": -1});
        return res.status(200).json(getDonation);
    } catch (error) {
        return res.status(500).json({message: error.message});
    }
}

export const DeleteDonation = async (req, res) => {
    try {
        const {donationId} = req.params;
        if (!donationId) return res.status(404).json({message: "Donation not found !!"});
        const getDonation = await Donation.findById(donationId);
        if (!getDonation) return res.status(404).json({message: "Donation not Found !!"});
        if (getDonation.user.toString() !== req.user._id.toString()) {
            return res.status(400).json({message: "you don`t own this Donation"})
        }
        await getDonation.remove();
        return res.status(200).json({message: "Donation Deleted successfully"})
    } catch (error) {
        return res.status(500).json({message: "somthing went wrong !!"});
    }
}

export const editDonation = async (req, res) => {
    try {
        const getDonation = await Donation.findById(req.params.donationId);
        if (!getDonation) return res.status(400).json({message: "something went wrong !!"});

        if (getDonation.user.toString() !== req.user._id.toString()) {
            return res.status(400).json({message: "you don`t own this donation"})
        }
        const newDonation = await Donation.findOneAndUpdate(req.params.donationId, req.body, {new: true});

        if (!newDonation)
            return res.status(500).json({message: "something went wrong !!"});

        return res.status(200).json({data: newDonation, message: "updated successfully "});
    } catch (error) {
        return res.status(500).json({message: "somthing went wrong !!"});
    }
}