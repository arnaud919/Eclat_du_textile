<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20241029085232 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE category_article CHANGE multiplier_price multiplier_price FLOAT');
        $this->addSql('ALTER TABLE employee CHANGE adress_employee adress_employee VARCHAR(100) NOT NULL, CHANGE postal_code postal_code VARCHAR(9) NOT NULL');
        $this->addSql('ALTER TABLE item CHANGE quantity quantity INT UNSIGNED NOT NULL, CHANGE price_service price_service FLOAT  UNSIGNED NOT NULL, CHANGE multiplier_price multiplier_price FLOAT UNSIGNED DEFAULT NULL');
        $this->addSql('ALTER TABLE service CHANGE price_service price_service FLOAT, CHANGE description description TINYTEXT');

        $this->addSql('ALTER TABLE user CHANGE email email VARCHAR(255) NOT NULL, CHANGE password password VARCHAR(72) NOT NULL, CHANGE first_name first_name VARCHAR(100) NOT NULL, CHANGE last_name last_name VARCHAR(100) NOT NULL, CHANGE phone phone VARCHAR(13) DEFAULT NULL');
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE category_article CHANGE multiplier_price multiplier_price FLOAT');
        $this->addSql('ALTER TABLE employee CHANGE adress_employee adress_employee VARCHAR(100) NOT NULL, CHANGE postal_code postal_code VARCHAR(9) NOT NULL');
        $this->addSql('ALTER TABLE item CHANGE quantity quantity INT UNSIGNED NOT NULL, CHANGE price_service price_service FLOAT UNSIGNED NOT NULL, CHANGE multiplier_price multiplier_price FLOAT UNSIGNED DEFAULT NULL');
        $this->addSql('ALTER TABLE service CHANGE price_service price_service FLOAT, CHANGE description description TINYTEXT');
        $this->addSql('ALTER TABLE user CHANGE email email VARCHAR(255) NOT NULL, CHANGE password password VARCHAR(72) NOT NULL, CHANGE first_name first_name VARCHAR(100) NOT NULL, CHANGE last_name last_name VARCHAR(100) NOT NULL, CHANGE phone phone VARCHAR(13) DEFAULT NULL');
    }
}