const mongoose = require("mongoose");
const supertest = require("supertest");
const app = require("../app"); // Your Express app
const api = supertest(app);
const Job = require("../models/jobModel");
const User = require("../models/userModel");

const jobs = [
    {
      title: "Software Engineer",
      type: "Full-time",
      description: "Develop and maintain web applications.",
      company: {
        name: "Tech Corp",
        contactEmail: "hr@techcorp.com",
        contactPhone: "123-456-7890",
      },
    },
    {
      title: "Product Manager",
      type: "Full-time",
      description: "Oversee product development from ideation to launch.",
      company: {
        name: "Innovate Ltd",
        contactEmail: "jobs@innovateltd.com",
        contactPhone: "098-765-4321",
      },
    },
  ];

let token = null;

beforeAll(async()=>{
    await User.deleteMany({});
    const result = await api.post("/api/users/signup").send({
        name: "John Doe",
        email: "john@example.com",
        password: "R3g5T7#gh",
        phone_number: "1234567890",
        gender: "Male",
        date_of_birth: "1990-01-01",
        membership_status: "Inactive",
      });
      token = result.body.token;
});

describe("API about jobs", () => {
    beforeEach( async () => {
        await Job.deleteMany({});
        await Promise.all([
            api
                .post("/api/jobs")
                .set("Authorization", "bearer " + token)
                .send(jobs[0]),
            api
                .post("/api/jobs")
                .set("Authorization", "bearer " + token)
                .send(jobs[1]),
        ])
    });

    describe("Get jobs",()=>{
        describe("when call /api/jobs",()=>{
            test("should return all jobs as Json", async()=>{
                const response = await api.get("/api/jobs")
                .set("Authorization", "bearer " + token)
                .expect(200)
                .expect("Content-Type", /application\/json/);
                
            })

        describe("when call /api/jobs/:id",()=>{
            test("should return a job as Json", async()=>{
                const job = await Job.findOne({});
                const response = await api.get(`/api/jobs/${job.id}`)
                .set("Authorization", "bearer " + token)
                .expect(200)
                .expect("Content-Type", /application\/json/);
                
            })
        })
    })
});

describe("when call post /api/jobs",()=>{
    it("should create one job and return 201", async()=>{
        const newJob = {
            title: "Data Scientist",
            type: "Full-time",
            description: "Analyze and interpret complex data.",
            company: {
              name: "Data Insights",
              contactEmail: "careers@datainsights.com",
              contactPhone: "555-123-4567",
            },
        };
        await api
        .post("/api/jobs")
        .set("Authorization", "bearer " + token)
        .send(newJob)
        .expect(201);
    })
});
describe("when call put /api/jobs/:id",()=>{
    it("should modify one job and return 200",async()=>{
        const job=await Job.findOne({});
        const modifyJob = {
            title: "Software Engineer one",
              type: "Full-timepair",
        }

        await api.put(`/api/jobs/${job.id}`)
        .set("Authorization", "bearer " + token)
        .send(modifyJob)
        .expect(200);
    })
})


describe("when call delete /api/jobs/:id",()=>{
    it("should delete one job and return 204",async()=>{
        const job=await Job.findOne({});
        await api.delete(`/api/jobs/${job.id}`)
        .set("Authorization", "bearer " + token)
        .expect(204);

        const jobCheck = await Job.findById(job._id);
        expect(jobCheck).toBeNull();
    })
})
});

afterAll(() => {
    mongoose.connection.close();
  });