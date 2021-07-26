const { Schema, model } = require("mongoose");
const reactionSchema = require("./Reaction");
const dateFormat = require("../utils/dateFormat");

const ThoughtSchema = new Schema(
  {
    thoughtText: {
      type: String,
      minLength: 1,
      maxLength: 280,
      required: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
      get: (createdAtVal) => dateFormat(createdAtVal),
    },
    username: {
      type: String,
      required: true,
    },
    replies: [reactionSchema],
  },
  {
    toJSON: {
      virtuals: true,
      getters: true,
    },
    id: false,
  }
);

// create the Pizza model using the UserSchema
const Thought = model("Thought", ThoughtSchema);
// get total count of comments and replies on retrieval
// ThoughtSchema.virtual("reactionCount").get(function () {
//   return this.reactions.length;
// });
// export the Thought model
module.exports = Thought;
