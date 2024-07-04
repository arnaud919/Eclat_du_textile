<?php

namespace App\Entity;

use App\Repository\ItemRepository;
use Doctrine\ORM\Mapping as ORM;

#[ORM\Entity(repositoryClass: ItemRepository::class)]
class Item
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[ORM\Column(length: 255)]
    private ?string $name_item = null;

    #[ORM\ManyToOne(inversedBy: 'items')]
    #[ORM\JoinColumn(nullable: false)]
    private ?CategoryArticle $category_article = null;

    #[ORM\ManyToOne(inversedBy: 'items')]
    #[ORM\JoinColumn(nullable: false)]
    private ?TypeMaterial $type_material = null;

    #[ORM\ManyToOne(inversedBy: 'items')]
    private ?Color $color = null;

    #[ORM\ManyToOne(inversedBy: 'items')]
    #[ORM\JoinColumn(nullable: false)]
    private ?Service $service = null;

    #[ORM\ManyToOne(inversedBy: 'items')]
    #[ORM\JoinColumn(nullable: false)]
    private ?CustomerOrder $customer_order = null;

    #[ORM\Column]
    private ?float $price_service = null;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getNameItem(): ?string
    {
        return $this->name_item;
    }

    public function setNameItem(string $name_item): static
    {
        $this->name_item = $name_item;

        return $this;
    }

    public function getCategoryArticle(): ?CategoryArticle
    {
        return $this->category_article;
    }

    public function setCategoryArticle(?CategoryArticle $category_article): static
    {
        $this->category_article = $category_article;

        return $this;
    }

    public function getTypeMaterial(): ?TypeMaterial
    {
        return $this->type_material;
    }

    public function setTypeMaterial(?TypeMaterial $type_material): static
    {
        $this->type_material = $type_material;

        return $this;
    }

    public function getColor(): ?Color
    {
        return $this->color;
    }

    public function setColor(?Color $color): static
    {
        $this->color = $color;

        return $this;
    }

    public function getService(): ?Service
    {
        return $this->service;
    }

    public function setService(?Service $service): static
    {
        $this->service = $service;

        return $this;
    }

    public function getCustomerOrder(): ?CustomerOrder
    {
        return $this->customer_order;
    }

    public function setCustomerOrder(?CustomerOrder $customer_order): static
    {
        $this->customer_order = $customer_order;

        return $this;
    }

    public function getPriceService(): ?float
    {
        return $this->price_service;
    }

    public function setPriceService(float $price_service): static
    {
        $this->price_service = $price_service;

        return $this;
    }
}
