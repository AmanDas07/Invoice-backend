import bcrypt from 'bcrypt';

// Function to hash a password
export const hashPassword = async (password: string): Promise<string | undefined> => {
    try {
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(password, saltRounds);
        return hashedPassword;
    } catch (error) {
        console.error(error);
        return undefined;
    }
};

export const comparePassword = async (password: string, hashedPassword: string): Promise<boolean> => {
    return bcrypt.compare(password, hashedPassword);
}
