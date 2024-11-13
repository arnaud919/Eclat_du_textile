<?php

namespace App\Entity;

use ApiPlatform\Metadata\ApiResource;
use App\Repository\ItemRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Serializer\Annotation\Groups;

#[ORM\Entity(repositoryClass: ItemRepository::class)]
#[ApiResource(
    normalizationContext: ['groups' => ['item']]
)]
class Item
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column(options: ["unsigned" => true])]
    #[Groups(["item"])]
    private ?int $id = null;

    #[ORM\Column(length: 255)]
    #[Groups(["item"])]
    private ?string $name_item = null;

    #[ORM\ManyToOne(inversedBy: 'items')]
    #[ORM\JoinColumn(nullable: false)]
    private ?CategoryArticle $category_article = null;

    #[ORM\ManyToOne(inversedBy: 'items')]
    #[ORM\JoinColumn(nullable: false)]
    private ?TypeMaterial $type_material = null;

    #[ORM\ManyToOne(inversedBy: 'items')]
    #[ORM\JoinColumn(nullable: false)]
    private ?Color $color = null;

    #[ORM\ManyToOne(inversedBy: 'items')]
    #[ORM\JoinColumn(nullable: false)]
    private ?Service $service = null;

    #[ORM\Column(options: ["unsigned" => true])]
    #[Groups(["item"])]
    private ?float $price_service = null;

    #[ORM\Column(nullable: true, options: ["unsigned" => true])]
    #[Groups(["item"])]
    private ?float $multiplier_price = null;

    /**
     * @var Collection<int, CustomerOrderItem>
     */
    #[ORM\OneToMany(targetEntity: CustomerOrderItem::class, mappedBy: 'Item')]
    private Collection $customerOrderItems;

    #[ORM\Column(options: ["unsigned" => true])]
    #[Groups(["item"])]
    private ?int $quantity = null;

    public function __construct()
    {
        $this->customerOrderItems = new ArrayCollection();
    }

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

    public function getPriceService(): ?float
    {
        return $this->price_service;
    }

    public function setPriceService(float $price_service): static
    {
        $this->price_service = $price_service;

        return $this;
    }

    public function getMultiplierPrice(): ?float
    {
        return $this->multiplier_price;
    }

    public function setMultiplierPrice(?float $multiplier_price): static
    {
        $this->multiplier_price = $multiplier_price;

        return $this;
    }

    /**
     * @return Collection<int, CustomerOrderItem>
     */
    public function getCustomerOrderItems(): Collection
    {
        return $this->customerOrderItems;
    }

    public function addCustomerOrderItem(CustomerOrderItem $customerOrderItem): static
    {
        if (!$this->customerOrderItems->contains($customerOrderItem)) {
            $this->customerOrderItems->add($customerOrderItem);
            $customerOrderItem->setItem($this);
        }

        return $this;
    }

    public function removeCustomerOrderItem(CustomerOrderItem $customerOrderItem): static
    {
        if ($this->customerOrderItems->removeElement($customerOrderItem)) {
            // set the owning side to null (unless already changed)
            if ($customerOrderItem->getItem() === $this) {
                $customerOrderItem->setItem(null);
            }
        }

        return $this;
    }

    public function getQuantity(): ?int
    {
        return $this->quantity;
    }

    public function setQuantity(int $quantity): static
    {
        $this->quantity = $quantity;

        return $this;
    }
}
