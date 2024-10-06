<?php

namespace App\Entity;

use ApiPlatform\Metadata\ApiResource;
use App\Repository\JobRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Serializer\Annotation\Groups;

#[ORM\Entity(repositoryClass: JobRepository::class)]
#[Groups(["job"])]
#[ApiResource(
    normalizationContext: ['groups' => ['job']]
)]
class Job
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[ORM\Column(length: 255)]
    private ?string $name_job = null;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getNameJob(): ?string
    {
        return $this->name_job;
    }

    public function setNameJob(string $name_job): static
    {
        $this->name_job = $name_job;

        return $this;
    }
}
