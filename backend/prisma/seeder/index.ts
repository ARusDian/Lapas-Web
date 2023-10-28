import { PrismaClient } from "@prisma/client";
import { UserData } from "./UserData";
import { RoleData } from "./RoleData";

const prisma = new PrismaClient();

const seedRole = async () => {

	return RoleData.map(async (role) => {
		await prisma.role.create({
			data: {
				name: role.name,
			},
		});
	});
};

// const seedUser = async () => {
// 	return UserData.map(async (user) => {
// 		await prisma.user.create({
// 			data: {
// 				name: user.name,
// 				email: user.email,
// 				password: user.password,
// 				role: {
// 					connect: {
// 						id: user.roleId,
// 					}
// 				}
// 			},
// 		});
// 	});
// };

async function main() {
	// If There's Error, Try to seed the data in this order one by one

	// await prisma.user.deleteMany();
	// console.log("Deleted records in user table");

	await prisma.role.deleteMany();
	console.log("Deleted records in role table");


	seedRole();
	console.log("Seeded records in role table");

	// seedUser();
	// console.log("Seeded records in user table");

}
main()
	.then(async () => {
		await prisma.$disconnect();
	})
	.catch(async (e) => {
		console.error(e);
		await prisma.$disconnect();
	});
