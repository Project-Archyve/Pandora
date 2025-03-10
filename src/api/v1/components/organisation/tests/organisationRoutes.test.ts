// import request from 'supertest';
// import express from 'express';
// import router from '../accountRoutes';
// import { Account } from '../accountModel';
// import { createAccount, getAccounts, getAccountById, updateAccount, deleteAccount } from '../accountController';

// const app = express();

// app.use(express.json());
// app.use('/api/v1', router);

// jest.mock('../accountController');

// describe('API Tests /accounts', () => {
//     describe('POST /accounts', () => {
//         it('should create a new account and return 201 status', async () => {
//             const newAccount: Account = {
//                 id: "1",
//                 firstName: "John",
//                 lastName: "Doe",
//                 email: "john.doe@example.com", 
//                 password: "password"
//             };
//             (createAccount as jest.Mock).mockResolvedValue(newAccount);

//             const response = await request(app)
//                 .post('/api/v1/accounts')
//                 .send(newAccount);

//             expect(response.status).toBe(201);
//             expect(response.body).toEqual(newAccount);
//             expect(createAccount).toHaveBeenCalledWith(newAccount);
//         });
//     });

//     describe('GET /accounts', () => {
//         it('should return all accounts and 200 status', async () => {
//             const accounts: Account[] = [
//                 { id: "1", firstName: "John", lastName: "Doe", email: "john.doe@example.com", password: "password" },
//                 { id: "2", firstName: "Jane", lastName: "Doe", email: "jane.doe@example.com", password: "password" }
//             ];
//             (getAccounts as jest.Mock).mockResolvedValue(accounts);

//             const response = await request(app)
//                 .get('/api/v1/accounts');

//             expect(response.status).toBe(200);
//             expect(response.body).toEqual(accounts);
//             expect(getAccounts).toHaveBeenCalled();
//         });
//     });

//     describe('GET /accounts/:id', () => {
//         it('should return an account by ID and 200 status', async () => {
//             const account: Account = { id: "1", firstName: "John", lastName: "Doe", email: "john.doe@example.com", password: "password" };
//             (getAccountById as jest.Mock).mockResolvedValue(account);

//             const response = await request(app)
//                 .get('/api/v1/accounts/1');

//             expect(response.status).toBe(200);
//             expect(response.body).toEqual(account);
//             expect(getAccountById).toHaveBeenCalledWith("1");
//         });

//         it('should return 404 if account not found', async () => {
//             (getAccountById as jest.Mock).mockRejectedValue(new Error("Account not found"));

//             const response = await request(app)
//                 .get('/api/v1/accounts/1');

//             expect(response.status).toBe(404);
//         });
//     });

//     describe('PUT /accounts/:id', () => {
//         it('should update an account and return 200 status', async () => {
//             const updatedAccount: Account = { id: "1", firstName: "John", lastName: "Doe", email: "john.doe@example.com", password: "newpassword" };
//             (updateAccount as jest.Mock).mockResolvedValue(updatedAccount);

//             const response = await request(app)
//                 .put('/api/v1/accounts/1')
//                 .send(updatedAccount);

//             expect(response.status).toBe(200);
//             expect(response.body).toEqual(updatedAccount);
//             expect(updateAccount).toHaveBeenCalledWith("1", updatedAccount);
//         });
//     });

//     describe('DELETE /accounts/:id', () => {
//         it('should delete an account and return 200 status', async () => {
//             (deleteAccount as jest.Mock).mockResolvedValue(undefined);

//             const response = await request(app)
//                 .delete('/api/v1/accounts/1');

//             expect(response.status).toBe(200);
//             expect(response.body).toEqual({ message: `Account with ID 1 has been deleted.` });
//             expect(deleteAccount).toHaveBeenCalledWith("1");
//         });

//         it('should return 404 if account not found', async () => {
//             (deleteAccount as jest.Mock).mockRejectedValue(new Error("Account not found"));

//             const response = await request(app)
//                 .delete('/api/v1/accounts/1');

//             expect(response.status).toBe(404);
//         });
//     });
// });