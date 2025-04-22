const UserControllers = require('../../controllers/UserControllers');
const httpMocks = require('node-mocks-http');
const { User } = require('../../models');

jest.mock('../../models', () => ({
    User: {
        create: jest.fn(),
    }
}));

describe('UserControllers', () => {
    it('should return 201 when register is successful', async () => {
        const req = httpMocks.createRequest({
            method: 'POST',
            body: {
                name: 'Alex Bimbil',
                role: 'user',
                email: 'alex2@gmail.com',
                password: 'testing123'
            }
        });
        const res = httpMocks.createResponse();
        const next = jest.fn();

        User.create.mockResolvedValue({
            id: 1,
            name: 'Alex Bimbil',
            email: 'alex2@gmail.com',
            role: 'user',
            password: 'hashedPassword'
        });

        await UserControllers.userRegister(req, res, next);

        expect(res.statusCode).toBe(201);
        expect(res._getJSONData()).toEqual({ message: 'success' });
        expect(User.create).toHaveBeenCalled();
    });

    it('should return 400 when register fails', async () => {
        const req = httpMocks.createRequest({
            method: 'POST',
            body: {
                name: 'Alex Bimbil',
                role: 'user',
                email: 'alex2@gmail.com',
                password: ''
            }
        });
        const res = httpMocks.createResponse();
        const next = jest.fn();

        await UserControllers.userRegister(req, res, next);

        expect(next).toHaveBeenCalledWith({
            status: 400,
            message: 'name, password, role, and email are required'
        });
    })
});
