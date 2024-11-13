<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20241104171428 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE category_article CHANGE multiplier_price multiplier_price FLOAT');
        $this->addSql('ALTER TABLE customer ADD CONSTRAINT FK_81398E09BF396750 FOREIGN KEY (id) REFERENCES user (id) ON DELETE CASCADE');
        $this->addSql('ALTER TABLE customer_order ADD CONSTRAINT FK_3B1CE6A3A76ED395 FOREIGN KEY (user_id) REFERENCES user (id)');
        $this->addSql('ALTER TABLE customer_order_item ADD CONSTRAINT FK_AF231B8BA15A2E17 FOREIGN KEY (customer_order_id) REFERENCES customer_order (id)');
        $this->addSql('ALTER TABLE customer_order_item ADD CONSTRAINT FK_AF231B8B126F525E FOREIGN KEY (item_id) REFERENCES item (id)');
        $this->addSql('ALTER TABLE employee ADD CONSTRAINT FK_5D9F75A1BF396750 FOREIGN KEY (id) REFERENCES user (id) ON DELETE CASCADE');
        $this->addSql('ALTER TABLE item CHANGE color_id color_id INT UNSIGNED NOT NULL');
        $this->addSql('ALTER TABLE item ADD CONSTRAINT FK_1F1B251EA8117BFE FOREIGN KEY (type_material_id) REFERENCES type_material (id)');
        $this->addSql('ALTER TABLE item ADD CONSTRAINT FK_1F1B251E7ADA1FB5 FOREIGN KEY (color_id) REFERENCES color (id)');
        $this->addSql('ALTER TABLE service CHANGE price_service price_service FLOAT, CHANGE description description TINYTEXT');
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE category_article CHANGE multiplier_price multiplier_price DOUBLE PRECISION DEFAULT NULL');
        $this->addSql('ALTER TABLE employee DROP FOREIGN KEY FK_5D9F75A1BF396750');
        $this->addSql('ALTER TABLE customer DROP FOREIGN KEY FK_81398E09BF396750');
        $this->addSql('ALTER TABLE customer_order DROP FOREIGN KEY FK_3B1CE6A3A76ED395');
        $this->addSql('ALTER TABLE service CHANGE price_service price_service DOUBLE PRECISION DEFAULT NULL, CHANGE description description TINYTEXT DEFAULT NULL');
        $this->addSql('ALTER TABLE customer_order_item DROP FOREIGN KEY FK_AF231B8BA15A2E17');
        $this->addSql('ALTER TABLE customer_order_item DROP FOREIGN KEY FK_AF231B8B126F525E');
        $this->addSql('ALTER TABLE item DROP FOREIGN KEY FK_1F1B251EA8117BFE');
        $this->addSql('ALTER TABLE item DROP FOREIGN KEY FK_1F1B251E7ADA1FB5');
        $this->addSql('ALTER TABLE item CHANGE color_id color_id INT UNSIGNED DEFAULT NULL');
    }
}
