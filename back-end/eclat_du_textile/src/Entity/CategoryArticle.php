<?php

namespace App\Entity;

use ApiPlatform\Metadata\ApiResource;
use App\Repository\CategoryArticleRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Serializer\Annotation\Groups;

#[ORM\Entity(repositoryClass: CategoryArticleRepository::class)]
#[Groups(["categoryarticle"])]
#[ApiResource(
    normalizationContext: ['groups' => ['categoryarticle']]
)]
class CategoryArticle
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[ORM\Column(length: 255, options: ["unsigned" => true])]
    private ?string $name_category_article = null;

    #[ORM\ManyToOne(targetEntity: self::class, inversedBy: 'categoryArticles')]
    private ?self $subcategory_article = null;

    /**
     * @var Collection<int, self>
     */
    #[ORM\OneToMany(targetEntity: self::class, mappedBy: 'subcategory_article')]
    private Collection $categoryArticles;

    /**
     * @var Collection<int, Item>
     */
    #[ORM\OneToMany(targetEntity: Item::class, mappedBy: 'category_article')]
    private Collection $items;

    #[ORM\Column(nullable: true, type: 'float', options: ["unsigned" => true], columnDefinition: 'FLOAT')]
    private ?float $multiplier_price = null;

    public function __construct()
    {
        $this->categoryArticles = new ArrayCollection();
        $this->items = new ArrayCollection();
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getNameCategoryArticle(): ?string
    {
        return $this->name_category_article;
    }

    public function setNameCategoryArticle(string $name_category_article): static
    {
        $this->name_category_article = $name_category_article;

        return $this;
    }

    public function getSubcategoryArticle(): ?self
    {
        return $this->subcategory_article;
    }

    public function setSubcategoryArticle(?self $subcategory_article): static
    {
        $this->subcategory_article = $subcategory_article;

        return $this;
    }

    /**
     * @return Collection<int, self>
     */
    public function getCategoryArticles(): Collection
    {
        return $this->categoryArticles;
    }

    public function addCategoryArticle(self $categoryArticle): static
    {
        if (!$this->categoryArticles->contains($categoryArticle)) {
            $this->categoryArticles->add($categoryArticle);
            $categoryArticle->setSubcategoryArticle($this);
        }

        return $this;
    }

    public function removeCategoryArticle(self $categoryArticle): static
    {
        if ($this->categoryArticles->removeElement($categoryArticle)) {
            // set the owning side to null (unless already changed)
            if ($categoryArticle->getSubcategoryArticle() === $this) {
                $categoryArticle->setSubcategoryArticle(null);
            }
        }

        return $this;
    }

    /**
     * @return Collection<int, Item>
     */
    public function getItems(): Collection
    {
        return $this->items;
    }

    public function addItem(Item $item): static
    {
        if (!$this->items->contains($item)) {
            $this->items->add($item);
            $item->setCategoryArticle($this);
        }

        return $this;
    }

    public function removeItem(Item $item): static
    {
        if ($this->items->removeElement($item)) {
            // set the owning side to null (unless already changed)
            if ($item->getCategoryArticle() === $this) {
                $item->setCategoryArticle(null);
            }
        }

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
}
