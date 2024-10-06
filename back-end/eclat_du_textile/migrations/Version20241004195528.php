<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20241004195528 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE user DROP FOREIGN KEY FK_8D93D6495586A629');
        $this->addSql('CREATE TABLE customer (id INT NOT NULL, date_inscription_customer DATE NOT NULL, password_customer VARCHAR(255) NOT NULL, PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE employee (id INT NOT NULL, job_id INT NOT NULL, hiring_date DATE NOT NULL, employment_end_date DATE DEFAULT NULL, adress_employee VARCHAR(255) NOT NULL, birthday DATE NOT NULL, postal_code INT NOT NULL, INDEX IDX_5D9F75A1BE04EA9 (job_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('ALTER TABLE customer ADD CONSTRAINT FK_81398E09BF396750 FOREIGN KEY (id) REFERENCES user (id) ON DELETE CASCADE');
        $this->addSql('ALTER TABLE employee ADD CONSTRAINT FK_5D9F75A1BE04EA9 FOREIGN KEY (job_id) REFERENCES postal_code (id)');
        $this->addSql('ALTER TABLE employee ADD CONSTRAINT FK_5D9F75A1BF396750 FOREIGN KEY (id) REFERENCES user (id) ON DELETE CASCADE');
        $this->addSql('DROP TABLE gender');
        $this->addSql('ALTER TABLE user DROP FOREIGN KEY FK_8D93D649DA7A6178');
        $this->addSql('ALTER TABLE user DROP FOREIGN KEY FK_8D93D649BE04EA9');
        $this->addSql('ALTER TABLE user DROP FOREIGN KEY FK_8D93D649CFD93FB9');
        $this->addSql('DROP INDEX IDX_8D93D649CFD93FB9 ON user');
        $this->addSql('DROP INDEX IDX_8D93D649DA7A6178 ON user');
        $this->addSql('DROP INDEX IDX_8D93D649BE04EA9 ON user');
        $this->addSql('DROP INDEX IDX_8D93D6495586A629 ON user');
        $this->addSql('ALTER TABLE user ADD user_type VARCHAR(255) NOT NULL, DROP gender_user_id, DROP nationality_employee_id, DROP postal_code_employee_id, DROP job_id, DROP birthday_date, DROP adress_employee, DROP hiring_date_employee, DROP employment_end_date_employee, DROP customer_inscription_date');
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('CREATE TABLE gender (id INT AUTO_INCREMENT NOT NULL, gender_name VARCHAR(15) CHARACTER SET utf8mb4 NOT NULL COLLATE `utf8mb4_unicode_ci`, PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB COMMENT = \'\' ');
        $this->addSql('ALTER TABLE customer DROP FOREIGN KEY FK_81398E09BF396750');
        $this->addSql('ALTER TABLE employee DROP FOREIGN KEY FK_5D9F75A1BE04EA9');
        $this->addSql('ALTER TABLE employee DROP FOREIGN KEY FK_5D9F75A1BF396750');
        $this->addSql('DROP TABLE customer');
        $this->addSql('DROP TABLE employee');
        $this->addSql('ALTER TABLE user ADD gender_user_id INT DEFAULT NULL, ADD nationality_employee_id INT DEFAULT NULL, ADD postal_code_employee_id INT DEFAULT NULL, ADD job_id INT DEFAULT NULL, ADD birthday_date DATE DEFAULT NULL, ADD adress_employee VARCHAR(255) DEFAULT NULL, ADD hiring_date_employee DATE DEFAULT NULL, ADD employment_end_date_employee DATE DEFAULT NULL, ADD customer_inscription_date DATE DEFAULT NULL, DROP user_type');
        $this->addSql('ALTER TABLE user ADD CONSTRAINT FK_8D93D6495586A629 FOREIGN KEY (gender_user_id) REFERENCES gender (id)');
        $this->addSql('ALTER TABLE user ADD CONSTRAINT FK_8D93D649DA7A6178 FOREIGN KEY (postal_code_employee_id) REFERENCES postal_code (id)');
        $this->addSql('ALTER TABLE user ADD CONSTRAINT FK_8D93D649BE04EA9 FOREIGN KEY (job_id) REFERENCES job (id)');
        $this->addSql('ALTER TABLE user ADD CONSTRAINT FK_8D93D649CFD93FB9 FOREIGN KEY (nationality_employee_id) REFERENCES nationality (id)');
        $this->addSql('CREATE INDEX IDX_8D93D649CFD93FB9 ON user (nationality_employee_id)');
        $this->addSql('CREATE INDEX IDX_8D93D649DA7A6178 ON user (postal_code_employee_id)');
        $this->addSql('CREATE INDEX IDX_8D93D649BE04EA9 ON user (job_id)');
        $this->addSql('CREATE INDEX IDX_8D93D6495586A629 ON user (gender_user_id)');
    }
}
