import hot from './hot';
import render from './render';

const isDevelopment = process.env.NODE_ENV === 'development';
export default isDevelopment ? hot : render;
