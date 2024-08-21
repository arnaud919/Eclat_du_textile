<?php

namespace App\Entity;

use ApiPlatform\Metadata\ApiResource;
use App\Repository\NationalityRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Serializer\Annotation\Groups;

#[ORM\Entity(repositoryClass: NationalityRepository::class)]
#[Groups(["nationality"])]
#[ApiResource(
    normalizationContext: ['groups' => ['nationality']]
)]
class Nationality
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    /**
     * @var Collection<int, User>
     */
    #[ORM\OneToMany(targetEntity: User::class, mappedBy: 'nationality_employee')]
    private Collection $users;

    #[ORM\Column(length: 255, nullable: true)]
    private ?string $name_nationality = null;

    public function __construct()
    {
        $this->users = new ArrayCollection();
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    /**
     * @return Collection<int, User>
     */
    public function getUsers(): Collection
    {
        return $this->users;
    }

    public function addUser(User $user): static
    {
        if (!$this->users->contains($user)) {
            $this->users->add($user);
            $user->setNationalityEmployee($this);
        }

        return $this;
    }

    public function removeUser(User $user): static
    {
        if ($this->users->removeElement($user)) {
            // set the owning side to null (unless already changed)
            if ($user->getNationalityEmployee() === $this) {
                $user->setNationalityEmployee(null);
            }
        }

        return $this;
    }

    public function getNameNationality(): ?string
    {
        return $this->name_nationality;
    }

    public function setNameNationality(?string $name_nationality): static
    {
        $this->name_nationality = $name_nationality;

        return $this;
    }
}
