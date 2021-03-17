// import hot from './hot';
import render from './render';

// TODO: Использовать другую переменную для разработки клиента
// Также при разработке клиента нужно выключить nodemon, так как он будет
// перезапускаться после каждой клентской пересборки
// const isDevelopment = process.env.NODE_ENV === 'development';
// export default isDevelopment ? hot : render;
export default render;
