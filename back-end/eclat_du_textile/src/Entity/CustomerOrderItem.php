<?php

namespace App\Entity;

use ApiPlatform\Metadata\ApiResource;
use App\Repository\CustomerOrderItemRepository;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Serializer\Annotation\Groups;

#[ORM\Entity(repositoryClass: CustomerOrderItemRepository::class)]
#[Groups(["customerorderitem"])]
#[ApiResource(
    normalizationContext: ['groups' => ['customerorderitem']]
)]
class CustomerOrderItem
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column(options: ["unsigned" => true])]
    private ?int $id = null;

    #[ORM\ManyToOne(inversedBy: 'customerOrderItems')]
    #[ORM\JoinColumn(nullable: false)]
    private ?CustomerOrder $customer_order = null;

    #[ORM\ManyToOne(inversedBy: 'customerOrderItems')]
    #[ORM\JoinColumn(nullable: false)]
    private ?Item $Item = null;

    public function getId(): ?int
    {
        return $this->id;
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

    public function getItem(): ?Item
    {
        return $this->Item;
    }

    public function setItem(?Item $Item): static
    {
        $this->Item = $Item;

        return $this;
    }
}
