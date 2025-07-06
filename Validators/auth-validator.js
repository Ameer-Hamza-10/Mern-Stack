const { z } = require('zod')


const signupSchema = z.object({
    userName: z
        .string({ required_error: 'Username is required' })
        .trim()
        .min(3, { message: 'Username must be at least 3 characters long' })
        .max(20, { message: 'Username must be at most 20 characters long' }),
    userEmail: z
        .string({ required_error: 'Email is required' })
        .trim()
        .email({ message: 'Invalid email format' })
        .min(3, { message: 'Email must be at least 3 characters long' })
        .max(25, { message: 'Email must be at most 25 characters long' }),
    phone: z
        .string({ required_error: 'phone Number is required' })
        .trim()
        .min(11, { message: 'phone Number must be at least 11 characters long' })
        .max(20, { message: 'phone Number must be at most 20 characters long' }),
    password: z
        .string({ required_error: 'password is required' })
        .trim()
        .min(6, { message: 'password must be at least 6 characters long' })
        .max(1024, { message: 'password must be at most 1024 characters long' }),

})
const signinSchema = z.object({
    userEmail: z
        .string({ required_error: 'Email is required' })
        .trim()
        .email({ message: 'Invalid email format' })
        .min(3, { message: 'Email must be at least 3 characters long' })
        .max(25, { message: 'Email must be at most 25 characters long' }),
    password: z
        .string({ required_error: 'password is required' })
        .trim()
        .min(6, { message: 'password must be at least 6 characters long' })
        .max(1024, { message: 'password must be at most 1024 characters long' }),
})


module.exports = {signupSchema,signinSchema}