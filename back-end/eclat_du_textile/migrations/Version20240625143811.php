<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20240625143811 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('CREATE TABLE customer_order (id INT AUTO_INCREMENT NOT NULL, user_id INT NOT NULL, date_order DATE NOT NULL, end_date_order DATE DEFAULT NULL, INDEX IDX_3B1CE6A3A76ED395 (user_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE item (id INT AUTO_INCREMENT NOT NULL, category_article_id INT NOT NULL, type_material_id INT NOT NULL, color_id INT DEFAULT NULL, service_id INT NOT NULL, customer_order_id INT NOT NULL, name_item VARCHAR(255) NOT NULL, price_service DOUBLE PRECISION NOT NULL, INDEX IDX_1F1B251E548AD6E2 (category_article_id), INDEX IDX_1F1B251EA8117BFE (type_material_id), INDEX IDX_1F1B251E7ADA1FB5 (color_id), INDEX IDX_1F1B251EED5CA9E6 (service_id), INDEX IDX_1F1B251EA15A2E17 (customer_order_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('ALTER TABLE customer_order ADD CONSTRAINT FK_3B1CE6A3A76ED395 FOREIGN KEY (user_id) REFERENCES user (id)');
        $this->addSql('ALTER TABLE item ADD CONSTRAINT FK_1F1B251E548AD6E2 FOREIGN KEY (category_article_id) REFERENCES category_article (id)');
        $this->addSql('ALTER TABLE item ADD CONSTRAINT FK_1F1B251EA8117BFE FOREIGN KEY (type_material_id) REFERENCES type_material (id)');
        $this->addSql('ALTER TABLE item ADD CONSTRAINT FK_1F1B251E7ADA1FB5 FOREIGN KEY (color_id) REFERENCES color (id)');
        $this->addSql('ALTER TABLE item ADD CONSTRAINT FK_1F1B251EED5CA9E6 FOREIGN KEY (service_id) REFERENCES service (id)');
        $this->addSql('ALTER TABLE item ADD CONSTRAINT FK_1F1B251EA15A2E17 FOREIGN KEY (customer_order_id) REFERENCES customer_order (id)');
        $this->addSql('ALTER TABLE user ADD gender_user_id INT NOT NULL, ADD nationality_employee_id INT DEFAULT NULL, ADD postal_code_employee_id INT DEFAULT NULL, ADD job_id INT DEFAULT NULL, ADD first_name VARCHAR(255) NOT NULL, ADD last_name VARCHAR(255) NOT NULL, ADD birthday_date DATE DEFAULT NULL, ADD adress_employee VARCHAR(255) DEFAULT NULL, ADD phone INT NOT NULL, ADD hiring_date_employee DATE DEFAULT NULL, ADD employment_end_date_employee DATE DEFAULT NULL, ADD customer_inscription_date DATE DEFAULT NULL');
        $this->addSql('ALTER TABLE user ADD CONSTRAINT FK_8D93D6495586A629 FOREIGN KEY (gender_user_id) REFERENCES gender (id)');
        $this->addSql('ALTER TABLE user ADD CONSTRAINT FK_8D93D649CFD93FB9 FOREIGN KEY (nationality_employee_id) REFERENCES nationality (id)');
        $this->addSql('ALTER TABLE user ADD CONSTRAINT FK_8D93D649DA7A6178 FOREIGN KEY (postal_code_employee_id) REFERENCES postal_code (id)');
        $this->addSql('ALTER TABLE user ADD CONSTRAINT FK_8D93D649BE04EA9 FOREIGN KEY (job_id) REFERENCES job (id)');
        $this->addSql('CREATE INDEX IDX_8D93D6495586A629 ON user (gender_user_id)');
        $this->addSql('CREATE INDEX IDX_8D93D649CFD93FB9 ON user (nationality_employee_id)');
        $this->addSql('CREATE INDEX IDX_8D93D649DA7A6178 ON user (postal_code_employee_id)');
        $this->addSql('CREATE INDEX IDX_8D93D649BE04EA9 ON user (job_id)');
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE customer_order DROP FOREIGN KEY FK_3B1CE6A3A76ED395');
        $this->addSql('ALTER TABLE item DROP FOREIGN KEY FK_1F1B251E548AD6E2');
        $this->addSql('ALTER TABLE item DROP FOREIGN KEY FK_1F1B251EA8117BFE');
        $this->addSql('ALTER TABLE item DROP FOREIGN KEY FK_1F1B251E7ADA1FB5');
        $this->addSql('ALTER TABLE item DROP FOREIGN KEY FK_1F1B251EED5CA9E6');
        $this->addSql('ALTER TABLE item DROP FOREIGN KEY FK_1F1B251EA15A2E17');
        $this->addSql('DROP TABLE customer_order');
        $this->addSql('DROP TABLE item');
        $this->addSql('ALTER TABLE user DROP FOREIGN KEY FK_8D93D6495586A629');
        $this->addSql('ALTER TABLE user DROP FOREIGN KEY FK_8D93D649CFD93FB9');
        $this->addSql('ALTER TABLE user DROP FOREIGN KEY FK_8D93D649DA7A6178');
        $this->addSql('ALTER TABLE user DROP FOREIGN KEY FK_8D93D649BE04EA9');
        $this->addSql('DROP INDEX IDX_8D93D6495586A629 ON user');
        $this->addSql('DROP INDEX IDX_8D93D649CFD93FB9 ON user');
        $this->addSql('DROP INDEX IDX_8D93D649DA7A6178 ON user');
        $this->addSql('DROP INDEX IDX_8D93D649BE04EA9 ON user');
        $this->addSql('ALTER TABLE user DROP gender_user_id, DROP nationality_employee_id, DROP postal_code_employee_id, DROP job_id, DROP first_name, DROP last_name, DROP birthday_date, DROP adress_employee, DROP phone, DROP hiring_date_employee, DROP employment_end_date_employee, DROP customer_inscription_date');
    }
}
