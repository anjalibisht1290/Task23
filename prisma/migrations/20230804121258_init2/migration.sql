-- DropForeignKey
ALTER TABLE "Department" DROP CONSTRAINT "Department_hodId_fkey";

-- DropForeignKey
ALTER TABLE "Employee" DROP CONSTRAINT "Employee_deptId_fkey";

-- AlterTable
ALTER TABLE "Department" ALTER COLUMN "hodId" DROP NOT NULL;

-- AlterTable
ALTER TABLE "Employee" ALTER COLUMN "deptId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Department" ADD CONSTRAINT "Department_hodId_fkey" FOREIGN KEY ("hodId") REFERENCES "Employee"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Employee" ADD CONSTRAINT "Employee_deptId_fkey" FOREIGN KEY ("deptId") REFERENCES "Department"("id") ON DELETE SET NULL ON UPDATE CASCADE;
