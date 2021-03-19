import {Response} from 'express';

export interface ResponseWithRender extends Response {
    renderBundle: () => void;
}
