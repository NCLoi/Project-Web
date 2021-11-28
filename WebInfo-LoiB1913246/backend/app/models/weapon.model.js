module.exports = mongoose => {
    const schema = mongoose.Schema({
        namewp: {
            type: String,
            required: [true, "weapon name is required"],
        },
        imgwp: String,
        raritywp: String,
        baseatk: String,
        scstat: String,
        specialAD: String,
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

    return mongoose.model("weapon", schema);
};