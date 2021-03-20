import mongoose from 'mongoose';

const feedbackSchema = new mongoose.Schema({
    name: String,
    phone: String,
    question: String
});

const FeedbackModel = mongoose.model('FeedbackModel', feedbackSchema);

export default FeedbackModel;
