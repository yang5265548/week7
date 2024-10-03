const mongoose = require('mongoose');
const supertest = require('supertest');
const app = require('../app');
const Job = require('../models/jobModel');
const api = supertest(app);

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

describe("Job Controller", () => {
    beforeEach(async () => {
        await Job.deleteMany({});
        await Job.insertMany(jobs);
    });
    afterAll(() => {
        mongoose.connection.close();
    })
    describe("Get api", () => {
        it("shoud return all jobs as json when GET /api/jobs is called", async () => {
            const response = await api.get("/api/jobs")
                .expect(200)
                .expect("Content-Type", /application\/json/);

            expect(response.body).toHaveLength(jobs.length);
        })

        it("should return a job as json when GET /api/jobs/:jobId is called", async () => {
            const job = await Job.findOne({});

            const response = await api.get(`/api/jobs/${job.id}`)
                .expect(200)
                .expect("Content-Type", /application\/json/);

            expect(response.body).toEqual(JSON.parse(JSON.stringify(job)));
        })

        it("should return 404 for the non-existing job id", async () => {
            const nonExistentId = new mongoose.Types.ObjectId();
            await api.get(`/api/jobs/${nonExistentId}`).expect(404);
        })
    })

    describe("Post api", () => {
        it("should created a new jobe when post /api/jobs is called", async () => {
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

            await api.post("/api/jobs")
                .send(newJob)
                .expect(201)
                .expect("Content-Type", /application\/json/);

            const jobsAfterPost = await Job.find({});
            expect(jobsAfterPost).toHaveLength(jobs.length + 1);
            const jobTitles = jobsAfterPost.map((job) => job.title);
            expect(jobTitles).toContain(newJob.title);
        })
    })

    describe("put api", () => {
        it("should update a job when put /api/jobs/:jobId is called", async () => {
            const job = await Job.findOne({});
            const updateJob = {
                description: "Updated job description",
                type: "Part-time",
            }

            await api.put(`/api/jobs/${job.id}`)
            .send(updateJob)
            .expect(200)
            .expect("Content-Type", /application\/json/);
            const updateJobCheck= await Job.findById(job.id);
            expect(updateJobCheck.description).toBe(updateJob.description);
            expect(updateJobCheck.type).toBe(updateJob.type);
        })
        it("should return 400 for invalid job ID when PUT /api/jobs/:id", async () => {
            const invalidId = "12345";
            await api.put(`/api/jobs/${invalidId}`).send({}).expect(400);
          });
    })

    describe("delete api", () => {
        it("should delete one job by ID when DELETE /api/jobs/:id is called", async () => {
            const job = await Job.findOne();
            await api.delete(`/api/jobs/${job._id}`).expect(204);
        
            const deletedJobCheck = await Job.findById(job._id);
            expect(deletedJobCheck).toBeNull();
          }); 
    })
});