<?php

namespace App\EventSubscriber;

use App\Entity\User;
use Doctrine\Common\EventSubscriber;
use Doctrine\ORM\Event\PrePersistEventArgs;
use Doctrine\ORM\Event\PreUpdateEventArgs;
use Doctrine\ORM\Events;
use Symfony\Component\PasswordHasher\Hasher\UserPasswordHasherInterface;

class HashUserPasswordSubscriber implements EventSubscriber
{
    private UserPasswordHasherInterface $hasher;

    public function __construct(UserPasswordHasherInterface $hasher)
    {
        $this->hasher = $hasher;
    }

    public function getSubscribedEvents(): array
    {
        return [
            Events::prePersist,
            Events::preUpdate,
        ];
    }

    public function prePersist(PrePersistEventArgs $args): void
    {
        $entity = $args->getObject();

        if ($entity instanceof User) {
            $this->hashPassword($entity);
        }
    }

    public function preUpdate(PreUpdateEventArgs $args): void
    {
        $entity = $args->getObject();

        if ($entity instanceof User) {
            $this->hashPassword($entity);

            // Recalcule le changement de l'entité pour que Doctrine prenne en compte la mise à jour du mot de passe
            $em = $args->getObjectManager();
            $em->persist($entity);
        }
    }

    private function hashPassword(User $user): void
    {
        // Hache le mot de passe uniquement si un mot de passe en clair est défini
        if ($user->getPassword()) {
            $user->setPassword($this->hasher->hashPassword($user, $user->getPassword()));
        }
    }
}

