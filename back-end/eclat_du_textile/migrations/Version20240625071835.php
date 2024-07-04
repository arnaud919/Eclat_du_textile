<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20240625071835 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE category_article DROP FOREIGN KEY FK_C5E24E18F1AE4099');
        $this->addSql('DROP INDEX IDX_C5E24E18F1AE4099 ON category_article');
        $this->addSql('ALTER TABLE category_article DROP name_subcategory_article_id, DROP category_article');
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE category_article ADD name_subcategory_article_id INT NOT NULL, ADD category_article INT NOT NULL');
        $this->addSql('ALTER TABLE category_article ADD CONSTRAINT FK_C5E24E18F1AE4099 FOREIGN KEY (name_subcategory_article_id) REFERENCES category_article (id)');
        $this->addSql('CREATE INDEX IDX_C5E24E18F1AE4099 ON category_article (name_subcategory_article_id)');
    }
}
