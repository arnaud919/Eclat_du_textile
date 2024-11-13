<?php

namespace App\EventListener;

use App\Entity\User;
use Doctrine\ORM\Event\PrePersistEventArgs;
use Doctrine\ORM\Event\PreUpdateEventArgs;
use Psr\Log\LoggerInterface;
use Symfony\Component\PasswordHasher\Hasher\UserPasswordHasherInterface;

class PasswordHasherListener
{
    private UserPasswordHasherInterface $passwordHasher;
    private LoggerInterface $logger;

    public function __construct(UserPasswordHasherInterface $passwordHasher, LoggerInterface $logger)
    {
        $this->passwordHasher = $passwordHasher;
        $this->logger = $logger;
    }

    public function prePersist(PrePersistEventArgs $args): void
    {
        $entity = $args->getObject();
        if (!$entity instanceof User) {
            $this->logger->info("prePersist: L'entité n'est pas de type User.");
            return;
        }

        $this->logger->info("prePersist: Tentative de hachage du mot de passe pour l'utilisateur.");
        dump('prePersist called'); // Vérifier que cet événement est déclenché
        $this->hashPassword($entity);
    }

    public function preUpdate(PreUpdateEventArgs $args): void
    {
        $entity = $args->getObject();
        if (!$entity instanceof User) {
            return;
        }
    
        // Vérifie si le champ mot de passe est modifié pour hacher uniquement en cas de changement
        dump('preUpdate called'); // Vérifier que cet événement est déclenché
        if ($args->hasChangedField('password') && $args->getNewValue('password') !== $args->getOldValue('password')) {
            $this->hashPassword($entity);
        }
    }

    private function hashPassword(User $user): void
    {
        // Hache le mot de passe seulement si un mot de passe en clair est défini
        if ($user->getPassword()) {
            $hashedPassword = $this->passwordHasher->hashPassword($user, $user->getPassword());
            $user->setPassword($hashedPassword);
            $this->logger->info("Mot de passe haché et enregistré.");
        } else {
            $this->logger->warning("Mot de passe vide ou non défini.");
        }
    }
}