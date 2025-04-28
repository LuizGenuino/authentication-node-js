export const generateVerificationToken = () => {
    return Math.floor(100000 + Math.random() * 900000).toString();
}

export const calculateTokenExpiry = (hours: number): Date => {
    return new Date(Date.now() + hours * 60 * 60 * 1000);
}