<?php
namespace App\EventListener;

use Doctrine\ORM\Event\PrePersistEventArgs;
use Doctrine\ORM\Event\PreUpdateEventArgs;
use Symfony\Component\PasswordHasher\Hasher\UserPasswordHasherInterface;
use Psr\Log\LoggerInterface;
use App\Entity\User;

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
        $this->hashPassword($args);
    }

    public function preUpdate(PreUpdateEventArgs $args): void
    {
        $this->hashPassword($args);
    }

    private function hashPassword($args): void
    {
        $entity = $args->getObject();

        if (!$entity instanceof User) {
            return;
        }

        $this->logger->info("Mot de passe avant hachage : " . $entity->getPassword());

        if ($entity->getPassword()) {
            $hashedPassword = $this->passwordHasher->hashPassword($entity, $entity->getPassword());
            $entity->setPassword($hashedPassword);

            $this->logger->info("Mot de passe après hachage : " . $hashedPassword);

            // Pour PreUpdate, informer Doctrine que le champ 'password' a changé
            if ($args instanceof PreUpdateEventArgs) {
                $args->getEntityChangeSet()['password'] = $hashedPassword;
            }
        }
    }
}