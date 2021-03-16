import BaseRESTService from './BaseRESTService';
import FeedbackModel from '../models/FeedbackModel';

interface CreateRequest {
    name: string,
    phone: string,
    question: string
}

class FeedbackService implements BaseRESTService {
    public create(data: CreateRequest) {
        return new Promise((resolve, reject) => {
            const feedback = new FeedbackModel(data);
            feedback.save(err => {
                if (err) {
                    reject(err);
                } else {
                    console.log('feedback saved successfully');
                    resolve(null);
                }
            });
        });
    }
}

const feedbackServiceInstance = new FeedbackService();

export default feedbackServiceInstance;
