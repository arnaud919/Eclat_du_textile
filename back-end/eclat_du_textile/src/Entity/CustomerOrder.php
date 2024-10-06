<?php

namespace App\Entity;

use ApiPlatform\Metadata\ApiResource;
use App\Repository\CustomerOrderRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\DBAL\Types\Types;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Serializer\Annotation\Groups;

#[ORM\Entity(repositoryClass: CustomerOrderRepository::class)]
#[Groups(["customerorder"])]
#[ApiResource(
    normalizationContext: ['groups' => ['customerorder']]
)]
class CustomerOrder
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[ORM\ManyToOne(inversedBy: 'customerOrders')]
    #[ORM\JoinColumn(nullable: false)]
    private ?User $user = null;

    #[ORM\Column(type: Types::DATE_MUTABLE)]
    private ?\DateTimeInterface $date_order = null;

    #[ORM\Column(type: Types::DATE_MUTABLE, nullable: true)]
    private ?\DateTimeInterface $end_date_order = null;

    #[ORM\Column(length: 255, nullable: true)]
    private ?string $status_customer_order = null;

    /**
     * @var Collection<int, CustomerOrderItem>
     */
    #[ORM\OneToMany(targetEntity: CustomerOrderItem::class, mappedBy: 'customer_order')]
    private Collection $customerOrderItems;

    public function __construct()
    {
        $this->customerOrderItems = new ArrayCollection();
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getUser(): ?User
    {
        return $this->user;
    }

    public function setUser(?User $user): static
    {
        $this->user = $user;

        return $this;
    }

    public function getDateOrder(): ?\DateTimeInterface
    {
        return $this->date_order;
    }

    public function setDateOrder(\DateTimeInterface $date_order): static
    {
        $this->date_order = $date_order;

        return $this;
    }

    public function getEndDateOrder(): ?\DateTimeInterface
    {
        return $this->end_date_order;
    }

    public function setEndDateOrder(?\DateTimeInterface $end_date_order): static
    {
        $this->end_date_order = $end_date_order;

        return $this;
    }

    public function getStatusCustomerOrder(): ?string
    {
        return $this->status_customer_order;
    }

    public function setStatusCustomerOrder(?string $status_customer_order): static
    {
        $this->status_customer_order = $status_customer_order;

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
            $customerOrderItem->setCustomerOrder($this);
        }

        return $this;
    }

    public function removeCustomerOrderItem(CustomerOrderItem $customerOrderItem): static
    {
        if ($this->customerOrderItems->removeElement($customerOrderItem)) {
            // set the owning side to null (unless already changed)
            if ($customerOrderItem->getCustomerOrder() === $this) {
                $customerOrderItem->setCustomerOrder(null);
            }
        }

        return $this;
    }
}
