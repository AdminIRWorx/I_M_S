import mongoose from 'mongoose';

const bookSchema = new mongoose.Schema(
    {
        bookName: {
            type: String
            //required: [true, 'Book name is required!']
        },
        stockCount: {
            type: Number
            // required: [true, 'Stock count is required!'],
            // min: [1, 'Stock count cannot be less than 1']
        },
        price: {
            type: Number
            //required: true
        },
        dateCreated: {
            type: Date,
            default: Date.now
        },
        image: {
            type: String
            // default: '',
            // validate:{
            //     validator: function(v){
            //         if(!v) {
            //             return true
            //         } else {
            //             return /^https?:\/\/.+/.test(v) // Regex code
            //         }
            //     },
            //     message: 'Image must be a valid URL'
            // }
        }
    }
);

// bookSchema.virtual('id').get(() => { // convert _id to id
//     return this._id.toHexString();
// });

// bookSchema.set('toJSON', { // include virtuals as it is not included by default
//     virtuals: true
// });
    
const Book = mongoose.model('Book', bookSchema); 
export default Book; // put the created schema into a variable and export it