import Donate from '../Models/Donate.js';


export const getAll = async (req, res) => {
    try {
        const donates = await Donate.find().populate('user').exec();
        res.json(donates);
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
        const donate = await Donate.findOne({_id: donateId})
        res.json (donate)
    }catch (err){
        console.log(err)
        res.status(404).json({
            message: "error"
        })
    }
}

export const remove = async (req, res) => {
    try {
        const donateId = req.params.id;

        Donate.findOneAndDelete(
            {
                _id: donateId,
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

export const create = async (req, res) => {
    try {
        const doc = new Donate({
            title: req.body.title,
            text: req.body.text,
            imageUrl: req.body.imageUrl,
            tags: req.body.tags,
            user: req.userId,
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

export const update = async (req, res) => {
    try {
        const donateId = req.params.id;

        await Donate.updateOne(
            {
                _id: postId,
            },
            {
                title: req.body.title,
                text: req.body.text,
                imageUrl: req.body.imageUrl,
                user: req.userId,
                tags: req.body.tags,
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