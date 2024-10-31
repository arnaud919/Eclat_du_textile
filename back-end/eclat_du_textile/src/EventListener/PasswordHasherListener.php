<?php

namespace App\EventListener;

use Doctrine\ORM\Event\PrePersistEventArgs;
use Doctrine\ORM\Event\PreUpdateEventArgs;
use Symfony\Component\PasswordHasher\Hasher\UserPasswordHasherInterface;
use App\Entity\User;

class PasswordHasherListener
{
    private UserPasswordHasherInterface $hasher;

    public function __construct(UserPasswordHasherInterface $hasher)
    {
        $this->hasher = $hasher;
    }

    public function prePersist(PrePersistEventArgs $args): void
    {
        dump("prePersist called for PasswordHasherListener");
        $this->hashPassword($args->getObject());
    }
    

    public function preUpdate(PreUpdateEventArgs $args): void
    {
        $this->hashPassword($args->getObject());
    }

    private function hashPassword($entity): void
    {
        if ($entity instanceof User && $entity->getPassword()) {
            $entity->setPassword($this->hasher->hashPassword($entity, $entity->getPassword()));
        }
    }
}
