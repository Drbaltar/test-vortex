const mongoose = require('mongoose');

const dbInterface = require('./mongodb-interface');

const TestModel = mongoose.model('Test', new mongoose.Schema({ name: String, id: Number }));

const testData = { name: 'Kyle', id: 127333811 };

describe('mongodb-interface', () => {
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
        const uniqueData = { name: 'Kayce', id: 90183493 };
        const testDocument1 = TestModel(testData);
        const testDocument2 = TestModel(testData);
        const testDocument3 = TestModel(testData);
        const testDocument4 = TestModel(uniqueData);
        let idForSingleSearch;

        beforeAll(async () => {
            await testDocument1.save();
            await testDocument2.save();
            await testDocument3.save();
            const { _id } = await testDocument4.save();
            idForSingleSearch = _id;
        });

        it('returns a Query All with no parameters', async () => {
            const results = await dbInterface.queryAll(TestModel);
            expect(results.length).toBe(4);
        });

        it('returns a Query All with parameters', async () => {
            const results = await dbInterface.queryAllWithParameters(TestModel, { name: 'Kyle' });
            expect(results.length).toBe(3);
        });

        it('returns a Query All with select fields', async () => {
            const results = await dbInterface.queryAllWithSelectFields(TestModel, 'name -_id');
            expect(results.length).toBe(4);
            expect(results[0].name).toEqual('Kyle');
        });

        it('returns a single Query with parameters', async () => {
            const results = await dbInterface.queryOneWithParameters(TestModel, { name: 'Kayce' });
            expect(results).toMatchObject(uniqueData);
        });

        it('returns a single Query by ID', async () => {
            const results = await dbInterface.queryOneByID(TestModel, idForSingleSearch);
            expect(results).toMatchObject(uniqueData);
        });

        afterAll(async () => {
            await TestModel.deleteMany({});
        });
    });

    describe('Input Functions', () => {
        it('saveDocument() - correctly saves a single document', async () => {
            const testDocument = TestModel(testData);
            await dbInterface.saveDocument(testDocument);

            const results = await TestModel.find().lean().exec();
            expect(results[0]).toMatchObject(testData);
        });

        it('updateDocument() - correctly updates a document', async () => {
            const updatedInfo = { name: 'George', id: 127333811 };
            
            const testDocument = TestModel(testData);
            const originalData = await testDocument.save();

            await dbInterface.updateDocument(TestModel, originalData._id, updatedInfo);

            const results = await TestModel.find().lean().exec();
            expect(results[0]).toMatchObject(updatedInfo);
        });

        afterEach(async () => {
            await TestModel.deleteMany({});
        });
    });

    describe('Delete Dunctions', () => {
        const uniqueData = { name: 'Kayce', id: 90183493 };
        const testDocument = TestModel(uniqueData);

        it('deleteDocument() - correctly deletes a single document', async () => {
            const originalDoc = await testDocument.save();

            const results = await dbInterface.deleteDocument(TestModel, originalDoc._id);
            expect(results).toMatchObject(uniqueData);
            expect(await TestModel.findById(originalDoc._id).exec()).toEqual(null);
        });
    });

    afterAll(async () => {
        await db.close();
    });
});