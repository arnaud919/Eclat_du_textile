<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20241105103816 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE category_article CHANGE multiplier_price multiplier_price FLOAT');
        $this->addSql('ALTER TABLE item ADD CONSTRAINT FK_1F1B251EA8117BFE FOREIGN KEY (type_material_id) REFERENCES type_material (id)');
        $this->addSql('ALTER TABLE service CHANGE price_service price_service FLOAT, CHANGE description description TINYTEXT');
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE category_article CHANGE multiplier_price multiplier_price DOUBLE PRECISION DEFAULT NULL');
        $this->addSql('ALTER TABLE service CHANGE price_service price_service DOUBLE PRECISION DEFAULT NULL, CHANGE description description TINYTEXT DEFAULT NULL');
        $this->addSql('ALTER TABLE item DROP FOREIGN KEY FK_1F1B251EA8117BFE');
    }
}
