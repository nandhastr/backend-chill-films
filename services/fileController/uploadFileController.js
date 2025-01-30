    import upload from "../../midleware/uploadMiddleware.js";

    export const uploadFile = (req, res) => {
        upload(req, res, async(err) => {
            try {
                 if (req.fileValidationError) {
                     return res.status(400).send({ error: req.fileValidationError });
                 }
                if (err) {
                    console.error(err);
                    return res.status(500).json({ error: err });
                }
                if (!req.file) {
                    return res.status(400).json({ error: "Please send file" });
                }
                res.status(200).send({ msg: "File uploaded successfully" });
            } catch (error) {
                console.error(error);
                res.status(500).json({ error: error.message });
                
            }
        });
    };

