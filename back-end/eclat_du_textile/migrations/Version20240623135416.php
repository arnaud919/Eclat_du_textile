<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20240623135416 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('CREATE TABLE category_article (id INT AUTO_INCREMENT NOT NULL, subcategory_article_id INT DEFAULT NULL, category_article INT NOT NULL, name_category_article VARCHAR(255) NOT NULL, INDEX IDX_C5E24E18B4D18319 (subcategory_article_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('ALTER TABLE category_article ADD CONSTRAINT FK_C5E24E18B4D18319 FOREIGN KEY (subcategory_article_id) REFERENCES category_article (id)');
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE category_article DROP FOREIGN KEY FK_C5E24E18B4D18319');
        $this->addSql('DROP TABLE category_article');
    }
}
