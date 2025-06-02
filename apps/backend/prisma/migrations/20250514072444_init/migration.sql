-- CreateTable
CREATE TABLE "User" (
    "id" BIGSERIAL NOT NULL,
    "role" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "profileImage" TEXT,
    "deletedTime" TIMESTAMP(3),
    "createdTime" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedTime" TIMESTAMP(3),

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Resume" (
    "id" BIGSERIAL NOT NULL,
    "userId" BIGINT NOT NULL,
    "name" TEXT NOT NULL,
    "filePath" TEXT NOT NULL,
    "createdTime" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedTime" TIMESTAMP(3),

    CONSTRAINT "Resume_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ResumeQuestion" (
    "id" BIGSERIAL NOT NULL,
    "resumeId" BIGINT NOT NULL,
    "question" TEXT NOT NULL,
    "createdTime" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedTime" TIMESTAMP(3),

    CONSTRAINT "ResumeQuestion_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ResumeScript" (
    "id" BIGSERIAL NOT NULL,
    "userId" BIGINT NOT NULL,
    "questionId" BIGINT NOT NULL,
    "resumeId" BIGINT NOT NULL,
    "script" TEXT NOT NULL,
    "createdTime" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedTime" TIMESTAMP(3),

    CONSTRAINT "ResumeScript_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ResumeKeyword" (
    "id" BIGSERIAL NOT NULL,
    "userId" BIGINT NOT NULL,
    "questionId" BIGINT NOT NULL,
    "resumeId" BIGINT NOT NULL,
    "keyword" TEXT NOT NULL,
    "createdTime" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedTime" TIMESTAMP(3),

    CONSTRAINT "ResumeKeyword_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CommonCategory" (
    "id" BIGSERIAL NOT NULL,
    "category" TEXT NOT NULL,
    "createdTime" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedTime" TIMESTAMP(3),

    CONSTRAINT "CommonCategory_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CommonQuestion" (
    "id" BIGSERIAL NOT NULL,
    "categoryId" BIGINT NOT NULL,
    "question" TEXT NOT NULL,
    "createdTime" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedTime" TIMESTAMP(3),

    CONSTRAINT "CommonQuestion_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CommonScript" (
    "id" BIGSERIAL NOT NULL,
    "userId" BIGINT NOT NULL,
    "questionId" BIGINT NOT NULL,
    "script" TEXT NOT NULL,
    "createdTime" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedTime" TIMESTAMP(3),

    CONSTRAINT "CommonScript_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CommonKeyword" (
    "id" BIGSERIAL NOT NULL,
    "userId" BIGINT NOT NULL,
    "questionId" BIGINT NOT NULL,
    "keyword" TEXT NOT NULL,
    "createdTime" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedTime" TIMESTAMP(3),

    CONSTRAINT "CommonKeyword_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Analysis" (
    "id" BIGSERIAL NOT NULL,
    "userId" BIGINT NOT NULL,
    "type" TEXT NOT NULL,
    "question" TEXT NOT NULL,
    "videoPath" TEXT NOT NULL,
    "thumbnailPath" TEXT NOT NULL,
    "keyword" TEXT NOT NULL,
    "setStartTime" TIMESTAMP(3) NOT NULL,
    "analysisReqTime" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "analysisStartTime" TIMESTAMP(3) NOT NULL,
    "analysisEndTime" TIMESTAMP(3),

    CONSTRAINT "Analysis_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Social" (
    "id" BIGSERIAL NOT NULL,
    "provider" TEXT NOT NULL,
    "providerId" BIGINT NOT NULL,
    "userId" BIGINT NOT NULL,

    CONSTRAINT "Social_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "CommonCategory_category_key" ON "CommonCategory"("category");

-- AddForeignKey
ALTER TABLE "Resume" ADD CONSTRAINT "Resume_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ResumeQuestion" ADD CONSTRAINT "ResumeQuestionToResume" FOREIGN KEY ("resumeId") REFERENCES "Resume"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ResumeQuestion" ADD CONSTRAINT "ResumeQuestion_resumeId_fkey" FOREIGN KEY ("resumeId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ResumeScript" ADD CONSTRAINT "ResumeScript_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ResumeScript" ADD CONSTRAINT "ResumeScriptToResume" FOREIGN KEY ("resumeId") REFERENCES "Resume"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ResumeKeyword" ADD CONSTRAINT "ResumeKeyword_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ResumeKeyword" ADD CONSTRAINT "ResumeKeywordToResume" FOREIGN KEY ("resumeId") REFERENCES "Resume"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CommonQuestion" ADD CONSTRAINT "CommonQuestion_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "CommonCategory"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CommonScript" ADD CONSTRAINT "CommonScript_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CommonScript" ADD CONSTRAINT "CommonScript_questionId_fkey" FOREIGN KEY ("questionId") REFERENCES "CommonQuestion"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CommonKeyword" ADD CONSTRAINT "CommonKeyword_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CommonKeyword" ADD CONSTRAINT "CommonKeyword_questionId_fkey" FOREIGN KEY ("questionId") REFERENCES "CommonQuestion"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Analysis" ADD CONSTRAINT "Analysis_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Social" ADD CONSTRAINT "Social_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
