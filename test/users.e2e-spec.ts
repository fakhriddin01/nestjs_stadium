// import { INestApplication } from "@nestjs/common"
// import { TestingModule, Test } from "@nestjs/testing";
// import { AppModule } from "../src/app.module";
// import { ValidationPipe } from "@nestjs/common";
// import * as request from "supertest";
// import * as cookieParser from "cookie-parser";


// describe("UserController (e2e)", ()=>{
//     let app: INestApplication;
//     let token: string;
//     beforeAll(async ()=> {
//         const moduleFixture: TestingModule = await Test.createTestingModule({
//             imports: [AppModule]
//         }).compile();

//         app = moduleFixture.createNestApplication();
//         // app.useGlobalPipes(new ValidationPipe());
//         app.use(cookieParser());
//         app.setGlobalPrefix('api')
//         await app.init();
//         console.log('adfkajsdfaskdjfahsldkjf');
        
//         const response  = await request(app.getHttpServer())
//             .post('/users/login')
//             .send({
//                 email: 'a.fakhriddin@gmail.com',
//                 password: 'Uzbek!$ton1'
//             });
//             token= response.body.token;
//             console.log(token);
    
        
//     });
//     it('/users/all (GET) --> 200 OK', () => {
//         return request(app.getHttpServer())
//         .get('/users/all')
//         .set('Authorization', `Bearer ${token}`)
//         .expect('Content-Type', /json/)
//         .expect(200);
//     })
//     it('/users (GET) --> 401 "Unauthorized" error', () => {
//         return (
//           request(app.getHttpServer())
//             .get('/users/all')
//             // .set('Authorization', `Bearer ${token}`)
//             .expect('Content-Type', /json/)
//             .expect(401)
//         );
//       });
//       // it('/users (POST) --> 201', () => {
//       //   return request(app.getHttpServer())
//       //     .post('/users')
//       //     .send({
//       //       name: 'user223451',
//       //       email: 'user223451@mail.uz',
//       //       password: '123456',
//       //     })
//       //     .expect('Content-Type', /json/)
//       //     .expect(201)
//       //     .then((response) => {
//       //       expect(response.body).toMatchObject({
//       //         id: expect.any(Number),
//       //         name: 'user223451',
//       //         email: 'user223451@mail.uz',
//       //         password: '123456',
//       //         is_active: false,
//       //       });
//       //     });
//       // });
//       // it('/users (POST) --> 500', () => {
//       //   return request(app.getHttpServer())
//       //     .post('/users')
//       //     .send({
//       //       name: 'user2',
//       //       email: 'user214@mail.uz',
//       //       password: 'Uzbek!$ton1',
//       //     })
//       //     .expect('Content-Type', /json/)
//       //     .expect(500);
//       // });
//       // it('/users (POST) --> 400 on Validation error', () => {
//       //   return request(app.getHttpServer())
//       //     .post('/users')
//       //     .send({
//       //       name: 'user2',
//       //       password: 'Uzbe',
//       //       email: 'user214@mail.uz',
//       //     })
//       //     .expect('Content-Type', /json/)
//       //     .expect(400)
//       //     .expect({
//       //       statusCode: 400,
//       //       message: ["Parol kamida 4ta belgidan uzun bo'lishi kerak"],
//       //       error: 'Bad Request',
//       //     });
//       // });
//       afterAll(async () => {
//         await app.close();
//       });
// })