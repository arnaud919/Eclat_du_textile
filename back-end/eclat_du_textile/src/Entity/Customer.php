<?php

namespace App\Entity;

use ApiPlatform\Metadata\ApiResource;
use ApiPlatform\Metadata\Patch;
use ApiPlatform\Metadata\Post;
use App\Repository\CustomerRepository;
use Doctrine\DBAL\Types\Types;
use Doctrine\ORM\Mapping as ORM;
use App\Processor\CustomerProcessor;

#[ORM\Entity(repositoryClass: CustomerRepository::class)]
#[ORM\HasLifecycleCallbacks]
#[ApiResource(
    operations:[
        new Post(processor: CustomerProcessor::class),
        new Patch()
        ])]
class Customer extends User
{
    #[ORM\Column(type: Types::DATE_MUTABLE)]
    private ?\DateTimeInterface $date_inscription_customer = null;

    public function getDateInscriptionCustomer(): ?\DateTimeInterface
    {
        return $this->date_inscription_customer;
    }

    #[ORM\PrePersist]
    public function setDateInscriptionCustomer(): void
    {
        // Ici, vous définissez la date d'inscription à la date actuelle si elle n'est pas déjà définie
        if ($this->date_inscription_customer === null) {
            $this->date_inscription_customer = new \DateTime();  // Utilise la date actuelle
        }
    }
}
