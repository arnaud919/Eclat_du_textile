<?php

namespace App\EventSubscriber;

use App\Entity\User;
use Doctrine\ORM\Event\PrePersistEventArgs;
use Symfony\Component\PasswordHasher\Hasher\UserPasswordHasherInterface;

class HashUserPasswordSubscriber
{
    public function __construct(
        private UserPasswordHasherInterface $hasher
    ) {
    }

    public function hashPassword(User $user, PrePersistEventArgs $event){
        $user = $event->getObject();

        if (!$user instanceof User) {
            return;
        }

        $user->setPassword($this->hasher->hashPassword(
            $user,
            $user->getPassword()
        ));
    }
}
