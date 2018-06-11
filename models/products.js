const timestamps = require('mongoose-timestamp');

module.exports = (mongoose, modelName) => {
  const schema = new mongoose.Schema({
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
  });

  schema.plugin(timestamps);
  mongoose.model(modelName, schema);
};
