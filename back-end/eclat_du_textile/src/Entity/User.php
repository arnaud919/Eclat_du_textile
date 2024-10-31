<?php

namespace App\Entity;

use ApiPlatform\Metadata\ApiResource;
use App\Repository\UserRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\DBAL\Types\Types;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Security\Core\User\PasswordAuthenticatedUserInterface;
use Symfony\Component\Security\Core\User\UserInterface;
use Symfony\Component\Serializer\Annotation\Groups;

#[ORM\Entity(repositoryClass: UserRepository::class)]
#[ORM\UniqueConstraint(name: 'UNIQ_IDENTIFIER_EMAIL', fields: ['email'])]
#[ApiResource(
    normalizationContext: ['groups' => ['userList']],
)]

#[ORM\InheritanceType('JOINED')] // Stratégie d'héritage
#[ORM\DiscriminatorColumn(name: 'user_type', type: 'string')] // Colonne pour discriminer les types d'utilisateurs
#[ORM\DiscriminatorMap(['customer' => Customer::class, 'employee' => Employee::class])] // Map les classes enfants

class User implements UserInterface, PasswordAuthenticatedUserInterface
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column(options: ["unsigned" => true])]
    #[Groups(["userList"])]
    private ?int $id = null;

    #[ORM\Column(length: 255)]
    #[Groups(["userList"])]
    private ?string $email = null;

    /**
     * @var list<string> The user roles
     */
    #[ORM\Column]
    #[Groups(["userList"])]
    private array $roles = [];

    #[ORM\Column(length: 72)]
    #[Groups(["userList"])]
    private ?string $password = null;

    #[ORM\Column(length: 100)]
    #[Groups(["userList"])]
    private ?string $first_name = null;

    #[ORM\Column(length: 100)]
    #[Groups(["userList"])]
    private ?string $last_name = null;

    #[ORM\Column(length: 13, nullable: true)]
    #[Groups(["userList"])]
    private ?string $phone = null;

    /**
     * @var Collection<int, CustomerOrder>
     */
    #[ORM\OneToMany(targetEntity: CustomerOrder::class, mappedBy: 'user', orphanRemoval: true)]
    private Collection $customerOrders;

    public function __construct()
    {
        $this->customerOrders = new ArrayCollection();
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getEmail(): ?string
    {
        return $this->email;
    }

    public function setEmail(string $email): static
    {
        $this->email = $email;

        return $this;
    }

    /**
     * A visual identifier that represents this user.
     *
     * @see UserInterface
     */
    public function getUserIdentifier(): string
    {
        return (string) $this->email;
    }

    /**
     * @see UserInterface
     * @return list<string>
     */
    public function getRoles(): array
    {
        $roles = $this->roles;
        // guarantee every user at least has ROLE_USER
        $roles[] = 'ROLE_USER';

        return array_unique($roles);
    }

    /**
     * @param list<string> $roles
     */
    public function setRoles(array $roles): static
    {
        $this->roles = $roles;

        return $this;
    }

    /**
     * @see PasswordAuthenticatedUserInterface
     */
    public function getPassword(): string
    {
        return $this->password;
    }

    public function setPassword(string $password): static
    {
        $this->password = $password;

        return $this;
    }

    /**
     * @see UserInterface
     */
    public function eraseCredentials(): void
    {
        // If you store any temporary, sensitive data on the user, clear it here
        // $this->plainPassword = null;
    }

    public function getFirstName(): ?string
    {
        return $this->first_name;
    }

    public function setFirstName(string $first_name): static
    {
        $this->first_name = $first_name;

        return $this;
    }

    public function getLastName(): ?string
    {
        return $this->last_name;
    }

    public function setLastName(string $last_name): static
    {
        $this->last_name = $last_name;

        return $this;
    }

    public function getPhone(): ?string
    {
        return $this->phone;
    }

    public function setPhone(?string $phone): static
    {
        $this->phone = $phone;

        return $this;
    }

    /**
     * @return Collection<int, CustomerOrder>
     */
    public function getCustomerOrders(): Collection
    {
        return $this->customerOrders;
    }

    public function addCustomerOrder(CustomerOrder $customerOrder): static
    {
        if (!$this->customerOrders->contains($customerOrder)) {
            $this->customerOrders->add($customerOrder);
            $customerOrder->setUser($this);
        }

        return $this;
    }

    public function removeCustomerOrder(CustomerOrder $customerOrder): static
    {
        if ($this->customerOrders->removeElement($customerOrder)) {
            // set the owning side to null (unless already changed)
            if ($customerOrder->getUser() === $this) {
                $customerOrder->setUser(null);
            }
        }

        return $this;
    }
}
