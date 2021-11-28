module.exports = mongoose => {
    const schema = mongoose.Schema({
        name: {
            type: String,
            required: [true, "char name is required"],
        },
        img: String,
        rarity: String,
        weapon: String,
        element: String,
        attalentsE: String,
        imgE: String,
        attalentsQ: String,
        imgQ: String,
        cvjp: String,
        cven: String,
        ingamedescription: String,
        ownerId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "user"
        },
    }, { timestamps: true });


    schema.method("toJSON", function() {
        const { __v, _id, ...object } = this.toObject();
        object.id = _id;
        return object;
    });

    return mongoose.model("Char", schema);
};