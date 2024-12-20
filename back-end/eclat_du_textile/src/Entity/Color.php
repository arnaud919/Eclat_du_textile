<?php

namespace App\Entity;

use ApiPlatform\Metadata\ApiResource;
use App\Repository\ColorRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Serializer\Annotation\Groups;

#[ORM\Entity(repositoryClass: ColorRepository::class)]
#[ApiResource(
    normalizationContext: ['groups' => ['color']]
)]
class Color
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column(options: ["unsigned" => true])]
    #[Groups(["color"])]
    private ?int $id = null;

    #[ORM\Column(length: 255, options: ["unsigned" => true])]
    #[Groups(["color"])]
    private ?string $name_color = null;

    /**
     * @var Collection<int, Item>
     */
    #[ORM\OneToMany(targetEntity: Item::class, mappedBy: 'color')]
    private Collection $items;

    public function __construct()
    {
        $this->items = new ArrayCollection();
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getNameColor(): ?string
    {
        return $this->name_color;
    }

    public function setNameColor(string $name_color): static
    {
        $this->name_color = $name_color;

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
            $item->setColor($this);
        }

        return $this;
    }

    public function removeItem(Item $item): static
    {
        if ($this->items->removeElement($item)) {
            // set the owning side to null (unless already changed)
            if ($item->getColor() === $this) {
                $item->setColor(null);
            }
        }

        return $this;
    }
}