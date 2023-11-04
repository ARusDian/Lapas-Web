import { PrismaClient } from '@prisma/client'
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

const seedUser = async () => {
	const role = await prisma.role.findFirst({
		where: {
			name: "admin",
		},
	});
	return UserData.map(async (user) => {
		await prisma.user.create({
			data: {
				uid: null,
				name: user.name,
				email: user.email,
				password: user.password,
				disabled: user.disabled,
				gender: user.gender as "L" | "P",
				NIP: user.NIP,
				jabatan: user.jabatan,
				approved: user.approved,
				role: {
					connect: {
						id: role?.id,
					}
				}
			},
		});
	});
};

async function main() {
	// If There's Error, Try to seed the data in this order one by one

	await prisma.pushButtonLog.deleteMany();
	console.log("Deleted records in pushButtonLog table");

	await prisma.user.deleteMany();
	console.log("Deleted records in user table");

	await prisma.role.deleteMany();
	console.log("Deleted records in role table");


	seedRole();
	console.log("Seeded records in role table");

	seedUser();
	console.log("Seeded records in user table");

}
main()
	.then(async () => {
		await prisma.$disconnect();
	})
	.catch(async (e) => {
		console.error(e);
		await prisma.$disconnect();
	});
