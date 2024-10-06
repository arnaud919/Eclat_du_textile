<?php

namespace App\Entity;

use ApiPlatform\Metadata\ApiResource;
use App\Repository\EmployeeRepository;
use Doctrine\DBAL\Types\Types;
use Doctrine\ORM\Mapping as ORM;

#[ORM\Entity(repositoryClass: EmployeeRepository::class)]
#[ApiResource]
class Employee extends User
{
    #[ORM\Column(type: Types::DATE_MUTABLE)]
    private ?\DateTimeInterface $hiring_date = null;

    #[ORM\Column(type: Types::DATE_MUTABLE, nullable: true)]
    private ?\DateTimeInterface $employment_end_date = null;

    #[ORM\Column(length: 255)]
    private ?string $adress_employee = null;

    #[ORM\Column(type: Types::DATE_MUTABLE)]
    private ?\DateTimeInterface $birthday = null;

    #[ORM\Column]
    private ?int $postal_code = null;

    public function getHiringDate(): ?\DateTimeInterface
    {
        return $this->hiring_date;
    }

    public function setHiringDate(\DateTimeInterface $hiring_date): static
    {
        $this->hiring_date = $hiring_date;

        return $this;
    }

    public function getEmploymentEndDate(): ?\DateTimeInterface
    {
        return $this->employment_end_date;
    }

    public function setEmploymentEndDate(?\DateTimeInterface $employment_end_date): static
    {
        $this->employment_end_date = $employment_end_date;

        return $this;
    }

    public function getAdressEmployee(): ?string
    {
        return $this->adress_employee;
    }

    public function setAdressEmployee(string $adress_employee): static
    {
        $this->adress_employee = $adress_employee;

        return $this;
    }

    public function getBirthday(): ?\DateTimeInterface
    {
        return $this->birthday;
    }

    public function setBirthday(\DateTimeInterface $birthday): static
    {
        $this->birthday = $birthday;

        return $this;
    }

    public function getPostalCode(): ?int
    {
        return $this->postal_code;
    }

    public function setPostalCode(int $postal_code): static
    {
        $this->postal_code = $postal_code;

        return $this;
    }
}
