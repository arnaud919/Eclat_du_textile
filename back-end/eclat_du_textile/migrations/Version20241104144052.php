<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20241104144052 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs

        $this->addSql('ALTER TABLE item DROP FOREIGN KEY FK_1F1B251EA8117BFE;');
        $this->addSql('ALTER TABLE color MODIFY id INT UNSIGNED;');
        $this->addSql('ALTER TABLE item MODIFY color_id INT UNSIGNED;');

        $this->addSql('ALTER TABLE category_article CHANGE multiplier_price multiplier_price FLOAT');
        $this->addSql('ALTER TABLE color CHANGE id id INT UNSIGNED AUTO_INCREMENT NOT NULL');
        $this->addSql('ALTER TABLE customer CHANGE id id INT UNSIGNED NOT NULL');
        $this->addSql('ALTER TABLE customer_order CHANGE id id INT UNSIGNED AUTO_INCREMENT NOT NULL, CHANGE user_id user_id INT UNSIGNED NOT NULL');
        $this->addSql('ALTER TABLE customer_order_item CHANGE id id INT UNSIGNED AUTO_INCREMENT NOT NULL, CHANGE customer_order_id customer_order_id INT UNSIGNED NOT NULL, CHANGE item_id item_id INT UNSIGNED NOT NULL');
        $this->addSql('ALTER TABLE employee CHANGE id id INT UNSIGNED NOT NULL');
        $this->addSql('ALTER TABLE item CHANGE id id INT UNSIGNED AUTO_INCREMENT NOT NULL, CHANGE type_material_id type_material_id INT UNSIGNED NOT NULL');
        $this->addSql('ALTER TABLE service CHANGE price_service price_service FLOAT, CHANGE description description TINYTEXT');
        $this->addSql('ALTER TABLE type_material CHANGE id id INT UNSIGNED AUTO_INCREMENT NOT NULL');
        $this->addSql('ALTER TABLE user CHANGE id id INT UNSIGNED AUTO_INCREMENT NOT NULL');
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs

        $this->addSql('ALTER TABLE item DROP FOREIGN KEY FK_1F1B251EA8117BFE;');
        $this->addSql('ALTER TABLE color MODIFY id INT UNSIGNED;');
        $this->addSql('ALTER TABLE item MODIFY color_id INT UNSIGNED;');

        $this->addSql('ALTER TABLE category_article CHANGE multiplier_price multiplier_price DOUBLE PRECISION DEFAULT NULL');
        $this->addSql('ALTER TABLE employee CHANGE id id INT NOT NULL');
        $this->addSql('ALTER TABLE item CHANGE id id INT AUTO_INCREMENT NOT NULL, CHANGE type_material_id type_material_id INT NOT NULL');
        $this->addSql('ALTER TABLE color CHANGE id id INT AUTO_INCREMENT NOT NULL');
        $this->addSql('ALTER TABLE customer_order_item CHANGE id id INT AUTO_INCREMENT NOT NULL, CHANGE customer_order_id customer_order_id INT NOT NULL, CHANGE item_id item_id INT NOT NULL');
        $this->addSql('ALTER TABLE service CHANGE price_service price_service DOUBLE PRECISION DEFAULT NULL, CHANGE description description TINYTEXT DEFAULT NULL');
        $this->addSql('ALTER TABLE customer CHANGE id id INT NOT NULL');
        $this->addSql('ALTER TABLE type_material CHANGE id id INT AUTO_INCREMENT NOT NULL');
        $this->addSql('ALTER TABLE user CHANGE id id INT AUTO_INCREMENT NOT NULL');
        $this->addSql('ALTER TABLE customer_order CHANGE id id INT AUTO_INCREMENT NOT NULL, CHANGE user_id user_id INT NOT NULL');
    }
}
