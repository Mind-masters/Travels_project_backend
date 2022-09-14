const PlaceModel = require("../../schemas/Place");


class Places{

    static async getPlaces(req,res,nex){

        try {
            const places = await PlaceModel.find();
            res.status(200).send({places});
        } catch (err) {
            res.status(400).send(err);
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
            res.status(400).send(err);
        }
    }

    static async updatePlace (req,res,next){
        const {title, description} = req.body;
        const placeId = req.params.pid;

        console.log("title: ", title, " | description: ", description, " | id: ", placeId)

        try {
            const place = await PlaceModel.findById(placeId);
    
            place.title = title,
            place.description = description;
    
            await place.save();
    
        } catch (err) {
            console.log(err);    
        }
    
        return res.status(200).json({message: "Updated!"});
    }
    
    static async deletePlace (req,res,next){
        const placeId = req.params.pid;
    
        let place;

        return place;
    
    }

}

module.exports = Places;