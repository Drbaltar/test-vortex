const mongoose = require('mongoose');

const dbInterface = require('./database-interface');

const TestModel = mongoose.model('Test', new mongoose.Schema({ name: String, id: Number }));

describe('database-interface', () => {
    let db;
  
    beforeAll(async () => {
        await mongoose.connect(process.env.MONGO_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        }).catch((error) => {
            console.log('Unable to connect to MongoDB: ' + error);
            process.exit(1);
        });

        db = mongoose.connection;
    });

    describe('Query Functions', () => {
        const testData = { name: 'Kyle', id: 127333811 };
        const uniqueData = { name: 'Kayce', id: 90183493 };
        const testDocument1 = TestModel(testData);
        const testDocument2 = TestModel(testData);
        const testDocument3 = TestModel(testData);
        const testDocument4 = TestModel(uniqueData);

        beforeAll(async () => {
            await testDocument1.save();
            await testDocument2.save();
            await testDocument3.save();
            await testDocument4.save();
        });

        it('returns a Query All with no parameters', async () => {
            const results = await dbInterface.queryAll(TestModel);
            expect(results.length).toBe(4);
        });

        it('returns a Query All with parameters', async () => {
            const results = await dbInterface.queryAllWithParameters(TestModel, { name: 'Kyle' });
            expect(results.length).toBe(3);
        });

        it('returns a single Query with parameters', async () => {
            const results = await dbInterface.queryOneWithParameters(TestModel, { name: 'Kayce' });
            expect(results).toMatchObject(uniqueData);
        });

        afterAll(() => {
            TestModel.deleteMany();
        });
    });

    afterAll(async () => {
        await db.close();
    });
});