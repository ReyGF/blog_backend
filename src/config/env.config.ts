export default () => ({
    PORT: parseInt(process.env.PORT, 10) || 3300,
    DB: {
        HOST: process.env.DB_HOST,
        PORT: parseInt(process.env.DB_PORT, 10) || 5432,
        NAME: process.env.DB_NAME,
        PASSWORD: process.env.DB_PASSWORD,
    },
    JWT_SEED: process.env.JWT_SEED,
});