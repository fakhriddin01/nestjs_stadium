import { INestApplication } from "@nestjs/common"
import { TestingModule, Test } from "@nestjs/testing";
import { AppModule } from "../src/app.module";
import { ValidationPipe } from "@nestjs/common";
import * as request from "supertest";
import * as cookieParser from "cookie-parser";
import { User } from "../src/users/models/user.model";


describe("UserController (e2e)", ()=>{
    let app: INestApplication;
    let token: string;
    beforeAll(async ()=> {
        const moduleFixture: TestingModule = await Test.createTestingModule({
            imports: [AppModule]
        }).compile();

        app = moduleFixture.createNestApplication();
        app.useGlobalPipes(new ValidationPipe());
        app.use(cookieParser());
        app.setGlobalPrefix('api')
        await app.init();
        
        const response  = await request(app.getHttpServer())
            .post('/api/users/login')
            .send({
                email: 'a.fakhriddin@gmail.com',
                password: 'Uzbek!$ton1'
            });
            
        token = response.body.tokens.access_token;
            
         console.log(token);
    });
    it('/users/all (GET) --> 200 OK', () => {
        return request(app.getHttpServer())
        .get('/api/users/all')
        .set('Authorization', `Bearer ${token}`)
        .expect('Content-Type', /json/)
        .expect(200);
    })

     it('/users (GET) --> 401 "Unauthorized" error', () => {
        return (
          request(app.getHttpServer())
            .get('/api/users/all')
            // .set('Authorization', `Bearer ${token}`)
            .expect('Content-Type', /json/)
            .expect(401)
        );
      });

    it('/users/signup (POST) --> 201', () => {
        return request(app.getHttpServer())
          .post('/api/users/signup')
          .send({
            first_name: "Salim",
            last_name: "Salimov",
            username: "fakhriddin111112234567",
            password: "Uzbek!$ton1",
            confirm_password: "Uzbek!$ton1",
            email: "a.fakhriddin1111112234567@gmail.com",
            phone: "+998990771689",
            birthday: "1989-06-02"
          })
          .expect('Content-Type', /json/)
          .expect(201)
          .then((response) => {
            expect(response.body).toMatchObject({
              message: 'user registrated',
              tokens: {
                access_token: expect.any(String),
                refresh_token: expect.any(String),
              }
            });
          });
    });
    it('/users/signup (POST) --> 400 Bad request user already signed', () => {
        return request(app.getHttpServer())
          .post('/api/users/signup')
          .send({
            first_name: "Salim",
            last_name: "Salimov",
            username: "fakhriddin111112235",
            password: "Uzbek!$ton1",
            confirm_password: "Uzbek!$ton1",
            email: "a.fakhriddin1111112235@gmail.com",
            phone: "+998990771689",
            birthday: "1989-06-02"
          })
          .expect('Content-Type', /json/)
          .expect(400)
      });

      it('/users/signup (POST) --> 400 password not strong enough', () => {
        return request(app.getHttpServer())
          .post('/api/users/signup')
          .send({
            first_name: "Salim",
            last_name: "Salimov",
            username: "fakhriddin11111223",
            password: "1234",
            confirm_password: "1234",
            email: "a.fakhriddin111111223@gmail.com",
            phone: "+998990771689",
            birthday: "1989-06-02"
          })
          .expect('Content-Type', /json/)
          .expect(400)
          .expect({
            statusCode: 400,
            message: ["password is not strong enough"],
            error: 'Bad Request',
          });

      });

      it('/users/login (POST) --> 200', () => {
        return request(app.getHttpServer())
          .post('/api/users/login')
          .send({
            password: "Uzbek!$ton1",
            email: "a.fakhriddin@gmail.com"
          })
          .expect('Content-Type', /json/)
          .expect(200)
          .then((response) => {
            expect(response.body).toMatchObject({
              message: 'user loged in',
              tokens: {
                access_token: expect.any(String),
                refresh_token: expect.any(String),
              }
            });
          });
    });
   
    afterAll(async () => {
    await app.close();
    });
})