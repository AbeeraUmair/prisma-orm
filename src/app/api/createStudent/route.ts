import { NextResponse } from "next/server";
import prisma from "../../../../../lib/prisma";
export async function POST(request: Request) {
try {
// Attempt to establish the Prisma connection
await prisma.$connect();

const { name, email, teacherId, subjectIds } = await request.json();
console.log("Received Data:", { name, email, teacherId, subjectIds });

const newStudent = await prisma.student.create({
data: {
name,
email,
teacher: teacherId ? { connect: { id: teacherId } } : undefined,
subjects: subjectIds?.length ? { connect: subjectIds.map((id: number) =>
({ id })) } : undefined,
},
include: {
teacher: true,
subjects: true,
},
});
console.log("New student created:", newStudent);

return NextResponse.json(newStudent, { status: 201 });
} catch (error) {
console.error("Error creating student:", error);
return NextResponse.json({ error: "Failed to create student" }, { status: 
500 });
}
}