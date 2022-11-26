import Donate from "../Models/Donate.js";

export const create = async (req, res) => {
    try {
        const doc = new Donate({
            name: req.body.title,
            imageUrl: req.body.imageUrl,
            creator: req.userId,
            text: req.body.text,
            email: req.body.email,
            phoneNumber: req.body.phoneNumber,
            sum: req.body.sum,
        });

        const post = await doc.save();

        res.json(post);
    } catch (err) {
        console.log(err);
        res.status(404).json({
            message: 'error',
        });
    }
};


export const getAll = async (req, res) => {
    try {
        const organisations = await Donate.find().exec();
        res.json(organisations);
    } catch (err) {
        console.log(err);
        res.status(404).json({
            message: 'error',
        });
    }
};
export const getOne = async (req, res) => {
    try{
        const donateId = req.params.id;
        const organisation = await Donate.findOne({_id: donateId})
        res.json (organisation)
    }catch (err){
        console.log(err)
        res.status(404).json({
            message: "error"
        })
    }
}
export const remove = async (req, res) => {
    try {
        const orgId = req.params.id;

        Donate.findOneAndDelete(
            {
                _id: orgId,
            },
            (err, doc) => {
                if (err) {
                    console.log(err);
                    return res.status(404).json({
                        message: 'Error remove',
                    });
                }

                if (!doc) {
                    return res.status(404).json({
                        message: 'Doc not found',
                    });
                }

                res.json({
                    success: true,
                });
            },
        );
    } catch (err) {
        console.log(err);
        res.status(404).json({
            message: 'error',
        });
    }
};
export const update = async (req, res) => {
    try {
        const donateId = req.params.id;

        await Donate.updateOne(
            {
                _id: donateId,
            },
            {
                name: req.body.title,
                imageUrl: req.body.imageUrl,
                creator: req.userId,
                text: req.body.text,
                email: req.body.email,
                phoneNumber: req.body.phoneNumber,
                sum: req.body.sum,
            },
        );

        res.json({
            success: true,
        });
    } catch (err) {
        console.log(err);
        res.status(404).json({
            message: 'error',
        });
    }
};