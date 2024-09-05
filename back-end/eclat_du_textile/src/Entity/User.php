<?php

namespace App\Entity;

use ApiPlatform\Metadata\ApiResource;
use App\Repository\UserRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\DBAL\Types\Types;
use Doctrine\ORM\Events;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Security\Core\User\PasswordAuthenticatedUserInterface;
use Symfony\Component\Security\Core\User\UserInterface;
use Symfony\Component\Serializer\Annotation\Groups;

#[ORM\Entity(repositoryClass: UserRepository::class)]
#[ORM\UniqueConstraint(name: 'UNIQ_IDENTIFIER_EMAIL', fields: ['email'])]
#[Groups(["userList"])]
#[ApiResource(
    normalizationContext: ['groups' => ['userList']],
)]

class User implements UserInterface, PasswordAuthenticatedUserInterface
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[ORM\Column(length: 180)]
    private ?string $email = null;

    /**
     * @var list<string> The user roles
     */
    #[ORM\Column]
    private array $roles = [];

    /**
     * @var string The hashed password
     */
    #[ORM\Column]
    private ?string $password = null;

    #[ORM\ManyToOne(inversedBy: 'users')]
    #[ORM\JoinColumn(nullable: true)]
    private ?Gender $gender_user = null;

    #[ORM\Column(length: 255)]
    private ?string $first_name = null;

    #[ORM\Column(length: 255)]
    private ?string $last_name = null;

    #[ORM\Column(type: Types::DATE_MUTABLE, nullable: true)]
    private ?\DateTimeInterface $birthday_date = null;

    #[ORM\ManyToOne(inversedBy: 'users')]
    private ?Nationality $nationality_employee = null;

    #[ORM\Column(length: 255, nullable: true)]
    private ?string $adress_employee = null;

    #[ORM\ManyToOne(inversedBy: 'users')]
    private ?PostalCode $postal_code_employee = null;

    #[ORM\Column(length: 255, nullable: true)]
    private ?string $phone = null;

    #[ORM\Column(type: Types::DATE_MUTABLE, nullable: true)]
    private ?\DateTimeInterface $hiring_date_employee = null;

    #[ORM\Column(type: Types::DATE_MUTABLE, nullable: true)]
    private ?\DateTimeInterface $employment_end_date_employee = null;

    #[ORM\ManyToOne(inversedBy: 'users')]
    private ?Job $job = null;

    #[ORM\Column(type: Types::DATE_MUTABLE, nullable: true)]
    private ?\DateTimeInterface $customer_inscription_date = null;

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

    public function getGenderUser(): ?Gender
    {
        return $this->gender_user;
    }

    public function setGenderUser(?Gender $gender_user): static
    {
        $this->gender_user = $gender_user;

        return $this;
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

    public function getBirthdayDate(): ?\DateTimeInterface
    {
        return $this->birthday_date;
    }

    public function setBirthdayDate(?\DateTimeInterface $birthday_date): static
    {
        $this->birthday_date = $birthday_date;

        return $this;
    }

    public function getNationalityEmployee(): ?Nationality
    {
        return $this->nationality_employee;
    }

    public function setNationalityEmployee(?Nationality $nationality_employee): static
    {
        $this->nationality_employee = $nationality_employee;

        return $this;
    }

    public function getAdressEmployee(): ?string
    {
        return $this->adress_employee;
    }

    public function setAdressEmployee(?string $adress_employee): static
    {
        $this->adress_employee = $adress_employee;

        return $this;
    }

    public function getPostalCodeEmployee(): ?PostalCode
    {
        return $this->postal_code_employee;
    }

    public function setPostalCodeEmployee(?PostalCode $postal_code_employee): static
    {
        $this->postal_code_employee = $postal_code_employee;

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

    public function getHiringDateEmployee(): ?\DateTimeInterface
    {
        return $this->hiring_date_employee;
    }

    public function setHiringDateEmployee(?\DateTimeInterface $hiring_date_employee): static
    {
        $this->hiring_date_employee = $hiring_date_employee;

        return $this;
    }

    public function getEmploymentEndDateEmployee(): ?\DateTimeInterface
    {
        return $this->employment_end_date_employee;
    }

    public function setEmploymentEndDateEmployee(?\DateTimeInterface $employment_end_date_employee): static
    {
        $this->employment_end_date_employee = $employment_end_date_employee;

        return $this;
    }

    public function getJob(): ?Job
    {
        return $this->job;
    }

    public function setJob(?Job $job): static
    {
        $this->job = $job;

        return $this;
    }

    public function getCustomerInscriptionDate(): ?\DateTimeInterface
    {
        return $this->customer_inscription_date;
    }

    public function setCustomerInscriptionDate(?\DateTimeInterface $customer_inscription_date): static
    {
        $this->customer_inscription_date = $customer_inscription_date;

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
