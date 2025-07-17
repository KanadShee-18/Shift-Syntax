import bcrypt from "bcryptjs";

const password = "123";

const hashedPassword = await bcrypt.hash(password, 10);
console.log("Hashed Password: ", hashedPassword);

const comparedPassword = await bcrypt.compare("321", hashedPassword);
console.log("Compared Password: ", comparedPassword);
