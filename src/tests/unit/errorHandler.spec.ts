import mongoose from 'mongoose';
import errorHandler from '../../middlewares/errorHandler-middleware';
import AppError from '../../utils/appError';
import { httpCode } from '../../utils/httpCode';

let response: any;

describe('Error handler', () => {
    beforeEach(() => {
        response = {} as Response;
        response.status = jest.fn().mockReturnValue(response);
        response.json = jest.fn().mockReturnValue(response);
    });

    afterAll((done) => mongoose.disconnect(done));

    it('should a syntax error return a not found', async () => {
        const error = new AppError('application error', httpCode.NOT_FOUND);

        errorHandler(error, null as any, response as any, null as any);

        expect(response.status).toHaveBeenCalledWith(httpCode.NOT_FOUND);
        expect(response.json).toHaveBeenCalled();
    });

    it('should a syntax error return a bad request', async () => {
        const error = new SyntaxError();

        errorHandler(error, null as any, response as any, null as any);

        expect(response.status).toHaveBeenCalledWith(httpCode.BAD_REQUEST);
        expect(response.json).toHaveBeenCalled();
    });

    it('should a syntax error return a internal server error', async () => {
        const error = new Error();

        errorHandler(error, null as any, response as any, null as any);

        expect(response.status).toHaveBeenCalledWith(
            httpCode.INTERNAL_SERVER_ERROR
        );
        expect(response.json).toHaveBeenCalled();
    });
});
