'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    await queryInterface.sequelize.query(`
CREATE TABLE books (
  "id"  UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  "title" TEXT NOT NULL,
  "description" TEXT,
  "author" TEXT,
  "publisher" TEXT,
  "createdAt" TIMESTAMPTZ,
  "updatedAt" TIMESTAMPTZ,
  "deletedAt" TIMESTAMPTZ
);

CREATE INDEX "books_title_idx" ON "public"."books" USING GIN(to_tsvector('english', title));
CREATE INDEX "books_author_idx" ON "public"."books" USING GIN(to_tsvector('english', author));
CREATE INDEX "books_publisher_idx" ON "public"."books" USING GIN(to_tsvector('english', publisher));
CREATE INDEX "books_createdAt_idx" ON "public"."books" USING BRIN("createdAt");
CREATE INDEX "books_deletedAt_idx" ON "public"."books" USING BRIN("deletedAt");
`)
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.sequelize.query(`DROP TABLE "public"."books";`);
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
  }
};
