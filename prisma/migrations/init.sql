-- CreateEnum
CREATE TYPE "ApplicationStatus" AS ENUM ('PENDING', 'INTERVIEW', 'APPROVED', 'REJECTED');

-- CreateTable
CREATE TABLE "Application" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "dateOfBirth" TEXT NOT NULL,
    "gender" TEXT NOT NULL,
    "stateOfOrigin" TEXT NOT NULL,
    "university" TEXT NOT NULL,
    "otherUniversity" TEXT,
    "faculty" TEXT NOT NULL,
    "department" TEXT NOT NULL,
    "matricNumber" TEXT NOT NULL,
    "currentLevel" TEXT NOT NULL,
    "expectedGraduation" TEXT NOT NULL,
    "cgpa" DOUBLE PRECISION NOT NULL,
    "hasZitraAccount" TEXT NOT NULL,
    "zitraAccountNumber" TEXT,
    "instagramHandle" TEXT,
    "twitterHandle" TEXT,
    "linkedinUrl" TEXT,
    "followersCount" TEXT,
    "whyAmbassador" TEXT NOT NULL,
    "marketingExperience" TEXT,
    "campusActivities" TEXT NOT NULL,
    "studentIdUrl" TEXT,
    "transcriptUrl" TEXT,
    "passportUrl" TEXT,
    "status" "ApplicationStatus" NOT NULL DEFAULT 'PENDING',
    "submittedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Application_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Application_email_key" ON "Application"("email");

-- CreateIndex
CREATE INDEX "Application_email_idx" ON "Application"("email");

-- CreateIndex
CREATE INDEX "Application_status_idx" ON "Application"("status");

-- CreateIndex
CREATE INDEX "Application_university_idx" ON "Application"("university");

-- CreateIndex
CREATE INDEX "Application_submittedAt_idx" ON "Application"("submittedAt");
