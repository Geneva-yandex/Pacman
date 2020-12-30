const isEqual = (...objects: unknown[]) => objects.every(obj => JSON.stringify(obj) === JSON.stringify(objects[0]));
export default isEqual;