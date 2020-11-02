import dotenv from 'dotenv';

const NODE_ENV = process.env.NODE_ENV || 'development'

const config = dotenv.config({path: `.env.${NODE_ENV}`})

export default config
