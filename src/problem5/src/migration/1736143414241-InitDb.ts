import { MigrationInterface, QueryRunner } from "typeorm";

export class InitDb1736143414241 implements MigrationInterface {
    name = 'InitDb1736143414241'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "users" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "username" character varying NOT NULL, "password" character varying NOT NULL, "role" character varying NOT NULL DEFAULT 'user', "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_fe0bb3f6520ee0469504521e710" UNIQUE ("username"), CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "scoreboards" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "userId" uuid NOT NULL, "score" integer NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "REL_8beb0095371529e40e497cee71" UNIQUE ("userId"), CONSTRAINT "PK_649627706d8105034f1240ee43d" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE INDEX "index_fk_scoreboard_user" ON "scoreboards" ("userId") `);
        await queryRunner.query(`ALTER TABLE "scoreboards" ADD CONSTRAINT "FK_8beb0095371529e40e497cee71f" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "scoreboards" DROP CONSTRAINT "FK_8beb0095371529e40e497cee71f"`);
        await queryRunner.query(`DROP INDEX "public"."index_fk_scoreboard_user"`);
        await queryRunner.query(`DROP TABLE "scoreboards"`);
        await queryRunner.query(`DROP TABLE "users"`);
    }

}
