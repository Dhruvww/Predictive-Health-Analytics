const axios = require('axios');
const { connectdb } = require('../dbs/connectdb');

let Kidney = async (req, res) => {
    let db = await connectdb();
    let collection = db.collection("Kidney_data_user");
    try {
        const {
            age, bp, sg, al, su, rbc, pc, pcc, ba,
            bgr, bu, sc, sod, pot, hemo, pcv, wc,
            rc, htn, dm, cad, appet, pe, ane
        } = req.body;

        const inputData = {
            age, bp, sg, al, su, rbc, pc, pcc, ba,
            bgr, bu, sc, sod, pot, hemo, pcv, wc,
            rc, htn, dm, cad, appet, pe, ane
        };
        if (!req.session.user) {
            return res.status(401).json({ message: "Unauthorized: User not logged in" });
        }
        console.log(inputData);
        const djangoResponse = await axios.post(
            'http://127.0.0.1:8000/api/kidney-predict/',
            inputData
        );

        const prediction = djangoResponse.data.prediction;
        const message = djangoResponse.data.message;

        let dbdata = {
            PatientId: req.session.user.id,
            age: age,
            bp: bp,
            sg: sg,
            al: al,
            su: su,
            rbc: rbc,
            pc: pc,
            pcc: pcc,
            ba: ba,
            bgr: bgr,
            bu: bu,
            sc: sc,
            sod: sod,
            pot: pot,
            hemo: hemo,
            pcv: pcv,
            wc: wc,
            rc: rc,
            htn: htn,
            dm: dm,
            cad: cad,
            appet: appet,
            pe: pe,
            ane: ane,
            result: message,
            createdAt: new Date()
        }
        let insert = await collection.insertOne(dbdata);
        if (insert.acknowledged) {
            res.status(200).json({
                success: true,
                message: "Data added successfully and prediction received.",
                prediction,
                resultMessage: message
            });
        } else {
            res.status(500).json({
                success: false,
                error: "Failed to insert into database."
            });
        }

    } catch (error) {
        console.error(" Error in /kidney:", error.message);
        res.status(500).json({
            success: false,
            error: "Something went wrong. Try again.",
        });
    }
};

module.exports = {
    Kidney
};
