import BaseRESTService from './BaseRESTService';
import FeedbackModel from '../db/mongo/models/FeedbackModel';
import {CreateFeedbackDto} from '../dto';

class FeedbackService implements BaseRESTService {
    public create(data: CreateFeedbackDto) {
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
