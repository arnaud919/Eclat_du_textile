<?php

namespace App\Entity;

use ApiPlatform\Metadata\ApiResource;
use App\Repository\CustomerRepository;
use Doctrine\DBAL\Types\Types;
use Doctrine\ORM\Mapping as ORM;

#[ORM\Entity(repositoryClass: CustomerRepository::class)]
#[ApiResource]
class Customer extends User
{
    #[ORM\Column(type: Types::DATE_MUTABLE)]
    private ?\DateTimeInterface $date_inscription_customer = null;


    public function getDateInscriptionCustomer(): ?\DateTimeInterface
    {
        return $this->date_inscription_customer;
    }

    public function setDateInscriptionCustomer(\DateTimeInterface $date_inscription_customer): static
    {
        $this->date_inscription_customer = $date_inscription_customer;

        return $this;
    }
}
