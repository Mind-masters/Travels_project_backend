// const placeModel = require("../../schemas/Place");
const PlaceModel = require("../../schemas/Place");


class Places{

    static async getPlaces(req,res,nex){

        try {
            const places = await PlaceModel.find();
            res.status(200).send({places});
        } catch (err) {
            res.status(501).send({message: "Error in fetching all places"});
        }
    }

    static async addNewPlace(req,res,next){
        const { title, image, description, address } = req.body;

        const createdPlace = new PlaceModel({
            title,
            description,
            image,
            address,
            location: {
                lat: 1,
                lng: 1
            },
        })
          
        try {
            await createdPlace.save();

            res.status(200).send(createdPlace);
        } catch (err) {
            console.log("error: ", err)
            res.status(501).send({message: "error in adding new place"});
        }
    }
    //delete

    // /update

}

module.exports = Places;