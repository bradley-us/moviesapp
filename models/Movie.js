import mongoose from 'mongoose'

const movieSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Please, a title guapo']
  },
  plot: {
    type: String,
    required: [true, 'Please, a content guapo']
  }
})

export default mongoose.models.Movie || mongoose.model('Movie', movieSchema)