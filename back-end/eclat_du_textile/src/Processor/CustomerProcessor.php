<?php

namespace App\Processor;

use ApiPlatform\Metadata\Operation;
use ApiPlatform\State\ProcessorInterface;
use App\Entity\Customer;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\PasswordHasher\Hasher\UserPasswordHasherInterface;

class CustomerProcessor implements ProcessorInterface
{
    private EntityManagerInterface $entityManager;
    private UserPasswordHasherInterface $passwordHasher;

    public function __construct(EntityManagerInterface $entityManager, UserPasswordHasherInterface $passwordHasher)
    {
        $this->entityManager = $entityManager;
        $this->passwordHasher = $passwordHasher;
    }

    public function process(mixed $data, Operation $operation, array $uriVariables = [], array $context = [])
    {

        if ($data instanceof Customer && $data->getPassword()) {
            // Hache le mot de passe avant de sauvegarder l'entité
            $hashedPassword = $this->passwordHasher->hashPassword($data, $data->getPassword());
            $data->setPassword($hashedPassword);
        }

        // Sauvegarde dans la base de données
        $this->entityManager->persist($data);
        $this->entityManager->flush();
    }
}