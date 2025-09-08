import mongoose from 'mongoose'

export const ConnectDb = async()=>
{
try {
  await  mongoose.connect(`mongodb://127.0.0.1:27017/LettrBlack`, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    }),
    console.log('MongoDB Connected');
} catch (error) {
    console.log('Db connection failed',error.message);

}
}